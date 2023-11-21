import React, { useState, useEffect, useCallback, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays } from 'date-fns';
import Graph from 'containers/Graph';
import { Doughnut, Bar } from 'react-chartjs-2';
import Chart from 'react-apexcharts';
import TableLoader from 'components/Loader/TableLoader';
import { formatDate, betterlinks_nonce, is_pro_enabled, getColumns, is_extra_data_tracking_compatible, route_path } from 'utils/helper';
import { fetch_clicks_data, searchClicksData } from 'redux/actions/clicks.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { MultiSelect } from 'react-multi-select-component';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SearchLoader from 'components/SearchLoader';
import { update_activity } from 'redux/actions/activity.actions';
import Switch from 'components/Analytics/Switch';

const FilterComponent = (props) => {
	const { filterText, onFilter, searchClickHandler, searchStatus, isSearching, resetSearch, analytics, update_analytics_settings, id, analyticsTab, update_activity } = props;
	const [selectedValues, setSelectedValues] = useState(analytics ? Object.values(analytics) : []);
	const options = [
		{ label: 'Browser', value: 'browser' },
		{ label: 'IP', value: 'ip' },
		{ label: 'Timestamp', value: 'created_at' },
		{ label: 'Shortened URL', value: 'short_url' },
		{ label: 'Referer', value: 'referer' },
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
				<Switch analyticsTab={analyticsTab} update_activity={update_activity} />

				<div style={{ display: 'flex' }}>
					{id && (
						<Link
							className="btl-go-back-btn dashicons dashicons-arrow-left-alt"
							to={`${route_path}admin.php?page=betterlinks-analytics`}
							title={__('Go back to Analytics', 'betterlinks')}
						/>
					)}
					<form onSubmit={searchClickHandler}>
						<input id="search" type="text" placeholder={__('Search...', 'betterlinks')} value={filterText} onChange={onFilter} autoFocus />
						<button className="btl-search-button" type="submit" title={__('Searching', 'betterlinks')}>
							<SearchLoader searchStatus={searchStatus} />
						</button>
						{isSearching && (
							<button className="btl-search-button btl-search-reset" type="button" title={__('Reset Search', 'betterlinks')} onClick={resetSearch}>
								<span class="dashicons dashicons-image-rotate" />
							</button>
						)}
					</form>
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
			</div>
		</>
	);
};

const Clicks = (props) => {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [searchStatus, setSearchStatus] = useState(false);
	const [isSearching, setSearching] = useState(false);
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const { clicks, referer: top_referer, devices, os, browser, top_medium, top_links_clicks } = props.clicks;
	const { settings } = props.settings;
	const { analytics } = props.analytics;
	const { darkMode, analyticsTab } = props.activity;
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
		const searchClickHandler = (e) => {
			e.preventDefault();
			if (filterText) {
				setSearchStatus(true);
				props.searchClicksData(betterlinks_nonce, filterText).then(() => {
					setSearchStatus(false);
					setSearching(true);
				});
			}
		};
		const resetSearch = () => {
			setSearching(false);
			setFilterText('');
			const currentDate = new Date();
			let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
			props.fetch_clicks_data({ from: formatDate(new Date(pastDate), 'yyyy-mm-dd'), to: formatDate(currentDate, 'yyyy-mm-dd') });
		};
		return (
			<>
				<FilterComponent
					onFilter={(e) => setFilterText(e.target.value)}
					onClear={handleClear}
					filterText={filterText}
					searchClickHandler={searchClickHandler}
					searchStatus={searchStatus}
					isSearching={isSearching}
					resetSearch={resetSearch}
					analytics={analytics}
					update_analytics_settings={props.update_analytics_settings}
					id={id}
					analyticsTab={analyticsTab}
					update_activity={props.update_activity}
				/>
			</>
		);
	}, [filterText, resetPaginationToggle, searchStatus, setSearchStatus, isSearching, setSearching, analytics, id, analyticsTab]);

	const columns = useCallback(getColumns(id, analytics, analyticsTab), [id, analytics, analyticsTab]);
	const newColumns = settings?.is_disable_analytics_ip ? columns.filter((item) => item.selector !== 'ip') : columns;

	const getData = useCallback(
		(id, clicks, analyticsTab) => {
			if (id) {
				return clicks?.filter?.((item) => {
					if (item.link_id != id) return;
					const json = JSON.stringify(item);
					return json.toLowerCase().includes(filterText.toLowerCase());
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
			if (1 == analyticsTab) {
				if (!is_pro_enabled && !is_extra_data_tracking_compatible) return [];
				return find.sort((a, b) => a.IPCOUNT < b.IPCOUNT).slice(0, 5);
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

	const graphData = getGraphData(id, clicks);
	return (
		<div className="btl-analytic">
			{clicks ? (
				<>
					<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

					<Graph
						data={analyticsData(graphData)}
						customDateFilter={customDateFilter}
						setCustomDateFilter={setCustomDateFilter}
						extraAnalytics={{
							top_referer,
							devices,
							os,
							browser,
							top_medium,
							Doughnut,
							Bar,
							darkMode,
							Chart,
						}}
					/>

					<div className="btl-analytic-table-wrapper">
						{id &&
							betterLinksHooks.applyFilters('BetterlinksSingleAnalyticsInfo', null, {
								clicks: graphData.length > 0 ? graphData[0] : null,
							})}
						<DataTable
							className="btl-analytic-table"
							title={__('All Clicks', 'betterlinks')}
							columns={newColumns}
							data={getData(id, clicks, analyticsTab)}
							pagination
							paginationResetDefaultPage={resetPaginationToggle}
							subHeader
							subHeaderComponent={subHeaderComponentMemo}
							persistTableHead
							defaultSortFieldId="name"
							striped
							highlightOnHover
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
	activity: state.activity,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
		searchClicksData: bindActionCreators(searchClicksData, dispatch),
		fetch_analytics_settings: bindActionCreators(fetch_analytics_settings, dispatch),
		update_analytics_settings: bindActionCreators(update_analytics_settings, dispatch),
		update_activity: bindActionCreators(update_activity, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
