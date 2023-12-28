import { FETCH_CHART_DATA, FETCH_CLICKS_DATA, FETCH_GRAPH_DATA, FETCH_INDIVIDUAL_CLICKS, FETCH_MEDIUM_DATA } from 'redux/actions/clicks.actions';
import { is_extra_data_tracking_compatible, is_pro_enabled } from 'utils/helper';

function get_parsed_clicks_list(unique_list, type = 'all', analytic = null) {
	const formattedData = {};
	const newClicksData = [];
	// console.log(unq)
	for (const item of unique_list) {
		const linkId = `id_${item.link_id || ''}`;
		const itemIp = `ip_${item.ip || ''}`.replaceAll(':', '_colon_').replaceAll('.', '_dot_');
		if (formattedData[linkId]) {
			formattedData[linkId].count = (formattedData[linkId].count || 0) + 1;
		} else {
			formattedData[linkId] = {
				count: 1,
			};
		}
		formattedData[linkId][itemIp] = (formattedData[linkId][itemIp] || 0) + 1;
	}
	for (const item of unique_list) {
		const linkId = `id_${item.link_id || ''}`;
		const itemIp = `ip_${item.ip || ''}`.replaceAll(':', '_colon_').replaceAll('.', '_dot_');

		if ('individual' === type) {
			newClicksData.push({
				...item,
				IPCOUNT: formattedData[linkId][itemIp],
			});
		} else if ('all' === type) {
			newClicksData.push({
				...item,
				...(analytic?.hasOwnProperty(item.link_id) && {
					total_clicks: analytic[item.link_id]?.link_count || 1,
					unique_clicks: analytic[item.link_id]?.ip || 1,
				}),
			});
		}
	}
	return newClicksData;
}
function clicks(state = { individual_clicks: {} }, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_MEDIUM_DATA: {
			const { medium } = payload.data;
			return {
				...state,
				medium,
			};
		}
		case FETCH_GRAPH_DATA: {
			const { clicks } = payload.data;
			return {
				...state,
				clicks,
			};
		}
		case FETCH_CHART_DATA: {
			const { referer, devices, os, browser } = payload.data;
			return {
				...state,
				referer,
				devices,
				os,
				browser,
			};
		}
		case FETCH_CLICKS_DATA: {
			const { unique_list, analytic } = payload.data;
			const newClicksData = get_parsed_clicks_list(unique_list, 'all', analytic);

			return {
				...state,
				unique_list: newClicksData,
			};
		}
		case FETCH_INDIVIDUAL_CLICKS: {
			const { data, id } = payload;

			const newClicksData = get_parsed_clicks_list(data.analytics || [], 'individual');

			const individual_clicks = state?.individual_clicks || {};
			individual_clicks[id] = { ...data, analytics: newClicksData };
			return {
				...state,
				individual_clicks,
			};
		}
		default:
			return state;
	}
}
export default clicks;
