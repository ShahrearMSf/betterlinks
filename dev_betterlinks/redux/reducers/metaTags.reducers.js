import { FETCH_META_TAGS, ADD_NEW_META_TAGS } from 'redux/actions/metaTags.actions';

function metaTags(state = [], { type, payload }) {
	switch (type) {
		case FETCH_META_TAGS: {
			return {
				...state,
				metaTags: payload,
			};
		}

		case ADD_NEW_META_TAGS: {
			return {
				...state,
				metaTags: [...state.metaTags, payload],
			};
		}
		default:
			return state;
	}
}

export default metaTags;
