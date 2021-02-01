import axios from 'axios';

export const { nonce, rest_url, namespace, plugin_root_url, plugin_root_path, site_url, route_path, exists_links_json, exists_clicks_json, page } = window.betterLinksGlobal;

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

	return result;
};

export const generateSlug = (value) => {
	return value
		.toLowerCase()
		.replace(/-+/g, '')
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
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
