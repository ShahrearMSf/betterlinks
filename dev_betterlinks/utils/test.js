const keywords = [
	{
		keywords: 'setup',
		link_id: 6,
		post_type: '',
		category: '',
		tags: '',
		open_new_tab: 0,
		use_no_follow: 0,
		case_sensitive: 0,
		left_boundary: '',
		right_boundary: '',
		keyword_before: '',
		limit: 100,
		priority: '',
		keyword_after: '',
	},
	{
		keywords: 'welcome',
		link_id: 3,
		post_type: '',
		category: '',
		tags: '',
		open_new_tab: 0,
		use_no_follow: 0,
		case_sensitive: 0,
		left_boundary: '',
		right_boundary: '',
		keyword_before: '',
		limit: 100,
		priority: '',
		keyword_after: '',
	},
	{
		keywords: 'homebrew, formula',
		link_id: 3,
		post_type: '',
		category: '',
		tags: '',
		open_new_tab: 0,
		use_no_follow: 0,
		case_sensitive: 0,
		left_boundary: '',
		right_boundary: '',
		keyword_before: '',
		limit: 100,
		priority: '',
		keyword_after: '',
	},
	{
		keywords: 'hridoy',
		link_id: 6,
		post_type: '',
		category: '',
		tags: '',
		open_new_tab: 0,
		use_no_follow: 0,
		case_sensitive: 0,
		left_boundary: '',
		right_boundary: '',
		keyword_before: '',
		limit: 100,
		priority: '',
		keyword_after: '',
	},
];

const removedKeywords = [
	{
		keywords: 'welcome',
		link_id: 6,
		post_type: '',
		category: '',
		tags: '',
		open_new_tab: 0,
		use_no_follow: 0,
		case_sensitive: 0,
		left_boundary: '',
		right_boundary: '',
		keyword_before: '',
		limit: 100,
		priority: '',
		keyword_after: '',
	},
];

const getFilteredKeywords = (keywords, removedKeyword) => {
	return keywords.filter((keyword) => {
		return !removedKeywords.find((removedKeyword) => {
			return removedKeyword.keywords === keyword.keywords;
		});
	});
};

console.log(getFilteredKeywords(keywords, removedKeywords));
