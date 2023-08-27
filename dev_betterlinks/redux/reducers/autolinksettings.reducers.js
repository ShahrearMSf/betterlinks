const { FETCH_AUTOLINK_SETTINGS } = require('redux/actions/actionstrings');

function autoLinkSettings(state = {}, { type, payload }) {
	switch (type) {
		case FETCH_AUTOLINK_SETTINGS: {
			return {
				...state,
				autoLinkSettings: { ...payload },
			};
		}
		default:
			return state;
	}
}

export default autoLinkSettings;
