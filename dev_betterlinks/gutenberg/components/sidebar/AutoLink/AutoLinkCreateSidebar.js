const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import { useState, useEffect } from 'react';
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { debounce, is_pro_enabled, shortURLUniqueCheckGutenberg, site_url } from 'utils/helper';
import ToggleTitle from '../../ToggleTitle';
import { EDIT_GUTENBERG_AUTO_LINK } from 'redux/actions/actionstrings';
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import AutoLinkInput from './AutoLinkInput';
import { autoLinkInputFieldWrapper } from './style';
import DisableCheckbox from './CheckBox';
import { __experimentalDivider as Divider } from '@wordpress/components';

const AutoLinkCreateSidebar = ({ ID, autoShortLink, onSetAutoShortLink }) => {
	const [isInputField, setInputField] = useState(false);
	const [isExists, setExists] = useState(false);
	const link = `${site_url}/`;

	useEffect(
		debounce(() => {
			shortURLUniqueCheckGutenberg(autoShortLink, ID).then((res) => {
				setExists(res);
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

	return (
		<PluginDocumentSettingPanel
			name="betterlinks-auto-create-link"
			title={<ToggleTitle is_pro_feature={true} title={__('Auto Create Link', 'betterlinks')} />}
			className="custom-panel"
			isOpen={true}
		>
			{is_pro_enabled && (
				<div className="betterlinks-auto-create-link">
					<p>{__('A Better short url for this post will be created on publish', 'betterlinks-pro')}</p>
					<div>
						<p className="components-base-control__help" style={{ marginBottom: 0 }}>
							<strong>{link}</strong>
						</p>
						<div style={autoLinkInputFieldWrapper}>
							<AutoLinkInput isInputField={isInputField} setInputField={setInputField} autoShortLink={autoShortLink} onSetAutoShortLink={onSetAutoShortLink} />
							<LinkCopyButton shortUrl={autoShortLink} />
						</div>
						{isExists && (
							<p className="components-base-control__help" style={{ color: 'red' }}>
								{__('Link already exists, try another..', 'betterlinks-pro')}
							</p>
						)}
						<Divider />
						<DisableCheckbox />
					</div>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
