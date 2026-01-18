import {
	FETCH_AI_SETTINGS,
	UPDATE_AI_SETTINGS,
	SET_AI_PROCESSING,
	SET_AI_PROCESSING_STEP,
	SET_AI_GENERATED_LINKS,
	SET_TOKEN_LIMIT_WARNING,
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
		warning: null, // Warning message for partial results
	},
	generatedLinks: [],
	tokenLimitWarning: null, // Warning when token limit is reached with partial results
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

		case SET_TOKEN_LIMIT_WARNING:
			return {
				...state,
				tokenLimitWarning: payload,
			};

		case RESET_AI_STATE:
			return {
				...state,
				processing: initialState.processing,
				generatedLinks: [],
				tokenLimitWarning: null, // Clear warning on reset
				settingsLoading: true, // Reset loading flag when modal closes
			};

		default:
			return state;
	}
}

export default aiBulkLinks;

