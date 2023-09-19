import { ADD_NEW_PASSWORD, FETCH_LINKS_PASSWORD } from '../actions/actionstrings';

function password(state = [], { type, payload }) {
	switch (type) {
		case FETCH_LINKS_PASSWORD: {
			return {
				...state,
				password: payload,
			};
		}
		case ADD_NEW_PASSWORD: {
			return {
				...state,
				password: [...state.password, payload],
			};
		}
		default:
			return state;
	}
}
export default password;
