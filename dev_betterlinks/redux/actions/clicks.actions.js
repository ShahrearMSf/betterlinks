import axios from 'axios';
import queryString from 'query-string';
import { API, namespace, betterlinks_nonce } from 'utils/helper';
export const FETCH_CLICKS_DATA = 'FETCH_CLICKS_DATA';
export const FETCH_INDIVIDUAL_CLICKS = 'FETCH_INDIVIDUAL_CLICKS';
export const FETCH_GRAPH_DATA = 'FETCH_GRAPH_DATA';
export const FETCH_CHART_DATA = 'FETCH_CHART_DATA';
export const FETCH_MEDIUM_DATA = 'FETCH_MEDIUM_DATA';

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
	const { from, to, setLoading } = params;
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
		params.setLoading(true);
		await axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					params.setLoading(false);
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
