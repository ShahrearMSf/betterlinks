import { API, namespace, makeRequest } from 'utils/helper';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';

export const fetch_settings_data = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'settings');
		const payload = JSON.parse(res.data.data);
		if (!payload?.redirect_type) {
			throw new Error('rest api not working properly for fetch_settings_data');
		}
		dispatch({
			type: FETCH_SETTINGS,
			payload,
		});
	} catch (e) {
		return makeRequest({
			action: 'betterlinks/admin/get_settings',
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: FETCH_SETTINGS,
					payload: JSON.parse(response.data.data),
				});
			}
		});
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
		makeRequest({
			action: 'betterlinks/admin/update_settings',
			...item,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: UPDATE_OPTION,
					payload: JSON.parse(response.data.data),
				});
			}
		});
	}
};
