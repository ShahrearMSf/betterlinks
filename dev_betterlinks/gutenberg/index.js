// wordpress dependecies
const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;

// redux imports
import { betterlinksGutenStore } from 'redux/store';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { CustomSidebar } from 'gutenberg/components';
import { betterlinksFormat } from 'gutenberg/formats';

// Redux Works
fetch_links_data(true)(betterlinksGutenStore.dispatch)
	.then(() => {})
	.catch((err) => console.log('Error! fetch_links_data failed', { err }));

fetch_terms_data()(betterlinksGutenStore.dispatch)
	.then(() => {})
	.catch((err) => console.log('Error! fetch_terms_data failed', { err }));

fetch_settings_data()(betterlinksGutenStore.dispatch)
	.then(() => {})
	.catch((err) => console.log('Error! fetch_settings_data failed', { err }));

// Sidebar Panel in Gutenberg Edit 'page/post'
registerPlugin('betterlinks-sidebar', {
	render: CustomSidebar,
	icon: '',
});

// Betterlinks Formatting option for rich text. This option wil show up in the formats options when selecting some text from rich-text
const { name, ...settings } = betterlinksFormat;
registerFormatType(name, settings);
