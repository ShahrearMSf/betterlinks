import { ADD_NEW_PASSWORD } from '../actions/actionstrings';

function password(state = [], action) {
	const payload = action.payload;

	switch (action.type) {
		case ADD_NEW_PASSWORD: {
			return [...state, payload];
		}
		default:
			return state;
	}
}
export default password;
