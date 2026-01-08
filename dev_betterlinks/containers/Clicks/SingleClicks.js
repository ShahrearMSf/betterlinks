import { useEffect, useState, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import Graph from 'containers/Graph';
import { fetch_clicks_data, fetch_individual_clicks, get_individual_chart_data, get_individual_medium_data } from 'redux/actions/clicks.actions';
import { useUpgradeProModal } from 'utils/customHooks';
import { formatDate, getColumns, is_pro_enabled, pro_version_check } from 'utils/helper';
import { analyticsData } from './clicks.helper';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { __ } from '@wordpress/i18n';
import DataList from './AnalyticsList/DataList';
import ChartLoader from './ChartLoader';
import SingleLinkDetails from './SingleLinkDetails';
import CompatibilityNotice from 'components/Teasers/CompatibilityNotice';
import Chart from 'react-apexcharts';
import BarLoader from 'components/Loader/BarLoader';

const SingleClicks = (props) => {
	const [isOpenUpgradeToProModal, _, closeUpgradeToProModal] = useUpgradeProModal();
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	const { clicks } = props;
	const { individual_clicks } = clicks;
	const [loading, setLoading] = useState(false);
	const [chartLoading, setChartLoading] = useState(false);
	const [mediumLoading, setMediumLoading] = useState(false);
	const { darkMode, analyticsTab } = props.activity;
	const { settings } = props.settings;
	const { analytics } = props.analytics;

	const id = betterLinksQuery.get('id');
	useEffect(() => {
		window.scrollTo(0, is_pro_enabled ? 0 : 270);
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		const currentDate = to || formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		pastDate = from || formatDate(pastDate, 'yyyy-mm-dd');

		if (!settings) props.fetch_settings_data();
		if (!analytics) props.fetch_analytics_settings();
		if (!clicks) {
			props.fetch_clicks_data({ from: pastDate, to: currentDate, setLoading });
		}
	}, []);

	useEffect(() => {
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		const currentDate = to || formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		pastDate = from || formatDate(pastDate, 'yyyy-mm-dd');

		props.fetch_individual_clicks({ link_id: id, from: pastDate, to: currentDate, setLoading });
		
		// Fetch individual chart and medium data
		if (is_pro_enabled) {
			props.get_individual_chart_data({ link_id: id, from: pastDate, to: currentDate, setLoading: setChartLoading });
			props.get_individual_medium_data({ link_id: id, from: pastDate, to: currentDate, setLoading: setMediumLoading });
		}
	}, [id]);

	const handleCountryUpdated = useCallback((ip, countryData) => {
		// Refresh the individual clicks data after country is updated
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		const currentDate = to || formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		pastDate = from || formatDate(pastDate, 'yyyy-mm-dd');

		props.fetch_individual_clicks({ link_id: id, from: pastDate, to: currentDate, setLoading });
	}, [id, customDateFilter, props]);

	const columns = useCallback(getColumns(analytics, analyticsTab, id, handleCountryUpdated), [analytics, analyticsTab, id, handleCountryUpdated]);
	const newColumns = settings?.is_disable_analytics_ip ? columns.filter((item) => item.selector !== 'ip') : columns;

	const uniqueIpCount = individual_clicks?.[id]?.analytics ? [...new Set(individual_clicks[id].analytics.map((item) => item.ip))].length : 0;
	
	// Prepare extra analytics data for individual link
	const extraAnalytics = is_pro_enabled && individual_clicks?.[id] ? {
		top_referer: individual_clicks[id].individual_referer || [],
		devices: individual_clicks[id].individual_devices || [],
		os: individual_clicks[id].individual_os || [],
		browser: individual_clicks[id].individual_browser || {},
		top_medium: individual_clicks[id].individual_medium || {},
		darkMode,
		Chart,
		BarLoader,
		id,
	} : null;

	return (
		<div className="btl-analytic">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			{individual_clicks?.[id] ? (
				<Graph
					data={analyticsData(individual_clicks?.[id].graph_data)}
					customDateFilter={customDateFilter}
					setCustomDateFilter={setCustomDateFilter}
					setLoading={setLoading}
					uniqueIpCount={uniqueIpCount}
					chartLoading={chartLoading}
					setChartLoading={setChartLoading}
					setMediumLoading={setMediumLoading}
					extraAnalytics={extraAnalytics}
				/>
			) : (
				<ChartLoader />
			)}
			<CompatibilityNotice
				mode="white"
				notice={__('To use the Parameter Tracking feature, please ensure that you have at least BetterLinks Pro v2.1.0 or later', 'betterlinks')}
				compatibleProVersion="2.1.0"
			/>
			{id && <SingleLinkDetails clicks={individual_clicks?.[id]?.link_details ? individual_clicks?.[id]?.link_details : { link_title: null, short_url: null, target_url: null }} />}
			<div className="btl-analytic-table-wrapper btl-analytic-table-wrapper-single-clicks">
				<DataList id={id} columns={newColumns} data={individual_clicks?.[id]?.analytics || []} progressPending={individual_clicks?.[id]?.analytics ? false : true} customDateFilter={customDateFilter} />
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	clicks: state.clicks,
	activity: state.activity,
	settings: state.settings,
	analytics: state.analytics,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	fetch_individual_clicks: bindActionCreators(fetch_individual_clicks, dispatch),
	fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
	fetch_analytics_settings: bindActionCreators(fetch_analytics_settings, dispatch),
	update_analytics_settings: bindActionCreators(update_analytics_settings, dispatch),
	get_individual_chart_data: bindActionCreators(get_individual_chart_data, dispatch),
	get_individual_medium_data: bindActionCreators(get_individual_medium_data, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleClicks);
