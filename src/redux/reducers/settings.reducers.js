import { FETCH_SETTINGS, UPDATE_OPTION } from '../actions/settings.actions';
function settings(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_SETTINGS:
			return {
				...state,
				settings: {
					...payload,
				},
			};
		case UPDATE_OPTION:
			return {
				...state,
				settings: {
					...payload,
				},
			};
		default:
			return state;
	}
}
export default settings;
