import axios from 'axios';
import { API, namespace, betterlinks_nonce } from 'utils/helper';
import { FETCH_TERMS_DATA } from 'redux/actions/actionstrings';
export const fetch_terms_data = (params) => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'terms', {
			params: params,
		});
		if (!Array.isArray(res?.data)) {
			throw new Error('rest api not working properly for fetch_terms_data');
		}
		dispatch({
			type: FETCH_TERMS_DATA,
			payload: res.data,
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/get_terms');
		form_data.append('security', betterlinks_nonce);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: FETCH_TERMS_DATA,
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
