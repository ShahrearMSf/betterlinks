import { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import { subDays } from 'date-fns';
// Internal Components
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import AnalyticsList from './AnalyticsList';
import Graph from '../Graph';
// interal helpers
import { useUpgradeProModal } from 'utils/customHooks';
import { formatDate } from 'utils/helper';
import { fetch_clicks_data, fetch_individual_clicks, get_chart_data, get_graph_data, get_medium_data } from 'redux/actions/clicks.actions';
import { analyticsData } from './clicks.helper';
import BarLoader from 'components/Loader/BarLoader';

const Clicks = (props) => {
	const [loading, setLoading] = useState(false);
	const [graphLoading, setGraphLoading] = useState(false);
	const [chartLoading, setChartLoading] = useState(false);
	const [_, setMediumLoading] = useState(false);
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	const { clicks, unique_list, unique_count, referer: top_referer, devices, os, browser, medium } = props.clicks;
	const { darkMode, analyticsTab } = props.activity;

	useEffect(() => {
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		const currentDate = to || formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		pastDate = from || formatDate(pastDate, 'yyyy-mm-dd');
		if (!clicks) {
			props.fetch_clicks_data({ from: pastDate, to: currentDate, setLoading });
			props.get_chart_data({ from: pastDate, to: currentDate, setLoading: setChartLoading });
			props.get_graph_data({ from: pastDate, to: currentDate, setLoading: setGraphLoading });
			props.get_medium_data({ from: pastDate, to: currentDate, setLoading: setMediumLoading });
		}
	}, [clicks]);
	return (
		<div className="btl-analytic">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<Graph
				data={analyticsData(clicks || { total_count: [], unique_count: [] })}
				uniqueIpCount={unique_count}
				customDateFilter={customDateFilter}
				setCustomDateFilter={setCustomDateFilter}
				chartLoading={chartLoading}
				setChartLoading={setChartLoading}
				loading={loading}
				setLoading={setLoading}
				graphLoading={graphLoading}
				setGraphLoading={setGraphLoading}
				setMediumLoading={setMediumLoading}
				extraAnalytics={{
					top_referer: top_referer || [],
					devices: devices || [],
					os: os || [],
					browser: browser || [],
					top_medium: medium || [],
					darkMode,
					Chart,
					BarLoader: BarLoader,
				}}
			/>
			<div className="btl-analytic-table-wrapper">
				<AnalyticsList analyticsTab={analyticsTab} unique_list={unique_list} loading={loading} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
	activity: state.activity,
});
const mapDispatchToProps = (dispatch) => ({
	get_chart_data: bindActionCreators(get_chart_data, dispatch),
	get_graph_data: bindActionCreators(get_graph_data, dispatch),
	get_medium_data: bindActionCreators(get_medium_data, dispatch),
	fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	fetch_individual_clicks: bindActionCreators(fetch_individual_clicks, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
