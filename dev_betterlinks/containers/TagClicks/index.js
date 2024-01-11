import AnalyticsList from 'containers/Clicks/AnalyticsList';
import { analyticsData } from 'containers/Clicks/clicks.helper';
import Graph from 'containers/Graph';
import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get_analytics_graph_by_tag, get_analytics_unique_list_by_id } from 'redux/actions/clicks.actions';
import { formatDate } from 'utils/helper';

const TagClicks = (props) => {
	const [loading, setLoading] = useState(false);
	const { tag_id } = props;
	const { tag_clicks, tag_graphs } = props.clicks;
	const { customDateFilter, setCustomDateFilter } = props?.propsForAnalytics || {};
	useEffect(() => {
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		const currentDate = to || formatDate(new Date(), 'yyyy-mm-dd');
		let pastDate = subDays(new Date(), 30);
		pastDate = from || formatDate(pastDate, 'yyyy-mm-dd');

		if (!tag_clicks?.[tag_id]) {
			props.get_analytics_unique_list_by_id({ from: pastDate, to: currentDate, tag_id, setLoading });
		}
		if (!tag_graphs?.[tag_id]) {
			props.get_analytics_graph_by_tag({ from: pastDate, to: currentDate, tag_id, setLoading });
		}
	}, [tag_id]);

	return (
		<div className="btl-analytic">
			<Graph
				data={analyticsData(tag_graphs?.[tag_id] || { total_count: [], unique_count: [] })}
				customDateFilter={customDateFilter}
				setCustomDateFilter={setCustomDateFilter}
				loading={loading}
				setLoading={setLoading}
			/>
			<div className="btl-analytic-table-wrapper">
				<AnalyticsList analyticsTab={null} unique_list={tag_clicks?.[tag_id]} loading={loading} id={tag_id} from="manage_tags" />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});
const mapDispatchToProps = (dispatch) => ({
	get_analytics_unique_list_by_id: bindActionCreators(get_analytics_unique_list_by_id, dispatch),
	get_analytics_graph_by_tag: bindActionCreators(get_analytics_graph_by_tag, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(TagClicks);
