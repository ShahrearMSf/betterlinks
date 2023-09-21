import { is_pro_enabled } from 'utils/helper';
import { ADD_NEW_PASSWORD, FETCH_LINKS_PASSWORD } from './actionstrings';

export const fetch_links_password = () => async (dispatch) => {
	if (!is_pro_enabled) return;

	const form_data = new FormData();
	form_data.append('action', 'betterlinkspro/admin/fetch_links_password');
	form_data.append('security', window?.betterLinksProGlobal?.betterlinkspro_nonce);

	try {
		const response = await fetch(ajaxurl, {
			method: 'POST',
			body: form_data,
		});
		const result = await response.json();
		if (result?.data?.links) {
			dispatch({
				type: FETCH_LINKS_PASSWORD,
				payload: result.data.links,
			});
		}
	} catch (error) {
		console.log('--error', error);
	}
};

export const add_new_password = (data) => async (dispatch) => {
	if (!is_pro_enabled || !data?.password) return;

	const form_data = new FormData();
	form_data.append('action', 'betterlinkspro/admin/create_links_password');
	form_data.append('security', window?.betterLinksProGlobal?.betterlinkspro_nonce);
	form_data.append('link_id', data.link_id);
	form_data.append('password', data.password);
	form_data.append('status', data.status);
	form_data.append('allow_contact', data.allow_contact);

	try {
		const response = await fetch(ajaxurl, {
			method: 'POST',
			body: form_data,
		});

		const result = await response.json();

		if (result?.data?.data?.id) {
			dispatch({
				type: ADD_NEW_PASSWORD,
				payload: { ...result.data.data, password: data.password },
			});
		}
		fetch_links_password()(dispatch);
	} catch (error) {
		console.log('--error', error);
	}
};
