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
		case UPDATE_KEYWORD: {
			console.log('---**---update_keyword reducer', { state, payload });

			// const newState = state.data.filter((item) => {
			// 	if (item.link_id != payload.data.old_link_id && item.link_id != payload.data.link_id) {
			// 		console.log('---item', { item });
			// 		return true;
			// 	}
			// });
			
			const newState = state.data.filter((item) => !(item.link_id == payload.data.old_link_id && item.keywords == payload.data.old_funny_keywords));

			return {
				...state,
				data: [payload.data, ...newState],
			};
		}
		case DELETE_KEYWORD: {
			console.log('----keywords reducer DELETE_KEYWORD case', { state, payload });

			// const newData = state.data.filter((item) => {
			// 	if (item.link_id != payload.link_id) {
			// 		return item;
			// 	}
			// });


			const newData = state.data.filter((item) => {
				if (item.link_id == payload.link_id && item.keywords == payload.keywords) {
					return false;
				}else{
					return true
				}
			});

			return {
				...state,
				data: [
					...newData
				],
			};
		}
		default:
			return state;
	}
}
export default keywords;
