import axios from 'axios';
import { FETCH_LINK_FOR_PERMALINK } from 'redux/actions/actionstrings';
import { betterlinks_nonce, permalinkToShortUrl } from 'utils/helper';

export const fetch_link_by_target_url_for_permalink = () => {
	const target_url = wp.data.select('core/editor').getPermalink();
	console.log(target_url);
	if (!target_url) return false;
	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/get_links_by_target_url');
	form_data.append('security', betterlinks_nonce);
	form_data.append('target_url', target_url);
	console.log(form_data);
	return axios.post(ajaxurl, form_data).then(
		(response) => {
			if (!response?.data) {
				// betterlinksGutenStore.dispatch({
				// 	type: FETCH_LINK_FOR_PERMALINK,
				// 	payload: {},
				// });
				return false;
			}
			let linkData = response?.data?.data;
			return response;
			//👇 if link found for the post/page
			if (linkData) {
				return linkData;
				// if (typeof linkData?.expire === 'string') {
				// 	const expire = getJsonString(linkData.expire);
				// 	linkData = {
				// 		...linkData,
				// 		expire,
				// 	};
				// }

				// if (typeof linkData?.dynamic_redirect === 'string') {
				// 	const dynamic_redirect = getJsonString(linkData.dynamic_redirect);
				// 	if (dynamic_redirect.length === 0 || !dynamic_redirect.value) {
				// 		linkData = {
				// 			...linkData,
				// 			dynamic_redirect: {
				// 				type: '',
				// 				value: [],
				// 				extra: {
				// 					rotation_mode: 'weighted',
				// 					split_test: false,
				// 					goal_link: '',
				// 				},
				// 			},
				// 		};
				// 	} else {
				// 		linkData = {
				// 			...linkData,
				// 			dynamic_redirect,
				// 		};
				// 	}
				// }

				// if (!(linkData.ID || linkData.ID === 0)) {
				// 	betterlinksGutenStore.dispatch({
				// 		type: FETCH_LINK_FOR_PERMALINK,
				// 		payload: linkData,
				// 	});
				// 	return false;
				// }

				// if (betterlinksGutenStore.getState()?.links?.links) {
				// 	const cat_id = (betterlinksGutenStore.getState()?.links?.links || []).find((item) => `${item.ID}` === `${linkData.ID}`)?.cat_id;
				// 	linkData = {
				// 		...linkData,
				// 		cat_id,
				// 	};
				// 	betterlinksGutenStore.dispatch({
				// 		type: FETCH_LINK_FOR_PERMALINK,
				// 		payload: linkData,
				// 	});
				// 	return false;
				// }

				// if (!betterlinksGutenStore.getState()?.links?.links) {
				// 	return fetch_links_data(true)(betterlinksGutenStore.dispatch)
				// 		.then(() => {
				// 			const cat_id = (betterlinksGutenStore.getState()?.links?.links || []).find((item) => `${item.ID}` === `${linkData.ID}`)?.cat_id;
				// 			linkData = {
				// 				...linkData,
				// 				cat_id,
				// 			};
				// 			betterlinksGutenStore.dispatch({
				// 				type: FETCH_LINK_FOR_PERMALINK,
				// 				payload: linkData,
				// 			});
				// 		})
				// 		.catch((error) => console.log(error));
				// }
			}

			//👇 if link not found for the post/page
			// const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			// const currentPost = wp.data.select('core/editor').getCurrentPost();
			// //👇 if settings data does exist in the store
			// if (settings) {
			// 	const linkData = getLinkDataFromSettings({ settings, currentPost, short_url });
			// 	betterlinksGutenStore.dispatch({
			// 		type: FETCH_LINK_FOR_PERMALINK,
			// 		payload: linkData,
			// 	});
			// 	return false;
			// }
			//👇 if settings data doesn't exist in the store
			// fetch_settings_data()(betterlinksGutenStore.dispatch)
			// 	.then(() => {
			// 		const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			// 		if (!settings) return false;
			// 		const linkData = getLinkDataFromSettings({ settings, currentPost, short_url });
			// 		betterlinksGutenStore.dispatch({
			// 			type: FETCH_LINK_FOR_PERMALINK,
			// 			payload: linkData,
			// 		});
			// 	})
			// 	.catch((err) => console.log('Error! fetch_settings_data failed', { err }));
		},
		(error) => {
			console.log(error);
		}
	);
};
