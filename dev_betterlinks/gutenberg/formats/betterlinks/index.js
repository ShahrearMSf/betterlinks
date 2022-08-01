const { __ } = wp.i18n;
const { RichTextToolbarButton } = wp.blockEditor;

import { betterlinksIcon } from './icon';

const name = 'betterlinks/link-format';
const title = __('Betterlinks');

export const betterlinksFormat = {
	name,
	title,
	tagName: 'a',
	className: 'betterlinks-linked-text',
	attributes: {
		url: 'href',
		target: 'target',
	},
	edit: ({ isActive }) => <RichTextToolbarButton icon={betterlinksIcon} title={title} isActive={isActive} />,
};
