import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import Select from 'components/Select';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { modalCustomStyles, modalCustomSmallStyles, betterlinks_nonce, site_url, generateSlug, generateShortURL, formatDate, plugin_root_url, is_pro_enabled } from 'utils/helper';
import { redirectType } from 'utils/data';
import Category from 'components/Terms/Category';
import Tags from 'components/Terms/Tags';
import Copy from 'components/Copy';
import UTMBuilder from 'components/UTMBuilder';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';

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

const Link = (props) => {
	const { isShowIcon, catId, data, terms, submitHandler, fetch_terms_data, settings } = props;
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
	});

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
	};

	const initialUpdateValues = {
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		cat_id: catId,
		old_short_url: data ? data.short_url : '',
		...data,
	};

	function openModal() {
		setIsFetchTerms(true);
		fetch_terms_data().then(() => {
			setModalIsOpen(true);
			setIsFetchTerms(false);
		});
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	const openUTMModal = () => {
		setModalIsOpen(true);
		setModalUTMIsOpen(true);
	};

	const builtInUTMModalOpenHandler = () => {
		if (betterLinksHooks.applyFilters('isActivePro', false)) {
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

	const shortURLUniqueCheck = (slug, ID) => {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
		form_data.append('security', betterlinks_nonce);
		form_data.append('ID', ID);
		form_data.append('slug', slug);
		return axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					setSlugIsExists(response.data.data);
					return response.data.data;
				}
			},
			(error) => {
				console.log(error);
			}
		);
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
		shortURLUniqueCheck(values.short_url, values.ID).then((isUnique) => {
			if (!isUnique) {
				if (!values.cat_id) {
					const { ID } = terms.terms.filter((item) => item.term_slug == 'uncategorized')[0];
					values.cat_id = ID;
				}
				if (!values.link_slug) {
					values.link_slug = generateSlug(values.link_title);
				}

				values.wildcards = Number(values.short_url.includes('*'));
				if (values.cat_id) {
					const link_title = values.link_title.trim();
					if (link_title) {
						values.link_title = link_title;
						setModalIsOpen(false);
						return submitHandler(values);
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
	return (
		<>
			{data ? (
				<button onClick={openModal} className={`dnd-link-button ${isFetchTerms ? 'btl-rotating' : ''}`}>
					<span className="icon">{!isFetchTerms ? <i className="btl btl-edit"></i> : <i className="btl btl-reload"></i>}</span>
				</button>
			) : (
				<button onClick={openModal} className={`btl-create-link-button ${isShowIcon && isFetchTerms ? 'btl-rotating' : ''}`}>
					{isShowIcon ? <i className="btl btl-add"></i> : __('Add New Link', 'betterlinks')} {!isShowIcon && isFetchTerms ? ' ...' : ''}
				</button>
			)}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={betterLinksHooks.applyFilters('linkFormInitialValues', data ? initialUpdateValues : initialValues)}
					onSubmit={(values, { setSubmitting }) => {
						setSubmitting(false);
						onSubmit(values);
					}}
				>
					{(props) => (
						<Form className="w-100">
							<div className="btl-entry-content">
								<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
								<Modal isOpen={modalUTMIsOpen} onRequestClose={closeUTMModal} style={modalCustomSmallStyles} ariaHideApp={false}>
									<span className="btl-close-modal" onClick={closeUTMModal}>
										<i className="btl btl-cancel"></i>
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
										<React.Fragment>{betterLinksHooks.applyFilters('linksBuiltInUTMBuilderField', '', props.values.target_url, props.setFieldValue, closeUTMModal)}</React.Fragment>
									)}
								</Modal>
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label btl-required" htmlFor="link_title">
											{__('Title', 'betterlinks')}
										</label>
										<Field
											className="btl-modal-form-control"
											id="link_title"
											name="link_title"
											disabled={isDisableLinkFormEditView}
											onChange={(e) => {
												props.setFieldValue('link_title', e.target.value);
												if (!data) {
													const shortURL = generateShortURL(settings.settings, e.target.value);
													if (shortURL.length > 0) {
														props.setFieldValue('short_url', shortURL);
														setSlugIsExists(false);
													}
												}
											}}
											required
										/>
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
											value={
												is_pro_enabled
													? [
															...redirectType,
															{
																value: 'cloak',
																label: __('Cloaked', 'betterlinks'),
															},
													  ]
													: [
															...redirectType,
															{
																value: 'pro',
																label: __('Cloaked (pro)', 'betterlinks'),
															},
													  ]
											}
											setUpgradeToProModal={setUpgradeToProModal}
											setFieldValue={props.setFieldValue}
											disabled={isDisableLinkFormEditView}
											isMulti={false}
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
											onChange={(e) => props.setFieldValue('target_url', e.target.value.replace(/\s+/g, ''))}
											placeholder=""
											disabled={isDisableLinkFormEditView}
											required
										/>
										<div className="btl-utm-button-group">
											<button type="button" className="btl-utm-button" onClick={openUTMModal} disabled={isDisableLinkFormEditView}>
												{__('UTM', 'betterlinks')}
											</button>
											{!betterLinksHooks.applyFilters('isActivePro', false) ? (
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
									{betterLinksHooks.applyFilters('isShowLinkSubmitButton', true, data) && (
										<div className="btl-modal-form-group">
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
										</div>
									</div>
									<div className={`link-options link-options--advanced ${isOpenLinkPanel.advanced ? 'link-options--open' : ''}`}>
										<button className="link-options__head" type="button" onClick={() => togglePanel('advanced')}>
											<h4 className="link-options__head--title">{__('Advanced', 'betterlinks')}</h4>
											<i className="btl btl-angle-arrow-down"></i>
										</button>
										<div className="link-options__body">
											{!betterLinksHooks.applyFilters('isActivePro', false) && (
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
												</div>
											)}
											{betterLinksHooks.applyFilters('linkOptionsAdvanced', null, props)}
										</div>
									</div>
									<div className={`link-options link-options--dynamic-redirect ${isOpenLinkPanel.dynamicRedirect ? 'link-options--open' : ''}`}>
										<button className="link-options__head" type="button" onClick={() => togglePanel('dynamicRedirect')}>
											<h4 className="link-options__head--title">
												{__('Dynamic Redirects', 'betterlinks')}{' '}
												{betterLinksHooks.applyFilters('isActivePro', false) &&
												props.values.dynamic_redirect &&
												props.values.dynamic_redirect.type &&
												props.values.dynamic_redirect.type !== 'none' ? (
													<span className="status">{__('ON', 'betterlinks')}</span>
												) : (
													''
												)}
											</h4>{' '}
											<i className="btl btl-angle-arrow-down"></i>
										</button>
										<div className="link-options__body">
											{!betterLinksHooks.applyFilters('isActivePro', false) && (
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
									{!betterLinksHooks.applyFilters('isActivePro', false) && (
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
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
};
const mapStateToProps = (state) => ({
	settings: state.settings,
	terms: state.terms,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Link);
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
