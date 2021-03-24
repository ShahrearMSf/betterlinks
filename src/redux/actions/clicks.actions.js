import axios from 'axios';
import { API, namespace } from './../../utils/helper';
export const FETCH_CLICKS_DATA = 'FETCH_CLICKS_DATA';
export const fetch_clicks_data = (params) => async (dispatch) => {
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks');
	try {
		const res = await API.get(endPoint, {
			params: params,
		});
		dispatch({
			type: FETCH_CLICKS_DATA,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FETCH_CLICKS_DATA,
			payload: {},
		});
	}
};
export const searchClicksData = (nonce, filterText) => async (dispatch) => {
	return axios.get(`${ajaxurl}?action=betterlinks/admin/search_clicks_data&security=${nonce}&title=${filterText}`).then(
		(response) => {
			if (response.data) {
				dispatch({
					type: FETCH_CLICKS_DATA,
					payload: response.data,
				});
			}
		},
		(error) => {
			console.log(error);
			dispatch({
				type: FETCH_CLICKS_DATA,
				payload: {},
			});
		}
	);
};
export const fetchCustomClicksData = (data) => (dispatch) => {
	dispatch({
		type: FETCH_CLICKS_DATA,
		payload: data,
	});
};
