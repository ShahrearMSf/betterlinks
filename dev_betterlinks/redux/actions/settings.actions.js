import { API, namespace, makeRequest } from 'utils/helper';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';
function isString(x) {
	return Object.prototype.toString.call(x) === '[object String]';
}
export const fetch_settings_data = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'settings');
		const payload = JSON.parse(res.data.data);
		// const auto_link_options = JSON.parse(res.data.auto_link);
		if (!payload?.redirect_type) {
			throw new Error('rest api not working properly for fetch_settings_data');
		}
		window.betterLinksGlobal.prefix = payload.prefix;
		dispatch({
			type: FETCH_SETTINGS,
			payload: { ...payload },
		});
	} catch (e) {
		return makeRequest({
			action: 'betterlinks/admin/get_settings',
		}).then((response) => {
			if (response.data) {
				const payload = 'object' === typeof response.data.data ? JSON.parse(response.data.data.data) : JSON.parse(response.data.data);
				const autolink_disable_post_types = isString(payload?.autolink_disable_post_types)
					? (payload?.autolink_disable_post_types || '')?.replaceAll('\\', '')
					: payload?.autolink_disable_post_types;
				payload['autolink_disable_post_types'] =
					'undefined' != autolink_disable_post_types && isString(autolink_disable_post_types) ? JSON.parse(autolink_disable_post_types) : autolink_disable_post_types;
				dispatch({
					type: FETCH_SETTINGS,
					payload,
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
				const payload = JSON.parse(response.data.data || '{}');
				const autolink_disable_post_types = isString(payload?.autolink_disable_post_types)
					? (payload?.autolink_disable_post_types || '')?.replaceAll('\\', '')
					: payload?.autolink_disable_post_types;
				payload['autolink_disable_post_types'] =
					'undefined' != autolink_disable_post_types && isString(autolink_disable_post_types) ? JSON.parse(autolink_disable_post_types) : autolink_disable_post_types;

				dispatch({
					type: UPDATE_OPTION,
					payload,
				});
			}
		});
	}
};
