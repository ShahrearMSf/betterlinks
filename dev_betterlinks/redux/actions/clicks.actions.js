import axios from 'axios';
import queryString from 'query-string';
import { API, namespace, betterlinks_nonce } from 'utils/helper';
export const FETCH_CLICKS_DATA = 'FETCH_CLICKS_DATA';
export const fetch_clicks_data = (params) => async (dispatch) => {
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks');
	try {
		const res = await API.get(endPoint, {
			params: params,
		});
		if (!res?.data?.data) {
			throw new Error('rest api not working properly for fetch_clicks_data');
		}
		dispatch({
			type: FETCH_CLICKS_DATA,
			payload: res.data,
		});
	} catch (e) {
		const parsed = queryString.parse(location.search);
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/fetch_analytics');
		form_data.append('security', betterlinks_nonce);
		if (parsed.id) {
			form_data.append('ID', parsed.id);
		}
		if (params) {
			form_data.append('from', params.from);
			form_data.append('to', params.to);
		}
		await axios.post(ajaxurl, form_data).then(
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
			}
		);
	}
};
export const searchClicksData = (nonce, filterText) => async (dispatch) => {
	return axios.get(`${ajaxurl}?action=betterlinks/admin/search_clicks_data&security=${nonce}&title=${filterText}`).then(
		(response) => {
			if (response.data) {
				console.info(response.data);
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
