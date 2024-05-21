const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import { useState, useEffect } from 'react';
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { debounce, formatDate, is_pro_enabled, shortURLUniqueCheckGutenberg, site_url as site_link } from 'utils/helper';
import { redirectType as redirectTypeObj } from 'utils/data';
import ToggleTitle from '../../ToggleTitle';
import { EDIT_GUTENBERG_AUTO_LINK, SAVE_GUTENBERG_AUTO_LINK } from 'redux/actions/actionstrings';
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import AutoLinkInput from './AutoLinkInput';
import { autoLinkInputFieldWrapper } from './style';
import DisableCheckbox from './CheckBox';
import { SelectControl } from '@wordpress/components';
import { fetch_auto_link_create_settings, fetch_terms_by_link_id, fetch_terms_data } from 'redux/actions/terms.actions';
import { add_new_link, edit_link } from 'redux/actions/links.actions';
import { set_auto_short_links_disable_ids } from 'redux/actions/gutenbergredirectlink.actions';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
const { subscribe } = wp.data;

const AutoLinkCreateSidebar = ({ ID, autoShortLink, onSetAutoShortLink, openUpgradeToProModal, autoLinkCreateEnabled }) => {
	const site_url = betterLinksHooks.applyFilters('site_url', site_link);
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [isExists, setExists] = useState(false);
	const [terms, setTerms] = useState(false);
	const [savedCatId, setSavedCatId] = useState(false);
	const [redirectType, setRedirectType] = useState(false);
	const [isChecked, setChecked] = useState(false);
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

	useEffect(() => {
		const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
		if (storeTerms) {
			setTerms(storeTerms);
		} else {
			fetch_terms_data()(betterlinksGutenStore.dispatch)
				.then(() => {
					const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
					setTerms(storeTerms);
				})
				.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
		}
	}, [terms]);

	useEffect(() => {
		const postType = wp.data.select('core/editor').getCurrentPostType();
		let autoLinkStoreData = betterlinksGutenStore?.getState()?.gutenbergAutoLink;

		if (Object.keys(autoLinkStoreData).length > 0 && autoLinkStoreData.redirect_type) {
			setRedirectType(autoLinkStoreData.redirect_type || '307');
		}
		const getTermById = async () => {
			const AllTermsPromise = Promise.all([fetch_terms_by_link_id(ID), fetch_auto_link_create_settings()(betterlinksGutenStore.dispatch)]);
			try {
				const values = await AllTermsPromise;
				if (Array.isArray(values)) {
					const catId = values?.[0]?.[0]?.term_id || values?.[1]?.data?.[`${postType}_default_cat`];
					setSavedCatId(catId);
					betterlinksGutenStore.dispatch({
						type: EDIT_GUTENBERG_AUTO_LINK,
						payload: {
							cat_id: catId,
						},
					});
				}
			} catch (error) {
				console.log('--error is ', error);
			}
		};
		getTermById();
	}, [ID]);

	const getDefaultCatID = (savedCatID, terms) => {
		if (savedCatID && savedCatID != '') {
			return savedCatID;
		}
		if (terms.length > 0) {
			setSavedCatId(terms[0].ID);
			return terms[0].ID;
		}
		return null;
	};
	const handleAutoLinkCategory = (catId) => {
		setSavedCatId(catId);
		betterlinksGutenStore.dispatch({
			type: EDIT_GUTENBERG_AUTO_LINK,
			payload: {
				cat_id: catId,
				link_update: true,
			},
		});
	};
	const getDefaultRedirectType = (savedRedirectType) => {
		if (savedRedirectType && savedRedirectType != '') {
			return savedRedirectType;
		}
		setRedirectType('307');
		return '307';
	};
	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	if (!is_pro_enabled) {
		return (
			<PluginDocumentSettingPanel
				name="betterlinks-auto-create-link"
				title={<ToggleTitle is_pro_feature={true} title={__('Auto-Create Links', 'betterlinks')} />}
				className="custom-panel"
				isOpen={true}
			>
				<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
				<div className="betterlinks-auto-create-link">
					<p>{__('A BetterLink for this post will be generated on publish', 'betterlinks-pro')}</p>
					<div>
						<div
							style={{
								display: 'flex',
								'flex-direction': 'column',
								'margin-bottom': '12px',
							}}
						>
							<p className="components-base-control__help" style={{ marginBottom: '5px' }}>
								<span style={{ display: 'inline-block', 'margin-bottom': '7px' }}>{link}</span>
								<label>
									<span className="pro-badge" onClick={openUpgradeToProModal}>
										{__('Pro', 'betterlinks')}
									</span>
								</label>
							</p>
							<input type="text" placeholder="go/3df796" style={{ width: '100%' }} disabled />
						</div>
						<div
							style={{
								display: 'flex',
								'flex-direction': 'column',
								'margin-bottom': '12px',
							}}
						>
							<label style={{ 'margin-bottom': '5px' }}>
								{__('BetterLinks Category', 'betterlinks')}
								<span className="pro-badge" onClick={openUpgradeToProModal}>
									{__('Pro', 'betterlinks')}
								</span>
							</label>
							<select disabled>
								<option>{__('Uncategorized', 'betterlinks')}</option>
							</select>
						</div>
						<div
							style={{
								display: 'flex',
								'flex-direction': 'column',
								'margin-bottom': '12px',
							}}
						>
							<label style={{ 'margin-bottom': '5px' }}>
								{__('Redirect Type', 'betterlinks')}
								<span className="pro-badge" onClick={openUpgradeToProModal}>
									{__('Pro', 'betterlinks')}
								</span>
							</label>
							<select disabled>
								<option>{__('307 (Temporary)', 'betterlinks')}</option>
							</select>
						</div>
					</div>
				</div>
			</PluginDocumentSettingPanel>
		);
	}
	if (is_pro_enabled && autoLinkCreateEnabled) {
		return (
			<PluginDocumentSettingPanel
				name="betterlinks-auto-create-link"
				title={<ToggleTitle is_pro_feature={true} title={__('Auto-Create Links', 'betterlinks')} />}
				className="custom-panel"
				isOpen={true}
			>
				{is_pro_enabled && (
					<div className="betterlinks-auto-create-link">
						<p>{__('A BetterLink for this post will be generated on publish', 'betterlinks-pro')}</p>
						<div>
							<DisableCheckbox isChecked={isChecked} setChecked={setChecked} ID={ID} />
							{!isChecked && (
								<>
									<p className="components-base-control__help" style={{ marginBottom: '5px' }}>
										{link}
									</p>
									<div style={autoLinkInputFieldWrapper}>
										<AutoLinkInput autoShortLink={autoShortLink} onSetAutoShortLink={onSetAutoShortLink} />
										<LinkCopyButton shortUrl={autoShortLink} />
									</div>
									{isExists && (
										<p className="components-base-control__help" style={{ color: 'red' }}>
											{__('Link already exists, try another..', 'betterlinks-pro')}
										</p>
									)}
									{terms && (
										<SelectControl
											label={__('BetterLinks Category', 'betterlinks')}
											value={getDefaultCatID(savedCatId, terms)}
											options={terms
												.filter((item) => item.term_type == 'category')
												.map((item) => ({
													value: item.ID,
													label: item.term_name,
												}))}
											onChange={(catId) => handleAutoLinkCategory(catId)}
										/>
									)}
									<SelectControl
										label={__('Redirect Type', 'betterlinks')}
										options={[
											...redirectTypeObj,
											{
												value: 'cloak',
												label: __('Cloaked', 'betterlinks'),
											},
										]}
										value={getDefaultRedirectType(redirectType)}
										onChange={(mode) => {
											setRedirectType(mode);
											betterlinksGutenStore.dispatch({
												type: EDIT_GUTENBERG_AUTO_LINK,
												payload: {
													redirect_type: mode,
													link_update: true,
												},
											});
										}}
									/>
								</>
							)}
						</div>
					</div>
				)}
			</PluginDocumentSettingPanel>
		);
	}
};

(() => {
	let lastChangedTimeStamp = window.betterlinksInstantGutenbergChangeTimeStamp;
	subscribe(() => {
		if (
			wp.data.select('core/editor')?.isSavingPost() &&
			!wp.data.select('core/editor')?.isAutosavingPost() &&
			wp.data.select('core/editor')?.isCurrentPostPublished() &&
			wp.data.select('core/editor')?.getPermalink()
			// betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.target_url.trim() != ''
		) {
			// const isSameInstantGutenbergData = lastChangedTimeStamp === window.betterlinksInstantGutenbergChangeTimeStamp;
			// lastChangedTimeStamp = window.betterlinksInstantGutenbergChangeTimeStamp;
			// if (isSameInstantGutenbergData) return false;
			const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			const permalink = wp.data.select('core/editor').getPermalink();
			const currentPost = wp.data.select('core/editor').getCurrentPost();
			const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
			const postId = wp.data.select('core/editor').getCurrentPostId();
			const autoLinkSettings = betterlinksGutenStore?.getState()?.autoLinkSettings?.autoLinkSettings?.data || {};

			const link_title = currentPost.title;
			const link_slug = currentPost.slug;
			const postType = currentPost.type;
			// auto create links
			let autoLinkStoreData = { ...(betterlinksGutenStore?.getState()?.gutenbergAutoLink || {}) };

			if (typeof autoLinkStoreData?.old_disable_auto_short_link === 'boolean' && autoLinkStoreData?.old_disable_auto_short_link !== autoLinkStoreData?.disable_auto_short_link) {
				set_auto_short_links_disable_ids(postId, autoLinkStoreData?.disable_auto_short_link ? '1' : '0');
				return false;
			}

			if (autoLinkStoreData?.disable_auto_short_link) {
				return false;
			}

			const autoLinkFreeParams = {
				ID: '',
				cat_id: '',
				target_url: '',
				link_title: '',
				link_slug: '',
				link_modified: '',
				link_modified_gmt: '',
				short_url: '',
				redirect_type: '307',
				nofollow: true,
				param_forwarding: false,
				sponsored: true,
				track_me: true,
			};

			if (is_pro_enabled && autoLinkSettings?.[`${postType}_shortlinks`]) {
				if (!autoLinkStoreData.hasOwnProperty('ID')) {
					autoLinkStoreData = {
						...autoLinkFreeParams,
						...autoLinkStoreData,
						short_url: autoLinkStoreData.short_url,
						link_title,
						link_slug,
						link_modified: currentDate,
						link_modified_gmt: currentDate,
						target_url: permalink,
					};
				}

				// if (typeof autoLinkStoreData?.link_update !== 'boolean') return false;
				if (autoLinkStoreData?.short_url !== '') {
					if (autoLinkStoreData.ID) {
						edit_link(
							autoLinkStoreData,
							true
						)(betterlinksGutenStore.dispatch)
							.then((response) => {
								const data = response?.data?.data;
								const short_url = data.short_url;
								if (data) {
									betterlinksGutenStore.dispatch({
										type: SAVE_GUTENBERG_AUTO_LINK,
										payload: {
											...data,
										},
									});
									return;
								}
							})
							.catch((error) => console.error(error));
					} else {
						add_new_link(
							autoLinkStoreData,
							true,
							false
						)(betterlinksGutenStore.dispatch)
							.then((response) => {
								const data = response?.data?.data;
								if (data) {
									betterlinksGutenStore.dispatch({
										type: SAVE_GUTENBERG_AUTO_LINK,
										payload: {
											...data,
										},
									});
									return;
								}
							})
							.catch((error) => console.error(error));
					}
				}
			}
		}
	});
})();

export default AutoLinkCreateSidebar;
