// wordpress dependecies
const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;
const { Fragment, useState, useEffect } = wp.element;

// redux imports
import { gutenStore } from 'redux/store';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { CustomSidebar } from 'gutenberg/components';
import { betterlinksFormat } from 'gutenberg/formats';

// Redux Works
const state = gutenStore.getState();

const fetchedLinksData = fetch_links_data()(gutenStore.dispatch)
	.then((res) => console.log('fetched all links', { res }))
	.catch((err) => console.log({ err }));

const fetchedTermsData = fetch_terms_data()(gutenStore.dispatch)
	.then((res) => console.log('fetched all terms', { res }))
	.catch((err) => console.log({ err }));

const fetchedSettingsData = fetch_settings_data()(gutenStore.dispatch)
	.then((res) => console.log('fetched all settings', { res }))
	.catch((err) => console.log({ err }));

console.log('----redux gutenStore in gutenberg', { gutenStore, state, fetchedTermsData, fetchedLinksData, fetchedSettingsData });

gutenStore.subscribe(() => {
	const state = gutenStore.getState();
	console.log('----getState inside subscribe', { gutenStore, state });
});

//
// Sidebar Panel in Gutenberg Edit 'page/post'
registerPlugin('betterlinks-sidebar', {
	render: CustomSidebar,
	icon: '',
});

// Betterlinks Formatting option for rich text. This option wil show up in the formats options when selecting some text from rich-text
const { name, ...settings } = betterlinksFormat;
registerFormatType(name, settings);
