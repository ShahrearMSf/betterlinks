import {
	FETCH_AI_SETTINGS,
	UPDATE_AI_SETTINGS,
	SET_AI_PROCESSING,
	SET_AI_PROCESSING_STEP,
	SET_AI_GENERATED_LINKS,
	RESET_AI_STATE,
} from 'redux/actions/ai_bulk_links.actions';

const initialState = {
	settings: {
		openai_api_key: '',
		gemini_api_key: '',
		ai_provider: 'openai', // 'openai' or 'gemini'
	},
	settingsLoading: true, // Track if settings are being fetched
	processing: {
		isProcessing: false,
		currentIndex: 0,
		totalUrls: 0,
		stepMessage: '',
		error: null,
	},
	generatedLinks: [],
};

function aiBulkLinks(state = initialState, { type, payload }) {
	switch (type) {
		case FETCH_AI_SETTINGS:
			return {
				...state,
				settings: {
					...state.settings,
					...payload,
				},
				settingsLoading: false, // Settings have been fetched
			};

		case UPDATE_AI_SETTINGS:
			return {
				...state,
				settings: {
					...state.settings,
					...payload,
				},
			};

		case SET_AI_PROCESSING:
			return {
				...state,
				processing: {
					...state.processing,
					...payload,
				},
			};

		case SET_AI_PROCESSING_STEP:
			return {
				...state,
				processing: {
					...state.processing,
					...payload,
				},
			};

		case SET_AI_GENERATED_LINKS:
			return {
				...state,
				generatedLinks: payload,
			};

		case RESET_AI_STATE:
			return {
				...state,
				processing: initialState.processing,
				generatedLinks: [],
				settingsLoading: true, // Reset loading flag when modal closes
			};

		default:
			return state;
	}
}

export default aiBulkLinks;

