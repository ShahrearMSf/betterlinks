const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { is_pro_enabled, site_url, plugin_root_url } from 'utils/helper';

const AutoLinkCreateTitle = ({ is_pro_enabled }) => {
	return (
		<>
			<img width="15" src={plugin_root_url + '/assets/images/logo-large.svg'} style={{ marginRight: '5px' }} />
			{__('Auto Create Link', 'betterlinks')}
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
						<div
							style={{
								display: 'flex',
							}}
						>
							<input
								type="text"
								value={autoShortLink}
								onChange={(e) => {
									onSetAutoShortLink(e.target.value);
								}}
							/>
							<LinkCopyButton shortUrl={autoShortLink} />
						</div>
					</p>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
