const { registerFormatType } = wp.richText;
const { registerPlugin } = wp.plugins;

import { CustomSidebar } from 'gutenberg/components';
import { betterlinksFormat } from 'gutenberg/formats';

// Sidebar Panel in Gutenberg Edit 'page/post'
registerPlugin('betterlinks-sidebar', {
	render: CustomSidebar,
	icon: '',
});

// Betterlinks Formatting option for rich text. This option wil show up in the formats options when selecting some text from rich-text
const { name, ...settings } = betterlinksFormat;
registerFormatType(name, settings);
