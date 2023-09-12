import { __ } from '@wordpress/i18n';
export const redirectType = [
	{
		value: '307',
		label: __('307 (Temporary)', 'betterlinks'),
	},
	{
		value: '302',
		label: __('302 (Temporary)', 'betterlinks'),
	},
	{
		value: '301',
		label: __('301 (Permanent)', 'betterlinks'),
	},
];

export const affiliateLinkPosition = [
	{
		label: __('Top', 'betterlinks-pro'),
		value: 'top',
	},
	{
		label: __('Bottom', 'betterlinks-pro'),
		value: 'bottom',
	},
	{
		label: __('Top & Bottom', 'betterlinks-pro'),
		value: 'top-bottom',
	},
];
