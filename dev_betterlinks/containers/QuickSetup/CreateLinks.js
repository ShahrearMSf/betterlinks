import { __ } from '@wordpress/i18n';
import { Field, Form, Formik } from 'formik';
import { SetupContext } from 'pages/QuickSetup';
import { useContext, useEffect, useState } from 'react';
import { redirectType } from 'utils/data';
import {
	add_top_loader,
	formatDate,
	generateShortURL,
	generateSlug,
	is_pro_enabled,
	modalCustomSmallStyles,
	plugin_root_url,
	remove_top_loader,
	shortURLUniqueCheck,
	site_url,
} from 'utils/helper';
import Select from 'components/Select';
import Modal from 'react-modal';
import UTMBuilder from 'components/UTMBuilder';
import Copy from 'components/Copy';
import Category from 'components/Terms/Category';
import ProBadge from 'components/Badge/ProBadge';

const CreateLink = () => {
	const { linkOptions, setLinkOptions, modal, terms, settings } = useContext(SetupContext);
	const [slugIsExists, setSlugIsExists] = useState(false);
	const [modalUTMIsOpen, setModalUTMIsOpen] = useState(false);
	const [isShowCustomUTMModalContent, setIsShowCustomUTMModalContent] = useState(true);
	const { setUpgradeToProModal, openUpgradeToProModal } = modal;
	const [options, setOptions] = useState(linkOptions);
	const isDisableLinkFormEditView = betterLinksHooks.applyFilters('isDisableLinkFormEditView', false, options);
	const openUTMModal = () => {
		setModalUTMIsOpen(true);
	};
	const closeUTMModal = () => {
		setIsShowCustomUTMModalContent(true);
		setModalUTMIsOpen(false);
	};
	const builtInUTMModalOpenHandler = () => {
		if (is_pro_enabled) {
			setIsShowCustomUTMModalContent(false);
			openUTMModal();
		} else {
			openUpgradeToProModal();
		}
	};
	const handleTitleChange = (setFieldValue, title, short_url = null) => {
		setFieldValue('link_title', title);
		let shortURL = generateShortURL(settings, short_url || title);
		if (shortURL.length > 0) {
			setFieldValue('short_url', shortURL);
			setSlugIsExists(false);
			return shortURL;
		}
		return '';
	};

	const submitLinkHandler = (values, actions) => {
		const { setSubmitting, setFieldError } = actions;
		setSubmitting(false);

		const regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
		if (regex.test(values.link_title)) {
			setFieldError('link_title', __('Please ensure the link title does not contain any script.', 'betterlinks'));
			return;
		}
		onSubmit(values);
	};

	const onSubmit = (values) => {
		const { short_url } = values;
		values.short_url = short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
		console.info(values.short_url);
		shortURLUniqueCheck(values.short_url, values.ID, setSlugIsExists).then((isDuplicate) => {
			console.info(isDuplicate);
			// if (!isDuplicate) {
			// 	if (!values.cat_id) {
			// 		const { ID } = terms.filter((item) => item.term_slug == 'uncategorized')[0];
			// 		values.cat_id = ID;
			// 	}
			// 	if (!values.link_slug) {
			// 		values.link_slug = generateSlug(values.link_title);
			// 	}
			// 	if (isNaN(values?.cat_id)) {
			// 		values.cat_slug = generateSlug(values.cat_id);
			// 	}
			// 	values.wildcards = Number(values.short_url.includes('*'));
			// 	if (values.cat_id) {
			// 		const link_title = values.link_title.trim();
			// 		if (link_title) {
			// 			values.link_title = link_title;
			// 			// cinfo
			// 			// submitHandler(values)
			// 			// 	.then((response) => {
			// 			// 		if (response?.data) {
			// 			// 			setShowLinkModal(false);
			// 			// 		}
			// 			// 		remove_top_loader(document);
			// 			// 	})
			// 			// 	.catch((error) => console.log('---error (submitHandler)--', { error }));
			// 			// add_top_loader(document);
			// 		}
			// 	}
			// }
		});
	};

	return (
		<>
			<div className="create-links">
				<div className="header">
					<h3>{__('Create Link', 'betterlinks')}</h3>
					<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>
				</div>
				<div className="option">
					<Formik initialValues={betterLinksHooks.applyFilters('linkFormInitialValues', options)} onSubmit={() => {}}>
						{(props) => {
							const { errors } = props;
							return (
								<Form className="ReactModal__Content">
									<div className="btl-entry-content">
										<Modal isOpen={modalUTMIsOpen} onRequestClose={closeUTMModal} style={modalCustomSmallStyles} ariaHideApp={false}>
											<span className="btl-close-modal" onClick={closeUTMModal}>
												<i className="btl btl-cancel" />
											</span>
											{isShowCustomUTMModalContent ? (
												<>
													{betterLinksHooks.applyFilters(
														'linksUTMBuilderField',
														<UTMBuilder targetUrl={props.values.target_url} saveValueHandler={props.setFieldValue} closeModalHandler={closeUTMModal} />,
														props.values.target_url,
														props.setFieldValue,
														closeUTMModal
													)}
												</>
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
																const short_url = handleTitleChange(props.setFieldValue, e.target.value);
																props.setFieldValue('short_url', short_url);
																setLinkOptions((prev) => ({
																	...prev,
																	link_title: e.target.value,
																	short_url,
																}));
															}}
															required
														/>
														{errors?.link_title && <span style={{ color: 'red' }}>{errors?.link_title}</span>}
													</div>
												</div>
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label btl-required" htmlFor="redirect_type">
													{__('Redirect Type', 'betterlinks')}
												</label>
												<Select
													id="redirect_type"
													name="redirect_type"
													value={[
														...redirectType,
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
													enable_password={false}
													isQuickSetup={true}
													setLinkOptions={setLinkOptions}
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
														setLinkOptions((prev) => ({
															...prev,
															target_url,
														}));
														// const willUpdateTitle = '' === props.values?.link_title;
														// fetchTargetURL(target_url, props.setFieldValue, willUpdateTitle, props.values?.link_title);
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
																const short_url = e.target.value.replace(/\s+/g, '-');
																props.setFieldValue('short_url', short_url);
																setLinkOptions((prev) => ({
																	...prev,
																	short_url,
																}));
																setSlugIsExists(false);
															}}
															disabled={isDisableLinkFormEditView}
															required
														/>
														<Copy siteUrl={site_url} shortUrl={props.values.short_url} />
													</div>
												</div>
												{slugIsExists == true && <div className="errorlog">{__('Already Exists', 'betterlinks')}</div>}
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="catId">
													{__('Category', 'betterlinks')}
												</label>
												<Category catId={parseInt(linkOptions.cat_id)} data={terms} fieldName="cat_id" setFieldValue={props.setFieldValue} disabled={isDisableLinkFormEditView} />
											</div>
										</div>
										<div className="btl-entry-content-right">
											<div className="link-options link-options--open">
												<button className="link-options__head" type="button">
													<h4 className="link-options__head--title">{__('Link Options', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
												</button>
												<div className="link-options__body">
													<label className="btl-checkbox-field">
														<Field
															className="btl-check"
															name="nofollow"
															type="checkbox"
															onChange={() => {
																props.setFieldValue('nofollow', !props.values.nofollow);
																setLinkOptions((prev) => ({
																	...prev,
																	nofollow: !props.values.nofollow,
																}));
															}}
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
															onChange={() => {
																props.setFieldValue('sponsored', !props.values.sponsored);
																setLinkOptions((prev) => ({
																	...prev,
																	sponsored: !props.values.sponsored,
																}));
															}}
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
															onChange={() => {
																props.setFieldValue('param_forwarding', !props.values.param_forwarding);
																setLinkOptions((prev) => ({
																	...prev,
																	param_forwarding: !props.values.param_forwarding,
																}));
															}}
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
															onChange={() => {
																props.setFieldValue('track_me', !props.values.track_me);
																setLinkOptions((prev) => ({
																	...prev,
																	track_me: !props.values.track_me,
																}));
															}}
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
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default CreateLink;
