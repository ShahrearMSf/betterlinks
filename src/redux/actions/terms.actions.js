import { API, namespace } from './../../utils/helper';
export const FETCH_TERMS_DATA = 'FETCH_TERMS_DATA';
export const fetch_terms_data = (params) => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'terms', {
			params: params,
		});
		dispatch({
			type: FETCH_TERMS_DATA,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
		dispatch({
			type: FETCH_TERMS_DATA,
			payload: {},
		});
	}
};
