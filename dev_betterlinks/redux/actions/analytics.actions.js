import { FETCH_ANALYTICS_SETTINGS } from './actionstrings';
const defaultAnalyticsSettings = [
	{ label: 'Browser', value: 'browser' },
	{ label: 'IP', value: 'ip' },
	{ label: 'Timestamp', value: 'created_at' },
	{ label: 'Shortened URL', value: 'short_url' },
	{ label: 'Referer', value: 'referer' },
	{ label: 'Target URL', value: 'target_url' },
];

export const fetch_analytics_settings = () => (dispatch) => {
	const analytics_settings = localStorage.getItem('btl_analytics_settings') ? JSON.parse(localStorage.getItem('btl_analytics_settings')) : defaultAnalyticsSettings;

	dispatch({
		type: FETCH_ANALYTICS_SETTINGS,
		payload: analytics_settings,
	});
};
export const update_analytics_settings = (payload) => (dispatch) => {
	localStorage.setItem('btl_analytics_settings', JSON.stringify(payload));
	dispatch({
		type: FETCH_ANALYTICS_SETTINGS,
		payload,
	});
};
