import { CHANGE_LINKS_VIEW } from 'redux/actions/activity.actions';
const linksView = localStorage.getItem('betterLinksView');
function activity(state = { linksView: linksView ? linksView : 'grid' }, action) {
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
