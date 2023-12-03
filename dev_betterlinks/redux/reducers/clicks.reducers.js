import { FETCH_CLICKS_DATA, FETCH_INDIVIDUAL_CLICKS } from 'redux/actions/clicks.actions';
import { is_extra_data_tracking_compatible, is_pro_enabled } from 'utils/helper';

function get_parsed_clicks_list(unique_list, analytic) {
	const formattedData = {};
	const newClicksData = [];
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

		newClicksData.push({
			...item,
			IPCOUNT: formattedData[linkId][itemIp],
			...(analytic?.hasOwnProperty(item.link_id) && {
				total_clicks: analytic[item.link_id]?.link_count || 1,
				unique_clicks: analytic[item.link_id]?.ip?.length || 1,
			}),
		});
	}
	return newClicksData;
}
function clicks(state = { individual_clicks: {} }, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_CLICKS_DATA: {
			// const { clicks: clicksReducersData, referer, devices, os, browser, top_medium, top_links_clicks, analytic } = payload.data;
			const { clicks: clicksReducersData, unique_list, referer, devices, os, browser, analytic } = payload.data;
			const newClicksData = get_parsed_clicks_list(unique_list, analytic);
			const topClicksData = [];

			// if (is_pro_enabled && is_extra_data_tracking_compatible) {
			// 	const { top_links_clicks: top_links } = top_links_clicks;
			// 	for (const item of Object.values(top_links)) {
			// 		const linkId = `id_${item.link_id || ''}`;
			// 		const itemIp = `ip_${item.ip || ''}`.replaceAll(':', '_colon_').replaceAll('.', '_dot_');
			// 		topClicksData.push({
			// 			...item,
			// 			IPCOUNT: formattedData[linkId][itemIp],
			// 		});
			// 	}
			// }

			return {
				...state,
				// clicks: newClicksData,
				clicks: clicksReducersData,
				unique_list: newClicksData,
				referer,
				devices,
				os,
				browser,
				// top_medium,
				// top_links_clicks: topClicksData,
			};
		}
		case FETCH_INDIVIDUAL_CLICKS: {
			const { data, id } = payload;

			const individual_clicks = state?.individual_clicks || {};
			individual_clicks[id] = data;

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
