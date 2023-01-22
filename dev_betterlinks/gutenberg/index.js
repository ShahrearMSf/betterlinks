// wordpress dependecies
const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;

// redux imports
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { CustomSidebar } from 'gutenberg/components';
import { betterlinksFormat } from 'gutenberg/formats';

// helpers
import { post_type } from 'utils/helper';

Promise.all([fetch_links_data(true)(betterlinksGutenStore.dispatch), fetch_terms_data()(betterlinksGutenStore.dispatch), fetch_settings_data()(betterlinksGutenStore.dispatch)])
	.then(() => {
		document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
	})
	.catch((err) => {
		document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
		console.log('---error while fetching betterlinks gutenberg store datas', { err });
	});

(() => {
	if (betterlinksGutenStore?.getState()?.links?.links && betterlinksGutenStore?.getState()?.terms?.terms && betterlinksGutenStore?.getState()?.settings?.settings) {
		document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
	} else {
		document?.body?.classList?.add('betterlinks-guten-store-initial-data-still-fetching');
	}
})();

betterlinksGutenStore.subscribe(() => {
	if (betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.ID) {
		document?.body?.classList?.add('betterlinks-guten-instant-redirect-has-link');
	} else {
		document?.body?.classList?.remove('betterlinks-guten-instant-redirect-has-link');
	}
});

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
