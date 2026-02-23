import { API, namespace, makeRequest } from 'utils/helper';
import { toastSuccess, toastError } from 'components/Toast';
import { __ } from '@wordpress/i18n';
export const FETCH_ALL_KEYWORDS = 'FETCH_ALL_KEYWORDS';
export const GET_KEYWORD = 'GET_KEYWORD';
export const ADD_NEW_KEYWORD = 'ADD_NEW_KEYWORD';
export const UPDATE_KEYWORD = 'UPDATE_KEYWORD';
export const DELETE_KEYWORD = 'DELETE_KEYWORD';

export const fetch_keywords = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'keywords', {
			params: {},
		});
		dispatch({
			type: FETCH_ALL_KEYWORDS,
			payload: res.data,
		});
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/get_all_keywords',
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: FETCH_ALL_KEYWORDS,
					payload: response.data,
				});
			}
		});
	}
};
export const get_keyword = (item) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'keywords/' + item.ID, {
			params: item,
		});
		dispatch({
			type: GET_KEYWORD,
			payload: item,
		});
	} catch (e) {
		console.error('error at get_keyword: ', e);
	}
};
export const add_keyword = (formData) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'keywords', {
			params: formData,
		});
		if (res.data.success) {
			dispatch({
				type: ADD_NEW_KEYWORD,
				payload: res.data,
			});
			toastSuccess(__('Keyword has been created successfully', 'betterlinks'), {
				title: __('Keyword Created', 'betterlinks'),
			});
		}
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/create_keyword',
			...formData,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: ADD_NEW_KEYWORD,
					payload: response.data,
				});
				toastSuccess(__('Keyword has been created successfully', 'betterlinks'), {
					title: __('Keyword Created', 'betterlinks'),
				});
			}
		});
	}
};

export const update_keyword = (formData) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'keywords/' + formData.chooseLink, {
			params: formData,
		});
		if (res.data.success) {
			dispatch({
				type: UPDATE_KEYWORD,
				payload: res.data,
			});
			toastSuccess(__('Keyword has been updated successfully', 'betterlinks'), {
				title: __('Keyword Updated', 'betterlinks'),
			});
		}
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/update_keyword',
			...formData,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: UPDATE_KEYWORD,
					payload: response.data,
				});
				toastSuccess(__('Keyword has been updated successfully', 'betterlinks'), {
					title: __('Keyword Updated', 'betterlinks'),
				});
			}
		});
	}
};

export const delete_keyword = (params) => (dispatch) => {
	const keywordCount = params.length;
	params.map((item) => {
		const { keywords, link_id } = item;
		makeRequest({
			action: 'betterlinks/admin/delete_keyword',
			id: link_id,
			keywords: keywords,
		}).then((response) => {
			if (response.data.success) {
				dispatch({
					type: DELETE_KEYWORD,
					payload: {
						link_id,
						keywords,
					},
				});
				toastSuccess(
					keywordCount > 1
						? __('Keywords have been deleted successfully', 'betterlinks')
						: __('Keyword has been deleted successfully', 'betterlinks'),
					{
						title: keywordCount > 1 ? __('Keywords Deleted', 'betterlinks') : __('Keyword Deleted', 'betterlinks'),
					}
				);
			}
		});
	});
};
