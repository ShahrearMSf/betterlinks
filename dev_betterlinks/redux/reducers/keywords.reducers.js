import { FETCH_ALL_KEYWORDS, ADD_NEW_KEYWORD, UPDATE_KEYWORD, DELETE_KEYWORD } from 'redux/actions/keywords.actions';
function keywords(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_ALL_KEYWORDS:
			return {
				...state,
				data: payload.data.reduce((acc, item) => {
					acc.push(JSON.parse(item));
					return acc;
				}, []),
			};
		case ADD_NEW_KEYWORD:
			return {
				...state,
				data: [payload.data, ...state.data],
			};
		case UPDATE_KEYWORD:
			return {
				...state,
				data: [
					payload.data,
					...state.data.filter((item) => {
						if (item.link_id != payload.data.link_id) {
							return item;
						}
					}),
				],
			};
		case DELETE_KEYWORD:
			return {
				...state,
				data: [
					...state.data.filter((item) => {
						if (item.link_id != payload.link_id) {
							return item;
						}
					}),
				],
			};
		default:
			return state;
	}
}
export default keywords;
