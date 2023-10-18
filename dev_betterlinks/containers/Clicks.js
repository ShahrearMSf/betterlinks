import React, { useState, useEffect, useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays } from 'date-fns';
import Graph from 'containers/Graph';
import TableLoader from 'components/Loader/TableLoader';
import { formatDate, betterlinks_nonce, is_pro_enabled, getColumns, is_extra_data_tracking_compatible, route_path } from 'utils/helper';
import { fetch_clicks_data, searchClicksData } from 'redux/actions/clicks.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { MultiSelect } from 'react-multi-select-component';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const FilterComponent = (props) => {
	const { filterText, onFilter, searchClickHandler, serachBtnText, analytics, update_analytics_settings, id } = props;
	const [selectedValues, setSelectedValues] = useState(Object.values(analytics));
	const options = [
		{ label: 'Browser', value: 'browser' },
		{ label: 'IP', value: 'ip' },
		{ label: 'Timestamp', value: 'created_at' },
		{ label: 'Shortened URL', value: 'short_url' },
		{ label: 'Referer', value: 'referer' },
		{ label: 'Target URL', value: 'target_url' },
		{ label: 'Target URL', value: 'target_url' },
		{
			label: (
				<span>
					{__('OS', 'betterlinks')}
					{!is_extra_data_tracking_compatible && <span className="pro-badge">Pro</span>}
				</span>
			),
			value: 'os',
		},
		{
			label: (
				<span>
					{__('Device', 'betterlinks')}
					{!is_extra_data_tracking_compatible && <span className="pro-badge">Pro</span>}
				</span>
			),
			value: 'device',
		},
		{
			label: (
				<span>
					{__('Brand', 'betterlinks')}
					{!is_extra_data_tracking_compatible && <span className="pro-badge">Pro</span>}
				</span>
			),
			value: 'brand_name',
		},
	];

	return (
		<>
			<div className="btl-click-filter">
				{id && (
					<Link
						className="btl-go-back-btn dashicons dashicons-arrow-left-alt"
						to={`${route_path}admin.php?page=betterlinks-analytics`}
						title={__('Go back to Analytics', 'betterlinks')}
					/>
				)}
				<input id="search" type="text" placeholder={__('Search...', 'betterlinks')} value={filterText} onChange={onFilter} />
				<button className="btl-search-button" onClick={searchClickHandler}>
					{serachBtnText}
				</button>
				<MultiSelect
					options={options}
					value={selectedValues}
					onChange={(options) => {
						setSelectedValues(options);
						update_analytics_settings(options);
					}}
					labelledBy="Select"
					disableSearch={true}
					hasSelectAll={false}
				/>
			</div>
		</>
	);
};

const Clicks = (props) => {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [serachBtnText, setSearchBtnText] = useState(__('Search Click', 'betterlinks'));
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const { clicks } = props.clicks;
	const { settings } = props.settings;
	const { analytics } = props.analytics;
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	const id = betterLinksQuery.get('id');

	useEffect(() => {
		if (!clicks) {
			const currentDate = new Date();
			let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
			props.fetch_clicks_data({ from: formatDate(new Date(pastDate), 'yyyy-mm-dd'), to: formatDate(currentDate, 'yyyy-mm-dd') });
		}
		if (!settings) {
			props.fetch_settings_data();
		}
		if (!analytics) {
			props.fetch_analytics_settings();
		}
	}, [clicks, settings, analytics]);

	const analyticsData = (data) => {
		let results = {
			clicks: {},
		};
		if (is_pro_enabled) results['unique_clicks'] = {};

		data?.forEach?.((element) => {
			let date = element.created_at.split(' ')[0];
			if (results.clicks.hasOwnProperty(date)) {
				results.clicks[date] += 1;
			} else {
				results.clicks[date] = 1;
			}

			if (is_pro_enabled) {
				// Unique clicks
				if (results.unique_clicks.hasOwnProperty(date)) {
					if (!results.unique_clicks[date].includes(element.ip)) {
						results.unique_clicks[date].push(element.ip);
					}
				} else {
					results.unique_clicks[date] = [element.ip];
				}
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
			<>
				<FilterComponent
					onFilter={(e) => setFilterText(e.target.value)}
					onClear={handleClear}
					filterText={filterText}
					searchClickHandler={searchClickHandler}
					serachBtnText={serachBtnText}
					analytics={analytics}
					update_analytics_settings={props.update_analytics_settings}
					id={id}
				/>
			</>
		);
	}, [filterText, resetPaginationToggle, serachBtnText, setSearchBtnText, analytics, id]);

	const columns = useCallback(getColumns(id, setUpgradeToProModal, analytics), [id, analytics]);
	const newColumns = settings?.is_disable_analytics_ip ? columns.filter((item) => item.selector !== 'ip') : columns;

	const getData = useCallback(
		(id, clicks) => {
			if (id) {
				return clicks?.filter?.((item) => {
					if (item.link_id != id) return;
					if (item.ip && item.ip.toLowerCase().includes(filterText.toLowerCase())) return item;
					if (item.browser && item.browser.toLowerCase().includes(filterText.toLowerCase())) return item;
					if (item.short_url && item.short_url.toLowerCase().includes(filterText.toLowerCase())) return item;
					if (item.target_url && item.target_url.toLowerCase().includes(filterText.toLowerCase())) return item;
				});
			}
			let find = [];
			for (let index = 0; index < clicks.length; index++) {
				const element = clicks[index];
				if (!find.find((item) => item.link_id == element.link_id)) {
					if (element.link_title) {
						element.link_title.toLowerCase().includes(filterText.toLowerCase());
					}
					find.push(element);
				}
			}
			return find;
		},
		[id]
	);
	const getGraphData = useCallback(
		(id, clicks) => {
			if (!id) return clicks;
			return clicks?.filter?.((item) => item.link_id == id);
		},
		[id]
	);
	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	return (
		<div className="btl-analytic">
			{clicks ? (
				<>
					<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
					<Graph data={analyticsData(getGraphData(id, clicks))} customDateFilter={customDateFilter} setCustomDateFilter={setCustomDateFilter} />
					<div className="btl-analytic-table-wrapper">
						<DataTable
							className="btl-analytic-table"
							title={__('All Clicks', 'betterlinks')}
							columns={newColumns}
							data={getData(id, clicks)}
							pagination
							paginationResetDefaultPage={resetPaginationToggle}
							subHeader
							subHeaderComponent={subHeaderComponentMemo}
							persistTableHead
							defaultSortFieldId="name"
							striped
						/>
					</div>
				</>
			) : (
				<TableLoader />
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
	settings: state.settings,
	analytics: state.analytics,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
		searchClicksData: bindActionCreators(searchClicksData, dispatch),
		fetch_analytics_settings: bindActionCreators(fetch_analytics_settings, dispatch),
		update_analytics_settings: bindActionCreators(update_analytics_settings, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
