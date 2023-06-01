const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { useState } = wp.element;
const { TextControl } = wp.components;
import { edit_gutenberg_link } from 'redux/actions/gutenbergredirectlink.actions';
import { is_pro_enabled, site_url, generateRandomSlug } from 'utils/helper';

const AutoLinkCreateTitle = ({ is_pro_enabled }) => {
	return (
		<>
			{__('Betterlinks Auto Create Link', 'betterlinks')}
			{!is_pro_enabled && <span className="pro-badge">{__('Pro', 'betterlinks')}</span>}
		</>
	);
};
const randomSlug = generateRandomSlug();

const AutoLinkCreateSidebar = ({ shortUrl, onSetShortUrl }) => {
	const { prefix } = window.betterLinksGlobal;
	const link = `${site_url}/${prefix}${!!prefix && '/'}`;

	return (
		<PluginDocumentSettingPanel name="betterlinks-auto-create-link" title={<AutoLinkCreateTitle is_pro_enabled={is_pro_enabled} />} className="custom-panel" isOpen={false}>
			<div className="betterlinks-auto-create-link">
				<p>A Better short url for this post will be created on publish</p>
				<p>
					<strong>{link}</strong>
					<TextControl
						value={shortUrl}
						onChange={(value) => {
							onSetShortUrl(value);
						}}
					/>
				</p>
			</div>
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
