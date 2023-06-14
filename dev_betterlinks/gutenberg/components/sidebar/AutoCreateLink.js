const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import { useState, useEffect } from 'react';
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { debounce, is_pro_enabled, shortURLUniqueCheckGutenberg, site_url } from 'utils/helper';
import ToggleTitle from '../ToggleTitle';
import { EDIT_GUTENBERG_AUTO_LINK } from 'redux/actions/actionstrings';
import { betterlinksGutenStore } from 'redux/gutenbergStore';

const AutoLinkCreateSidebar = ({ ID, autoShortLink, onSetAutoShortLink }) => {
	const [isInputField, setInputField] = useState(false);
	const [isExists, setExists] = useState(false);
	const link = `${site_url}/`;

	useEffect(
		debounce(() => {
			shortURLUniqueCheckGutenberg(autoShortLink, ID).then((res) => {
				setExists(res);
				// if( res ) {
				// }
				betterlinksGutenStore.dispatch({
					type: EDIT_GUTENBERG_AUTO_LINK,
					payload: {
						link_exists: res,
					},
				});
			});
		}, 500),
		[autoShortLink]
	);
	// console.log(ID);
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
						{isExists && <p style={{ color: 'red' }}>Link Already Exists</p>}
					</div>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
