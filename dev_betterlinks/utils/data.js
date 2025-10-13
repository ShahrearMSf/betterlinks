import { __ } from '@wordpress/i18n';
import { is_fbs_enabled } from './helper';
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

export const redirectTypeForPasswordProtection = [
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

// Advanced Option Feature List
export const tabList = [
	{
		label: __('Custom Fields', 'betterlinks'),
		type: 'free',
	},
	{
		label: __('UTM Builder', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Quick Link Creation', 'betterlinks'),
		type: 'free',
	},
	is_fbs_enabled && {
		label: __('Fluent Boards Settings', 'betterlinks'),
		type: 'free',
	},
	{
		label: __('Tracking', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Auto-Create Links', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Affiliate Link Disclosure', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Password Protected Redirect', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Customize Link Preview', 'betterlinks'),
		type: 'pro',
	},
	{
		label: __('Auto-Link Keywords', 'betterlinks'),
		type: 'pro',
	},
].filter(Boolean);
