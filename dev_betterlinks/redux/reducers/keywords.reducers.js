import { FETCH_ALL_KEYWORDS, GET_KEYWORD, ADD_NEW_KEYWORD, UPDATE_KEYWORD, DELETE_KEYWORD } from '../actions/keywords.actions';
function keywords(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_ALL_KEYWORDS:
			return {
				...state,
				keywords: payload.data,
			};
		case GET_KEYWORD:
			return {
				...state,
				keywords: {
					...state.keywords,
					payload,
				},
			};
		case ADD_NEW_KEYWORD:
			return {
				...state,
				keywords: {
					...state.keywords,
					payload,
				},
			};
		case UPDATE_KEYWORD:
			return {
				...state,
				keywords: {
					...state.links,
					payload,
				},
			};
		case DELETE_KEYWORD:
			return {
				...state,
				keywords: {
					...state.links,
					payload,
				},
			};
		default:
			return state;
	}
}
export default keywords;
