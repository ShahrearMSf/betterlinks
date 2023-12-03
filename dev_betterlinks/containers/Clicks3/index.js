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
import { fetch_clicks_data, fetch_individual_clicks } from 'redux/actions/clicks.actions';
import { analyticsData } from './clicks.helper';

const Clicks = (props) => {
	const [loading, setLoading] = useState(false);
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	const { clicks, unique_list, referer: top_referer, devices, os, browser, individual_clicks } = props.clicks;
	const { darkMode, analyticsTab } = props.activity;
	const id = betterLinksQuery.get('id');

	useEffect(() => {
		const currentDate = formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30));
		pastDate = formatDate(pastDate, 'yyyy-mm-dd');
		if (!clicks) {
			props.fetch_clicks_data({ from: pastDate, to: currentDate, setLoading });
		}
		if (id && !individual_clicks?.[id]) {
			// TODO: fetch individual clicks data using link id
			props.fetch_individual_clicks({ link_id: id, from: pastDate, to: currentDate, setLoading });
		}
	}, [clicks, id]);

	const getClicksGraphData = (id) => {
		if (!id) return clicks;
		return individual_clicks?.[id] || [];
	};

	return (
		<div className="btl-analytic">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			{clicks && (
				<Graph
					data={analyticsData(getClicksGraphData(id), id)}
					customDateFilter={customDateFilter}
					setCustomDateFilter={setCustomDateFilter}
					extraAnalytics={{
						top_referer,
						devices,
						os,
						browser,
						top_medium: [],
						darkMode,
						Chart,
					}}
				/>
			)}
			<div className="btl-analytic-table-wrapper">
				<AnalyticsList id={id} analyticsTab={analyticsTab} unique_list={unique_list} loading={loading} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
	activity: state.activity,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	fetch_individual_clicks: bindActionCreators(fetch_individual_clicks, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Clicks);
