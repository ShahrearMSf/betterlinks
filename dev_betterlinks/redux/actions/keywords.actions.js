import { API, namespace, makeRequest } from '../../utils/helper';
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
					payload: response.data.data,
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
		makeRequest({
			action: 'betterlinks/admin/get_keyword',
			...item,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: GET_KEYWORD,
					payload: response.data.data,
				});
			}
		});
	}
};
export const add_new_keyword = (formData) => async (dispatch) => {
	console.log({ formData });
	try {
		const res = await API.post(namespace + 'keywords', {
			params: formData,
		});
		if (res.data.success) {
			dispatch({
				type: ADD_NEW_KEYWORD,
				payload: res.data,
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
			}
		});
	}
};

export const delete_keyword = (params) => async (dispatch) => {
	let data = [];
	if (Array.isArray(params)) {
		data = params;
	} else {
		data = [params];
	}
	data.map((item) => {
		const { ID, short_url, term_id } = item;
		makeRequest({
			action: 'betterlinks/admin/delete_keyword',
			ID,
			short_url,
			term_id,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: DELETE_KEYWORD,
					payload: response.data,
				});
			}
		});
	});
};
