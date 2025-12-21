/**
 * Field Limits Extractor Utility
 * Extracts field limits (characters, words) from user prompts
 * Supports various formats: "max 60 characters", "max 16 words", "max 60 chars", etc.
 */

/**
 * Extract limit value from text
 * Supports formats like: "max 60 characters", "max 16 words", "60 chars", "16 words", etc.
 * @param {string} text - Text to extract limit from
 * @returns {object} - { value: number, type: 'characters'|'words' } or null
 */
const extractLimitValue = (text) => {
	if (!text) return null;

	// Pattern: "max 60 characters" or "60 characters" or "60 chars" or "60 char"
	const charMatch = text.match(/(?:max\s+)?(\d+)\s*(?:character|char)s?/i);
	if (charMatch) {
		return { value: parseInt(charMatch[1]), type: 'characters' };
	}

	// Pattern: "max 16 words" or "16 words" or "16 word"
	const wordMatch = text.match(/(?:max\s+)?(\d+)\s*words?/i);
	if (wordMatch) {
		return { value: parseInt(wordMatch[1]), type: 'words' };
	}

	return null;
};

/**
 * Extract field limits from prompt
 * Looks for patterns like:
 * - "title max 60 characters"
 * - "description max 16 words"
 * - "meta_title max 60 chars"
 * - "meta_description max 160 characters"
 * @param {string} prompt - User prompt
 * @returns {object} - Field limits with defaults
 */
export const extractFieldLimits = (prompt) => {
	const defaults = {
		title: { value: 60, type: 'characters' },
		description: { value: 160, type: 'characters' },
		meta_title: { value: 60, type: 'characters' },
		meta_description: { value: 160, type: 'characters' },
	};

	if (!prompt) return defaults;

	// Extract title limit
	const titleMatch = prompt.match(/title\s+([^.]*?(?:character|char|word)s?)/i);
	if (titleMatch) {
		const limit = extractLimitValue(titleMatch[1]);
		if (limit) defaults.title = limit;
	}

	// Extract description limit
	const descMatch = prompt.match(/description\s+([^.]*?(?:character|char|word)s?)/i);
	if (descMatch) {
		const limit = extractLimitValue(descMatch[1]);
		if (limit) defaults.description = limit;
	}

	// Extract meta_title limit
	const metaTitleMatch = prompt.match(/meta\s*[_-]?title\s+([^.]*?(?:character|char|word)s?)/i);
	if (metaTitleMatch) {
		const limit = extractLimitValue(metaTitleMatch[1]);
		if (limit) defaults.meta_title = limit;
	}

	// Extract meta_description limit
	const metaDescMatch = prompt.match(/meta\s*[_-]?description\s+([^.]*?(?:character|char|word)s?)/i);
	if (metaDescMatch) {
		const limit = extractLimitValue(metaDescMatch[1]);
		if (limit) defaults.meta_description = limit;
	}

	return defaults;
};

/**
 * Format field limits for AI prompt
 * Converts extracted limits into human-readable format for AI
 * Supports both "max X characters" and "X characters" styles
 * @param {object} limits - Field limits object
 * @param {boolean} useMaxPrefix - Whether to use "max" prefix (default: true)
 * @returns {string} - Formatted string for AI prompt
 */
export const formatLimitsForAI = (limits, useMaxPrefix = true) => {
	const parts = [];
	const prefix = useMaxPrefix ? 'max ' : '';

	if (limits.title) {
		const type = limits.title.type === 'words' ? 'words' : 'characters';
		parts.push(`title (${prefix}${limits.title.value} ${type})`);
	}

	if (limits.description) {
		const type = limits.description.type === 'words' ? 'words' : 'characters';
		parts.push(`description (${prefix}${limits.description.value} ${type})`);
	}

	if (limits.meta_title) {
		const type = limits.meta_title.type === 'words' ? 'words' : 'characters';
		parts.push(`meta title (${prefix}${limits.meta_title.value} ${type})`);
	}

	if (limits.meta_description) {
		const type = limits.meta_description.type === 'words' ? 'words' : 'characters';
		parts.push(`meta description (${prefix}${limits.meta_description.value} ${type})`);
	}

	return parts.join(', ');
};

/**
 * Format limits for JSON structure in AI prompt
 * Creates a more flexible format that works with both styles
 * @param {object} limits - Field limits object
 * @returns {object} - Object with formatted limit strings
 */
export const formatLimitsForJSON = (limits) => {
	return {
		title: `${limits.title.value} ${limits.title.type}`,
		description: `${limits.description.value} ${limits.description.type}`,
		meta_title: `${limits.meta_title.value} ${limits.meta_title.type}`,
		meta_description: `${limits.meta_description.value} ${limits.meta_description.type}`,
	};
};

/**
 * Validate field against limit
 * @param {string} field - Field value to validate
 * @param {object} limit - Limit object { value: number, type: 'characters'|'words' }
 * @returns {boolean} - True if field is within limit
 */
export const validateFieldLimit = (field, limit) => {
	if (!field || !limit) return true;

	if (limit.type === 'words') {
		const wordCount = field.trim().split(/\s+/).length;
		return wordCount <= limit.value;
	} else {
		return field.length <= limit.value;
	}
};

