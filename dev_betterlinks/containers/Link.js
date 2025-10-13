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
import AdvanceOptionTeaser from 'components/Teasers/Link/AdvanceOptionTeaser';
import DynamicRedirectsTeaser from 'components/Teasers/Link/DynamicRedirectsTeaser';
import ProBadge from 'components/Badge/ProBadge';

const propTypes = {
	isShowIcon: PropTypes.bool,
	catId: PropTypes.number,
	catName: PropTypes.string,
	data: PropTypes.object,
	submitHandler: PropTypes.func,
};

export const Link = (props) => {
	const {
		isShowIcon = true,
		catId,
		data,
		submitHandler, // this is add_new_link function
		fetch_terms_data,

		//👇 these flowwowing props will be passed from the component's gutenberg call
		betterlinksGutenStore,
		setShowLinkModal = () => { },
		searchFieldRef,
		linkNewTab,
		type = '',
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
		redirect_type: '307',
		cat_id: catId || settings?.settings?.default_category || '1', // Default to "Uncategorized" (ID: 1)
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
					// Priority: 1) Contextual category (catId), 2) Default category setting, 3) Fallback to uncategorized
					if (catId) {
						// Category-specific link creation - use the contextual category
						values.cat_id = catId;
					} else {
						// Global link creation - use default category setting
						const defaultCategoryId = settings?.settings?.default_category;
						if (defaultCategoryId) {
							values.cat_id = defaultCategoryId;
						} else {
							const uncategorizedTerm = terms.terms.filter((item) => item.term_slug == 'uncategorized')[0];
							values.cat_id = uncategorizedTerm ? uncategorizedTerm.ID : 1;
						}
					}
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
				// Check if auto title suggestion is enabled
				const isAutoTitleEnabled = settings?.settings?.enable_auto_title_suggestion !== false;
				if (!isAutoTitleEnabled) {
					return;
				}

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

		// Validate and filter dynamic redirect data
		if (values?.dynamic_redirect && values.dynamic_redirect.type && values.dynamic_redirect.type !== 'none') {
			const { type, value, extra } = values.dynamic_redirect;

			// Helper function to filter valid entries based on type
			const filterValidEntries = (type, value) => {
				if (!value || !Array.isArray(value)) return [];

				switch (type) {
					case 'rotation':
						return value.filter(item => item.link && item.link.trim() !== '' && item.weight > 0);
					case 'geographic':
						return value.filter(item =>
							item.link && item.link.trim() !== '' &&
							item.country && (Array.isArray(item.country) ? item.country.length > 0 : item.country.trim() !== '')
						);
					case 'technology':
						return value.filter(item => item.link && item.link.trim() !== '');
					case 'time':
						return value.filter(item =>
							item.link && item.link.trim() !== '' &&
							item.start_date && item.end_date
						);
					default:
						return value;
				}
			};

			const filteredValue = filterValidEntries(type, value);

			// Validate dynamic redirect settings
			if (filteredValue.length === 0) {
				setFieldError('dynamic_redirect', __('At least one valid entry is required for dynamic redirect.', 'betterlinks'));
				return;
			}

			if (type === 'rotation' && extra?.rotation_mode === 'weighted') {
				const totalWeight = filteredValue.reduce((acc, item) => acc + (item.weight || 0), 0);
				if (totalWeight !== 100) {
					setFieldError('dynamic_redirect', __('The total of all target URL percentages must equal 100% before you can continue.', 'betterlinks'));
					return;
				}
			}

			if (type === 'time') {
				for (let item of filteredValue) {
					if (item.start_date && item.end_date && item.start_date > item.end_date) {
						setFieldError('dynamic_redirect', __('Your Time Period Redirect start time must come before the end time.', 'betterlinks'));
						return;
					}
				}
			}

			// Update values with filtered data
			values.dynamic_redirect.value = filteredValue;
		}

		if ('duplicate' === type) {
			delete values.ID;
			delete values.analytic;
			delete values.favorite;
			values.link_date = currentDate;
			values.link_date_gmt = currentDate;
			values.link_modified = currentDate;
			values.link_modified_gmt = currentDate;
		}
		onSubmit(values);
	};

	const site_url = betterLinksHooks.applyFilters('site_url', site_link);

	return (
		<>
			{data ? (
				<button onClick={openModal} className={`dnd-link-button ${isFetchTerms ? 'btl-rotating' : ''}`}>
					<span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{props.children}</span>
					{!props.children && <span className="icon">{!isFetchTerms ? <i className={`btl btl-${'' === type ? 'edit' : 'copy'}`}></i> : <i className="btl btl-reload"></i>}</span>}
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
													<UTMBuilder targetUrl={props.values.target_url} saveValueHandler={props.setFieldValue} closeModalHandler={closeUTMModal} categoryId={props.values.cat_id} />,
													props.values.target_url,
													props.setFieldValue,
													closeUTMModal,
													props.values.cat_id
												)}
											</React.Fragment>
										) : (
											<React.Fragment>
												{betterLinksHooks.applyFilters('linksBuiltInUTMBuilderField', '', props.values.target_url, props.setFieldValue, closeUTMModal)}
											</React.Fragment>
										)}
									</Modal>
									<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
										<div className="btl-modal-form-group" data-testid="btl-link-title">
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
										<div className="btl-modal-form-group " data-testid="btl-link-note">
											<label className="btl-modal-form-label" htmlFor="link_note">
												{__('Description', 'betterlinks')}
											</label>
											<Field className="btl-modal-form-control" component="textarea" id="link_note" name="link_note" disabled={isDisableLinkFormEditView} />
										</div>
										<div className="btl-modal-form-group" data-testid="btl-redirect-type">
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
														disabled: !is_pro_enabled,
													},
												]}
												setUpgradeToProModal={setUpgradeToProModal}
												setFieldValue={props.setFieldValue}
												disabled={isDisableLinkFormEditView}
												isMulti={false}
												enable_password={props.values?.enable_password}
											/>
										</div>
										<div className="btl-modal-form-group btl-has-utm-button" data-testid="btl-target-url">
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
												<button
													type="button"
													className={`btl-utm-button ${props.values.target_url && (props.values.target_url.includes('utm_source') || props.values.target_url.includes('utm_medium') || props.values.target_url.includes('utm_campaign') || props.values.target_url.includes('utm_term') || props.values.target_url.includes('utm_content')) ? 'btl-utm-button--applied' : 'btl-utm-button--not-applied'}`}
													data-testid="btl-utm-button"
													onClick={openUTMModal}
													disabled={isDisableLinkFormEditView}
												>
													{__('UTM', 'betterlinks')}
													{props.values.target_url && (props.values.target_url.includes('utm_source') || props.values.target_url.includes('utm_medium') || props.values.target_url.includes('utm_campaign') || props.values.target_url.includes('utm_term') || props.values.target_url.includes('utm_content')) && (
														<span className="btl-utm-badge">
															<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M10.332 1.22725C11.3375 1.80782 12.174 2.64093 12.7586 3.64411C13.3432 4.6473 13.6556 5.78576 13.665 6.94681C13.6744 8.10785 13.3803 9.25121 12.812 10.2637C12.2437 11.2762 11.4209 12.1227 10.4249 12.7195C9.42886 13.3162 8.29428 13.6425 7.13343 13.666C5.97258 13.6894 4.82573 13.4094 3.8064 12.8534C2.78707 12.2975 1.93061 11.4849 1.32181 10.4963C0.713006 9.50758 0.372971 8.37705 0.335365 7.21658L0.332031 7.00058L0.335365 6.78458C0.3727 5.63324 0.70773 4.51122 1.30779 3.52791C1.90785 2.5446 2.75247 1.73355 3.75929 1.17383C4.76612 0.614121 5.90079 0.324844 7.0527 0.334205C8.20461 0.343565 9.33443 0.651244 10.332 1.22725ZM9.47003 5.19591C9.35524 5.08113 9.2025 5.01217 9.04048 5.00199C8.87847 4.9918 8.7183 5.04108 8.59003 5.14058L8.52736 5.19591L6.33203 7.39058L5.47003 6.52925L5.40736 6.47391C5.27909 6.37448 5.11895 6.32526 4.95697 6.33548C4.79499 6.3457 4.6423 6.41466 4.52754 6.52942C4.41278 6.64418 4.34382 6.79687 4.3336 6.95885C4.32338 7.12083 4.3726 7.28097 4.47203 7.40925L4.52736 7.47191L5.8607 8.80525L5.92336 8.86058C6.04028 8.95129 6.18405 9.00052 6.33203 9.00052C6.48001 9.00052 6.62378 8.95129 6.7407 8.86058L6.80336 8.80525L9.47003 6.13858L9.52536 6.07591C9.62486 5.94764 9.67414 5.78748 9.66396 5.62546C9.65377 5.46344 9.58482 5.31071 9.47003 5.19591Z" fill="#6FD965" />
															</svg>
														</span>
													)}
												</button>
												{!is_pro_enabled ? (
													<button type="button" className="btl-share-button btl-share-button--locked" data-testid="btl-share-button" onClick={builtInUTMModalOpenHandler} disabled={isDisableLinkFormEditView}>
														<i className="btl btl-share"></i>
														<img className="locked" src={plugin_root_url + 'assets/images/lock-round.svg'} alt="icon" />
													</button>
												) : (
													<button type="button" className="btl-share-button" data-testid="btl-share-button" onClick={builtInUTMModalOpenHandler} disabled={isDisableLinkFormEditView}>
														<i className="btl btl-share"></i>
													</button>
												)}
											</div>
										</div>
										<div className="btl-modal-shorturl-wrap">
											<div className="btl-modal-form-group shorturl" data-testid="btl-short-url">
												<label className="btl-modal-form-label" htmlFor="short_url">
													{__('Shortened URL', 'betterlinks')}
												</label>
												<div className={slugIsExists ? 'btl-link-field-copyable is-invalid' : 'btl-link-field-copyable'}>
													<span className="btl-static-link">{site_url + '/'}</span>
													<Field
														className="btl-dynamic-link"
														data-testid="btl-short-url"
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
										<div className="btl-modal-form-group" data-testid="btl-cat-id">
											<label className="btl-modal-form-label" htmlFor="catId">
												{__('Category', 'betterlinks')}
											</label>
											<Category
												catId={parseInt(catId || settings?.settings?.default_category || 1)}
												data={terms}
												fieldName="cat_id"
												setFieldValue={props.setFieldValue}
												disabled={isDisableLinkFormEditView}
											/>
										</div>
										<div className="btl-modal-form-group" data-testid="btl-tags-id">
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
												<button type="submit" className="btl-modal-submit-button" data-testid="btl-submit-button">
													{data && '' === type ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
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
														<span className="text btl-text">
															{__('Uncloak', 'betterlinks')}
															<ProBadge />
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
														<h4 className="link-options__head--title">
															{__('Advanced', 'betterlinks')} {!is_pro_enabled && <ProBadge />}
														</h4>
														<i className="btl btl-angle-arrow-down" />
													</button>
													{/* Advance Options teaser */}
													<AdvanceOptionTeaser openUpgradeToProModal={openUpgradeToProModal} />
													<>{betterLinksHooks.applyFilters('linkOptionsAdvanced', null, { ...props, ...settings, password, metaTag })}</>
												</div>
												<div className={`link-options link-options--dynamic-redirect ${isOpenLinkPanel.dynamicRedirect ? 'link-options--open' : ''}`}>
													<button className="link-options__head" type="button" onClick={() => togglePanel('dynamicRedirect')}>
														<h4 className="link-options__head--title">
															{__('Dynamic Redirects', 'betterlinks')} {!is_pro_enabled && <ProBadge />}{' '}
															{is_pro_enabled && props.values.dynamic_redirect && props.values.dynamic_redirect.type && props.values.dynamic_redirect.type !== 'none' ? (
																<span className="status">{__('ON', 'betterlinks')}</span>
															) : (
																''
															)}
														</h4>{' '}
														<i className="btl btl-angle-arrow-down"></i>
													</button>
													<div className="link-options__body">
														{/* Dynamic Redirects teaser */}
														{betterLinksHooks.applyFilters('linkOptionsDynamicRedirect', <DynamicRedirectsTeaser openUpgradeToProModal={openUpgradeToProModal} />, props)}
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
																	{__('Auto-Link Keywords', 'betterlinks')} <ProBadge />
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
