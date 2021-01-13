import { FETCH_CLICKS_DATA } from './../actions/clicks.actions';
function clicks(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_CLICKS_DATA:
			return {
				...state,
				clicks: [...payload.data],
			};
		default:
			return state;
	}
}
export default clicks;
