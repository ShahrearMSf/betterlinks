import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import Select from 'components/Select';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

//👇 slight tweak (renamed 'fetch_terms_data' to 'fetch_terms_action_function') to use the <Link /> component inside gutenberg
import { fetch_terms_data as fetch_terms_action_function } from 'redux/actions/terms.actions';

import {
	modalCustomStyles,
	modalCustomSmallStyles,
	site_url as site_link,
	generateSlug,
	generateShortURL,
	formatDate,
	plugin_root_url,
	is_pro_enabled,
	add_top_loader,
	remove_top_loader,
	shortURLUniqueCheck,
	makeRequest,
} from 'utils/helper';
import { redirectType, redirectTypeForPasswordProtection } from 'utils/data';
import Category from 'components/Terms/Category';
import Tags from 'components/Terms/Tags';
import Copy from 'components/Copy';
import UTMBuilder from 'components/UTMBuilder';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import CustomizeLinkPreview from 'components/CustomizeLinkPreview';
import CustomTrackingScripts from 'components/CustomTrackingScripts';
import { fetch_tracking_settings } from 'redux/actions/settings.actions';
import LinkFields from 'components/CustomFields/LinkFields';
import FetchedTitleConfirmation from 'components/Link/FetchedTitleConfirmation';

const propTypes = {
	isShowIcon: PropTypes.bool,
	catId: PropTypes.number,
	catName: PropTypes.string,
	data: PropTypes.object,
	submitHandler: PropTypes.func,
};

const defaultProps = {
	isShowIcon: true,
};

export const Link = (props) => {
	const {
		isShowIcon,
		catId,
		data,
		submitHandler, // this is add_new_link function
		fetch_terms_data,

		//👇 these flowwowing props will be passed from the component's gutenberg call
		betterlinksGutenStore,
		setShowLinkModal = () => {},
		searchFieldRef,
		linkNewTab,
	} = props;

	//👇 slight tweaks to use <Link /> component inside gutenberg start
	const settings = betterlinksGutenStore ? betterlinksGutenStore?.getState()?.settings : props.settings;
	const terms = betterlinksGutenStore ? betterlinksGutenStore?.getState()?.terms : props.terms;
	window.betterLinksHooks = betterlinksGutenStore ? { applyFilters: (handle, defaultVal) => defaultVal } : window.betterLinksHooks;
	//👆 slight tweaks to use <Link /> component inside gutenberg end

	// 👇 password protection
	const passwords = props.password;

	// 👇 Customized Meta Tags
	const { metaTags } = props.metaTags || {};

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isFetchTerms, setIsFetchTerms] = useState(false);
	const [slugIsExists, setSlugIsExists] = useState(false);
	const [modalUTMIsOpen, setModalUTMIsOpen] = useState(false);
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [isShowCustomUTMModalContent, setIsShowCustomUTMModalContent] = useState(true);
	const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
	const isDisableLinkFormEditView = betterLinksHooks.applyFilters('isDisableLinkFormEditView', false, data);
	const [isOpenLinkPanel, setOpenLinkPanel] = useState({
		options: true,
		advanced: false,
		dynamicRedirect: false,
		optimizeMetaTags: false,
		customTrackingScripts: false,
	});
	const [password, setPassword] = useState(null);
	const [metaTag, setMetaTag] = useState(null);
	const [fetchedTitle, setFetchedTitle] = useState(null);

	const customFields = settings?.settings?.customFields || [];

	useEffect(() => {
		if (data?.ID && passwords?.password && Object.values(passwords.password).length > 0) {
			const password = Object.values(passwords.password).find((item) => item.link_id == data.ID);
			setPassword(password);
		}
	}, [passwords]);

	useEffect(() => {
		if (data?.ID && metaTags && Object.values(metaTags).length > 0) {
			const metaTag = Object.values(metaTags).find((item) => item.link_id == data.ID);
			setMetaTag(metaTag);
		}
	}, [metaTags]);
	//👇 this useEffect is only for this 'Link' component's gutenberg implementation start
	useEffect(() => {
		if (betterlinksGutenStore) {
			setModalIsOpen(true);
		}
		return () => {
			if (searchFieldRef?.current) {
				searchFieldRef?.current?.focus();
			}
		};
	}, [betterlinksGutenStore, password]);
	// 👆 this useEffect is only for this 'Link' component's gutenberg implementation end

	//👇 this variable 'objForGutenTargetBlank' added to handle the 'open in new tab' option in gutenberg format
	const objForGutenTargetBlank = betterlinksGutenStore
		? {
				openInNewTab: linkNewTab,
		  }
		: {};

	const initialValues = {
		link_title: '',
		link_slug: '',
		target_url: '',
		short_url: generateShortURL(settings.settings, null),
		link_note: '',
		link_date: currentDate,
		link_date_gmt: currentDate,
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		cat_id: catId ? catId : null,
		...settings.settings,
		...objForGutenTargetBlank,
	};
	const initialUpdateValues = {
		...settings.settings,
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		cat_id: catId,
		old_short_url: data ? data.short_url : '',
		...data,
		...objForGutenTargetBlank,
		enable_password: password && '1' === password.status,
		old_enable_password: password && '1' === password.status,
		password: password && password?.password,
		old_allow_visitor_contact: password && '1' === password?.allow_contact,
		allow_visitor_contact: password && '1' === password?.allow_contact,
	};

	function openModal() {
		setIsFetchTerms(true);

		//👇 this line added because for gutenberg implementaton 'fetch_terms_data' function call isn't needed
		if (betterlinksGutenStore) return false;

		if (terms?.terms) {
			setModalIsOpen(true);
			setIsFetchTerms(false);
		} else {
			fetch_terms_data().then(() => {
				setModalIsOpen(true);
				setIsFetchTerms(false);
			});
		}
	}

	function closeModal() {
		//👇 this following code is only for gutenberg implementation of the 'Link' component & to make sure memory leak doesn't happen ('Can't perform a React state update on an unmounted component')
		if (betterlinksGutenStore) {
			setShowLinkModal(false);
		} else {
			setModalIsOpen(false);
		}
	}

	const openUTMModal = () => {
		setModalIsOpen(true);
		setModalUTMIsOpen(true);
	};

	const builtInUTMModalOpenHandler = () => {
		if (is_pro_enabled) {
			setIsShowCustomUTMModalContent(false);
			openUTMModal();
		} else {
			openUpgradeToProModal();
		}
	};

	const closeUTMModal = () => {
		setIsShowCustomUTMModalContent(true);
		setModalUTMIsOpen(false);
	};

	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};
	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	const onSubmit = (values) => {
		const { short_url } = values;
		values.short_url = short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
		shortURLUniqueCheck(values.short_url, values.ID, setSlugIsExists).then((isDuplicate) => {
			if (!isDuplicate) {
				if (!values.cat_id) {
					const { ID } = terms.terms.filter((item) => item.term_slug == 'uncategorized')[0];
					values.cat_id = ID;
				}
				if (!values.link_slug) {
					values.link_slug = generateSlug(values.link_title);
				}
				if (isNaN(values?.cat_id)) {
					values.cat_slug = generateSlug(values.cat_id);
				}
				values.wildcards = Number(values.short_url.includes('*'));
				if (values.cat_id) {
					const link_title = values.link_title.trim();
					if (link_title) {
						values.link_title = link_title;
						// 👇 the 'if statement' is to fix memory leak warning 'Can't perform a React state update on an unmounted component' when using this <Link /> component for gutenberg format
						if (!betterlinksGutenStore) {
							submitHandler(values);
							setModalIsOpen(false);
						} else {
							submitHandler(values)
								.then((response) => {
									if (response?.data) {
										setShowLinkModal(false);
									}
									remove_top_loader(document);
								})
								.catch((error) => console.log('---error (submitHandler)--', { error }));
							add_top_loader(document);
						}
					}
				}
			}
		});
	};

	const togglePanel = (type) => {
		setOpenLinkPanel({
			options: false,
			advanced: false,
			dynamicRedirect: false,
			[type]: !isOpenLinkPanel[type],
		});
	};

	const __handleToggle = (toggle) => {
		togglePanel(toggle);
	};

	const fetchTargetURL = useCallback(
		_.debounce(async (target_url, setFieldValue, willUpdate, previousTitle) => {
			try {
				const res = await makeRequest({
					action: 'betterlinks__fetch_target_url',
					target_url,
				});
				if (res.data.result) {
					let fetchedTitle = res.data.result?.title;
					if (fetchedTitle === previousTitle) return;
					let short_url = null;
					if (fetchedTitle.length > 20) {
						short_url = fetchedTitle
							.split(' ')
							.map((item) => item[0])
							.join('');
					}
					if (!willUpdate) {
						setFetchedTitle(fetchedTitle);
						return;
					}
					handleTitleChange(setFieldValue, fetchedTitle || '', short_url);
				}
			} catch (error) {
				console.log(error);
			}
		}, 500),
		[settings.settings]
	);

	const handleTitleChange = (setFieldValue, title, short_url = null) => {
		setFieldValue('link_title', title);
		if (!data) {
			let shortURL = generateShortURL(settings.settings, short_url || title);
			if (shortURL.length > 0) {
				setFieldValue('short_url', shortURL);
				setSlugIsExists(false);
			}
		}
	};

	const submitLinkHandler = (values, actions) => {
		const { setSubmitting, setFieldError } = actions;
		setSubmitting(false);

		const regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
		if (regex.test(values.link_title)) {
			setFieldError('link_title', __('Please ensure the link title does not contain any script.', 'betterlinks'));
			return;
		}

		if (values?.enable_custom_scripts && !values?.custom_tracking_scripts) {
			setFieldError('custom_tracking_scripts', true);
			return;
		}
		onSubmit(values);
	};

	const site_url = (is_pro_enabled && localStorage.getItem('btl_custom_domain')) || site_link;

	return (
		<>
			{data ? (
				<button onClick={openModal} className={`dnd-link-button ${isFetchTerms ? 'btl-rotating' : ''}`}>
					<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{props.children}</span>
					{!props.children && <span className="icon">{!isFetchTerms ? <i className="btl btl-edit"></i> : <i className="btl btl-reload"></i>}</span>}
				</button>
			) : (
				<button onClick={openModal} className={`btl-create-link-button ${isShowIcon && isFetchTerms ? 'btl-rotating' : ''}`}>
					{isShowIcon ? <i className="btl btl-add"></i> : __('Add New Link', 'betterlinks')} {!isShowIcon && isFetchTerms ? ' ...' : ''}
				</button>
			)}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel" />
				</span>
				<Formik initialValues={betterLinksHooks.applyFilters('linkFormInitialValues', data ? initialUpdateValues : initialValues)} onSubmit={submitLinkHandler}>
					{(props) => {
						const redirectionTypes = props.values?.enable_password ? redirectTypeForPasswordProtection : redirectType;
						const { errors } = props;
						return (
							<Form className="w-100">
								<div className="btl-entry-content">
									<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
									<Modal isOpen={modalUTMIsOpen} onRequestClose={closeUTMModal} style={modalCustomSmallStyles} ariaHideApp={false}>
										<span className="btl-close-modal" onClick={closeUTMModal}>
											<i className="btl btl-cancel" />
										</span>
										{isShowCustomUTMModalContent ? (
											<React.Fragment>
												{betterLinksHooks.applyFilters(
													'linksUTMBuilderField',
													<UTMBuilder targetUrl={props.values.target_url} saveValueHandler={props.setFieldValue} closeModalHandler={closeUTMModal} />,
													props.values.target_url,
													props.setFieldValue,
													closeUTMModal
												)}
											</React.Fragment>
										) : (
											<React.Fragment>
												{betterLinksHooks.applyFilters('linksBuiltInUTMBuilderField', '', props.values.target_url, props.setFieldValue, closeUTMModal)}
											</React.Fragment>
										)}
									</Modal>
									<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label btl-required" htmlFor="link_title">
												{__('Title', 'betterlinks')}
											</label>
											<div className="btl-modal-form-title-wrapper">
												<div
													style={{
														display: 'flex',
														flexDirection: 'column',
														width: '100%',
													}}
												>
													<Field
														className="btl-modal-form-control"
														id="link_title"
														name="link_title"
														disabled={isDisableLinkFormEditView}
														onChange={(e) => {
															handleTitleChange(props.setFieldValue, e.target.value);
														}}
														required
													/>
													{errors.link_title && <span style={{ color: 'red' }}>{errors.link_title}</span>}
												</div>
												{fetchedTitle && (
													<FetchedTitleConfirmation
														fetchedTitle={fetchedTitle}
														handleYes={() => {
															handleTitleChange(props.setFieldValue, fetchedTitle);
															setFetchedTitle(null);
														}}
														handleNo={() => setFetchedTitle(null)}
													/>
												)}
											</div>
										</div>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label" htmlFor="link_note">
												{__('Description', 'betterlinks')}
											</label>
											<Field className="btl-modal-form-control" component="textarea" id="link_note" name="link_note" disabled={isDisableLinkFormEditView} />
										</div>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label btl-required" htmlFor="redirect_type">
												{__('Redirect Type', 'betterlinks')}
											</label>
											<Select
												id="redirect_type"
												name="redirect_type"
												value={[
													...redirectionTypes,
													{
														value: is_pro_enabled ? 'cloak' : 'pro',
														label: __('Cloaked', 'betterlinks'),
													},
												]}
												setUpgradeToProModal={setUpgradeToProModal}
												setFieldValue={props.setFieldValue}
												disabled={isDisableLinkFormEditView}
												isMulti={false}
												enable_password={props.values?.enable_password}
											/>
										</div>
										<div className="btl-modal-form-group btl-has-utm-button">
											<label className="btl-modal-form-label btl-required" htmlFor="target_url">
												{__('Target URL', 'betterlinks')}
											</label>
											<Field
												className="btl-modal-form-control"
												id="target_url"
												name="target_url"
												onChange={(e) => {
													const target_url = e.target.value.replace(/\s+/g, '');
													props.setFieldValue('target_url', target_url);
													const willUpdateTitle = '' === props.values?.link_title;
													fetchTargetURL(target_url, props.setFieldValue, willUpdateTitle, props.values?.link_title);
												}}
												placeholder=""
												disabled={isDisableLinkFormEditView}
												required
											/>
											<div className="btl-utm-button-group">
												<button type="button" className="btl-utm-button" onClick={openUTMModal} disabled={isDisableLinkFormEditView}>
													{__('UTM', 'betterlinks')}
												</button>
												{!is_pro_enabled ? (
													<button type="button" className="btl-share-button btl-share-button--locked" onClick={builtInUTMModalOpenHandler} disabled={isDisableLinkFormEditView}>
														<i className="btl btl-share"></i>
														<img className="locked" src={plugin_root_url + 'assets/images/lock-round.svg'} alt="icon" />
													</button>
												) : (
													<button type="button" className="btl-share-button" onClick={builtInUTMModalOpenHandler} disabled={isDisableLinkFormEditView}>
														<i className="btl btl-share"></i>
													</button>
												)}
											</div>
										</div>
										<div className="btl-modal-shorturl-wrap">
											<div className="btl-modal-form-group shorturl">
												<label className="btl-modal-form-label" htmlFor="short_url">
													{__('Shortened URL', 'betterlinks')}
												</label>
												<div className={slugIsExists ? 'btl-link-field-copyable is-invalid' : 'btl-link-field-copyable'}>
													<span className="btl-static-link">{site_url + '/'}</span>
													<Field
														className="btl-dynamic-link"
														id="short_url"
														name="short_url"
														onChange={(e) => {
															props.setFieldValue('short_url', e.target.value.replace(/\s+/g, '-'));
															setSlugIsExists(false);
														}}
														disabled={isDisableLinkFormEditView}
														required
													/>
													<Copy siteUrl={site_url} shortUrl={props.values.short_url} />
												</div>
											</div>
											{slugIsExists == true && <div className="errorlog">Already Exists</div>}
										</div>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label" htmlFor="catId">
												{__('Category', 'betterlinks')}
											</label>
											<Category catId={parseInt(catId)} data={terms} fieldName="cat_id" setFieldValue={props.setFieldValue} disabled={isDisableLinkFormEditView} />
										</div>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label" htmlFor="tags">
												{__('Tags', 'betterlinks')}
											</label>
											<Tags linkId={data ? parseInt(data.ID) : 0} fieldName="tags_id" data={terms} setFieldValue={props.setFieldValue} disabled={isDisableLinkFormEditView} />
										</div>
										{/* Custom Native Fields are here */}
										{customFields?.length > 0 && <LinkFields props={props} customFields={customFields} />}

										{betterLinksHooks.applyFilters('isShowLinkSubmitButton', true, data) && (
											<div className="btl-modal-form-group btl-modal-form-group-submit">
												<label className="btl-modal-form-label"></label>
												<button type="submit" className="btl-modal-submit-button">
													{data ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
												</button>
											</div>
										)}
									</div>
									<div className="btl-entry-content-right">
										<div className={`link-options ${isOpenLinkPanel.options ? 'link-options--open' : ''}`}>
											<button className="link-options__head" type="button" onClick={() => togglePanel('options')}>
												<h4 className="link-options__head--title">{__('Link Options', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
											</button>
											<div className="link-options__body">
												{betterlinksGutenStore && (
													<label className="btl-checkbox-field">
														<Field
															className="btl-check"
															name="openInNewTab"
															type="checkbox"
															onChange={() => props.setFieldValue('openInNewTab', !props.values.openInNewTab)}
															disabled={false}
														/>
														<span className="text">
															{__('Open In New Tab', 'betterlinks')}
															<div className="btl-tooltip">
																<span className="dashicons dashicons-info-outline"></span>
																<span className="btl-tooltiptext">{__('This will open your link in a new tab when clicked', 'betterlinks')}</span>
															</div>
														</span>
													</label>
												)}

												<label className="btl-checkbox-field">
													<Field
														className="btl-check"
														name="nofollow"
														type="checkbox"
														onChange={() => props.setFieldValue('nofollow', !props.values.nofollow)}
														disabled={isDisableLinkFormEditView}
													/>
													<span className="text">
														{__('No Follow', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field">
													<Field
														className="btl-check"
														name="sponsored"
														type="checkbox"
														onChange={() => props.setFieldValue('sponsored', !props.values.sponsored)}
														disabled={isDisableLinkFormEditView}
													/>
													<span className="text">
														{__('Sponsored', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field">
													<Field
														className="btl-check"
														name="param_forwarding"
														type="checkbox"
														onChange={() => props.setFieldValue('param_forwarding', !props.values.param_forwarding)}
														disabled={isDisableLinkFormEditView}
													/>
													<span className="text">
														{__('Parameter Forwarding', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will pass the parameters you have set in the target URL', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field">
													<Field
														className="btl-check"
														name="track_me"
														type="checkbox"
														onChange={() => props.setFieldValue('track_me', !props.values.track_me)}
														disabled={isDisableLinkFormEditView}
													/>
													<span className="text">
														{__('Tracking', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will let you check Analytics report of your links', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												{!is_pro_enabled && (
													<label className="btl-checkbox-field link-options--teasers" onClick={() => openUpgradeToProModal()}>
														<Field
															disabled={true}
															className="btl-check"
															type="checkbox"
															checked={false}
															onChange={() => openUpgradeToProModal()}
															onClick={() => openUpgradeToProModal()}
														/>
														<span className="text">
															{__('Uncloak', 'betterlinks')}
															<span class="pro-badge">Pro</span>
															<div className="btl-tooltip">
																<span className="dashicons dashicons-info-outline"></span>
																<span className="btl-tooltiptext">{__('This will uncloak your link', 'betterlinks')}</span>
															</div>
														</span>
													</label>
												)}
												{betterLinksHooks.applyFilters('linkOptionsBasic', null, { ...props, isDisableLinkFormEditView, Field, ...settings })}
											</div>
										</div>
										{!betterlinksGutenStore && (
											<>
												<div className={`link-options link-options--advanced ${isOpenLinkPanel.advanced ? 'link-options--open' : ''}`}>
													<button className="link-options__head" type="button" onClick={() => togglePanel('advanced')}>
														<h4 className="link-options__head--title">{__('Advanced', 'betterlinks')}</h4>
														<i className="btl btl-angle-arrow-down"></i>
													</button>
													{!is_pro_enabled && (
														<div className="link-options__body">
															<div className="link-options--teasers">
																<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
																	<label className="btl-modal-form-label" htmlFor="status">
																		{__('Status', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
																	</label>
																	<select id="status" disabled>
																		<option value="publish">{__('Active', 'betterlinks')}</option>
																		<option value="expired">{__('Expired', 'betterlinks')}</option>
																		<option value="draft">{__('Draft', 'betterlinks')}</option>
																	</select>
																</div>
																<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
																	<label className="btl-modal-form-label" htmlFor="expire">
																		{__('Expire', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
																	</label>
																	<input id="expire" type="checkbox" disabled />
																</div>
																<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
																	<label className="btl-modal-form-label">
																		{__('Password Protection', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
																	</label>
																	<input id="enable_password" type="checkbox" disabled />
																</div>
															</div>
														</div>
													)}
													<>{betterLinksHooks.applyFilters('linkOptionsAdvanced', null, { ...props, ...settings, password, metaTag })}</>
												</div>
												<div className={`link-options link-options--dynamic-redirect ${isOpenLinkPanel.dynamicRedirect ? 'link-options--open' : ''}`}>
													<button className="link-options__head" type="button" onClick={() => togglePanel('dynamicRedirect')}>
														<h4 className="link-options__head--title">
															{__('Dynamic Redirects', 'betterlinks')}{' '}
															{is_pro_enabled && props.values.dynamic_redirect && props.values.dynamic_redirect.type && props.values.dynamic_redirect.type !== 'none' ? (
																<span className="status">{__('ON', 'betterlinks')}</span>
															) : (
																''
															)}
														</h4>{' '}
														<i className="btl btl-angle-arrow-down"></i>
													</button>
													<div className="link-options__body">
														{!is_pro_enabled && (
															<div className="link-options--teasers" onClick={() => openUpgradeToProModal()}>
																<div className="link-options-info">
																	<ul>
																		<li>
																			<label>
																				{__('Redirection Type:', 'betterlinks')}
																				<span className="pro-badge">Pro</span>
																			</label>
																		</li>
																		<li>
																			<label>
																				{__('Target URL 1:', 'betterlinks')}
																				<span className="pro-badge">Pro</span>
																			</label>
																			<input type="text" value="example-1.com" disabled />
																		</li>
																		<li>
																			<label>
																				{__('Target URL 2:', 'betterlinks')}
																				<span className="pro-badge">Pro</span>
																			</label>
																			<input type="text" value="example-2.com" disabled />
																		</li>
																		<li>
																			<label>
																				{__('Split Test:', 'betterlinks')}
																				<span className="pro-badge">Pro</span>
																			</label>
																			<input id="splittest" type="checkbox" disabled />
																		</li>
																	</ul>
																</div>
															</div>
														)}
														{betterLinksHooks.applyFilters('linkOptionsDynamicRedirect', null, props)}
													</div>
												</div>
												{/* Customize Link Preview */}
												<CustomizeLinkPreview
													openAccordion={isOpenLinkPanel.optimizeMetaTags}
													openUpgradeToProModal={openUpgradeToProModal}
													form={props}
													settings={settings}
													metaTag={metaTag}
													__handleToggle={__handleToggle}
												/>
												{/* Custom Tracking Scripts */}
												<CustomTrackingScripts
													openAccordion={isOpenLinkPanel.customTrackingScripts}
													openUpgradeToProModal={openUpgradeToProModal}
													__handleToggle={__handleToggle}
													props={{ ...props, tracking: settings?.tracking, Field }}
												/>
												{!is_pro_enabled && (
													<div>
														<div className={`link-options link-options--auto-link-keywords`}>
															<button className="link-options__head" type="button" onClick={() => openUpgradeToProModal()}>
																<h4 className="link-options__head--title">
																	{__('Auto-Link Keywords', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
																</h4>
															</button>
														</div>
													</div>
												)}
											</>
										)}
									</div>
								</div>
								{betterLinksHooks.applyFilters('isShowLinkSubmitButton', true, data) && (
									<div className="btl-modal-form-group btl-modal-form-group-submit-medium-device">
										<label className="btl-modal-form-label"></label>
										<button type="submit" className="btl-modal-submit-button">
											{data ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
										</button>
									</div>
								)}
							</Form>
						);
					}}
				</Formik>
			</Modal>
		</>
	);
};
const mapStateToProps = (state) => ({
	settings: state.settings,
	terms: state.terms,
	password: state.password,
	metaTags: state.metaTags,
});

const mapDispatchToProps = (dispatch) => {
	return {
		//👇 slight tweak (renamed 'fetch_terms_data' to 'fetch_terms_action_function') to use the <Link /> component inside gutenberg
		fetch_terms_data: bindActionCreators(fetch_terms_action_function, dispatch),
		fetch_tracking_settings: bindActionCreators(fetch_tracking_settings, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Link);
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
