import { FETCH_SETTINGS, FETCH_TRACKING_SETTINGS, UPDATE_OPTION } from 'redux/actions/settings.actions';
import { betterlinks_settings } from 'utils/helper';

const initialSettingsState = {
	...(betterlinks_settings && {
		settings: betterlinks_settings,
	}),
};

function settings(state = initialSettingsState, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_SETTINGS:
			return {
				...state,
				settings: {
					...payload,
				},
			};
		case FETCH_TRACKING_SETTINGS:
			return {
				...state,
				tracking: {
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
