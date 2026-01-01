import { API, makeRequest, generateShortURL } from 'utils/helper';
import AILinkGenerator from 'components/AILinkGenerator';
import { extractFieldLimits } from 'utils/FieldLimitsExtractor';

const namespace = 'betterlinks/v1/';

/**
 * Extract category from prompt if mentioned
 * Handles multiple formats:
 * - "category: Technology"
 * - "category should be Business"
 * - "Category Summer25"
 * - "category Summer25 and tags winter26" (stops before "and tags")
 */
const extractCategoryFromPrompt = (prompt) => {
	if (!prompt) return null;

	// Try multiple patterns in order of specificity
	let categoryMatch;

	// Pattern 1: "category: value" or "category should be value" (most specific)
	categoryMatch = prompt.match(/category\s*(?:should\s*)?(?:be\s*)?:?\s*([A-Za-z0-9\s&-]+?)(?=\s+(?:and\s+)?tags\s|\.|\n|,|$)/i);
	if (categoryMatch && categoryMatch[1]) {
		return categoryMatch[1].trim();
	}

	// Pattern 2: "category value" followed by "and tags" or end of sentence
	categoryMatch = prompt.match(/category\s+([A-Za-z0-9\s&-]+?)(?=\s+(?:and\s+)?tags\s|\.|\n|,|$)/i);
	if (categoryMatch && categoryMatch[1]) {
		return categoryMatch[1].trim();
	}

	// Pattern 3: Fallback - "category value" at end of prompt
	categoryMatch = prompt.match(/category\s+([A-Za-z0-9\s&-]+?)$/i);
	if (categoryMatch && categoryMatch[1]) {
		return categoryMatch[1].trim();
	}

	return null;
};

/**
 * Extract tags from prompt if mentioned
 * Handles multiple formats:
 * - "tags: tag1, tag2"
 * - "tags should be tag1 and tag2"
 * - "tags winter26"
 * - "and tags winter26" (after category)
 * - "tags: tag1, tag2, tag3"
 */
const extractTagsFromPrompt = (prompt) => {
	if (!prompt) return [];

	let tagsMatch;

	// Pattern 1: "tags: value" or "tags should be value" (most specific)
	tagsMatch = prompt.match(/tags\s*(?:should\s*)?(?:be\s*)?:?\s*([A-Za-z0-9\s,&-]+?)(?=\.|\n|$)/i);
	if (tagsMatch && tagsMatch[1]) {
		const tagString = tagsMatch[1].trim();
		const tags = tagString
			.split(/[,&]|and/)
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0 && tag.toLowerCase() !== 'category');
		return tags.length > 0 ? tags : [];
	}

	// Pattern 2: "and tags value" (after category)
	tagsMatch = prompt.match(/and\s+tags\s+([A-Za-z0-9\s,&-]+?)(?=\.|\n|$)/i);
	if (tagsMatch && tagsMatch[1]) {
		const tagString = tagsMatch[1].trim();
		const tags = tagString
			.split(/[,&]|and/)
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0 && tag.toLowerCase() !== 'category');
		return tags.length > 0 ? tags : [];
	}

	// Pattern 3: "tags value" at end of prompt
	tagsMatch = prompt.match(/tags\s+([A-Za-z0-9\s,&-]+?)$/i);
	if (tagsMatch && tagsMatch[1]) {
		const tagString = tagsMatch[1].trim();
		const tags = tagString
			.split(/[,&]|and/)
			.map(tag => tag.trim())
			.filter(tag => tag.length > 0 && tag.toLowerCase() !== 'category');
		return tags.length > 0 ? tags : [];
	}

	return [];
};

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
		if (res && res.data && res.data.success) {
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
		if (res && res.data && res.data.success) {
			dispatch({
				type: UPDATE_AI_SETTINGS,
				payload: res.data.data,
			});
			return res.data;
		} else {
			throw new Error('Invalid response from server');
		}
	} catch (e) {
		console.error('Error updating AI settings:', e);
		try {
			const response = await makeRequest({
				action: 'betterlinks/admin/update_ai_settings',
				...settings,
			});

			if (response && response.data) {
				dispatch({
					type: UPDATE_AI_SETTINGS,
					payload: response.data,
				});
				return response.data;
			} else {
				throw new Error('Failed to update AI settings via fallback method');
			}
		} catch (fallbackError) {
			console.error('Fallback request also failed:', fallbackError);
			throw fallbackError;
		}
	}
};

/**
 * Process URLs with AI to generate links
 * Uses frontend AI service for better performance and real-time processing
 */
export const process_urls_with_ai = (urls, prompt, options = {}, aiSettings = {}) => async (dispatch, getState) => {
	try {
		// Get AI settings from state if not provided
		const state = getState();
		const settings = aiSettings.ai_provider ? aiSettings : state.ai?.settings || {};

		const provider = settings.ai_provider || 'openai';
		const apiKey = provider === 'openai' ? settings.openai_api_key : settings.gemini_api_key;
		const model = provider === 'openai' ? settings.openai_model : settings.gemini_model;

		if (!apiKey) {
			throw new Error('API key not configured for selected provider');
		}

		// Extract category and tags from prompt if mentioned
		const promptCategory = extractCategoryFromPrompt(prompt);
		const promptTags = extractTagsFromPrompt(prompt);

		dispatch({
			type: SET_AI_PROCESSING,
			payload: {
				isProcessing: true,
				currentIndex: 0,
				totalUrls: urls.length,
			},
		});

		const allGeneratedLinks = [];

		// Batch URLs for efficient API processing
		// Reduce batch size to handle large numbers of URLs better
		const BATCH_SIZE = 10;
		const batches = [];

		for (let i = 0; i < urls.length; i += BATCH_SIZE) {
			batches.push(urls.slice(i, i + BATCH_SIZE));
		}

		// Fetch content for all URLs first
		const urlsContentMap = {};
		for (const url of urls) {
			try {
				const contentRes = await API.post(namespace + 'fetch-url-content', {
					url: url,
				});
				urlsContentMap[url] = (contentRes && contentRes.data && contentRes.data.success)
					? contentRes.data.data
					: { title: '', description: '' };
			} catch (contentError) {
				console.error(`Error fetching content for URL ${url}:`, contentError);
				urlsContentMap[url] = { title: '', description: '' };
			}
		}

		// Process each batch with a single API call
		for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
			const batch = batches[batchIndex];

			// Update progress
			dispatch({
				type: SET_AI_PROCESSING,
				payload: {
					isProcessing: true,
					currentIndex: Math.min((batchIndex + 1) * BATCH_SIZE, urls.length),
					totalUrls: urls.length,
				},
			});

			// Prepare batch data for bulk API call
			const batchData = batch.map(url => ({
				url: url,
				content: urlsContentMap[url],
			}));

			// Generate links for entire batch with single API call
			const batchResults = await AILinkGenerator.generateBulkLinks(
				provider,
				apiKey,
				batchData,
				prompt,
				null, // fieldLimits
				model
			);

			// Process batch results
			if (batchResults.success && Array.isArray(batchResults.data)) {
				for (const aiResult of batchResults.data) {
					const currentUrl = aiResult.url;

					// Create settings object for URL generation
					const urlSettings = {
						url_slug_generation_type: options.short_url_strategy || 'from_title',
						prefix: '', // No prefix for AI generated links
					};

					// Generate short URL based on selected strategy
					let shortUrl;
					const strategy = options.short_url_strategy || 'from_title';
					if (strategy === 'from_title') {
					   // For 'from_title', use the AI-generated title and set isInitialGeneration to false
					   shortUrl = generateShortURL(urlSettings, aiResult.title, currentUrl, false);
					} else if (strategy === 'from_url') {
					   // For 'from_url', use the target URL and set isInitialGeneration to false
					   shortUrl = generateShortURL(urlSettings, '', currentUrl, false);
					} else {
					   // For other strategies, keep current logic
					   shortUrl = generateShortURL(urlSettings, aiResult.title, currentUrl, true);
					}

					// Smart Category Assignment Logic
					let finalCategory = '';
					let finalCatId = '';

					// Approach 2: User selected existing category
					if (options.selected_category && options.selected_category !== 'ai_generated') {
						finalCategory = options.selected_category;
						finalCatId = options.selected_category;
					}
					// Approach 3: Category mentioned in prompt
					else if (promptCategory) {
						finalCategory = promptCategory;
					}
					// Approach 1: AI Generated Category (from AI response)
					else if (aiResult.category) {
						finalCategory = aiResult.category;
					}

					// Smart Tags Assignment Logic
					let finalTags = [];

					// Priority 1: User specified tags in prompt
					if (promptTags && promptTags.length > 0) {
						finalTags = promptTags;
					}
					// Priority 2: AI Generated tags (from AI response) - default 1 tag only
					else if (aiResult.tags && Array.isArray(aiResult.tags) && aiResult.tags.length > 0) {
						// By default, use only the first tag (AI generates 1 tag by default)
						finalTags = [aiResult.tags[0]];
					}

					// Combine AI-generated data with options to create full link object
					const linkData = {
						link_title: aiResult.title,
						link_note: aiResult.description,
						meta_title: aiResult.meta_title,
						meta_description: aiResult.meta_description,
						target_url: currentUrl,
						short_url: shortUrl,
						redirect_type: options.redirect_type || '302',
						nofollow: options.nofollow || 1,
						sponsored: options.sponsored || '',
						track_me: options.track_me || 1,
						param_forwarding: options.param_forwarding || '',
						category: finalCategory,
						tags: finalTags,
						cat_id: finalCatId,
						suggested_tags: finalTags,
						short_url_strategy: options.short_url_strategy || 'from_title',
						enable_description: options.enable_description !== false,
						enable_ai_category: options.enable_ai_category !== false,
						enable_ai_tag: options.enable_ai_tag !== false,
						enable_customize_preview: options.enable_customize_preview !== false,
						selected_category: options.selected_category || '',
					};

					allGeneratedLinks.push(linkData);
				}
			} else {
				console.error(`Error generating links for batch ${batchIndex + 1}:`, batchResults.error);
			}
		}

		// All URLs processed successfully
		dispatch({
			type: SET_AI_GENERATED_LINKS,
			payload: allGeneratedLinks,
		});

		dispatch({
			type: SET_AI_PROCESSING,
			payload: {
				isProcessing: false,
				currentIndex: urls.length,
				totalUrls: urls.length,
			},
		});

		return { success: true, data: allGeneratedLinks };
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
		// Validate links before sending
		if (!links || links.length === 0) {
			throw new Error('No links to publish');
		}

		// Ensure all links have required fields
		const validatedLinks = links.map(link => ({
			link_title: link.link_title || '',
			link_note: link.link_note || '',
			target_url: link.target_url || '',
			short_url: link.short_url || '',
			redirect_type: link.redirect_type || '307',
			nofollow: link.nofollow || 1,
			sponsored: link.sponsored || '',
			track_me: link.track_me || 1,
			param_forwarding: link.param_forwarding || '',
			category: link.category || '',
			tags: link.tags || [],
			cat_id: link.cat_id || '',
			suggested_tags: link.suggested_tags || [],
			meta_title: link.meta_title || '',
			meta_description: link.meta_description || '',
			enable_customize_preview: link.enable_customize_preview !== false,
		}));

		// Send links directly, not wrapped in params
		const res = await API.post(namespace + 'ai-publish-links', {
			links: validatedLinks,
		});

		if (res && res.data && res.data.success) {
			dispatch({
				type: RESET_AI_STATE,
			});

			// Refresh the links list to show newly published links
			// Import and call the actual fetch_links_data action
			const { fetch_links_data } = await import('./links.actions');
			dispatch(fetch_links_data());

			// Also refresh terms data to include any newly created categories/tags
			// Import and call the fetch_terms_data action
			const { fetch_terms_data } = await import('./terms.actions');
			dispatch(fetch_terms_data());

			return res.data;
		} else {
			// If the response doesn't have the expected structure, throw an error
			throw new Error('Invalid response from server');
		}
	} catch (e) {
		console.error('Error publishing links:', e);
		try {
			const response = await makeRequest({
				action: 'betterlinks/admin/publish_ai_links',
				links: JSON.stringify(links),
			});

			if (response && response.data) {
				dispatch({
					type: RESET_AI_STATE,
				});

				// Refresh the links list to show newly published links
				const { fetch_links_data } = await import('./links.actions');
				dispatch(fetch_links_data());

				// Also refresh terms data to include any newly created categories/tags
				const { fetch_terms_data } = await import('./terms.actions');
				dispatch(fetch_terms_data());

				// Return the response data to match the success path
				return response.data;
			} else {
				// If fallback also fails, throw an error
				throw new Error('Failed to publish links via fallback method');
			}
		} catch (fallbackError) {
			console.error('Fallback request also failed:', fallbackError);
			// Re-throw the error so the component can handle it
			throw fallbackError;
		}
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

