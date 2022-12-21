import { FETCH_LINK_FOR_PERMALINK, EDIT_GUTENBERG_LINK, EDIT_LINK_EXPIRE_OPTION, RESET_GUTENBERG_INSTANT_REDIRECT } from 'redux/actions/actionstrings';

export default function gutenbergRedirectLink(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_LINK_FOR_PERMALINK: {
			return {
				...state,
				linkData: payload,
			};
		}
		case EDIT_GUTENBERG_LINK: {
			return {
				...state,
				linkData: {
					...state?.linkData,
					...payload,
				},
			};
		}
		case EDIT_LINK_EXPIRE_OPTION: {
			return {
				...state,
				linkData: {
					...state?.linkData,
					expire: {
						...(state?.linkData?.expire || {}),
						...payload,
					},
				},
			};
		}
		case RESET_GUTENBERG_INSTANT_REDIRECT:
			const newResettedData = {
				...state,
				linkData: payload,
			};
			return newResettedData;
		default:
			return state;
	}
}
