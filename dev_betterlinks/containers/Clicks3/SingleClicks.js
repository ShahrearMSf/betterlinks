import { useEffect, useState, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { subDays } from 'date-fns';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import Graph from 'containers/Graph';
import { fetch_clicks_data, fetch_individual_clicks } from 'redux/actions/clicks.actions';
import { useUpgradeProModal } from 'utils/customHooks';
import { formatDate, getColumns, is_pro_enabled } from 'utils/helper';
import { analyticsData } from './clicks.helper';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { __ } from '@wordpress/i18n';
import DataList from './AnalyticsList/DataList';
import ContentLoader from 'react-content-loader';
import LineChartLoader from 'components/Loader/LineChartLoader';

const SingleClicks = (props) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	const { id, clicks } = props;
	const { individual_clicks } = clicks;
	const [loading, setLoading] = useState(false);
	const { darkMode, analyticsTab } = props.activity;
	const { settings } = props.settings;
	const { analytics } = props.analytics;

	useEffect(() => {
		if (is_pro_enabled) {
			window.scrollTo(0, 0);
		}
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
		if (!individual_clicks?.[id]) {
			props.fetch_individual_clicks({ link_id: id, from: pastDate, to: currentDate, setLoading });
		}
	}, [id]);

	const columns = useCallback(getColumns(analytics, analyticsTab, id), [analytics]);
	const newColumns = settings?.is_disable_analytics_ip ? columns.filter((item) => item.selector !== 'ip') : columns;

	return (
		<div className="btl-analytic">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			{individual_clicks?.[id] ? (
				<Graph data={analyticsData(individual_clicks?.[id].graph_data)} customDateFilter={customDateFilter} setCustomDateFilter={setCustomDateFilter} setLoading={setLoading} />
			) : (
				<LineChartLoader />
			)}
			{id &&
				betterLinksHooks.applyFilters('BetterlinksSingleAnalyticsInfo', null, {
					clicks: individual_clicks?.[id]?.link_details ? individual_clicks?.[id]?.link_details : { link_title: null, short_url: null, target_url: null },
					ContentLoader,
				})}
			<div className="btl-analytic-table-wrapper">
				<DataList id={id} columns={newColumns} data={individual_clicks?.[id]?.analytics || []} progressPending={individual_clicks?.[id]?.analytics ? false : true} />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(SingleClicks);
