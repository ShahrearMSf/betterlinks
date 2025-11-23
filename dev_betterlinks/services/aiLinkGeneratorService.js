/**
 * AI Link Generator Service
 * Handles API calls to OpenAI and Gemini APIs for generating short link data
 */

import { extractFieldLimits, formatLimitsForAI, formatLimitsForJSON } from 'utils/FieldLimitsExtractor';



/**
 * Build bulk prompts for multiple URLs
 * For batch processing
 */
const buildBulkPrompts = (urlsData, prompt, fieldLimits = null) => {
	// Extract field limits from prompt if not provided
	const limits = fieldLimits || extractFieldLimits(prompt);
	const limitsFormatted = formatLimitsForAI(limits, true); // With "max" prefix
	const limitsJSON = formatLimitsForJSON(limits);

	// Format URLs data for bulk processing
	const urlsList = urlsData.map((item, index) => `
	${index + 1}. URL: ${item.url}
	Content Title: ${item.content.title}
	Content Description: ${item.content.description}`).join('');

		const systemPrompt = `You are an expert at creating SEO-optimized short URLs and metadata.
	Generate a JSON array response with the following structure for each URL:
	[
	{
		"url": "original_url",
		"title": "SEO-friendly title (${limitsJSON.title})",
		"description": "Compelling description (${limitsJSON.description})",
		"meta_title": "Meta title for social sharing (${limitsJSON.meta_title})",
		"meta_description": "Meta description (${limitsJSON.meta_description})",
		"category": "Single category name based on content (e.g., 'Technology', 'Business', 'Health')",
		"tags": ["tag1"]
	}
	]

	IMPORTANT: Respect the limits specified above. Generate content that fits within the specified character or word limits for ALL URLs.`;

		const userPrompt = `Generate optimized metadata for the following ${urlsData.length} URLs:
	${urlsList}

	User Prompt: ${prompt}

	For each URL, generate:
	1. SEO-friendly ${limitsFormatted.split(',')[0]}
	2. Compelling ${limitsFormatted.split(',')[1]}
	3. Meta ${limitsFormatted.split(',')[2]}
	4. Meta ${limitsFormatted.split(',')[3]}
	5. A single category name based on the content
	6. Exactly 1 relevant tag as an array (e.g., ["Technology"])

	Return a JSON array with results for all URLs in the same order as provided.
	Remember: Strictly adhere to the character/word limits specified above for ALL URLs.`;

	return { systemPrompt, userPrompt };
};



/**
 * Call OpenAI API for bulk URLs (batch processing)
 */
export const generateBulkWithOpenAI = async (apiKey, urlsData, prompt, fieldLimits = null) => {
	try {
		const { systemPrompt, userPrompt } = buildBulkPrompts(urlsData, prompt, fieldLimits);

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: 'gpt-4o-mini',
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: userPrompt },
				],
				temperature: 0.7,
				max_tokens: 2000,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || 'OpenAI API error');
		}

		const data = await response.json();
		const content_text = data.choices[0].message.content;

		// Parse JSON array from response
		const jsonMatch = content_text.match(/\[[\s\S]*\]/);
		if (!jsonMatch) {
			throw new Error('Invalid JSON array response from OpenAI');
		}

		return JSON.parse(jsonMatch[0]);
	} catch (error) {
		console.error('OpenAI Bulk API error:', error);
		throw error;
	}
};

/**
 * Call Gemini API for bulk URLs (batch processing)
 */
export const generateBulkWithGemini = async (apiKey, urlsData, prompt, fieldLimits = null) => {
	try {
		const { systemPrompt, userPrompt } = buildBulkPrompts(urlsData, prompt, fieldLimits);

		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{ text: systemPrompt },
								{ text: userPrompt },
							],
						},
					],
				}),
			}
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.error?.message || 'Gemini API error');
		}

		const data = await response.json();
		const content_text = data.candidates[0].content.parts[0].text;

		// Parse JSON array from response
		const jsonMatch = content_text.match(/\[[\s\S]*\]/);
		if (!jsonMatch) {
			throw new Error('Invalid JSON array response from Gemini');
		}

		return JSON.parse(jsonMatch[0]);
	} catch (error) {
		console.error('Gemini Bulk API error:', error);
		throw error;
	}
};

/**
 * Generate link data for multiple URLs using the appropriate AI provider
 * Batch processing to reduce API calls (single API call for multiple URLs)
 * This is the primary export - use this for all AI link generation
 */
export const generateBulkLinkData = async (provider, apiKey, urlsData, prompt, fieldLimits = null) => {
	if (provider === 'openai') {
		return await generateBulkWithOpenAI(apiKey, urlsData, prompt, fieldLimits);
	} else if (provider === 'gemini') {
		return await generateBulkWithGemini(apiKey, urlsData, prompt, fieldLimits);
	} else {
		throw new Error(`Unknown AI provider: ${provider}`);
	}
};

