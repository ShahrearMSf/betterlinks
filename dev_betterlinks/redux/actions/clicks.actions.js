import axios from 'axios';
import queryString from 'query-string';
import { API, namespace, betterlinks_nonce } from 'utils/helper';
export const FETCH_CLICKS_DATA = 'FETCH_CLICKS_DATA';
export const FETCH_INDIVIDUAL_CLICKS = 'FETCH_INDIVIDUAL_CLICKS';
export const FETCH_GRAPH_DATA = 'FETCH_GRAPH_DATA';
export const FETCH_CHART_DATA = 'FETCH_CHART_DATA';
export const FETCH_MEDIUM_DATA = 'FETCH_MEDIUM_DATA';
export const UPDATE_CLICKS_WITH_COUNTRY = 'UPDATE_CLICKS_WITH_COUNTRY';

export const FETCH_UNIQUE_CLICKS_BY_TAGS = 'FETCH_UNIQUE_CLICKS_BY_TAGS';
export const FETCH_ANALYTICS_GRAPH_BY_TAGS = 'FETCH_ANALYTICS_GRAPH_BY_TAGS';

export const get_analytics_graph_by_tag = (params) => async (dispatch) => {
	const { tag_id, from, to, setLoading } = params;
	const endPoint = `${namespace}clicks/tags/get_graphs/${tag_id}`;
	setLoading(true);

	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data) {
			throw new Error('rest api not working properly for fetch_analytics graph by tag id');
		}
		setLoading(false);
		dispatch({
			type: FETCH_ANALYTICS_GRAPH_BY_TAGS,
			payload: {
				data: res.data?.data || [],
				id: tag_id,
			},
		});
	} catch (error) {
		console.log('error is ' + error.message);
	}
};

export const get_analytics_unique_list_by_id = (params) => async (dispatch) => {
	const { tag_id, from, to, setLoading } = params;

	const endPoint = namespace + 'clicks/tags/' + tag_id;
	setLoading(true);

	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data) {
			throw new Error('rest api not working properly for fetch_individual_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_UNIQUE_CLICKS_BY_TAGS,
			payload: {
				data: res.data?.data || [],
				id: tag_id,
			},
		});
	} catch (error) {
		console.log('error is ' + error.message);
	}
};

export const get_medium_data = (params) => async (dispatch) => {
	const { from, to, setLoading } = params;
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks/get_medium');
	setLoading(true);
	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data?.data) {
			throw new Error('rest api not working properly for fetch_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_MEDIUM_DATA,
			payload: res.data,
		});
	} catch (error) {
		console.log({ error: error.message });
	}
};

export const get_chart_data = (params) => async (dispatch) => {
	const { from, to, setLoading } = params;
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks/get_charts');
	setLoading(true);
	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data?.data) {
			throw new Error('rest api not working properly for fetch_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_CHART_DATA,
			payload: res.data,
		});
	} catch (error) {}
};
export const get_graph_data = (params) => async (dispatch) => {
	const { from, to, setLoading } = params;
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks/get_graphs');

	setLoading(true);
	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data?.data) {
			throw new Error('rest api not working properly for fetch_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_GRAPH_DATA,
			payload: res.data,
		});
	} catch (error) {}
};

export const fetch_individual_clicks = (params) => async (dispatch) => {
	const { link_id, from, to, setLoading } = params;
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks/' + link_id);
	setLoading(true);
	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data) {
			throw new Error('rest api not working properly for fetch_individual_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_INDIVIDUAL_CLICKS,
			payload: res.data,
		});
	} catch (error) {
		console.log('error is ' + error.message);
	}
};
export const fetch_clicks_data = (params) => async (dispatch) => {
	const { from, to, setLoading = () => {} } = params;
	let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks');
	setLoading(true);
	try {
		const res = await API.get(endPoint, {
			params: {
				from,
				to,
			},
		});
		if (!res?.data?.data) {
			throw new Error('rest api not working properly for fetch_clicks_data');
		}
		setLoading(false);
		dispatch({
			type: FETCH_CLICKS_DATA,
			payload: res.data,
		});
	} catch (e) {
		console.log({ error: e });
		const parsed = queryString.parse(location.search);
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/fetch_analytics');
		form_data.append('security', betterlinks_nonce);
		if (parsed.id) {
			form_data.append('ID', parsed.id);
		}
		if (params) {
			form_data.append('from', params.from);
			form_data.append('to', params.to);
		}
		setLoading(true);
		await axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					setLoading(false);
					dispatch({
						type: FETCH_CLICKS_DATA,
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
export const searchClicksData = (nonce, filterText) => async (dispatch) => {
	return axios.get(`${ajaxurl}?action=betterlinks/admin/search_clicks_data&security=${nonce}&title=${filterText}`).then(
		(response) => {
			if (response.data) {
				dispatch({
					type: FETCH_CLICKS_DATA,
					payload: response.data,
				});
			}
		},
		(error) => {
			console.log(error);
			dispatch({
				type: FETCH_CLICKS_DATA,
				payload: {},
			});
		}
	);
};
export const fetchCustomClicksData = (data) => (dispatch) => {
	dispatch({
		type: FETCH_CLICKS_DATA,
		payload: data,
	});
};

export const delete_clicks = (params) => async (dispatch) => {
	const { click_ids, link_id, from, to } = params;
	try {
		const deleteParams = {
			click_ids: click_ids.join(','),
			link_id: link_id,
		};

		// Include date range if provided
		if (from) deleteParams.from = from;
		if (to) deleteParams.to = to;

		const res = await API.delete(namespace + 'clicks', {
			params: deleteParams,
		});

		if (res?.data?.success) {
			// Refresh the individual clicks data after deletion
			dispatch({
				type: FETCH_INDIVIDUAL_CLICKS,
				payload: {
					data: res.data?.data || {},
					id: res.data?.id || link_id,
				},
			});

			// Also refresh the main analytics graphs and data
			if (from && to) {
				dispatch(get_chart_data({ from, to }));
				dispatch(get_graph_data({ from, to }));
				dispatch(get_medium_data({ from, to }));
				dispatch(fetch_clicks_data({ from, to }));
			}
		}
	} catch (error) {
		console.log('error deleting clicks: ' + error.message);
	}
};

export const delete_links_analytics = (params) => async (dispatch) => {
	const { link_ids, from, to } = params;
	try {
		const deleteParams = {
			link_ids: link_ids.join(','),
		};

		// Include date range if provided
		if (from) deleteParams.from = from;
		if (to) deleteParams.to = to;

		const res = await API.delete(namespace + 'clicks/delete_by_links/', {
			params: deleteParams,
		});

		if (res?.data?.success) {
			// Refresh the clicks data after deletion
			dispatch({
				type: FETCH_CLICKS_DATA,
				payload: {
					success: true,
					data: res.data?.data || {},
				},
			});

			// Also refresh the main analytics graphs and data
			if (from && to) {
				dispatch(get_chart_data({ from, to }));
				dispatch(get_graph_data({ from, to }));
				dispatch(get_medium_data({ from, to }));
				dispatch(fetch_clicks_data({ from, to }));
			}
		}
	} catch (error) {
		console.log('error deleting links analytics: ' + error.message);
	}
};

/**
 * Update clicks data with country information
 * This action updates the Redux store with country data without fetching from server
 * Enables real-time UI update after bulk country fetch
 */
export const update_clicks_with_country = (updatedRows) => (dispatch, getState) => {
	const state = getState();
	const currentClicks = state.clicks?.unique_list || [];

	// Create a map of updated rows by ID for quick lookup
	const updatedMap = {};
	updatedRows.forEach(row => {
		updatedMap[row.ID] = row;
	});

	// Merge updated rows with existing clicks data, preserving all existing fields
	const mergedClicks = currentClicks.map(click => {
		if (updatedMap[click.ID]) {
			// Merge: keep all existing fields from click, update only country fields
			return {
				...click,
				country_code: updatedMap[click.ID].country_code,
				country_name: updatedMap[click.ID].country_name
			};
		}
		return click;
	});

	// Dispatch action to update Redux store
	dispatch({
		type: UPDATE_CLICKS_WITH_COUNTRY,
		payload: {
			data: {
				unique_list: mergedClicks,
				unique_count: state.clicks?.unique_count || 0,
				analytic: state.clicks?.analytic || {}
			}
		}
	});
};
