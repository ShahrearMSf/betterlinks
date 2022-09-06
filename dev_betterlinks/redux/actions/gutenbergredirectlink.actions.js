import axios from 'axios';
import { redirectType } from 'utils/data';
import { makeRequest, betterlinks_nonce, getJsonString, formatDate, is_pro_enabled, permalinkToShortUrl, getLinkDataFromSettings } from 'utils/helper';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { betterlinksGutenStore } from 'redux/store';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

//
import { LoadingSpinner } from 'gutenberg/components';

const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { withDispatch, subscribe } = wp.data;

export const FETCH_LINK_FOR_PERMALINK = 'FETCH_LINK_FOR_PERMALINK';

export const fetch_link_for_permalink = async () => {
	const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
	console.log('---fetch_link_for_permalink', { short_url }, "------wp.data.select('core/editor').getPermalink()-----", wp.data.select('core/editor').getPermalink());
	if (!short_url) return false;
	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/get_links_by_short_url');
	form_data.append('security', betterlinks_nonce);
	form_data.append('short_url', short_url);
	axios.post(ajaxurl, form_data).then(
		(response) => {
			console.log('betterlinks/admin/get_links_by_short_url', { response });
			const linkData = response?.data?.data;
			if (linkData) {
				betterlinksGutenStore.dispatch({
					type: FETCH_LINK_FOR_PERMALINK,
					payload: linkData,
				});
				console.log('----dispatch FETCH_LINK_FOR_PERMALINK action linkData ', { linkData });
				return false;
			}

			//👇 if link not found for the post/page
			const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			const currentPost = wp.data.select('core/editor').getCurrentPost();
			//👇 if settings data does exist in the store
			if (settings) {
				const linkData = getLinkDataFromSettings({ settings, currentPost, short_url });
				betterlinksGutenStore.dispatch({
					type: FETCH_LINK_FOR_PERMALINK,
					payload: linkData,
				});
				console.log("---settings exist--- dispatched 'FETCH_LINK_FOR_PERMALINK' with payload 'linkData' from getLinkDataFromSettings function ", { linkData });
				return false;
			}
			//👇 if settings data doesn't exist in the store
			fetch_settings_data()(betterlinksGutenStore.dispatch)
				.then(() => {
					const settings = betterlinksGutenStore?.getState()?.settings?.settings;
					if (!settings) return false;
					const linkData = getLinkDataFromSettings({ settings, currentPost, short_url });
					betterlinksGutenStore.dispatch({
						type: FETCH_LINK_FOR_PERMALINK,
						payload: linkData,
					});
					console.log("^^^^^settings don't exist^^^^^^ dispatched 'FETCH_LINK_FOR_PERMALINK' with payload 'linkData' from getLinkDataFromSettings function ", { linkData });
				})
				.catch((err) => console.log('Error! fetch_settings_data failed', { err }));
		},
		(error) => {
			console.log(error);
		}
	);
};
