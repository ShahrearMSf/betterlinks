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
				tags: payload.data?.results,
				tag_analytics: payload.data?.analytic,
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
				...(newTerm.term_type === 'tags' && { tags: [...(state.tags || []), newTerm] }),
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
			const newTags = state.tags.map((item) =>
				`${item.ID}` === `${ID}` || `${item.id}` === `${ID}`
					? {
							...item,
							...payload,
					  }
					: item
			);
			return {
				...state,
				terms: newTerms,
				tags: newTags,
			};
		}
		case DELETE_TERM: {
			const ID = payload?.cat_id;
			const newTerms = state.terms.filter((item) => `${item.ID}` !== `${ID}`);
			const newTags = state?.tags?.filter((item) => `${item.id}` !== `${ID}` && `${item.ID}` != `${ID}`);
			return {
				...state,
				terms: newTerms,
				tags: newTags,
			};
		}
		default:
			return state;
	}
}
export default terms;
