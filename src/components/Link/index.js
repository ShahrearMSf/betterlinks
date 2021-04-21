import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import Select from './../Select';
import { Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_settings_data } from './../../redux/actions/settings.actions';
import { fetch_terms_data } from './../../redux/actions/terms.actions';
import { modalCustomStyles, modalCustomSmallStyles, nonce, site_url, generateSlug, generateRandomSlug, formatDate, plugin_root_url } from './../../utils/helper';
import { redirectType } from './../../utils/data';
import Category from './../Terms/Category';
import Tags from './../Terms/Tags';
import Copy from './../../components/Copy';
import DateAndTimePicker from './../../components/DateAndTimePicker';
import UTMBuilder from '../UTMBuilder';

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
	const { isShowIcon, catId, data, terms, submitHandler, fetch_terms_data, settings, fetch_settings_data } = props;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isFetchTerms, setIsFetchTerms] = useState(false);
	const [slugIsExists, setSlugIsExists] = useState(false);
	const [modalUTMIsOpen, setModalUTMIsOpen] = useState(false);
	const [isShowCustomUTMModalContent, setIsShowCustomUTMModalContent] = useState(true);
	const randomSlug = generateRandomSlug();
	const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');

	const initialValues = {
		link_title: '',
		link_slug: '',
		target_url: '',
		short_url: randomSlug,
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
		if (!props.settings.settings) {
			fetch_settings_data();
		}

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
			alert('Upgrade To Pro');
		}
	};

	const closeUTMModal = () => {
		setIsShowCustomUTMModalContent(true);
		setModalUTMIsOpen(false);
	};

	const shortURLUniqueCheck = (slug, ID) => {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
		form_data.append('security', nonce);
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
	const onSubmit = (values) => {
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
	return (
		<>
			{data ? (
				<button onClick={openModal} className={`dnd-link-button ${isFetchTerms ? 'btl-rotating' : ''}`}>
					<span className="icon">{!isFetchTerms ? <i className="btl btl-edit"></i> : <i className="btl btl-reload"></i>}</span>
				</button>
			) : (
				<button onClick={openModal} className={`btl-create-link-button ${isShowIcon && isFetchTerms ? 'btl-rotating' : ''}`}>
					{isShowIcon ? <i className="btl btl-add"></i> : 'Add New Link'} {!isShowIcon && isFetchTerms ? ' ...' : ''}
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
										<Field className="btl-modal-form-control" id="link_title" name="link_title" required />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_note">
											{__('Description', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" component="textarea" id="link_note" name="link_note" />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label btl-required" htmlFor="redirect_type">
											{__('Redirect Type', 'betterlinks')}
										</label>
										<Select id="redirect_type" name="redirect_type" value={redirectType} setFieldValue={props.setFieldValue} isMulti={false} />
									</div>
									<div className="btl-modal-form-group btl-has-utm-button">
										<label className="btl-modal-form-label btl-required" htmlFor="target_url">
											{__('Target URL', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" id="target_url" name="target_url" placeholder="" required />
										<div className="btl-utm-button-group">
											<button type="button" className="btl-utm-button" onClick={openUTMModal}>
												UTM
											</button>
											{betterLinksHooks.applyFilters('isActivePro', false) && (
												<button type="button" className="btl-share-button" onClick={builtInUTMModalOpenHandler}>
													<img src={plugin_root_url + 'assets/images/share.svg'} alt="icon" />
												</button>
											)}
										</div>
									</div>
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
													props.setFieldValue('short_url', e.target.value);
													setSlugIsExists(false);
												}}
												required
											/>
											{slugIsExists == true && <div className="errorlog">Already Exists</div>}
											<Copy siteUrl={site_url} shortUrl={props.values.short_url} />
										</div>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="catId">
											{__('Category', 'betterlinks')}
										</label>
										<Category catId={parseInt(catId)} data={terms} fieldName="cat_id" setFieldValue={props.setFieldValue} />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="tags">
											{__('Tags', 'betterlinks')}
										</label>
										<Tags linkId={data ? parseInt(data.ID) : 0} fieldName="tags_id" data={terms} setFieldValue={props.setFieldValue} />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label"></label>
										<button type="submit" className="btl-modal-submit-button">
											{data ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
										</button>
									</div>
								</div>
								<div className="btl-entry-content-right">
									<div className="link-options">
										<div className="link-options__head">
											<h4 className="link-options__head--title">{__('Link Options', 'betterlinks')}</h4>
										</div>
										<div className="link-options__body">
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="nofollow" type="checkbox" onChange={() => props.setFieldValue('nofollow', !props.values.nofollow)} />
												<span className="text">
													{__('No Follow', 'betterlinks')}
													<div className="btl-tooltip">
														<span className="dashicons dashicons-info-outline"></span>
														<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
													</div>
												</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="sponsored" type="checkbox" onChange={() => props.setFieldValue('sponsored', !props.values.sponsored)} />
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
												<Field className="btl-check" name="track_me" type="checkbox" onChange={() => props.setFieldValue('track_me', !props.values.track_me)} />
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
									{betterLinksHooks.applyFilters('addNewField', null, props, <DateAndTimePicker setFieldValue={props.setFieldValue} />)}
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
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Link);
Link.propTypes = propTypes;
Link.defaultProps = defaultProps;
