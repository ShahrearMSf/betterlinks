import { is_pro_enabled, makeRequest } from 'utils/helper';
import { ADD_NEW_PASSWORD, FETCH_LINKS_PASSWORD } from './actionstrings';

export const fetch_links_password = () => async ( dispatch ) => {
	if( is_pro_enabled ) {
		
	}
}

export const add_new_password = (data) => async (dispatch) => {
	if (is_pro_enabled) {
		const form_data = new FormData();
		form_data.append('action', 'betterlinkspro/admin/create_links_password');
		form_data.append('security', window?.betterLinksProGlobal?.betterlinkspro_nonce);
		form_data.append('link_id', data.link_id);
		form_data.append('password', data.password);
		form_data.append('status', data.status);

		try {
			const response = await fetch(ajaxurl, {
				method: 'POST',
				body: form_data,
			});

			const data = await response.json();
			// console.log(data);
		} catch (error) {
			console.log('--error', error);
		}
	}
};
