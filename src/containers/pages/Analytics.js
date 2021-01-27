import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Graph from './../../components/Graph';
import TableLoader from './../../components/Loader/TableLoader';
import Topbar from './../group/TopBar';
import { site_url, plugin_root_url, getBrowser, formatDate } from './../../utils/helper';
import { fetch_clicks_data } from './../../redux/actions/clicks.actions';

const columns = [
	{
		name: 'Browser',
		selector: 'browser',
		sortable: false,
		cell: (row) => (
			<div>
				<img src={`${plugin_root_url}assets/images/browser/${row.browser}.png`} alt="icon" />
			</div>
		),
	},
	{
		name: 'Link Name',
		selector: 'name',
		sortable: false,
		cell: (row) => <div>{row.link_title}</div>,
	},
	{
		name: 'IP',
		selector: 'ip',
		sortable: false,
		cell: (row) => <div>{row.ip + '(' + row.IPCOUNT + ')'}</div>,
	},
	{
		name: 'Timestamp',
		selector: 'created_at',
		sortable: false,
	},
	{
		name: 'Shortened URL',
		selector: 'short_url',
		sortable: false,
		cell: (row) => <div>{site_url + '/' + row.short_url}</div>,
	},
	{
		name: 'Referrer',
		selector: 'referer',
		sortable: false,
	},
	{
		name: 'Target URL',
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

const FilterComponent = ({ filterText, onFilter, onClear }) => (
	<div className="btl-click-filter">
		<input id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
		<button className="btl-search-button">Search Click</button>
	</div>
);

const Analytics = (props) => {
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const { clicks } = props.clicks;
	useEffect(() => {
		const currentDate = new Date();
		let pastDate = new Date();
		pastDate = pastDate.setDate(currentDate.getDate() - 30);
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
		return <FilterComponent onFilter={(e) => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
	}, [filterText, resetPaginationToggle]);

	return (
		<React.Fragment>
			<Topbar />

			<h3 className="btl-analytics-heading">{__('Analytics', 'betterlinks')}</h3>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
