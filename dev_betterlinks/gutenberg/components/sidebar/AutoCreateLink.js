const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
const { TextControl } = wp.components;
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { is_pro_enabled, site_url } from 'utils/helper';

const AutoLinkCreateTitle = ({ is_pro_enabled }) => {
	return (
		<>
			{__('Betterlinks Auto Create Link', 'betterlinks')}
			{!is_pro_enabled && <span className="pro-badge">{__('Pro', 'betterlinks')}</span>}
		</>
	);
};

const AutoLinkCreateSidebar = ({ autoShortLink, onSetAutoShortLink }) => {
	const { prefix } = window.betterLinksGlobal;
	const link = `${site_url}/${prefix}${!!prefix && '/'}`;

	return (
		<PluginDocumentSettingPanel name="betterlinks-auto-create-link" title={<AutoLinkCreateTitle is_pro_enabled={is_pro_enabled} />} className="custom-panel" isOpen={true}>
			{is_pro_enabled && (
				<div className="betterlinks-auto-create-link">
					<p>A Better short url for this post will be created on publish</p>
					<p>
						<strong>{link}</strong>
						<TextControl
							value={autoShortLink}
							onChange={(value) => {
								onSetAutoShortLink(value);
							}}
						/>
						<LinkCopyButton shortUrl={autoShortLink} />
					</p>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
