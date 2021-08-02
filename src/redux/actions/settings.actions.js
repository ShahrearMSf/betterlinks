import axios from 'axios';
import { API, namespace, betterlinks_nonce } from '../../utils/helper';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';

export const fetch_settings_data = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'settings');
		dispatch({
			type: FETCH_SETTINGS,
			payload: JSON.parse(res.data.data),
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/get_settings');
		form_data.append('security', betterlinks_nonce);
		await axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: FETCH_SETTINGS,
						payload: JSON.parse(response.data.data),
					});
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
};

export const update_option = (item) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'settings', item);
		dispatch({
			type: UPDATE_OPTION,
			payload: JSON.parse(res.data.data),
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: UPDATE_OPTION,
			payload: {},
		});
	}
};
