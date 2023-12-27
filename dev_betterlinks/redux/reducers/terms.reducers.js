import { FETCH_TERMS_DATA, ADD_TERM, UPDATE_TERM, DELETE_TERM, FETCH_TAGS } from 'redux/actions/actionstrings';
function terms(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_TERMS_DATA:
			return {
				...state,
				terms: payload.data,
			};
		case FETCH_TAGS:
			return {
				...state,
				tags: payload.data,
			};
		case ADD_TERM: {
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
		case UPDATE_TERM: {
			const ID = payload.ID;
			const newTerms = state.terms.map((item) =>
				`${item.ID}` === `${ID}`
					? {
							...item,
							...payload,
					  }
					: item
			);
			return {
				...state,
				terms: newTerms,
			};
		}
		case DELETE_TERM: {
			const ID = payload?.cat_id;
			const newTerms = state.terms.filter((item) => `${item.ID}` !== `${ID}`);
			return {
				...state,
				terms: newTerms,
			};
		}
		default:
			return state;
	}
}
export default terms;
