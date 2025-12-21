import { generateBulkLinkData } from '../../services/aiLinkGeneratorService';
import { extractFieldLimits } from '../../utils/FieldLimitsExtractor';

/**
 * AILinkGenerator Component
 * Handles AI-powered generation of link metadata from URLs
 * Uses bulk API processing for efficiency (single API call for multiple URLs)
 */
const AILinkGenerator = {
	/**
	 * Fetch URL content (title, description)
	 */
	fetchUrlContent: async (url) => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'no-cors',
			});

			// Since we're using no-cors, we can't read the response body directly
			// We'll use a CORS proxy or backend endpoint instead
			return null;
		} catch (error) {
			console.error('Error fetching URL content:', error);
			return null;
		}
	},

	/**
	 * Generate multiple links using bulk API (single API call for multiple URLs)
	 * More efficient for paid APIs - reduces API calls significantly
	 * @param {string} provider - 'openai' or 'gemini'
	 * @param {string} apiKey - API key for the provider
	 * @param {array} batchData - Array of {url, content} objects
	 * @param {string} prompt - User prompt for AI
	 * @param {object} fieldLimits - Optional field limits (extracted from prompt if not provided)
	 * @returns {object} {success: boolean, data: array, error: string}
	 */
	generateBulkLinks: async (provider, apiKey, batchData, prompt, fieldLimits = null) => {
		try {
			if (!apiKey || !apiKey.trim()) {
				throw new Error('API key is required');
			}

			if (!batchData || !Array.isArray(batchData) || batchData.length === 0) {
				throw new Error('Batch data is required');
			}

			if (!prompt || !prompt.trim()) {
				throw new Error('Prompt is required');
			}

			// Extract field limits from prompt if not provided
			const limits = fieldLimits || extractFieldLimits(prompt);

			// Call the bulk AI service
			const generatedData = await generateBulkLinkData(
				provider,
				apiKey,
				batchData,
				prompt,
				limits
			);

			// Map results to include URL for each result
			const results = Array.isArray(generatedData) ? generatedData : [];

			return {
				success: true,
				data: results,
			};
		} catch (error) {
			console.error('Error generating bulk links:', error);
			return {
				success: false,
				error: error.message,
				data: [],
			};
		}
	},
};

export default AILinkGenerator;

