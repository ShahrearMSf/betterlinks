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
	processing: {
		isProcessing: false,
		currentStep: 0,
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
			};

		default:
			return state;
	}
}

export default aiBulkLinks;

