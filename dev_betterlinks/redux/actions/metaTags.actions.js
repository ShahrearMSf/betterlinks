import { betterlinks_nonce, is_pro_enabled } from 'utils/helper';
import { toastSuccess, toastError } from 'components/Toast';
import { __ } from '@wordpress/i18n';

export const FETCH_META_TAGS = 'FETCH_META_TAGS';
export const ADD_NEW_META_TAGS = 'ADD_NEW_META_TAGS';

export const add_meta_tags = (params) => async (dispatch) => {
	if (!is_pro_enabled) return;
	const form_data = new FormData();
	form_data.append('action', 'betterlinkspro/admin/add_meta_tags');
	form_data.append('security', betterlinks_nonce);
	form_data.append('link_id', params.link_id);
	form_data.append('meta_title', params.meta_title);
	form_data.append('meta_description', params.meta_description);
	form_data.append('meta_image', params.meta_image);
	form_data.append('status', params.status);

	try {
		const response = await fetch(ajaxurl, {
			method: 'POST',
			body: form_data,
		});
		const result = await response.json();
		if (result?.data?.data) {
			dispatch({
				type: ADD_NEW_META_TAGS,
				payload: result.data.data,
			});
			toastSuccess(__('Meta tags have been updated successfully', 'betterlinks'), {
				title: __('Meta Tags Saved', 'betterlinks'),
			});
		}
		fetch_meta_tags()(dispatch);
	} catch (error) {
		console.log('--error', error);
		toastError(__('Failed to update meta tags', 'betterlinks'), {
			title: __('Meta Tags Failed', 'betterlinks'),
		});
	}
};

export const fetch_meta_tags = () => async (dispatch) => {
	if (!is_pro_enabled) return;

	const form_data = new FormData();
	form_data.append('action', 'betterlinkspro/admin/fetch_meta_tags');
	form_data.append('security', betterlinks_nonce);

	try {
		const response = await fetch(ajaxurl, {
			method: 'POST',
			body: form_data,
		});
		const result = await response.json();
		if (result?.data?.data) {
			dispatch({
				type: FETCH_META_TAGS,
				payload: result.data.data,
			});
		}
	} catch (error) {
		console.log('--error', error);
	}
};
