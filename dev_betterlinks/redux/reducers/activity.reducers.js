import { CHANGE_LINKS_VIEW, CHANGE_THEME_MODE } from 'redux/actions/activity.actions';
const linksView = localStorage.getItem('betterLinksView');
const darkMode = localStorage.getItem('betterLinksIsDarkMode');
function activity(state = { linksView: linksView ? linksView : 'grid', darkMode }, { type, payload }) {
	switch (type) {
		case CHANGE_LINKS_VIEW:
			return {
				...state,
				linksView: payload,
			};
		case CHANGE_THEME_MODE: {
			return {
				...state,
				darkMode: payload,
			};
		}
		default:
			return state;
	}
}
export default activity;
