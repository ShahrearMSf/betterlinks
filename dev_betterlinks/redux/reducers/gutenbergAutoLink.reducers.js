const { SAVE_GUTENBERG_AUTO_LINK, EDIT_GUTENBERG_AUTO_LINK } = require('redux/actions/actionstrings');

export default function gutenbergAutoLink(state = {}, action) {
	const payload = action.payload;

	switch (action.type) {
		case SAVE_GUTENBERG_AUTO_LINK: {
			return {
				...state,
				...payload,
			};
		}
		case EDIT_GUTENBERG_AUTO_LINK: {
			return {
				...state,
				...payload,
			};
		}
		default:
			return state;
	}
}
