const { PluginDocumentSettingPanel } = wp.editPost;
const { __ } = wp.i18n;
import { useState, useEffect } from 'react';
import LinkCopyButton from 'components/LinkCopyUrl/LinkCopyButton';
import { debounce, is_pro_enabled, shortURLUniqueCheckGutenberg, site_url } from 'utils/helper';
import { redirectType as redirectTypeObj } from 'utils/data';
import ToggleTitle from '../../ToggleTitle';
import { EDIT_GUTENBERG_AUTO_LINK } from 'redux/actions/actionstrings';
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import AutoLinkInput from './AutoLinkInput';
import { autoLinkInputFieldWrapper } from './style';
import DisableCheckbox from './CheckBox';
import { __experimentalDivider as Divider, SelectControl } from '@wordpress/components';
import { fetch_auto_link_create_settings, fetch_terms_by_link_id, fetch_terms_data } from 'redux/actions/terms.actions';

const AutoLinkCreateSidebar = ({ ID, autoShortLink, onSetAutoShortLink }) => {
	const [isInputField, setInputField] = useState(false);
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
	}, []);

	useEffect(() => {
		const postType = wp.data.select('core/editor').getCurrentPostType();
		let autoLinkStoreData = betterlinksGutenStore?.getState()?.gutenbergAutoLink;

		if (Object.keys(autoLinkStoreData).length > 0 && autoLinkStoreData.redirect_type) {
			setRedirectType(autoLinkStoreData.redirect_type || '307');
		}
		const getTermById = async () => {
			const AllTermsPromise = Promise.all([fetch_terms_by_link_id(ID), fetch_auto_link_create_settings()]);
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
						{!isChecked && (
							<>
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
								{terms && (
									<SelectControl
										label={__('Choose Category', 'betterlinks')}
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
											},
										});
									}}
								/>
							</>
						)}
						<DisableCheckbox isChecked={isChecked} setChecked={setChecked} />
					</div>
				</div>
			)}
		</PluginDocumentSettingPanel>
	);
};

export default AutoLinkCreateSidebar;
