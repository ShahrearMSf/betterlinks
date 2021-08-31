import axios from 'axios';

export const { betterlinks_nonce, nonce, rest_url, namespace, plugin_root_url, plugin_root_path, site_url, route_path, exists_links_json, exists_clicks_json, page } =
	window.betterLinksGlobal;

export const API = axios.create({
	baseURL: rest_url,
	headers: {
		'content-type': 'application/json',
		'X-WP-Nonce': nonce,
	},
});
export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

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
export const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

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
		.toLowerCase()
		.replace(/-+/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
};

export const generateShortUrl = (value) => {
	return value
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-/-]/g, '');
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

export const getBrowser = (agent) => {
	var browser = '';
	if (/Opera[\/\s](\d+\.\d+)/.test(agent) || 'Opera' == agent) {
		browser = 'opera-browser';
	} else if (/IE (\d+\.\d+);/.test(agent) || 'IE' == agent) {
		browser = 'internet-explorer-browser';
	} else if (/Navigator[\/\s](\d+\.\d+)/.test(agent) || 'Navigator' == agent) {
		browser = 'netscape-browser';
	} else if (/Chrome[\/\s](\d+\.\d+)/.test(agent) || 'Chrome' == agent) {
		browser = 'chrome-browser';
	} else if (/Safari[\/\s](\d+\.\d+)/.test(agent) || 'Safari' == agent) {
		browser = 'safari-browser';
	} else if (/Firefox[\/\s](\d+\.\d+)/.test(agent) || 'Firefox' == agent) {
		browser = 'firefox-browser';
	} else if (/Yandex[\/\s](\d+\.\d+)/.test(agent) || 'Yandex' == agent) {
		browser = 'yandex-browser';
	} else if (/Facebook[\/\s](\d+\.\d+)/.test(agent) || 'Facebook' == agent) {
		browser = 'facebook-browser';
	} else {
		browser = 'web-browser';
	}
	return browser;
};

export const formatDate = (date, format) => {
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

export const linksFilterData = (stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter) => {
	let results = stored;
	results = stored.filter((item) => item.link_title && item.link_title.toLowerCase().includes(filterText.toLowerCase()));
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
