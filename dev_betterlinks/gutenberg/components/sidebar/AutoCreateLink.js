const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import { useState } from 'react';
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { is_pro_enabled, site_url } from 'utils/helper';
import ToggleTitle from '../ToggleTitle';

const AutoLinkCreateSidebar = ({ autoShortLink, onSetAutoShortLink }) => {
	const [isInputField, setInputField] = useState(false);
	const { prefix } = window.betterLinksGlobal;
	// const link = `${site_url}/${prefix}${!!prefix && '/'}`;
	const link = `${site_url}/`;

	return (
		<PluginDocumentSettingPanel
			name="betterlinks-auto-create-link"
			title={<ToggleTitle is_pro_feature={true} title={__('Auto Create Link', 'betterlinks')} />}
			className="custom-panel"
			isOpen={true}
		>
			{is_pro_enabled && (
				<div className="betterlinks-auto-create-link">
					<p>A Better short url for this post will be created on publish</p>
					<div>
						<strong>{link}</strong>
						<div
							style={{
								display: 'flex',
							}}
						>
							{isInputField ? (
								<input
									autoFocus
									type="text"
									value={autoShortLink}
									onChange={(e) => {
										onSetAutoShortLink(e.target.value);
									}}
									onBlur={() => setInputField(false)}
									style={{ flexGrow: '1' }}
								/>
							) : (
								<p onClick={() => setInputField(true)} style={{ flexGrow: '1', margin: 0, alignSelf: 'center' }}>
									{autoShortLink}
								</p>
							)}
							<LinkCopyButton shortUrl={autoShortLink} />
						</div>
					</div>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
