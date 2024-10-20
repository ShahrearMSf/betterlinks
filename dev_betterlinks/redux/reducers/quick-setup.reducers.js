const initialState = {
	isCreated: false,
	ta: {
		links: true,
		clicks: true,
	},
	pl: {
		links: true,
	},
	s3r: {
		links: true,
	},
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
