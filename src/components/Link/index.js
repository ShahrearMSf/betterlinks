import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import Select from './../Select';
import { useFormikContext, Formik, Field, Form } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_settings_data } from './../../redux/actions/settings.actions';
import { fetch_terms_data } from './../../redux/actions/terms.actions';
import { modalCustomStyles, site_url, generateSlug, generateRandomSlug, copyToClipboard, formatDate } from './../../utils/helper';
import { redirectType } from './../../utils/data';
import Category from './../Terms/Category';
import Tags from './../Terms/Tags';

const Link = ({ cat_id, cat_name, item, submitHandler, terms, fetch_terms_data, settings, fetch_settings_data }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isEditMode, setEditMode] = useState(false);
	const [isCopyUrl, setCopyUrl] = useState(false);
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
		cat_id,
		cat_name,
		...settings.settings,
	};

	const initialUpdateValues = {
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		cat_id,
		cat_name,
		...item,
	};

	function openModal() {
		if (item) {
			setEditMode(true);
			fetch_terms_data({
				term_type: 'tags',
				ID: item.ID,
			}).then(() => {
				setModalIsOpen(true);
			});
		} else {
			setEditMode(false);
			if (Object.keys(settings).length === 0) {
				fetch_settings_data().then(() => {
					setModalIsOpen(true);
				});
			} else {
				setModalIsOpen(true);
			}
		}
	}
	const copyShortUrl = (url) => {
		copyToClipboard(url);
		setCopyUrl(true);
	};
	function closeModal() {
		setEditMode(false);
		setModalIsOpen(false);
	}
	const [nameToSlug, setNameToSlug] = useState(false);
	const [slugToSlug, setSlugToSlug] = useState(false);
	const AutoSlugGenerate = () => {
		const { values } = useFormikContext();
		React.useEffect(() => {
			if (nameToSlug) {
				values.link_slug = generateSlug(values.link_title);
				setNameToSlug(false);
			}
			if (slugToSlug) {
				values.link_slug = generateSlug(values.link_slug);
				setSlugToSlug(false);
			}
		}, [values]);
		return null;
	};
	return (
		<>
			{item ? (
				<button onClick={openModal} className={`dnd-link-button ${isEditMode ? 'btl-rotating' : ''}`}>
					<span className="icon">{!isEditMode ? <i className="btl btl-edit"></i> : <i className="btl btl-reload"></i>}</span>
				</button>
			) : (
				<button onClick={openModal} className="btl-create-link-button">
					<i className="btl btl-add"></i>
				</button>
			)}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={item ? initialUpdateValues : initialValues}
					onSubmit={async (values) => {
						setEditMode(false);
						setModalIsOpen(false);
						return submitHandler(values);
					}}
				>
					{(props) => (
						<Form className="w-100">
							<div className="btl-entry-content">
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label btl-required" htmlFor="link_title">
											{__('Title', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" id="link_title" name="link_title" onBlur={() => setNameToSlug(true)} required />
									</div>
									<div className="btl-modal-form-group">
										<Field type="hidden" className="btl-modal-form-control" id="link_slug" name="link_slug" onBlur={() => setSlugToSlug(true)} required />
										<AutoSlugGenerate />
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
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label btl-required" htmlFor="target_url">
											{__('Target URL', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" id="target_url" name="target_url" placeholder="" required />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="short_url">
											{__('Shortened URL', 'betterlinks')}
										</label>
										<div className="btl-link-field-copyable">
											<span className="btl-static-link">{site_url}</span>
											<Field className="btl-dynamic-link" id="short_url" name="short_url" required />
											<button type="button" onClick={() => copyShortUrl(site_url + '/' + props.values.short_url)} className="btl-link-copy-button">
												{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-copy"></i>}
											</button>
										</div>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="cat_id">
											{__('Category', 'betterlinks')}
										</label>
										<Category name="cat_id" cat_id={cat_name} cat_name={cat_name} setFieldValue={props.setFieldValue} />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="tags_id">
											{__('Tags', 'betterlinks')}
										</label>
										<Tags name="tags_id" terms={terms} isEditMode={isEditMode} setFieldValue={props.setFieldValue} />
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
								</div>
							</div>
							<div className="btl-modal-form-group">
								<label className="btl-modal-form-label"></label>
								<button type="submit" className="btl-modal-submit-button">
									{item ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
								</button>
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
