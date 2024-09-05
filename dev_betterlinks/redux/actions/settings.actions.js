import axios from 'axios';
import { API, namespace, makeRequest } from 'utils/helper';
import { fetch_terms_data } from './terms.actions';
import { fetch_links_data } from './links.actions';
export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_TRACKING_SETTINGS = 'FETCH_TRACKING_SETTINGS';
export const ADD_OPTION = 'ADD_OPTION';
export const UPDATE_OPTION = 'UPDATE_OPTION';
function isString(x) {
	return Object.prototype.toString.call(x) === '[object String]';
}

export const fetch_tracking_settings = () => async (dispatch) => {
	try {
		makeRequest({
			action: 'betterlinks/admin/get_external_analytics',
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: FETCH_TRACKING_SETTINGS,
					payload: { ...response.data?.data },
				});
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const update_tracking_settings = (settings) => async (dispatch) => {
	try {
		const {
			is_enable_ga,
			is_ga4,
			ga_tracking_code,
			ga4_api_secret,
			is_enable_pixel,
			pixel_id,
			pixel_access_token,
			is_enable_custom_scripts,
			global_head_scripts,
			parameter_tracking,
			betterlinkspro_nonce,
		} = settings;
		const parameter_tracking_settings = JSON.stringify(parameter_tracking || {});
		const form_data = new FormData();
		form_data.append('action', 'betterlinkspro/admin/external_analytics');
		form_data.append('is_enable_ga', is_enable_ga);
		form_data.append('is_ga4', is_ga4);
		form_data.append('ga_tracking_code', ga_tracking_code);
		form_data.append('ga4_api_secret', ga4_api_secret);
		form_data.append('is_enable_pixel', is_enable_pixel);
		form_data.append('pixel_id', pixel_id);
		form_data.append('pixel_access_token', pixel_access_token);
		form_data.append('is_enable_custom_scripts', is_enable_custom_scripts);
		form_data.append('global_head_scripts', global_head_scripts || '');
		form_data.append('parameter_tracking', parameter_tracking_settings);

		form_data.append('security', betterlinkspro_nonce);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data?.data) {
					fetch_tracking_settings()(dispatch);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	} catch (error) {
		console.log(error);
	}
};

export const fetch_settings_data = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'settings');
		const payload = JSON.parse(res.data.data);
		// if (!payload?.redirect_type) {
		// 	throw new Error('rest api not working properly for fetch_settings_data');
		// }
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
	fetch_links_data()(dispatch); // fetch all links from cache/db after changes on settings
};
