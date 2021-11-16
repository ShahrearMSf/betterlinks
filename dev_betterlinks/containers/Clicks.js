import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays } from 'date-fns';
import Graph from 'containers/Graph';
import TableLoader from 'components/Loader/TableLoader';
import { site_url, plugin_root_url, getBrowser, formatDate, betterlinks_nonce } from 'utils/helper';
import { fetch_clicks_data, searchClicksData } from 'redux/actions/clicks.actions';

const columns = [
	{
		name: __('Browser', 'betterlinks'),
		selector: 'browser',
		sortable: false,
		cell: (row) => {
			const browser = getBrowser(row.browser);
			return (
				<div>
					<img width="25" src={`${plugin_root_url}assets/images/browser/${browser}.svg`} alt="icon" />
				</div>
			);
		},
	},
	{
		name: __('Link Name', 'betterlinks'),
		selector: 'name',
		sortable: false,
		cell: (row) => <div>{row.link_title}</div>,
	},
	{
		name: __('IP', 'betterlinks'),
		selector: 'ip',
		sortable: false,
		cell: (row) => <div>{row.ip + '(' + row.IPCOUNT + ')'}</div>,
	},
	{
		name: __('Timestamp', 'betterlinks'),
		selector: 'created_at',
		sortable: false,
	},
	{
		name: __('Shortened URL', 'betterlinks'),
		selector: 'short_url',
		sortable: false,
		cell: (row) => (
			<div>
				<div style={{ fontWeight: 700 }}>
					<a href={site_url + '/' + row.short_url} target="_blank">
						{site_url + '/' + row.short_url}
					</a>
				</div>
			</div>
		),
	},
	{
		name: __('Referrer', 'betterlinks'),
		selector: 'referer',
		sortable: false,
		cell: (row) => (
			<div>
				<div style={{ fontWeight: 700 }}>
					<a href={row.referer} target="_blank">
						{row.referer}
					</a>
				</div>
			</div>
		),
	},
	{
		name: __('Target URL', 'betterlinks'),
		selector: 'target_url',
		cell: (row) => (
			<div>
				<div style={{ fontWeight: 700 }}>
					<a href={row.target_url} target="_blank">
						{row.target_url}
					</a>
				</div>
			</div>
		),
		sortable: false,
	},
];

const FilterComponent = ({ filterText, onFilter, searchClickHandler, serachBtnText }) => (
	<div className="btl-click-filter">
		<input id="search" type="text" placeholder={__('Filter By Name', 'betterlinks')} value={filterText} onChange={onFilter} />
		<button className="btl-search-button" onClick={searchClickHandler}>
			{serachBtnText}
		</button>
	</div>
);

const Clicks = (props) => {
	const [serachBtnText, setSearchBtnText] = useState(__('Search Click', 'betterlinks'));
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const { clicks } = props.clicks;
	useEffect(() => {
		const currentDate = new Date();
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		if (!clicks) {
			props.fetch_clicks_data({ from: formatDate(new Date(pastDate), 'yyyy-mm-dd'), to: formatDate(currentDate, 'yyyy-mm-dd') });
		}
	}, []);

	const analyticsData = (data) => {
		let results = {};
		data.forEach((element) => {
			let date = element.created_at.split(' ')[0];
			if (results.hasOwnProperty(date)) {
				results[date] = results[date] + 1;
			} else {
				results[date] = 1;
			}
		});
		return results;
	};

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		const searchClickHandler = () => {
			if (filterText) {
				setSearchBtnText(__('Searching...', 'betterlinks'));
				props.searchClicksData(betterlinks_nonce, filterText).then(() => {
					setSearchBtnText(__('Search Click', 'betterlinks'));
				});
			}
		};
		return (
			<FilterComponent
				onFilter={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
				searchClickHandler={searchClickHandler}
				serachBtnText={serachBtnText}
			/>
		);
	}, [filterText, resetPaginationToggle, serachBtnText, setSearchBtnText]);

	return (
		<React.Fragment>
			<div className="btl-analytic">
				{clicks ? (
					<React.Fragment>
						<Graph data={analyticsData(clicks)} />
						<div className="btl-analytic-table-wrapper">
							<DataTable
								className="btl-analytic-table"
								title={__('All Clicks', 'betterlinks')}
								columns={columns}
								data={clicks.filter((item) => item.link_title && item.link_title.toLowerCase().includes(filterText.toLowerCase()))}
								pagination
								paginationResetDefaultPage={resetPaginationToggle}
								subHeader
								subHeaderComponent={subHeaderComponentMemo}
								persistTableHead
							/>
						</div>
					</React.Fragment>
				) : (
					<TableLoader />
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
		searchClicksData: bindActionCreators(searchClicksData, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
