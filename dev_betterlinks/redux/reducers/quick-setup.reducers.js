const initialState = {
	isCreated: false,
};
function quickSetup(state = initialState, { type, payload }) {
	switch (type) {
		case 'GET_OPTIONS': {
			return state;
		}
		case 'UPDATE_OPTIONS': {
			return {
				...state,
				quickSetup: {
					...state.quickSetup,
					...payload,
				},
			};
		}
		default:
			return state;
	}
}

export default quickSetup;
