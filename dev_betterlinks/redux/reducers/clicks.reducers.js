import { FETCH_CLICKS_DATA } from 'redux/actions/clicks.actions';
function clicks(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_CLICKS_DATA: {
			const clicksReducersData = payload.data;
			const formattedData = {};
			const newClicksData = [];
			for (const item of clicksReducersData) {
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
			for (const item of clicksReducersData) {
				const linkId = `id_${item.link_id || ''}`;
				const itemIp = `ip_${item.ip || ''}`.replaceAll(':', '_colon_').replaceAll('.', '_dot_');
				newClicksData.push({
					...item,
					IPCOUNT: formattedData[linkId][itemIp],
				});
			}
			return {
				...state,
				clicks: newClicksData,
			};
		}
		default:
			return state;
	}
}
export default clicks;
