import { FETCH_LINK_FOR_PERMALINK, EDIT_GUTENBERG_LINK, EDIT_LINK_EXPIRE_OPTION } from 'redux/actions/actionstrings';

export default function gutenbergRedirectLink(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_LINK_FOR_PERMALINK: {
			console.log('----FETCH_LINK_FOR_PERMALINK reducer data ', { payload });
			return {
				...state,
				linkData: payload,
			};
		}
		case EDIT_GUTENBERG_LINK: {
			console.log('----EDIT_GUTENBERG_LINK reducer data ', { payload });
			return {
				...state,
				linkData: {
					...state?.linkData,
					...payload,
				},
			};
		}
		case EDIT_LINK_EXPIRE_OPTION: {
			console.log('----EDIT_LINK_EXPIRE_OPTION reducer data ', { payload });
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
		default:
			return state;
	}
}
