import { API, makeRequest } from 'utils/helper';

const namespace = 'betterlinks/v1/';

export const FETCH_AI_SETTINGS = 'FETCH_AI_SETTINGS';
export const UPDATE_AI_SETTINGS = 'UPDATE_AI_SETTINGS';
export const SET_AI_PROCESSING = 'SET_AI_PROCESSING';
export const SET_AI_PROCESSING_STEP = 'SET_AI_PROCESSING_STEP';
export const SET_AI_GENERATED_LINKS = 'SET_AI_GENERATED_LINKS';
export const RESET_AI_STATE = 'RESET_AI_STATE';

/**
 * Fetch AI settings (API keys, etc.)
 */
export const fetch_ai_settings = () => async (dispatch) => {
	try {
		const res = await API.get(namespace + 'ai-settings');
		if (res.data.success) {
			dispatch({
				type: FETCH_AI_SETTINGS,
				payload: res.data.data,
			});
		}
	} catch (e) {
		console.error('Error fetching AI settings:', e);
	}
};

/**
 * Update AI settings (API keys, etc.)
 */
export const update_ai_settings = (settings) => async (dispatch) => {
	try {
		const res = await API.post(namespace + 'ai-settings', {
			params: settings,
		});
		if (res.data.success) {
			dispatch({
				type: UPDATE_AI_SETTINGS,
				payload: res.data.data,
			});
			return res.data;
		}
	} catch (e) {
		console.error('Error updating AI settings:', e);
		makeRequest({
			action: 'betterlinks/admin/update_ai_settings',
			...settings,
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: UPDATE_AI_SETTINGS,
					payload: response.data,
				});
			}
		});
	}
};

/**
 * Process URLs with AI to generate links
 */
export const process_urls_with_ai = (urls, prompt, options = {}) => async (dispatch) => {
	try {
		dispatch({
			type: SET_AI_PROCESSING,
			payload: {
				isProcessing: true,
				currentStep: 0,
				totalUrls: urls.length,
			},
		});

		const res = await API.post(namespace + 'ai-process-links', {
			params: {
				urls,
				prompt,
				...options,
			},
		});

		if (res.data.success) {
			dispatch({
				type: SET_AI_GENERATED_LINKS,
				payload: res.data.data,
			});
			dispatch({
				type: SET_AI_PROCESSING,
				payload: {
					isProcessing: false,
					currentStep: 4,
					totalUrls: urls.length,
				},
			});
			return res.data;
		}
	} catch (e) {
		console.error('Error processing URLs with AI:', e);
		dispatch({
			type: SET_AI_PROCESSING,
			payload: {
				isProcessing: false,
				error: e.message,
			},
		});
	}
};

/**
 * Update processing step
 */
export const update_processing_step = (step, message = '') => (dispatch) => {
	dispatch({
		type: SET_AI_PROCESSING_STEP,
		payload: {
			currentStep: step,
			stepMessage: message,
		},
	});
};

/**
 * Publish generated links
 */
export const publish_ai_generated_links = (links) => async (dispatch) => {
	try {
		console.log('Publishing links:', links);

		// Send links directly, not wrapped in params
		const res = await API.post(namespace + 'ai-publish-links', {
			links,
		});

		console.log('Publish response:', res.data);

		if (res.data.success) {
			dispatch({
				type: RESET_AI_STATE,
			});

			// Refresh the links list to show newly published links
			// This will clear the cache and fetch fresh data
			setTimeout(() => {
				// Dispatch action to refresh links from the main links API
				// This ensures the newly published links appear immediately
				const refreshLinksAction = {
					type: 'FETCH_LINKS_REQUEST',
				};
				dispatch(refreshLinksAction);
			}, 500);

			return res.data;
		}
	} catch (e) {
		console.error('Error publishing links:', e);
		makeRequest({
			action: 'betterlinks/admin/publish_ai_links',
			links: JSON.stringify(links),
		}).then((response) => {
			if (response.data) {
				dispatch({
					type: RESET_AI_STATE,
				});

				// Refresh the links list to show newly published links
				setTimeout(() => {
					const refreshLinksAction = {
						type: 'FETCH_LINKS_REQUEST',
					};
					dispatch(refreshLinksAction);
				}, 500);
			}
		});
	}
};

/**
 * Reset AI state
 */
export const reset_ai_state = () => (dispatch) => {
	dispatch({
		type: RESET_AI_STATE,
	});
};

