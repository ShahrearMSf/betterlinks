import { __ } from '@wordpress/i18n';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import ToggleTitle from 'gutenberg/components/ToggleTitle';
import { useUpgradeProModal } from 'utils/customHooks';
import { is_pro_enabled } from 'utils/helper';
import { CheckboxControl, SelectControl } from '@wordpress/components';
import QuillEditor from 'components/QuillEditor';
import { useState, useEffect, useLayoutEffect } from 'react';
import {
	edit_gutenberg_affiliate,
	get_affiliate_link_disclosure_post,
	get_affiliate_link_disclosure_text,
	set_affiliate_link_disclosure_post,
	set_affiliate_link_disclosure_text,
} from 'redux/actions/gutenbergredirectlink.actions';
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { affiliateLinkPosition } from 'utils/data';
const { subscribe } = wp.data;

const { PluginDocumentSettingPanel, store: editStore } = wp.editPost;

const AffiliateLinkDisclosure = ({ enableAffiliateDisclosure }) => {
	const [isChecked, setChecked] = useState(true);
	const [postId, setPostId] = useState(null);
	const [affiliateLinkOptions, setAffiliateLinkOptions] = useState({});
	const [affiliatePosition, setAffiliatePosition] = useState(affiliateLinkOptions?.affiliate_link_position);
	const [html, setHtml] = useState('');
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const postType = wp.data.select('core/editor').getCurrentPostType();

	useEffect(() => {
		const postId = wp.data.select('core/editor').getCurrentPostId();
		if (postId) {
			setPostId(postId);
		}
		const handleFetch = async () => {
			const { data } = await get_affiliate_link_disclosure_post(postId);
			setChecked(data.includes('true'));
			edit_gutenberg_affiliate({
				enable_affiliate_disclosure: data.includes('true'),
			});
		};
		handleFetch();
	}, [postId]);

	useLayoutEffect(() => {
		const postId = wp.data.select('core/editor').getCurrentPostId();
		const handleAffiliateText = async () => {
			const { data } = await get_affiliate_link_disclosure_text(postId);
			setAffiliateLinkOptions(data);
			setAffiliatePosition(data?.affiliate_link_position);
			edit_gutenberg_affiliate(data);
		};
		handleAffiliateText();
	}, []);

	if (!is_pro_enabled) {
		return (
			<PluginDocumentSettingPanel
				name="betterlinks-affiliate-link-disclosure"
				title={<ToggleTitle is_pro_feature={true} title={__('Affiliate Link Disclosure', 'betterlinks')} />}
				className="custom-panel"
				isOpen={false}
			>
				<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
				<div className="betterlinks-affiliate-link-disclosure">
					<p>{__(`This will allow you to add an Affiliate Link Disclosure in this ${postType}`, 'betterlinks-pro')}</p>
					<>
						<div
							style={{
								display: 'flex',
								'flex-direction': 'column',
								'margin-bottom': '12px',
							}}
						>
							<label style={{ 'margin-bottom': '5px' }}>
								{__('Affiliate Disclosure Position', 'betterlinks')}
								<span className="pro-badge" onClick={openUpgradeToProModal}>
									{__('Pro', 'betterlinks')}
								</span>
							</label>
							<select disabled style={{ cursor: 'not-allowed' }}>
								<option>{__('Top', 'betterlinks')}</option>
							</select>
						</div>
						<div>
							<p className="components-base-control__help" style={{ marginBottom: '5px' }}>
								{__('Affiliate Text', 'betterlinks')}
								<label>
									<span className="pro-badge" onClick={openUpgradeToProModal}>
										{__('Pro', 'betterlinks')}
									</span>
								</label>
							</p>
							<textarea style={{ width: '100%', cursor: 'not-allowed' }} disabled></textarea>
						</div>
					</>
				</div>
			</PluginDocumentSettingPanel>
		);
	}

	const onSetAffiliateDisclosure = (bool) => {
		setChecked(bool);
		edit_gutenberg_affiliate({
			enable_affiliate_disclosure: bool,
		});
		set_affiliate_link_disclosure_post(postId, bool ? 'true' : 'false');
	};

	const onSetAffiliateDisclosurePosition = (position) => {
		edit_gutenberg_affiliate({
			affiliate_link_position: position,
		});
	};
	if (is_pro_enabled && enableAffiliateDisclosure) {
		return (
			<PluginDocumentSettingPanel
				name="betterlinks-affiliate-link-disclosure"
				title={<ToggleTitle is_pro_feature={true} title={__('Affiliate Link Disclosure', 'betterlinks')} />}
				className="custom-panel"
				isOpen={false}
			>
				<div className="betterlinks-affiliate-link-disclosure">
					<p>{__(`This will allow you to add an Affiliate Link Disclosure in this ${postType}`, 'betterlinks-pro')}</p>
					<CheckboxControl
						label={__('Enable Affiliate Disclosure on this post', 'betterlinks')}
						help=""
						checked={isChecked}
						onChange={() => {
							onSetAffiliateDisclosure(!isChecked);
						}}
					/>
					{isChecked && (
						<>
							{affiliateLinkOptions?.affiliate_link_position && (
								<SelectControl
									label={__('Disclosure Position', 'betterlinks')}
									options={affiliateLinkPosition}
									value={affiliatePosition}
									onChange={(position) => {
										setAffiliatePosition(position);
										onSetAffiliateDisclosurePosition(position);
									}}
								/>
							)}
							<QuillEditor html={html || affiliateLinkOptions?.affiliate_disclosure_text} setHtml={setHtml} />
						</>
					)}
				</div>
			</PluginDocumentSettingPanel>
		);
	}
};

(() => {
	subscribe(() => {
		if (
			wp.data.select('core/editor')?.isSavingPost() &&
			!wp.data.select('core/editor')?.isAutosavingPost() &&
			wp.data.select('core/editor')?.isCurrentPostPublished() &&
			wp.data.select('core/editor')?.getPermalink()
		) {
			const postId = wp.data.select('core/editor').getCurrentPostId();
			const gutenbergAffiliate = betterlinksGutenStore?.getState()?.gutenbergAffiliate || {};
			const settings = betterlinksGutenStore?.getState()?.settings?.settings;

			if (!gutenbergAffiliate?.enable_affiliate_disclosure) return false;

			if (is_pro_enabled && postId && settings.affiliate_link_disclosure) {
				set_affiliate_link_disclosure_text(postId, gutenbergAffiliate);
				return false;
			}
		}
	});
})();
export default AffiliateLinkDisclosure;
