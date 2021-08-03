import axios from 'axios';
import { API, namespace, betterlinks_nonce } from '../../utils/helper';
export const DRAG_AND_DROP = 'DRAG_AND_DROP';
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';
export const ADD_NEW_CAT = 'ADD_NEW_CAT';
export const UPDATE_CAT = 'UPDATE_CAT';
export const DELETE_CAT = 'DELETE_CAT';
export const ADD_NEW_LINK = 'ADD_NEW_LINK';
export const DELETE_LINK = 'DELETE_LINK';
export const EDIT_LINK = 'EDIT_LINK';

export const onDragEnd = (result) => async (dispatch) => {
	var [notUsed, ID] = result.draggableId.split('_');
	if (result.destination) {
		dispatch({
			type: DRAG_AND_DROP,
			payload: result,
		});
		try {
			await API.put(namespace + 'links/' + ID, {
				params: {
					ID: ID,
					cat_id: result.destination.droppableId,
				},
			});
		} catch (e) {
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/update_link');
			form_data.append('security', betterlinks_nonce);
			form_data.append('ID', ID);
			form_data.append('cat_id', result.destination.droppableId);
			axios.post(ajaxurl, form_data).then(
				(response) => {
					if (response.data) {
						dispatch({
							type: DRAG_AND_DROP,
							payload: result,
						});
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}
};
export const fetch_links_data = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'links', {
			params: {},
		});
		dispatch({
			type: FETCH_INITIAL_DATA,
			payload: res.data,
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/get_all_links');
		form_data.append('security', betterlinks_nonce);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: FETCH_INITIAL_DATA,
						payload: response.data.data,
					});
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
};

export const add_new_cat = (data) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'terms', {
			params: data,
		});
		if (res.data.success) {
			dispatch({
				type: ADD_NEW_CAT,
				payload: res.data,
			});
		}
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/create_new_term');
		form_data.append('security', betterlinks_nonce);
		form_data.append('ID', data.ID);
		form_data.append('term_name', data.term_name);
		form_data.append('term_slug', data.term_slug);
		form_data.append('term_type', data.term_type);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: ADD_NEW_CAT,
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

export const update_cat = (params) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'terms', {
			params: params,
		});
		dispatch({
			type: UPDATE_CAT,
			payload: res.data,
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/update_term');
		form_data.append('security', betterlinks_nonce);
		form_data.append('ID', params.ID);
		form_data.append('term_name', params.term_name);
		form_data.append('term_slug', params.term_slug);
		form_data.append('term_type', params.term_type);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: UPDATE_CAT,
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

export const delete_cat = (params) => async (dispatch) => {
	try {
		const res = await API.delete(namespace + 'terms', {
			params: params,
		});
		dispatch({
			type: DELETE_CAT,
			payload: res.data,
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/delete_term');
		form_data.append('security', betterlinks_nonce);
		form_data.append('cat_id', params.cat_id);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: DELETE_CAT,
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

export const add_new_link = (formData) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'links', {
			params: formData,
		});
		if (res.data.success) {
			dispatch({
				type: ADD_NEW_LINK,
				payload: res.data,
			});
		}
	} catch (e) {
		console.log({ formData });
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/create_link');
		form_data.append('security', betterlinks_nonce);
		for (const [key, value] of Object.entries(formData)) {
			if (typeof value === 'object' && value !== null) {
				form_data.append(key, JSON.stringify(value));
			} else {
				form_data.append(key, value);
			}
		}
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: ADD_NEW_LINK,
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
export const edit_link = (item) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'links/' + item.ID, {
			params: item,
		});
		dispatch({
			type: EDIT_LINK,
			payload: item,
		});
	} catch (e) {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/update_link');
		form_data.append('security', betterlinks_nonce);
		for (const [key, value] of Object.entries(item)) {
			if (typeof value === 'object' && value !== null) {
				form_data.append(key, JSON.stringify(value));
			} else {
				form_data.append(key, value);
			}
		}
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: EDIT_LINK,
						payload: response.data.data,
					});
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}
};

export const delete_link = (params) => async (dispatch) => {
	let data = [];
	if (Array.isArray(params)) {
		data = params;
	} else {
		data = [params];
	}
	data.map((item) => {
		const { ID, short_url, term_id } = item;
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/delete_link');
		form_data.append('security', betterlinks_nonce);
		form_data.append('ID', ID);
		form_data.append('short_url', short_url);
		form_data.append('term_id', term_id);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					dispatch({
						type: DELETE_LINK,
						payload: response.data,
					});
				}
			},
			(error) => {
				console.log(error);
			}
		);
	});
};
