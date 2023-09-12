const { SAVE_GUTENBERG_AFFILIATE_DISCLOSURE, EDIT_GUTENBERG_AFFILIATE_DISCLOSURE } = require('redux/actions/actionstrings');

export default function gutenbergAffiliate(state = {}, action) {
	const payload = action.payload;

	switch (action.type) {
		case SAVE_GUTENBERG_AFFILIATE_DISCLOSURE: {
			return {
				...state,
				...payload,
			};
		}
		case EDIT_GUTENBERG_AFFILIATE_DISCLOSURE: {
			return {
				...state,
				...payload,
			};
		}
		default:
			return state;
	}
}
