const initialState = {
	isCreated: false,
};
// const initialState = {};

function quickSetup(state = initialState, { type, payload }) {
	switch (type) {
		case 'GET_OPTIONS': {
			return state;
		}
		case 'UPDATE_OPTIONS': {
			return {
				...state,
				...payload,
			};
		}
		default:
			return state;
	}
}

export default quickSetup;
