// wordpress dependecies
const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;

// redux imports
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_auto_link_create_settings, fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { CustomSidebar } from 'gutenberg/components';
import { betterlinksFormat } from 'gutenberg/formats';

// helpers
import { betterlinks_settings, post_type } from 'utils/helper';

const { is_allow_gutenberg = false, affiliate_link_disclosure = false, enable_auto_link = false } = betterlinks_settings;
const requests = [];

if ([is_allow_gutenberg, affiliate_link_disclosure].some(Boolean)) {
	requests.push(fetch_links_data(true)(betterlinksGutenStore.dispatch), fetch_terms_data()(betterlinksGutenStore.dispatch), fetch_settings_data()(betterlinksGutenStore.dispatch));
}

if (enable_auto_link && betterlinks_settings?.[`${post_type}_shortlinks`]) {
	requests.push(fetch_auto_link_create_settings()(betterlinksGutenStore.dispatch));
}

if (requests.length > 0) {
	Promise.all(requests)
		.then(() => {
			document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
		})
		.catch((err) => {
			document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
			console.log('---error while fetching betterlinks gutenberg store datas', { err });
		});

	(() => {
		if (
			betterlinksGutenStore?.getState()?.links?.links &&
			betterlinksGutenStore?.getState()?.terms?.terms &&
			betterlinksGutenStore?.getState()?.settings?.settings &&
			betterlinksGutenStore?.getState()?.autoLinkSettings?.autoLinkSettings
		) {
			document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
		} else {
			document?.body?.classList?.add('betterlinks-guten-store-initial-data-still-fetching');
		}
	})();

	if (is_allow_gutenberg) {
		betterlinksGutenStore.subscribe(() => {
			if (betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.ID) {
				document?.body?.classList?.add('betterlinks-guten-instant-redirect-has-link');
			} else {
				document?.body?.classList?.remove('betterlinks-guten-instant-redirect-has-link');
			}
		});
	}

	// Sidebar Panel in Gutenberg Edit 'page/post'
	if (['post', 'page'].includes(post_type)) {
		registerPlugin('betterlinks-sidebar', {
			render: CustomSidebar,
			icon: '',
		});
	}

	// Betterlinks Formatting option for rich text. This option wil show up in the formats options when selecting some text from rich-text
	const { name, ...settings } = betterlinksFormat;
	registerFormatType(name, settings);
}
