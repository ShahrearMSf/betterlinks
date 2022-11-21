import { FETCH_TERMS_DATA, ADD_TERM } from 'redux/actions/actionstrings';
function terms(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_TERMS_DATA:
			return {
				...state,
				terms: payload.data,
			};
		case ADD_TERM: {
			console.log({ state, payload });
			const newTerm = {
				ID: `${payload?.term_id || payload?.ID}`,
				term_name: payload?.term_name || payload?.term_slug,
				term_slug: payload?.term_slug,
				term_type: payload?.term_type,
				term_order: '0',
			};

			return {
				...state,
				terms: [...(state.terms || []), newTerm],
			};
		}
		default:
			return state;
	}
}
export default terms;
