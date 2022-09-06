import { FETCH_LINK_FOR_PERMALINK } from 'redux/actions/gutenbergredirectlink.actions';

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
		default:
			return state;
	}
}
