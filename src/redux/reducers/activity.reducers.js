import { CHANGE_LINKS_VIEW } from './../actions/activity.actions';
function activity(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case CHANGE_LINKS_VIEW:
			return {
				...state,
				linksView: payload,
			};
		default:
			return state;
	}
}
export default activity;
