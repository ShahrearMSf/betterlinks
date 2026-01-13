import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import _, { unset } from 'lodash';
import clipboardCopy from 'clipboard-copy';
import ProBadge from 'components/Badge/ProBadge';
import { Badge, Tooltip } from '@material-ui/core';
import { useState } from 'react';

export const {
	betterlinks_nonce,
	nonce,
	rest_url,
	ajaxurl,
	namespace,
	plugin_root_url,
	plugin_root_path,
	site_url,
	actual_site_url,
	route_path,
	exists_links_json,
	exists_clicks_json,
	page,
	is_pro_enabled,
	post_type,
	// betterlinks_links_option,
	betterlinkspro_version,
	is_extra_data_tracking_compatible,
	menu_notice,
	betterlinks_auth,
	betterlinks_date_format,
	betterlinks_custom_domain_menu,
	betterlinks_settings,
	is_fbs_enabled,
	prefix,
	betterlinks_quick_setup_step = false,
	migratable_plugins = {
		simple301redirects: false,
		thirstyaffliates: false,
		prettylinks: false,
	},
} = window.betterLinksGlobal;

export const API = axios.create({
	baseURL: rest_url,
	headers: {
		'content-type': 'application/json',
		'X-WP-Nonce': nonce,
	},
});
export const reorder = (list, startIndex, endIndex) => {
	let result = [];
	if (startIndex == endIndex) {
		result = list;
	} else {
		result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);
	}

	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/links_reorder');
	form_data.append('security', betterlinks_nonce);
	form_data.append(
		'links',
		result.reduce(function (pV, cV, cI) {
			if (cV.ID) {
				pV.push(cV.ID);
			}
			return pV;
		}, [])
	);
	axios.post(ajaxurl, form_data).then(
		(response) => { },
		(error) => {
			console.log(error);
		}
	);

	return result;
};
export const deleteClicks = (daysOlderThan = false, from = formatDate(subDays(new Date(), 30), 'yyyy-mm-dd'), to = formatDate(new Date(), 'yyyy-mm-dd'), linkId = null) => {
	const form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/reset_analytics');
	form_data.append('security', betterlinks_nonce);
	if (daysOlderThan !== false) {
		form_data.append('days_older_than', daysOlderThan);
	}
	form_data.append('from', from);
	form_data.append('to', to);
	if (linkId !== null) {
		form_data.append('link_id', linkId);
	}
	return axios.post(ajaxurl, form_data).then(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error);
			return error;
		}
	);
};
export const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	const newItemForDest = {
		...removed,
		cat_id: `${droppableDestination.droppableId}`,
	};

	destClone.splice(droppableDestination.index, 0, newItemForDest);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/links_move_reorder');
	form_data.append('security', betterlinks_nonce);
	form_data.append(
		'source',
		sourceClone.reduce(function (pV, cV, cI) {
			if (cV.ID) {
				pV.push(cV.ID);
			}
			return pV;
		}, [])
	);
	form_data.append(
		'destination',
		destClone.reduce(function (pV, cV, cI) {
			if (cV.ID) {
				pV.push(cV.ID);
			}
			return pV;
		}, [])
	);
	axios.post(ajaxurl, form_data).then(
		(response) => { },
		(error) => {
			console.log(error);
		}
	);

	return result;
};

export const generateSlug = (value) => {
	return value
		.trim()
		.toLowerCase()
		.replace(/-+/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
};

export const generateTitleToSlug = (value) => {
	return value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-/-]/g, '');
};

export const generateShortURL = (settings, title, targetUrl, isInitialGeneration = false) => {
	if (settings) {
		let shortURL = settings.prefix && settings.prefix.length > 0 ? settings.prefix + '/' : '';

		// Handle new URL generation types
		if (settings.url_slug_generation_type) {
			switch (settings.url_slug_generation_type) {
				case 'random_string':
					// Only generate random slug on initial generation, not on title/url changes
					return isInitialGeneration ? shortURL + generateRandomString() : null;
				case 'random_number':
					// Only generate random slug on initial generation, not on title/url changes
					return isInitialGeneration ? shortURL + generateRandomNumber() : null;
				case 'random_mixed':
					// Only generate random slug on initial generation, not on title/url changes
					return isInitialGeneration ? shortURL + generateRandomMixed() : null;
				case 'from_title':
					// Return empty slug for initial generation, generate from title when title is provided
					if (isInitialGeneration) return shortURL;
					return title ? shortURL + generateFromTitle(title) : null;
				case 'from_url':
					// Return empty slug for initial generation, generate from URL when URL is provided
					if (isInitialGeneration) return shortURL;
					return targetUrl ? shortURL + generateFromUrl(targetUrl) : null;
				default:
					return isInitialGeneration ? shortURL + generateRandomMixed() : null;
			}
		}

		// Legacy support for old is_random_string setting
		// This ensures backward compatibility for existing users
		if (settings.hasOwnProperty('is_random_string')) {
			if (settings.is_random_string) {
				// Old behavior: random_string now maps to random_number
				return isInitialGeneration ? shortURL + generateRandomNumber() : null;
			}
			if (!settings.is_random_string) {
				// Old behavior: not random_string now maps to from_title
				if (isInitialGeneration) return shortURL;
				return title ? shortURL + generateTitleToSlug(title) : null;
			}
		}

		// Default fallback
		return isInitialGeneration ? shortURL + generateRandomMixed() : null;
	}
	return '';
};

export const generateRandomSlug = (length = 3) => {
	return Math.random().toString(20).substr(2, length) + new Date().getMilliseconds();
};

// New URL generation functions
export const generateRandomString = (length = Math.floor(Math.random() * 5) + 6) => {
	const chars = 'abcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const generateRandomNumber = (length = Math.floor(Math.random() * 5) + 6) => {
	const chars = '0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const generateRandomMixed = (length = Math.floor(Math.random() * 5) + 6) => {
	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	for (let i = 0; i < length; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
};

export const generateFromTitle = (title) => {
	if (!title) return generateRandomMixed();

	// Clean and process the title to create a user-friendly slug
	let slug = title
		.trim()
		.toLowerCase()
		// Remove common stop words for better readability
		.replace(/\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|from|up|about|into|through|during|before|after|above|below|between|among|against|across|toward|towards|under|over)\b/gi, '')
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

	// Split into words and keep the most meaningful ones
	let words = slug.split('-').filter(word => word.length > 0);

	// Allow 3-4 meaningful words for better readability
	if (words.length > 4) {
		// Keep first 4 words, but prefer longer/more meaningful words
		words = words
			.sort((a, b) => b.length - a.length) // Sort by length (longer words first)
			.slice(0, 4) // Take top 4 words
			.sort((a, b) => title.toLowerCase().indexOf(a) - title.toLowerCase().indexOf(b)); // Restore original order
	}

	slug = words.join('-');

	// If still too long (over 25 chars), intelligently truncate
	if (slug.length > 25) {
		// Try to keep first 3 words
		if (words.length > 3) {
			words = words.slice(0, 3);
			slug = words.join('-');
		}

		// If still too long, truncate but try to end at a word boundary
		if (slug.length > 20) {
			let truncated = slug.substring(0, 18);
			let lastDash = truncated.lastIndexOf('-');
			if (lastDash > 8) {
				slug = truncated.substring(0, lastDash);
			} else {
				slug = truncated;
			}
		}
	}

	// Ensure minimum length of 3 characters for readability
	if (slug.length < 3) {
		// Use first few characters of original title if slug is too short
		let fallback = title
			.toLowerCase()
			.replace(/[^a-z0-9]/g, '')
			.substring(0, 8);
		slug = fallback || generateRandomMixed(6);
	}

	return slug || generateRandomMixed();
};

export const generateFromUrl = (targetUrl) => {
	if (!targetUrl) return generateRandomMixed();

	try {
		const url = new URL(targetUrl);
		let pathParts = url.pathname.split('/').filter(part => part.length > 0);

		let slug = '';

		if (pathParts.length > 0) {
			// Get multiple relevant path segments for better context
			let relevantParts = [];

			// Start from the end and work backwards, skipping pure numbers and very short segments
			for (let i = pathParts.length - 1; i >= 0 && relevantParts.length < 3; i--) {
				let part = pathParts[i];

				// Clean the part first
				let cleanPart = part
					.toLowerCase()
					// Remove common file extensions
					.replace(/\.(html|htm|php|aspx|jsp|cfm|pdf|doc|docx)$/i, '')
					// Remove URL parameters and fragments
					.split('?')[0].split('#')[0]
					// Clean up the slug
					.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
					.replace(/\s+/g, '-') // Replace spaces with hyphens
					.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
					.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

				// Include this part if it's meaningful (not just numbers and longer than 2 chars)
				if (cleanPart.length > 2 && !cleanPart.match(/^\d+$/)) {
					relevantParts.unshift(cleanPart); // Add to beginning to maintain order
				}
			}

			// Join the relevant parts
			if (relevantParts.length > 0) {
				slug = relevantParts.join('-');
			}

			// If no meaningful parts found, use the last segment anyway
			if (!slug && pathParts.length > 0) {
				slug = pathParts[pathParts.length - 1]
					.toLowerCase()
					.replace(/\.(html|htm|php|aspx|jsp|cfm)$/i, '')
					.split('?')[0].split('#')[0]
					.replace(/[^a-z0-9\s-]/g, '')
					.replace(/\s+/g, '-')
					.replace(/-+/g, '-')
					.replace(/^-|-$/g, '');
			}
		} else {
			// If no meaningful path, generate from domain name
			let domainParts = url.hostname
				.replace(/^www\./, '') // Remove www prefix
				.split('.');

			// Use the main domain part (usually the first part before TLD)
			slug = domainParts[0]
				.toLowerCase()
				.replace(/[^a-z0-9-]/g, '') // Remove special characters except hyphens
				.replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
				.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
		}

		// Remove common stop words for better readability
		slug = slug.replace(/\b(page|post|article|blog|news|category|tag|product|item|detail|view|show|index|home|main|default)\b/gi, '')
			.replace(/-+/g, '-') // Clean up multiple hyphens
			.replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

		// Intelligent truncation for better readability - allow up to 25 characters
		if (slug.length > 25) {
			// Split by hyphens and try to keep meaningful parts
			let parts = slug.split('-').filter(part => part.length > 0);
			if (parts.length > 3) {
				// Keep first 3 parts
				parts = parts.slice(0, 3);
				slug = parts.join('-');
			} else if (slug.length > 20) {
				// Truncate but try to end at a word boundary
				let truncated = slug.substring(0, 18);
				let lastDash = truncated.lastIndexOf('-');
				if (lastDash > 8) {
					slug = truncated.substring(0, lastDash);
				} else {
					slug = truncated;
				}
			}
		}

		// Ensure minimum length for readability
		if (slug.length < 3) {
			// Fallback to a portion of the domain name
			let fallback = url.hostname
				.replace(/^www\./, '')
				.replace(/\./g, '')
				.toLowerCase()
				.replace(/[^a-z0-9]/g, '')
				.substring(0, 10);
			slug = fallback || generateRandomMixed();
		}

		return slug || generateRandomMixed();
	} catch (error) {
		// If URL parsing fails, return random mixed
		return generateRandomMixed();
	}
};

export const modalCustomStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '800px',
		marginRight: '-50%',
		transform: 'translate(-50%, -43%)',
		position: 'absolute',
		background: '#ffffff',
		borderRadius: '8px',
	},
};

export const modalCustomSmallStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
		zIndex: '999999',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '600px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export const copyToClipboard = (copyText) => {
	clipboardCopy(copyText);
	return;
};

export const copyShortUrl = (shortUrl) => {
	const URL = makeShortUrl(shortUrl);
	copyToClipboard(URL);
	return URL;
};

export const makeShortUrl = (shortUrl) => {
	const site_link = window?.betterlinksHooks?.applyFilters('site_url', site_url) || localStorage.getItem('btl_custom_domain') || site_url;
	return shortUrl[0] === '/' ? site_link + shortUrl : site_link + '/' + shortUrl;
};

export const getBrowser = (agent) => {
	var browser = '';
	if (/Opera[\/\s](\d+\.\d+)/.test(agent) || 'Opera' == agent) {
		browser = 'opera';
	} else if (/IE (\d+\.\d+);/.test(agent) || 'IE' == agent) {
		browser = 'internet-explorer';
	} else if (/Navigator[\/\s](\d+\.\d+)/.test(agent) || 'Navigator' == agent) {
		browser = 'netscape';
	} else if (/Chrome[\/\s](\d+\.\d+)/.test(agent) || 'Chrome' == agent) {
		browser = 'chrome';
	} else if (/Safari[\/\s](\d+\.\d+)/.test(agent) || 'Safari' == agent) {
		browser = 'safari';
	} else if (/Firefox[\/\s](\d+\.\d+)/.test(agent) || 'Firefox' == agent) {
		browser = 'firefox';
	} else if (/Yandex[\/\s](\d+\.\d+)/.test(agent) || 'Yandex' == agent) {
		browser = 'yandex';
	} else if (/Facebook[\/\s](\d+\.\d+)/.test(agent) || 'Facebook' == agent) {
		browser = 'facebook';
	} else {
		browser = 'web';
	}
	return browser;
};

export const getFlagEmoji = (countryCode) => {
	if (!countryCode || countryCode.length !== 2) return '🌍';

	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map(char => 127397 + char.charCodeAt());

	return String.fromCodePoint(...codePoints);
};

export const formatDate = (date = new Date(), format) => {
	const map = {
		mm: date.getMonth() + 1,
		dd: date.getDate(),
		yyyy: date.getFullYear(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
	};
	return format.replace(/mm|dd|yyyy|h|m|s/gi, (matched) => map[matched]);
};

export const linksFilterData = (stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter, sortByFav, selectedTag) => {
	let results = stored;
	results = stored.filter((item) => {
		const newFilterText = filterText
			.replace(/https?\:\/\//gi, '')
			.replace(/^[\/\\]+|[\/\\]+$/gi, '')
			.toLowerCase();
		const linkTitle = (item?.link_title || '').toLowerCase();
		const linkNote = (item?.link_note || '').toLowerCase();
		const targetUrl = (item?.target_url || '').replace(/https?\:\/\//gi, '').toLowerCase();
		const shortUrl = `${site_url}/${item?.short_url || ''}`.replace(/https?\:\/\//gi, '').toLowerCase();
		const tags_data = item.tags_data || [];
		return [linkTitle, linkNote, shortUrl, targetUrl, tags_data].some((item) => {
			if (Array.isArray(item)) {
				return item.some((tag) => tag?.term_name?.includes(newFilterText));
			}
			return item.includes(newFilterText);
		});
	});
	results = results.sort((a, b) => new Date(b.link_date) - new Date(a.link_date));
	if (selectedCategory && selectedCategory.value) {
		results = results.filter((item) => item.cat_id == selectedCategory.value);
	}
	if (selectedTag && selectedTag.value) {
		let total = [];
		for (let index = 0; index < results.length; index++) {
			const item = results[index];

			for (let jIndex = 0; jIndex < item?.tags_data?.length; jIndex++) {
				const element = item?.tags_data?.[jIndex];

				if (element.term_name === selectedTag.label) {
					total = [...total, item];
				}
			}
		}
		results = total;
	}
	if (selectedClicksType) {
		if (selectedClicksType.value == 'mostClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (parseInt(a.analytic.link_count) < parseInt(b.analytic.link_count) ? 1 : -1));
		}
		if (selectedClicksType.value == 'leastClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (parseInt(a.analytic.link_count) > parseInt(b.analytic.link_count) ? 1 : -1));
		}
		if (selectedClicksType.value == 'mostUniqueClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (a.analytic.ip.length < b.analytic.ip.length ? 1 : -1));
		}
		if (selectedClicksType.value == 'leastUniqueClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (a.analytic.ip.length > b.analytic.ip.length ? 1 : -1));
		}
	}

	if (selectedDateType) {
		if (selectedDateType.value == 'mostRecent') {
			results = results.sort((a, b) => new Date(b.link_date) - new Date(a.link_date));
		}
		if (selectedDateType.value == 'leastRecent') {
			results = results.sort((a, b) => new Date(a.link_date) - new Date(b.link_date));
		}
		if (selectedDateType.value == 'custom') {
			results = results.filter((item) => {
				return new Date(item.link_date).getTime() >= customDateFilter[0].startDate.getTime() && new Date(item.link_date).getTime() <= customDateFilter[0].endDate.getTime();
			});
		}
	}
	if (sortByFav) {
		results = results.filter((item) => item.favorite?.favForAll);
	}
	results = results.filter((item) => item.ID);
	return results;
};

export const insertOverlayElement = () => {
	var newNode = document.createElement('div');
	newNode.className = 'btl-overlay';
	document.body.appendChild(newNode);
};

export const removeOverlayElement = () => {
	var elem = document.querySelector('.btl-overlay');
	elem.parentNode.removeChild(elem);
};

export const delayStatusChanged = (firstStatus, secondStatus, thirdStatus, setState) => {
	if (firstStatus) {
		setState(firstStatus);
	}
	setTimeout(() => {
		if (secondStatus) {
			setState(secondStatus);
		}
		if (thirdStatus) {
			setTimeout(() => {
				setState(thirdStatus);
			}, 3000);
		}
	}, 1000);
};

export const getJsonString = (str) => {
	if (Array.isArray(str) || typeof str == 'object') return str;
	try {
		return JSON.parse(str);
	} catch (e) {
		return {};
	}
};

export const makeRequest = async (payload = {}) => {
	let form_data = new FormData();
	form_data.append('security', betterlinks_nonce);
	Object.entries(payload).forEach(([key, value]) => {
		if (typeof value === 'object' && value !== null) {
			form_data.append(key, JSON.stringify(value));
		} else {
			form_data.append(key, value);
		}
	});
	return await axios.post(ajaxurl, form_data).then(
		(response) => {
			return response;
		},
		(error) => {
			console.log(error);
		}
	);
};

export const getAutoLinksInitialValues = (data, autoLinkKeywordSettings) => {
	// Check if pro version is 2.6.1 or higher
	const canChangeStatus = is_pro_enabled && pro_version_check('2.6.1');
	
	if (Object.keys(data).length) {
		// Convert is_active (boolean/int) to keywordStatus (string)
		let keywordStatus = 'active';
		if (data.is_active !== undefined) {
			keywordStatus = (data.is_active == true || data.is_active == 1 || data.is_active == '1') ? 'active' : 'draft';
		}
		
		// Force active status if pro version requirement is not met
		if (!canChangeStatus) {
			keywordStatus = 'active';
		}
		
		return {
			keywords: data.keywords,
			oldKeywords: data.keywords,
			chooseLink: data.link_id,
			oldChooseLink: data.link_id,
			postType: data.post_type,
			category: data.category,
			tags: data.tags,
			openNewTab: data.open_new_tab,
			useNoFollow: data.use_no_follow,
			caseSensitive: data.case_sensitive,
			keywordBefore: data.keyword_before,
			keywordAfter: data.keyword_after,
			leftBoundary: data.left_boundary,
			rightBoundary: data.right_boundary,
			limit: data.limit,
			keywordStatus: keywordStatus,
		};
	}
	
	// Convert isActive setting to keywordStatus
	let defaultKeywordStatus = 'active';
	if (autoLinkKeywordSettings?.isActive !== undefined && canChangeStatus) {
		defaultKeywordStatus = autoLinkKeywordSettings.isActive ? 'active' : 'draft';
	}
	
	return {
		keywords: '',
		chooseLink: '',
		postType: autoLinkKeywordSettings?.postType || '',
		category: autoLinkKeywordSettings?.category || '',
		tags: autoLinkKeywordSettings?.tags || '',
		openNewTab: autoLinkKeywordSettings?.openNewTab || '',
		useNoFollow: autoLinkKeywordSettings?.useNoFollow || '',
		caseSensitive: autoLinkKeywordSettings?.caseSensitive || '',
		keywordBefore: autoLinkKeywordSettings?.keywordBefore || '',
		keywordAfter: autoLinkKeywordSettings?.keywordAfter || '',
		leftBoundary: autoLinkKeywordSettings?.leftBoundary || '',
		rightBoundary: autoLinkKeywordSettings?.rightBoundary || '',
		limit: autoLinkKeywordSettings?.limit || 100,
		keywordStatus: defaultKeywordStatus,
	};
};

export const trimmed = (str) => (typeof str === 'string' ? str : '').trim();

export const parseLinksForKeywordsListing = (data) =>
	data?.links
		? Object.values(data.links)
			.reduce((acc, curr) => [...acc, ...curr.lists], [])
			.map((item) => ({ value: item.ID, label: item.short_url }))
		: [];

export const parseLinksForUpdateModal = (data) =>
	data.links
		? Object.values(data.links)
			.reduce((acc, curr) => [...acc, ...curr.lists], [])
			.map((item) => ({ value: item.ID, label: item.link_title }))
		: [];

export const makeAllLinksArr = (store) =>
	store?.getState()?.links?.links
		? Object.values(store?.getState()?.links?.links).reduce((acc, curr) => [...acc, ...(curr?.lists || [])], [])
		: // if all links are not fetched properly then return false
		false;

export const makeLinkFormat = ({ url, linkNewTab, sponsored, noFollow, linkId }) => {
	const attributes = { url };
	let rel = '';

	if (linkNewTab) {
		attributes.target = '_blank';
		rel = 'noopener ';
	}

	if (sponsored) {
		rel += 'sponsored ';
	}

	if (noFollow) {
		rel += 'nofollow noindex ';
	}

	if (rel) {
		attributes.rel = rel;
	}

	if (linkId) {
		attributes['data-link-id'] = linkId;
	}

	const result = {
		type: 'betterlinks/link-format',
		attributes,
	};
	return result;
};

export const permalinkToShortUrl = (permalink) => {
	if (!permalink) return permalink;
	const short_url = permalink.replace((actual_site_url || site_url) + '/', '');
	return short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
};

export const getLinkDataFromSettings = ({ settings, currentPost, short_url }) => {
	const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
	const params = {
		ID: '',
		cat_id: '',
		target_url: '',
		link_title: currentPost.title,
		link_slug: currentPost.slug,
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		short_url: short_url,
		redirect_type: settings.redirect_type,
		nofollow: !!settings.nofollow,
		param_forwarding: !!settings.param_forwarding,
		sponsored: !!settings.sponsored,
		track_me: !!settings.track_me,
	};
	if (is_pro_enabled) {
		params.link_status = 'publish';
		params.expire = {
			status: false,
		};
	}
	return params;
};

export const add_top_loader = (document) => {
	document?.body?.classList?.add('betterlinks-loading-spinner-mounted');
	const loader = document?.createElement('div');
	loader.classList.add('betterlinks-top-loader-wrap');
	loader.innerHTML = `
		<div class="betterlinks-submitted-link-for-gutenberg">
			<div class="betterlinks-round-loader"></div>
		</div>
	`;
	document?.body?.prepend(loader);
};
export const remove_top_loader = (document) => {
	document?.body?.classList?.remove('betterlinks-loading-spinner-mounted');
	document?.querySelectorAll('.betterlinks-top-loader-wrap')?.forEach((item) => {
		item?.remove();
	});
};

export const shortURLUniqueCheck = (slug, ID, setSlugIsExists) => {
	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
	form_data.append('security', betterlinks_nonce);
	form_data.append('ID', ID);
	form_data.append('slug', slug);
	return axios.post(ajaxurl, form_data).then(
		(response) => {
			if (response.data) {
				setSlugIsExists(response.data.data);
				return response.data.data;
			}
		},
		(error) => {
			console.log(error);
		}
	);
};

export const shortURLUniqueCheckGutenberg = (slug, ID) => {
	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
	form_data.append('security', betterlinks_nonce);
	form_data.append('ID', ID);
	form_data.append('slug', slug);
	return axios.post(ajaxurl, form_data).then(
		(response) => {
			if (response.data) {
				return response.data.data;
			}
		},
		(error) => {
			console.log(error);
		}
	);
};

export const debounce = (func, delay) => {
	let timerId;

	return function (...args) {
		clearTimeout(timerId);

		timerId = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
};
export const isListEmpty = (lists, sortByFav) => {
	return sortByFav ? !lists.filter((list) => list?.favorite?.favForAll).length : !lists.length;
};

export const getFavoriteLinkCount = (links) => {
	return (
		links &&
		Object.values(links).reduce((total, item) => {
			const count = item.lists.filter((list) => !!list?.favorite?.favForAll).length;
			return (total += count);
		}, 0)
	);
};

export const analytic = (analytic, ID) => {
	return <Link to={route_path + 'admin.php?page=betterlinks-analytics&id=' + ID}>{+analytic.link_count + '/' + +analytic.ip}</Link>;
};

export const saveSettingsHandler = (values, update_option, setFormSubmitText) => {
	const uncloakedCatOnSubmit = values?.uncloaked_categories;
	if (Array.isArray(uncloakedCatOnSubmit)) {
		values.uncloaked_categories = JSON.stringify(uncloakedCatOnSubmit?.map?.((item) => parseInt(item)));
	}
	const affiliatePosition = values?.affiliate_link_position;
	if (is_pro_enabled && !affiliatePosition) {
		values.affiliate_link_position = 'top';
	}
	if (is_pro_enabled && values?.affiliate_disclosure_text) {
		values.affiliate_disclosure_text = values.affiliate_disclosure_text.replace(/<span class="ql-cursor">(.*?)<\/span>/g, '');
	}
	if (is_pro_enabled && values?.password?.allow_contact_text) {
		values.password.allow_contact_text = values.password?.allow_contact_text.replace(/<span class="ql-cursor">(.*?)<\/span>/g, '');
	}
	update_option(values);
	delayStatusChanged(__('Saving...', 'betterlinks'), __('Saved!', 'betterlinks'), __('Save Settings', 'betterlinks'), setFormSubmitText);
};

export const getDataset = (data, uniqueIpCount) => {
	const clicks = Object.values(data.clicks || {});
	const clicksCount = clicks.reduce((acc, cur) => acc + +cur, 0);
	const uniqueClicks = Object.values(data?.unique_clicks || { unique_clicks: {} })?.reverse?.();

	const dataset = [
		{
			name: __('Clicks', 'betterlinks') + `<span> - ${clicksCount || ''}</span>`,
			data: clicks?.reverse?.(),
		},
		{
			name: __('Unique Clicks', 'betterlinks') + `<span> - ${uniqueIpCount || ''}</span>`,
			data: uniqueClicks,
		},
	];
	return dataset;
};

const getDevice = (device) => {
	if (['smartphone', 'phablet', 'feature phone'].includes(device)) return 'mobile';
	return device;
};
export const sortFunction = (title) => (rowA, rowB) => {
	if (['total_clicks', 'unique_clicks'].includes(title)) {
		if (+rowA[title] > +rowB[title]) return 1;
		else if (+rowB[title] > +rowA[title]) return -1;
		return 0;
	}
	const a = rowA[title]?.toLowerCase() || '';
	const b = rowB[title]?.toLowerCase() || '';
	if (a > b) return 1;
	else if (b > a) return -1;
	return 0;
};

const ParameterItem = ({ type, item, style = {} }) => {
	if (!item) return;
	const parameterStyles = {
		root: {
			// display: 'flex',
			// alignItems: 'flex-start',
			// backgroundColor: 'rgb(240, 242, 247)',
			// padding: '8px 12px 8px 12px',
			// borderRadius: '8px',
			// fontSize: '12px',
			// fontWeight: '400',
			...style?.root,
		},
		type: {
			// fontSize: '12px',
			// fontWeight: '500',
			...style?.type,
		},
	};
	return (
		<>
			<span className="btl-parameter-tracking-values" style={parameterStyles.root}>
				<span style={parameterStyles.type}>{type}: &nbsp;</span> <span>{item}</span>
			</span>
		</>
	);
};

/**
 * CountryFetchCell Component
 * Displays a button to fetch country data for existing clicks without country information
 * When country is fetched, all clicks with the same IP within the same link are updated
 */
const CountryFetchCell = ({ row, linkId, onCountryUpdated }) => {
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState('idle'); // idle, loading, success, failed

	const handleFetchCountry = async () => {
		if (!row.ip) {
			return;
		}

		setLoading(true);
		setStatus('loading');

		try {
			// First, fetch country data from the API
			const response = await fetch(
				`${rest_url}betterlinks/v1/geolocation/fetch-by-ip?ip=${encodeURIComponent(row.ip)}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': nonce,
					},
				}
			);

			const data = await response.json();

			if (data.success && data.data) {
				// Now save the country data to the database via AJAX
				// Use bulk update to update all clicks with the same IP within this link
				const formData = new FormData();
				formData.append('action', 'betterlinks/admin/update_clicks_country_by_ip');
				formData.append('security', betterlinks_nonce);
				formData.append('link_id', linkId);
				formData.append('ip', row.ip);
				formData.append('country_code', data.data.country_code);
				formData.append('country_name', data.data.country_name);

				const ajaxResponse = await fetch(ajaxurl, {
					method: 'POST',
					body: formData,
				});

				const ajaxData = await ajaxResponse.json();

				if (ajaxData.success) {
					setStatus('success');
					// Update the row data
					row.country_code = data.data.country_code;
					row.country_name = data.data.country_name;

					// Trigger callback to refresh table data
					// The transient cache has been cleared on the backend, so fresh data will be fetched
					if (onCountryUpdated) {
						onCountryUpdated(row.ip, data.data);
					}
				} else {
					setStatus('failed');
					// Auto-reset to idle after 3 seconds on failure
					setTimeout(() => {
						setStatus('idle');
					}, 3000);
				}
			} else {
				setStatus('failed');
				// Auto-reset to idle after 3 seconds on failure
				setTimeout(() => {
					setStatus('idle');
				}, 3000);
			}
		} catch (error) {
			console.error('Error fetching country:', error);
			setStatus('failed');
			// Auto-reset to idle after 3 seconds on failure
			setTimeout(() => {
				setStatus('idle');
			}, 3000);
		} finally {
			setLoading(false);
		}
	};

	const getButtonContent = () => {
		switch (status) {
			case 'loading':
				return (
					<img
						width={18}
						height={18}
						src={plugin_root_url + '/assets/images/icons/refresh_arrow.svg'}
						alt="Fetching"
						style={{
							animation: 'spin 1s linear infinite',
							display: 'block',
						}}
					/>
				);
			case 'success':
				return (
					<span style={{
						display: 'block',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
						{countryData ? countryData.country_name : __('Fetched', 'betterlinks')}
					</span>
				);
			case 'failed':
				return (
					<span style={{
						display: 'block',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
						{__('Failed', 'betterlinks')}
					</span>
				);
			default:
				return (
					<img
						width={18}
						height={18}
						src={plugin_root_url + '/assets/images/icons/refresh_arrow.svg'}
						alt="Refresh"
						style={{
							display: 'block',
						}}
					/>
				);
		}
	};

	const getButtonStyle = () => {
		const isProUpdatedCountry = pro_version_check('2.5.0');
		let bgColor = '#fff';
		let textColor = '#333';
		let borderColor = '#ccc';

		if (status === 'success') {
			bgColor = '#d4edda';
			textColor = '#155724';
			borderColor = '#c3e6cb';
		} else if (status === 'failed') {
			bgColor = '#f8d7da';
			textColor = '#721c24';
			borderColor = '#f5c6cb';
		}

		const isDisabled = loading || status === 'success' || !is_pro_enabled || !isProUpdatedCountry;

		const baseStyles = {
			padding: '4px 8px',
			fontSize: '12px',
			borderRadius: '3px',
			color: textColor,
			border: 'unset',
			backgroundColor: 'unset',
			cursor: isDisabled ? 'not-allowed' : 'pointer',
			opacity: isDisabled ? 0.7 : 1,
			transition: 'all 0.3s ease',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			minWidth: '26px',
			minHeight: '26px',
		};

		// Add specific styles for the default state with icon
		if (status === 'idle' || status === 'loading') {
			return {
				...baseStyles,
				padding: '6px',
			};
		}

		return {
			...baseStyles,
			maxWidth: '150px',
		};
	};

	// Show country if row has country data
	if (row.country_name && row.country_code) {
		return (
			<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
				<span style={{
					fontSize: '16px',
					lineHeight: '1'
				}}>
					{getFlagEmoji(row.country_code)}
				</span>
				<span title={row.country_name}>
					{row.country_name}
				</span>
			</div>
		);
	}

	const isProUpdatedCountry = pro_version_check('2.5.0');

	return (
		<button
			className="btl-fetch-country-btn"
			onClick={handleFetchCountry}
			disabled={loading || !is_pro_enabled || !isProUpdatedCountry}
			title={
				!is_pro_enabled ? __('Pro Feature - Upgrade to Pro', 'betterlinks') :
				!isProUpdatedCountry ? __('Please update BetterLinks Pro to v2.5.0 or newer', 'betterlinks') :
				status === 'idle' ? __('Fetch Country', 'betterlinks') : row.ip
			}
			style={getButtonStyle()}
		>
			{getButtonContent()}
		</button>
	);
};

/**
 * Bulk fetch country data for multiple clicks
 * Deduplicates IPs and calls API only once per unique IP
 * Updates all clicks with the same IP within the same link
 * Returns updated rows for real-time UI update
 */
export const bulkFetchCountry = async (selectedRows, linkId, onCountryUpdated) => {
	if (!selectedRows || selectedRows.length === 0) {
		return { success: false, message: __('No rows selected', 'betterlinks'), updatedRows: [] };
	}

	// Deduplicate IPs from selected rows
	const uniqueIps = [...new Set(selectedRows.map(row => row.ip).filter(ip => ip))];

	if (uniqueIps.length === 0) {
		return { success: false, message: __('No valid IPs found in selected rows', 'betterlinks'), updatedRows: [] };
	}

	// Get unique IPs that need country data (don't have country_name yet)
	const ipsNeedingCountry = [...new Set(
		selectedRows
			.filter(row => !row.country_name && row.ip)
			.map(row => row.ip)
	)];

	if (ipsNeedingCountry.length === 0) {
		return { success: false, message: __('All selected rows already have country data', 'betterlinks'), updatedRows: [] };
	}

	const results = {
		success: true,
		processed: 0,
		updated: 0,
		failed: 0,
		message: '',
		updatedRows: [],
		countryMap: {} // Map of IP to country data for real-time UI update
	};

	try {
		// Process each unique IP that needs country data
		for (const ip of ipsNeedingCountry) {
			try {
				// Fetch country data from API
				const response = await fetch(`${rest_url}betterlinks/v1/geolocation/fetch-by-ip?ip=${encodeURIComponent(ip)}`, {
					method: 'GET',
					headers: {
						'X-WP-Nonce': nonce,
					}
				});

				const data = await response.json();

				if (data.success && data.data) {
					// Save the country data to the database via AJAX
					// Use bulk update to update all clicks with the same IP within this link
					const formData = new FormData();
					formData.append('action', 'betterlinks/admin/update_clicks_country_by_ip');
					formData.append('security', betterlinks_nonce);
					formData.append('link_id', linkId);
					formData.append('ip', ip);
					formData.append('country_code', data.data.country_code);
					formData.append('country_name', data.data.country_name);

					const ajaxResponse = await fetch(ajaxurl, {
						method: 'POST',
						body: formData,
					});

					const ajaxData = await ajaxResponse.json();

					if (ajaxData.success) {
						results.updated += ajaxData.data.updated_count || 1;
						results.processed++;

						// Store country data for real-time UI update
						results.countryMap[ip] = {
							country_code: data.data.country_code,
							country_name: data.data.country_name
						};
					} else {
						results.failed++;
					}
				} else {
					results.failed++;
				}
			} catch (error) {
				console.error('Error fetching country for IP:', ip, error);
				results.failed++;
			}

			// Add a small delay to avoid overwhelming the API
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		results.message = `${__('Processed', 'betterlinks')} ${results.processed} ${__('IPs, updated', 'betterlinks')} ${results.updated} ${__('clicks', 'betterlinks')}, ${results.failed} ${__('failed', 'betterlinks')}`;

		// Update selected rows with fetched country data for real-time UI update
		results.updatedRows = selectedRows.map(row => {
			if (results.countryMap[row.ip]) {
				return {
					...row,
					country_code: results.countryMap[row.ip].country_code,
					country_name: results.countryMap[row.ip].country_name
				};
			}
			return row;
		});

		// Trigger callback to refresh table data
		if (onCountryUpdated) {
			onCountryUpdated(results.updatedRows);
		}

		return results;
	} catch (error) {
		console.error('Error in bulk fetch country:', error);
		return {
			success: false,
			message: __('Error fetching country data', 'betterlinks'),
			error: error.message
		};
	}
};

export const getColumns = (analytics, analyticsTab, id = null, onCountryUpdated = null) => {
	if (!!id) {
		const isProUpdated = pro_version_check('2.1.0');
		const isProUpdatedCountry = pro_version_check('2.5.0');
		const singleColumn = [
			{
				name: __('Browser', 'betterlinks'),
				selector: 'browser',
				sortable: false,
				width: '100px',
				cell: (row) => {
					const browser = getBrowser(row.browser);
					const title = (browser?.charAt(0) || '')?.toUpperCase() + browser?.slice(1);
					return (
						<div>
							<img width="25" src={`${plugin_root_url}assets/images/browser/${browser}-browser.svg`} alt="icon" title={title} />
						</div>
					);
				},
			},
			{
				name: __('IP', 'betterlinks'),
				selector: 'ip',
				sortable: false,
				cell: (row) => <div>{row.ip + '(' + row.IPCOUNT + ')'}</div>,
			},
			{
				name: (
					<>
						{__('Country', 'betterlinks')}
						{!is_pro_enabled && <ProBadge />}
						{!isProUpdatedCountry && (
							<Tooltip arrow title="To track visitor Countries, please ensure BetterLinks Pro v2.5.0 or newer is activated" placement="top">
								<span className="dashicons dashicons-info-outline" style={{ fontSize: 'inherit', color: 'red', cursor: 'pointer' }} />
							</Tooltip>
						)}
					</>
				),
				selector: 'country_name',
				sortable: false,
				width: '180px',
				cell: (row) => {
					if (!is_pro_enabled) {
						return;
					}
					if (row.country_name && row.country_code) {
						return (
							<div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
								<span style={{
									fontSize: '16px',
									lineHeight: '1'
								}}>
									{getFlagEmoji(row.country_code)}
								</span>
								<span title={row.country_name}>
									{row.country_name}
								</span>
							</div>
						);
					}
					// Show fetch button for existing clicks without country data
					if (row.ip && !row.country_name) {
						return <CountryFetchCell row={row} linkId={id} onCountryUpdated={onCountryUpdated} />;
					}
					return <div>-</div>;
				},
			},
			{
				name: __('Timestamp', 'betterlinks'),
				selector: 'created_at',
				sortable: false,
			},
			{
				name: __('Referrer', 'betterlinks'),
				selector: 'referer',
				width: '300px',
				sortable: false,
				cell: (row) => (
					<div>
						<div style={{ fontWeight: 700 }}>
							<a href={row.referer} target="_blank">
								{row.referer}
							</a>
						</div>
					</div>
				),
			},
			{
				name: (
					<>
						{__('Parameters', 'betterlinks')}
						{!is_pro_enabled && <ProBadge />}
						{!isProUpdated && (
							<Tooltip arrow title="To use Parameter Tracking Feature, kindly ensure that you have at least BetterLinks Pro v2.1.0 installed & activated" placement="top">
								<span className="dashicons dashicons-info-outline" style={{ fontSize: 'inherit', color: 'red', cursor: 'pointer' }} />
							</Tooltip>
						)}
					</>
				),
				selector: 'query_params',
				width: '350px',
				cell: (row) => {
					if (!is_pro_enabled) {
						return;
					}
					const query_params = JSON.parse(row.query_params || '{}');
					return (
						<div style={{ display: 'flex', flexDirection: 'column', rowGap: '5px', width: '100%' }}>
							<ParameterItem
								item={query_params?.pf}
								type="Forwarded"
								style={{
									type: {
										minWidth: '25px',
									},
								}}
							/>
							<ParameterItem
								item={query_params?.target_url}
								type="Target URL"
								style={{
									type: {
										minWidth: '70px',
									},
								}}
							/>
							<ParameterItem
								item={query_params?.utm}
								type="UTM"
								style={{
									type: {
										minWidth: '40px',
									},
								}}
							/>
						</div>
					);
				},
				sortable: false,
			},
			{
				name: __('OS', 'betterlinks'),
				selector: 'os',
				width: '100px',
				cell: (row) => <div>{row.os}</div>,
				sortable: false,
			},
			{
				name: __('Device', 'betterlinks'),
				selector: 'device',
				width: '80px',
				cell: (row) => {
					const title = row.device === 'desktop' ? 'Computer' : row.device?.charAt(0).toUpperCase() + row.device?.slice(1);
					return <div>{row.device && <img width="25" src={`${plugin_root_url}assets/images/devices/${getDevice(row.device)}.svg`} alt="icon" title={title} />}</div>;
				},
				sortable: false,
			},
		];

		const analyticsArr = [...Object.values(analytics || {}).map((item) => item.value)];
		return singleColumn.filter((item) => analyticsArr.includes(item.selector));
	}
	const columns = [
		{
			name: __('Link Name', 'betterlinks'),
			selector: 'name',
			id: 'name',
			sortable: true,
			cell: (row) => <div>{row.link_title}</div>,
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
			cell: (row) => (
				<div>
					<div style={{ fontWeight: 700 }}>
						<a href={site_url + '/' + row.short_url} target="_blank">
							{site_url + '/' + row.short_url}
						</a>
					</div>
				</div>
			),
		},
		{
			name: __('Target URL', 'betterlinks'),
			selector: 'target_url',
			cell: (row) => (
				<div>
					<div style={{ fontWeight: 700 }}>
						<a href={row.target_url} target="_blank">
							{row.target_url}
						</a>
					</div>
				</div>
			),
			sortable: false,
		},
		{
			name: __('Total Clicks', 'betterlinks'),
			selector: 'total_clicks',
			width: '150px',
			...(is_extra_data_tracking_compatible && { sortFunction: sortFunction('total_clicks') }),
			cell: (row) => <div>{row?.total_clicks || 0}</div>,
		},
		{
			name: __('Unique Clicks', 'betterlinks'),
			selector: 'unique_clicks',
			width: '150px',
			...(is_extra_data_tracking_compatible && { sortFunction: sortFunction('unique_clicks') }),
			cell: (row) => <div>{row?.unique_clicks || 0}</div>,
		},
		{
			name: __('Action', 'betterlinks'),
			selector: 'action',
			sortable: false,
			width: '100px',
			cell: (row) => {
				return <Link to={`${route_path}admin.php?page=betterlinks-analytics&id=${row.link_id}`}>Details</Link>;
			},
		},
	];
	return columns;
};

export const analyticsColumnData = [
	{
		name: __('Browser', 'betterlinks'),
		selector: 'browser',
	},
	{
		name: __('Link Name', 'betterlinks'),
		selector: 'name',
	},
	{
		name: __('IP', 'betterlinks'),
		selector: 'ip',
	},
	{
		name: __('Country', 'betterlinks'),
		selector: 'country_name',
	},
	{
		name: __('Timestamp', 'betterlinks'),
		selector: 'created_at',
	},
	{
		name: __('Shortened URL', 'betterlinks'),
		selector: 'short_url',
	},
	{
		name: __('Referer', 'betterlinks'),
		selector: 'referer',
	},
	{
		name: __('Target URL', 'betterlinks'),
		selector: 'target_url',
	},
];

export const get_labels = (clicks) => {
	const labels = Object.keys(clicks)
		?.reverse?.()
		?.map?.((item) => {
			const splitted = item.split('-');
			return `${splitted[1]}-${splitted[2]}-${splitted[0]}`;
		});
	return labels;
};

export const pro_version_check = (version, compare = '>=') => {
	if (!betterlinkspro_version) return true;
	if (!version) return false;

	const pro_v_arr = betterlinkspro_version.split('.');
	const v_arr = version.split('.');

	if (+pro_v_arr[0] > +v_arr[0]) {
		return true;
	}

	const lastPartofProPlugin = parseFloat(betterlinkspro_version?.slice(2));
	const lastPartofCheckVersion = parseFloat(version?.slice(2));

	return eval(lastPartofProPlugin + compare + lastPartofCheckVersion);

	// return betterlinkspro_version ? parseFloat(betterlinkspro_version?.slice(2)) : null;
};

export const get_tags = (links) => {
	const tags = {};
	links &&
		Object.values(links)
			.map((item) => item.lists)
			.flat()
			.filter((item) => item.tags_data?.length)
			.map((item) => item.tags_data)
			.flat()
			.map((item) => {
				if (!tags?.[item.term_id]) {
					tags[item.term_id] = item.term_slug;
				}
			});

	return tags;
};

export const sortByClicksTag = (type = '', tags, tag_analytics) => {
	const [analyticsType, sortType] = type.split('-');
	if (!analyticsType || !sortType) return tags;

	let sortedTags = _.orderBy(tags, (item) => {
		// Handle both item.id and item.ID cases
		const itemId = item.id || item.ID;
		return +tag_analytics[analyticsType][itemId] || +tag_analytics[analyticsType][String(itemId)] || 0;
	});

	if ('desc' === sortType) {
		sortedTags = _.reverse(sortedTags);
	}
	return sortedTags;
};

export const sortByClicksCategory = (type = '', categories, category_analytics) => {
	const [analyticsType, sortType] = type.split('-');
	if (!analyticsType || !sortType) return categories;

	let sortedCategories = _.orderBy(categories, (item) => {
		// Handle both item.id and item.ID cases
		const itemId = item.id || item.ID;
		return +category_analytics[analyticsType][itemId] || +category_analytics[analyticsType][String(itemId)] || 0;
	});

	if ('desc' === sortType) {
		sortedCategories = _.reverse(sortedCategories);
	}
	return sortedCategories;
};

export const paginationPerPageCount = [10, 30, 50, 100, 200, 500];

/**
 * Efficiently removes duplicate URLs from an array of URLs
 * Optimized for handling large datasets (500-1000+ URLs)
 *
 * @param {string} urlsText - Raw text containing URLs separated by newlines or spaces
 * @returns {Object} - Object containing { uniqueUrls: string[], duplicatesRemoved: number, originalCount: number }
 */
export const removeDuplicateUrls = (urlsText) => {
	if (!urlsText || typeof urlsText !== 'string') {
		return {
			uniqueUrls: [],
			duplicatesRemoved: 0,
			originalCount: 0
		};
	}

	// Parse URLs from text (split by newlines and spaces, filter empty)
	const urlList = urlsText
		.split(/[\s\n]+/)
		.filter((url) => url.trim())
		.map((url) => url.trim());

	const originalCount = urlList.length;

	// Use Set for O(1) lookup time - most efficient for large datasets
	const uniqueUrlsSet = new Set();
	const uniqueUrls = [];

	// Process URLs and track duplicates efficiently
	for (const url of urlList) {
		// Normalize URL for comparison (convert to lowercase for case-insensitive comparison)
		const normalizedUrl = url.toLowerCase();

		if (!uniqueUrlsSet.has(normalizedUrl)) {
			uniqueUrlsSet.add(normalizedUrl);
			uniqueUrls.push(url); // Keep original case for the actual URL
		}
	}

	const duplicatesRemoved = originalCount - uniqueUrls.length;

	return {
		uniqueUrls,
		duplicatesRemoved,
		originalCount
	};
};
