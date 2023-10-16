import { FETCH_ANALYTICS_SETTINGS, UPDATE_ANALYTICS_SETTINGS } from 'redux/actions/actionstrings';

const analytics = (state = {}, { payload, type }) => {
	switch (type) {
		case FETCH_ANALYTICS_SETTINGS: {
			return {
				...state,
				analytics: {
					...payload,
				},
			};
		}
		default:
			return state;
	}
};
export default analytics;
