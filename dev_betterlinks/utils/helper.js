import { __ } from '@wordpress/i18n';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';

export const {
	betterlinks_nonce,
	nonce,
	rest_url,
	namespace,
	plugin_root_url,
	plugin_root_path,
	site_url,
	route_path,
	exists_links_json,
	exists_clicks_json,
	page,
	is_pro_enabled,
	post_type,
	betterlinks_links_option,
	betterlinkspro_version,
	is_extra_data_tracking_compatible,
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
		(response) => {},
		(error) => {
			console.log(error);
		}
	);

	return result;
};
export const deleteClicks = (daysOlderThan = false, from = formatDate(subDays(new Date(), 30), 'yyyy-mm-dd'), to = formatDate(new Date(), 'yyyy-mm-dd')) => {
	const form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/reset_analytics');
	form_data.append('security', betterlinks_nonce);
	if (daysOlderThan) {
		form_data.append('days_older_than', daysOlderThan);
	}
	form_data.append('from', from);
	form_data.append('to', to);
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
		(response) => {},
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

export const generateShortURL = (settings, title) => {
	if (settings) {
		let shortURL = settings.prefix && settings.prefix.length > 0 ? settings.prefix + '/' : '';
		if (settings.is_random_string && title === null) {
			return shortURL + generateRandomSlug();
		}
		if (!settings.is_random_string && title) {
			return shortURL + generateTitleToSlug(title);
		}
		return '';
	}
	return '';
};

export const generateRandomSlug = (length = 3) => {
	return Math.random().toString(20).substr(2, length) + new Date().getMilliseconds();
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
		maxWidth: '850px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

export const modalCustomSmallStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
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
	var tempInput = document.createElement('input');
	tempInput.value = copyText;
	document.body.appendChild(tempInput);
	tempInput.select();
	document.execCommand('copy');
	document.body.removeChild(tempInput);
	return;
};

export const copyShortUrl = (shortUrl) => {
	const URL = makeShortUrl(shortUrl);
	copyToClipboard(URL);
	return URL;
};

export const makeShortUrl = (shortUrl) => {
	return shortUrl[0] === '/' ? site_url + shortUrl : site_url + '/' + shortUrl;
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

export const linksFilterData = (stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter, sortByFav) => {
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

export const getAutoLinksInitialValues = (data) => {
	if (Object.keys(data).length) {
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
		};
	}
	return {
		keywords: '',
		chooseLink: '',
		postType: '',
		category: '',
		tags: '',
		openNewTab: '',
		useNoFollow: '',
		caseSensitive: '',
		keywordBefore: '',
		keywordAfter: '',
		leftBoundary: '',
		rightBoundary: '',
		limit: 100,
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

export const makeLinkFormat = ({ url, linkNewTab, sponsored, noFollow }) => {
	const attributes = { url };
	let rel = '';

	if (linkNewTab) {
		attributes.target = '_blank';
		rel = 'noreferrer noopener ';
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

	const result = {
		type: 'betterlinks/link-format',
		attributes,
	};
	return result;
};

export const permalinkToShortUrl = (permalink) => {
	if (!permalink) return permalink;
	const short_url = permalink.replace(site_url + '/', '');
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
	let isLinkAble = betterLinksHooks.applyFilters('betterLinksIsEnableIndividualAnalytic', false);
	if (isLinkAble) {
		return <Link to={route_path + 'admin.php?page=betterlinks-analytics&id=' + ID}>{+analytic.link_count + '/' + +analytic.ip}</Link>;
	}
	return +analytic.link_count + '/' + +analytic.ip;
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

export const getDataset = (data) => {
	const dataset = [
		{
			name: __('Clicks', 'betterlinks'),
			data: Object.values(data.clicks)?.reverse?.(),
		},
		{
			name: __('Unique Clicks', 'betterlinks'),
			data: Object.values(data?.unique_clicks || { unique_clicks: {} })?.reverse?.(),
		},
	];
	return dataset;
};

const getDevice = (device) => {
	if (['smartphone', 'phablet', 'feature phone'].includes(device)) return 'mobile';
	return device;
};
const sortFunction = (title) => (rowA, rowB) => {
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
const Blured = styled.span`
	filter: blur(2px);
	user-select: none;
`;
const osData = ['Windows', 'Linux', 'Mac', 'iOS', 'Android'];
const deviceData = ['mobile', 'desktop', 'mobile', 'desktop'];
const BluredData = ({ data = '' }) => {
	if ('os' === data) {
		const rndInt = Math.floor(Math.random() * 4) + 1;
		return <span style={{ filter: 'blur(2px)' }}>{osData[rndInt]}</span>;
	}
	const rndInt = Math.floor(Math.random() * 3) + 1;
	return (
		<span style={{ filter: 'blur(2px)' }}>
			<img width="25" src={`${plugin_root_url}assets/images/devices/${getDevice(deviceData[rndInt])}.svg`} alt="icon" />
		</span>
	);
};

export const getColumns = (analytics, analyticsTab, id = null) => {
	if (!!id) {
		const singleColumn = [
			{
				name: __('Browser', 'betterlinks'),
				selector: 'browser',
				sortable: false,
				width: '100px',
				cell: (row) => {
					const browser = getBrowser(row.browser);
					const title = browser.charAt(0).toUpperCase() + browser.slice(1);
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
				name: __('Timestamp', 'betterlinks'),
				selector: 'created_at',
				sortable: false,
			},
			{
				name: __('Referrer', 'betterlinks'),
				selector: 'referer',
				width: '500px',
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
					const title = row.device === 'desktop' ? 'Computer' : row.device.charAt(0).toUpperCase() + row.device.slice(1);
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
			cell: (row) => <div>{row?.total_clicks || 1}</div>,
		},
		{
			name: __('Unique Clicks', 'betterlinks'),
			selector: 'unique_clicks',
			width: '150px',
			...(is_extra_data_tracking_compatible && { sortFunction: sortFunction('unique_clicks') }),
			cell: (row) => <div>{row?.unique_clicks || 1}</div>,
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

export const teaserClickData = {
	clicks: {
		'2023-11-27': '217',
		'2023-11-26': '179',
		'2023-11-25': '184',
		'2023-11-24': '237',
		'2023-11-23': '294',
		'2023-11-22': '342',
		'2023-11-21': '328',
		'2023-11-20': '332',
		'2023-11-19': '170',
		'2023-11-18': '186',
		'2023-11-17': '296',
		'2023-11-16': '356',
		'2023-11-15': '313',
		'2023-11-14': '348',
		'2023-11-13': '290',
		'2023-11-12': '184',
		'2023-11-11': '187',
		'2023-11-10': '263',
		'2023-11-09': '290',
		'2023-11-08': '344',
		'2023-11-07': '314',
		'2023-11-06': '328',
		'2023-11-05': '189',
		'2023-11-04': '205',
		'2023-11-03': '283',
		'2023-11-02': '323',
		'2023-11-01': '287',
	},
	unique_clicks: {
		'2023-11-27': '195',
		'2023-11-26': '165',
		'2023-11-25': '166',
		'2023-11-24': '213',
		'2023-11-23': '261',
		'2023-11-22': '310',
		'2023-11-21': '294',
		'2023-11-20': '278',
		'2023-11-19': '155',
		'2023-11-18': '159',
		'2023-11-17': '262',
		'2023-11-16': '311',
		'2023-11-15': '294',
		'2023-11-14': '298',
		'2023-11-13': '264',
		'2023-11-12': '155',
		'2023-11-11': '164',
		'2023-11-10': '246',
		'2023-11-09': '268',
		'2023-11-08': '297',
		'2023-11-07': '286',
		'2023-11-06': '297',
		'2023-11-05': '166',
		'2023-11-04': '180',
		'2023-11-03': '259',
		'2023-11-02': '280',
		'2023-11-01': '244',
	},
};

export const get_labels = (clicks) => {
	const labels = Object.keys(clicks)
		?.reverse?.()
		?.map?.((item) => {
			const splitted = item.split('-');
			return `${splitted[1]}-${splitted[2]}-${splitted[0]}`;
		});
	return labels;
};
