/**
 * AI Link Generator Service
 * Handles API calls to OpenAI and Gemini APIs for generating short link data
 *
 * Smart Category & Tags Detection:
 * - AI intelligently detects category and tags from user prompt
 * - If user mentions category/tags in prompt, AI applies them to ALL URLs
 * - If user doesn't mention them, AI generates unique ones per URL based on content
 * - No regex pattern matching - AI handles natural language detection
 */

import { extractFieldLimits, formatLimitsForAI, formatLimitsForJSON } from 'utils/FieldLimitsExtractor';

/**
 * Build bulk prompts for multiple URLs
 * For batch processing with smart category and tags detection
 *
 * The AI will:
 * 1. Analyze the user prompt for any category/tags mentions
 * 2. If found, apply them to ALL URLs consistently
 * 3. If not found, generate unique category/tags per URL based on content
 * 4. Return JSON with all required fields including category and tags array
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

IMPORTANT INSTRUCTIONS FOR CATEGORY AND TAGS EXTRACTION:
1. Carefully analyze the user prompt for any mentions of category or tags
2. When extracting category, REMOVE connector words like "is", "should be", "are", "be", "as", "for"
   - "category is Winter tech" → extract "Winter tech" (NOT "is Winter tech")
   - "category should be Business" → extract "Business" (NOT "should be Business")
   - "category: Technology" → extract "Technology"
   - "category Winter tech" → extract "Winter tech"
   - "category [Winter tech]" → extract "Winter tech"
3. When extracting tags, REMOVE connector words like "should be", "are", "and", "or"
   - "tags should be AI, ML" → extract ["AI", "ML"]
   - "tags: AI, ML, Innovation" → extract ["AI", "ML", "Innovation"]
   - "tags AI and ML" → extract ["AI", "ML"]
4. Use EXACTLY the extracted category/tags for ALL URLs without modification
5. If the user does NOT mention category/tags, generate appropriate ones based on each URL's content
6. Category should be a single string value (trimmed, no extra words)
7. Tags should ALWAYS be an array, even if it contains only one tag

Generate a JSON array response with the following structure for each URL:
[
{
	"url": "original_url",
	"title": "SEO-friendly title (${limitsJSON.title})",
	"description": "Compelling description (${limitsJSON.description})",
	"meta_title": "Meta title for social sharing (${limitsJSON.meta_title})",
	"meta_description": "Meta description (${limitsJSON.meta_description})",
	"category": "Category name (either from user prompt or generated from content)",
	"tags": ["tag1", "tag2", "tag3"]
}
]

CRITICAL RULES:
- Respect the limits specified above. Generate content that fits within the specified character or word limits for ALL URLs.
- If user specifies category/tags in their prompt, use EXACTLY those values for ALL URLs without modification
- If user does NOT specify category/tags, generate unique ones per URL based on content
- Tags must ALWAYS be an array format, never a string
- IMPORTANT: Extract only the actual category/tags value, removing connector words like "is", "should be", "are"
- Return ONLY valid JSON array, no additional text`;

	const userPrompt = `Generate optimized metadata for the following ${urlsData.length} URLs:
${urlsList}

User Prompt: ${prompt}

For each URL, generate:
1. SEO-friendly ${limitsFormatted.split(',')[0]}
2. Compelling ${limitsFormatted.split(',')[1]}
3. Meta ${limitsFormatted.split(',')[2]}
4. Meta ${limitsFormatted.split(',')[3]}
5. Category (check if user mentioned it in their prompt - if yes, extract ONLY the category value removing connector words; if no, generate from content)
6. Tags array (check if user mentioned tags in their prompt - if yes, extract ONLY the tag values removing connector words; if no, generate 1-3 tags from content)

IMPORTANT NOTES ON EXTRACTION:
- Analyze the user prompt carefully for any category or tags mentions
- User might mention category/tags in various formats:
  * "category: Tech" → extract "Tech"
  * "category should be Business" → extract "Business" (NOT "should be Business")
  * "category is Winter Tech" → extract "Winter Tech" (NOT "is Winter Tech")
  * "category Winter Tech" → extract "Winter Tech"
  * "category [Winter Tech]" → extract "Winter Tech"
  * "tags: AI, ML" → extract ["AI", "ML"]
  * "tags should be tutorial and guide" → extract ["tutorial", "guide"] (NOT "should be tutorial and guide")
  * "tags AI and ML" → extract ["AI", "ML"]
- CRITICAL: Remove connector words like "is", "should be", "are", "be", "as", "for", "and", "or" when extracting
- If user specifies category/tags, apply them to ALL URLs consistently
- If user doesn't specify, generate unique category/tags per URL based on its content
- Tags must always be an array format

Return a JSON array with results for all URLs in the same order as provided.
Remember:
- Strictly adhere to the character/word limits specified above for ALL URLs
- Extract category/tags values cleanly without connector words
- Return ONLY valid JSON array, no markdown formatting or additional text`;

	return { systemPrompt, userPrompt };
};



/**
 * Call OpenAI API for bulk URLs (batch processing)
 */
export const generateBulkWithOpenAI = async (apiKey, urlsData, prompt, fieldLimits = null, model = 'gpt-4o-mini') => {
	try {
		const { systemPrompt, userPrompt } = buildBulkPrompts(urlsData, prompt, fieldLimits);

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				model: model,
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
			console.error('OpenAI response content:', content_text);
			throw new Error('Invalid JSON array response from OpenAI');
		}

		const parsedResults = JSON.parse(jsonMatch[0]);

		return parsedResults;
	} catch (error) {
		console.error('OpenAI Bulk API error:', error);
		throw error;
	}
};

/**
 * Call Gemini API for bulk URLs (batch processing)
 */
export const generateBulkWithGemini = async (apiKey, urlsData, prompt, fieldLimits = null, model = 'gemini-2.0-flash') => {
	try {
		const { systemPrompt, userPrompt } = buildBulkPrompts(urlsData, prompt, fieldLimits);

		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
			console.error('Gemini response content:', content_text);
			throw new Error('Invalid JSON array response from Gemini');
		}

		const parsedResults = JSON.parse(jsonMatch[0]);
		return parsedResults;
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
export const generateBulkLinkData = async (provider, apiKey, urlsData, prompt, fieldLimits = null, model = null) => {
	if (provider === 'openai') {
		const openaiModel = model || 'gpt-4o-mini';
		return await generateBulkWithOpenAI(apiKey, urlsData, prompt, fieldLimits, openaiModel);
	} else if (provider === 'gemini') {
		const geminiModel = model || 'gemini-2.5-flash';
		return await generateBulkWithGemini(apiKey, urlsData, prompt, fieldLimits, geminiModel);
	} else {
		throw new Error(`Unknown AI provider: ${provider}`);
	}
};

