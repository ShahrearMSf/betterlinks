import { API, namespace, makeRequest, getJsonString } from 'utils/helper';
import { EDIT_GUTENBERG_LINK, EDIT_LINK_EXPIRE_OPTION, ADD_TERM, UPDATE_TERM, DELETE_TERM } from 'redux/actions/actionstrings';
import { add_new_password, fetch_links_password } from './password.actions';
import { add_meta_tags } from './metaTags.actions';
export const DRAG_AND_DROP = 'DRAG_AND_DROP';
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA';
export const FETCH_WITHOUT_CATEGORY_INITIAL_DATA = 'FETCH_WITHOUT_CATEGORY_INITIAL_DATA';
export const ADD_NEW_CAT = 'ADD_NEW_CAT';
export const UPDATE_CAT = 'UPDATE_CAT';
export const DELETE_CAT = 'DELETE_CAT';
export const ADD_NEW_LINK = 'ADD_NEW_LINK';
export const ADD_NEW_LINK_FOR_GUTEN_STORE = 'ADD_NEW_LINK_FOR_GUTEN_STORE';
export const DELETE_LINK = 'DELETE_LINK';
export const EDIT_LINK = 'EDIT_LINK';
export const EDIT_LINK_FOR_GUTENBERG = 'EDIT_LINK_FOR_GUTENBERG';
export const HANDLE_LINK_FAVORITE = 'HANDLE_LINK_FAVORITE';

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
			makeRequest({
				action: 'betterlinks/admin/update_link',
				ID,
				cat_id: result.destination.droppableId,
			}).then((response) => {
				if (response.data) {
					dispatch({
						type: DRAG_AND_DROP,
						payload: result,
					});
				}
			});
		}
	}
};
export const fetch_links_data =
	(forGutenbergStore = false) =>
	async (dispatch) => {
		try {
			const res = await API.get(namespace + 'links', {
				params: {},
			});
			if (!res?.data?.data) {
				throw new Error('rest api not working properly for fetch_links_data');
			}
			dispatch({
				type: forGutenbergStore ? FETCH_WITHOUT_CATEGORY_INITIAL_DATA : FETCH_INITIAL_DATA,
				payload: res.data,
			});
		} catch (e) {
			makeRequest({
				action: 'betterlinks/admin/get_all_links',
			}).then((response) => {
				if (response.data) {
					dispatch({
						type: forGutenbergStore ? FETCH_WITHOUT_CATEGORY_INITIAL_DATA : FETCH_INITIAL_DATA,
						payload: response.data.data,
					});
				}
			});
		}
	};

export const dispatch_new_links_data = (payload) => async (dispatch) => {
	dispatch({
		type: FETCH_INITIAL_DATA,
		payload,
	});
};

export const add_new_cat = (data) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'terms', {
			params: data,
		});
		if (res.data.success) {
			dispatch({
				type: ADD_TERM,
				payload: res.data?.data,
			});
			dispatch({
				type: ADD_NEW_CAT,
				payload: res.data,
			});
		}
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/create_new_term',
			ID: data.ID,
			term_name: data.term_name,
			term_slug: data.term_slug,
			term_type: data.term_type,
		}).then((res) => {
			if (res.data) {
				dispatch({
					type: ADD_TERM,
					payload: res.data?.data,
				});
				dispatch({
					type: ADD_NEW_CAT,
					payload: res.data,
				});
			}
		});
	}
};

export const update_cat = (params) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'terms', {
			params: params,
		});
		dispatch({
			type: UPDATE_TERM,
			payload: res.data?.data,
		});
		dispatch({
			type: UPDATE_CAT,
			payload: res.data,
		});
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/update_term',
			ID: params.ID,
			term_name: params.term_name,
			term_slug: params.term_slug,
			term_type: params.term_type,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: UPDATE_TERM,
					payload: res.data?.data,
				});
				dispatch({
					type: UPDATE_CAT,
					payload: response.data,
				});
			}
		});
	}
};

export const delete_cat = (params) => async (dispatch) => {
	try {
		const res = await API.delete(namespace + 'terms', {
			params: params,
		});
		dispatch({
			type: DELETE_TERM,
			payload: res.data?.data,
		});
		dispatch({
			type: DELETE_CAT,
			payload: res.data,
		});
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/delete_term',
			cat_id: params.cat_id,
		}).then((res) => {
			if (res.data) {
				dispatch({
					type: DELETE_TERM,
					payload: res.data?.data,
				});
				dispatch({
					type: DELETE_CAT,
					payload: res.data,
				});
			}
		});
	}
};

export const add_new_link =
	(formData, forGutenbergStore = false, isThisInstantGutenbergRedirectLink = false) =>
	async (dispatch) => {
		try {
			const res = await API.post(namespace + 'links', {
				params: formData,
			});
			const { cat_data, tags_data = [], ID } = res?.data?.data;

			// Adding new password for the link
			if (formData?.enable_password && '' !== formData?.password) {
				add_new_password({
					link_id: ID,
					password: formData.password,
					status: formData.enable_password,
					allow_contact: formData.allow_visitor_contact,
				})(dispatch);
			}

			if (formData.old_enable_meta_tags !== formData.enable_meta_tags || (formData.enable_meta_tags && '' !== formData.meta_title)) {
				add_meta_tags({
					link_id: ID,
					meta_title: formData.meta_title,
					meta_description: formData.meta_description,
					meta_image: formData.meta_image || '',
					status: !!formData.enable_meta_tags,
				})(dispatch);
			}

			if (cat_data?.is_newly_created) {
				dispatch({
					type: ADD_TERM,
					payload: cat_data,
				});
			}
			for (const tagItem of tags_data) {
				if (tagItem?.is_newly_created) {
					dispatch({
						type: ADD_TERM,
						payload: tagItem,
					});
				}
			}
			if (res.data.success) {
				dispatch({
					type: forGutenbergStore ? ADD_NEW_LINK_FOR_GUTEN_STORE : ADD_NEW_LINK,
					payload: res.data,
				});
				if (isThisInstantGutenbergRedirectLink) {
					const originalResponseData = res.data?.data;
					const clonedResponseData = {
						...(originalResponseData || {}),
					};

					delete clonedResponseData.expire;
					delete clonedResponseData.link_status;
					delete clonedResponseData.dynamic_redirect;

					dispatch({
						type: EDIT_GUTENBERG_LINK,
						payload: clonedResponseData,
					});

					dispatch({
						type: EDIT_LINK_EXPIRE_OPTION,
						payload:
							typeof originalResponseData?.expire === 'object'
								? originalResponseData.expire
								: typeof originalResponseData?.expire === 'string'
								? getJsonString(originalResponseData.expire)
								: {},
					});
				}
			}
			return res;
		} catch (e) {
			return makeRequest({
				action: 'betterlinks/admin/create_link',
				...formData,
			}).then((res) => {
				const { cat_data, tags_data = [], ID } = res?.data?.data;

				// Adding new password for the link
				if (formData?.enable_password && '' !== formData?.password) {
					add_new_password({
						link_id: ID,
						password: formData.password,
						status: formData.enable_password,
					})(dispatch);
				}

				if (formData.old_enable_meta_tags !== formData.enable_meta_tags || (formData.enable_meta_tags && '' !== formData.meta_title)) {
					add_meta_tags({
						link_id: ID,
						meta_title: formData.meta_title,
						meta_description: formData.meta_description,
						meta_image: formData.meta_image || '',
						status: !!formData.enable_meta_tags,
					})(dispatch);
				}

				if (cat_data?.is_newly_created) {
					dispatch({
						type: ADD_TERM,
						payload: cat_data,
					});
				}
				for (const tagItem of tags_data) {
					if (tagItem?.is_newly_created) {
						dispatch({
							type: ADD_TERM,
							payload: tagItem,
						});
					}
				}
				if (res.data) {
					dispatch({
						type: forGutenbergStore ? ADD_NEW_LINK_FOR_GUTEN_STORE : ADD_NEW_LINK,
						payload: res.data,
					});
					if (isThisInstantGutenbergRedirectLink) {
						const originalResponseData = res.data?.data;
						const clonedResponseData = {
							...(originalResponseData || {}),
						};
						delete clonedResponseData.expire;
						delete clonedResponseData.link_status;
						delete clonedResponseData.dynamic_redirect;

						dispatch({
							type: EDIT_GUTENBERG_LINK,
							payload: clonedResponseData,
						});

						dispatch({
							type: EDIT_LINK_EXPIRE_OPTION,
							payload:
								typeof originalResponseData?.expire === 'object'
									? originalResponseData.expire
									: typeof originalResponseData?.expire === 'string'
									? getJsonString(originalResponseData.expire)
									: {},
						});
					}
				}
			});
		}
	};
export const edit_link =
	(item, forGutenbergStore = false) =>
	async (dispatch) => {
		try {
			const res = await API.put(namespace + 'links/' + item.ID, {
				params: item,
			});

			const { cat_data, tags_data = [], ID } = res?.data?.data;

			if (item?.old_enable_password !== item?.enable_password || item?.password || item?.old_allow_visitor_contact !== item?.allow_visitor_contact) {
				add_new_password({
					link_id: ID,
					password: item.password,
					status: item.enable_password,
					allow_contact: item.allow_visitor_contact,
				})(dispatch);
			}

			if (item.old_enable_meta_tags !== item.enable_meta_tags || (item.enable_meta_tags && '' !== item.meta_title)) {
				add_meta_tags({
					link_id: ID,
					meta_title: item.meta_title,
					meta_description: item.meta_description,
					meta_image: item.meta_image || '',
					status: !!item.enable_meta_tags,
				})(dispatch);
			}

			if (cat_data?.is_newly_created) {
				dispatch({
					type: ADD_TERM,
					payload: cat_data,
				});
			}
			for (const tagItem of tags_data) {
				if (tagItem?.is_newly_created) {
					dispatch({
						type: ADD_TERM,
						payload: tagItem,
					});
				}
			}
			dispatch({
				type: forGutenbergStore ? EDIT_LINK_FOR_GUTENBERG : EDIT_LINK,
				payload: res?.data?.data,
			});
			!forGutenbergStore && fetch_links_password()(dispatch);
			return res;
		} catch (e) {
			return makeRequest({
				action: 'betterlinks/admin/update_link',
				...item,
			}).then((response) => {
				if (response.data) {
					const { cat_data, tags_data = [], ID } = response?.data?.data;

					// if (res?.data?.data?.enable_password != item?.enable_password) {
					if (item?.old_enable_password !== item?.enable_password || item?.password || item?.old_allow_visitor_contact !== item?.allow_visitor_contact) {
						add_new_password({
							link_id: ID,
							password: item.password,
							status: item.enable_password,
							allow_contact: item.allow_visitor_contact,
						})(dispatch);
					}

					if (item.old_enable_meta_tags !== item.enable_meta_tags || (item.enable_meta_tags && '' !== item.meta_title)) {
						add_meta_tags({
							link_id: ID,
							meta_title: item.meta_title,
							meta_description: item.meta_description,
							meta_image: item.meta_image || '',
							status: !!item.enable_meta_tags,
						})(dispatch);
					}

					if (cat_data?.is_newly_created) {
						dispatch({
							type: ADD_TERM,
							payload: cat_data,
						});
					}
					for (const tagItem of tags_data) {
						if (tagItem?.is_newly_created) {
							dispatch({
								type: ADD_TERM,
								payload: tagItem,
							});
						}
					}
					dispatch({
						type: forGutenbergStore ? EDIT_LINK_FOR_GUTENBERG : EDIT_LINK,
						payload: response.data.data,
					});
					fetch_links_password()(dispatch);
				}
			});
		}
	};
export const handle_link_favorite = (item) => async (dispatch) => {
	try {
		const res = await API.put(namespace + 'links_favorite/' + item.ID, {
			params: item,
		});
		dispatch({
			type: HANDLE_LINK_FAVORITE,
			payload: res?.data?.data || {},
		});
	} catch (e) {
		makeRequest({
			action: 'betterlinks/admin/handle_favorite',
			...item,
		}).then((res) => {
			dispatch({
				type: HANDLE_LINK_FAVORITE,
				payload: res?.data?.data || {},
			});
		});
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
		makeRequest({
			action: 'betterlinks/admin/delete_link',
			ID,
			short_url,
			term_id,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: DELETE_LINK,
					payload: response.data,
				});
			}
		});
	});
};
