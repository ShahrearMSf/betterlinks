import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Select2 from 'react-select';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActionButton from 'components/ActionButton';
import { modalCustomStyles, getAutoLinksInitialValues, makeRequest, trimmed } from 'utils/helper';
import { add_keyword, update_keyword } from 'redux/actions/keywords.actions';

const propTypes = {
	data: PropTypes.object,
};

const defaultProps = {
	data: {},
};
const AddNewKeywords = ({ data, add_keyword, update_keyword, keywords }) => {
	console.log('-----keywords from AddNewKeywords:', { keywords });

	const [duplicate, setDuplicate] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [openPanelType, setOpenPanelType] = useState('HTML');
	const [links, setLinks] = useState([]);
	const [postTypes, setPostTypes] = useState([]);
	const [postTags, setPostTags] = useState([]);
	const [postCategories, setPostCategories] = useState([]);
	const [chooseAbleSavedLink, setChooseAbleSavedLink] = useState([]);
	const boundary = [
		{ value: 'whitespace', label: 'White Space' },
		{ value: 'comma', label: 'Comma' },
		{ value: 'point', label: 'Point' },
		{ value: '', label: 'None' },
	];

	function openModal() {
		setIsOpen(true);
		// links
		makeRequest({
			action: 'betterlinks/admin/get_links_by_exclude_keywords',
		}).then((response) => {
			if (response.data.success && response.data.data.length > 0) {
				setLinks(
					response.data.data.reduce((acc, item) => {
						acc.unshift({ label: item.link_title, value: item.ID });
						return acc;
					}, [])
				);
			}
		});
		makeRequest({
			action: 'betterlinks/admin/get_keyword_saved_link',
			link_id: data.link_id,
		}).then((response) => {
			if (response.data.success) {
				const link = response.data.data[0];
				setChooseAbleSavedLink({ label: link.link_title, value: link.ID });
			}
		});
		// get post type info
		makeRequest({
			action: 'betterlinks/admin/get_post_types',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				setPostTypes(data);
			}
		});
		makeRequest({
			action: 'betterlinks/admin/get_post_tags',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				setPostTags(data);
			}
		});
		makeRequest({
			action: 'betterlinks/admin/get_post_categories',
		}).then((response) => {
			const data = Object.entries(response.data.data).reduce((acc, item) => {
				acc.push({ label: item[1], value: item[0] });
				return acc;
			}, []);
			setPostCategories(data);
		});
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<React.Fragment>
			{Object.keys(data).length > 0 ? (
				<ActionButton type="edit" label={__('Edit Keyword', 'betterlinks')} onClickHandler={openModal} />
			) : (
				<div className="btl-create-autolinks">
					<button className="btl-create-autolink-button" onClick={openModal}>
						{__('Add New Keywords', 'betterlinks')}
					</button>
				</div>
			)}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={getAutoLinksInitialValues(data)}
					onSubmit={(values, actions) => {
						const formDuplicate = [];

						const formKeywordsArr = (values.keywords || '').trim().split(',');

						console.log('---AddNewKeywords Formik onSubmit', { values, keywords, formKeywordsArr });

						for (const item of formKeywordsArr) {
							const newItem = trimmed(item);
							for (const keyItem of keywords.data) {
								const newKeyItemsArr = trimmed(keyItem.keywords).split(',');
								for (const keyWord of newKeyItemsArr) {
									if (newItem.toLowerCase() === keyWord.toLocaleLowerCase()) {
										formDuplicate.push(keyWord);
										console.log('---for loop duplicate paoa gese ', { newItem, formDuplicate });
									}
								}
							}
						}

						console.log('----formDuplicate', { formDuplicate });

						if (formDuplicate.length > 0) {
							setDuplicate(formDuplicate);
							return false;
						}

						if (values.leftBoundary === '' || values.keywordBefore === '') {
							values.leftBoundary = '';
							values.keywordBefore = '';
						}
						if (values.rightBoundary === '' || values.keywordAfter === '') {
							values.rightBoundary = '';
							values.keywordAfter = '';
						}
						if (values.chooseLink) {
							// check Left Boundary & Keyword Before
							if (Object.keys(data).length > 0) {
								update_keyword(values);
							} else {
								add_keyword(values);
							}
							actions.setSubmitting(false);
							// reset
							actions.resetForm();
							setChooseAbleSavedLink([]);
							closeModal();
						}
					}}
				>
					{(props) => (
						<Form className="w-100" onSubmit={props.handleSubmit}>
							<div className="btl-entry-content">
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label btl-required" htmlFor="keywords">
											{__('Keywords', 'betterlinks')}
										</label>
										<label className="extra_info_keywords">
											<Field id="keywords" className="btl-modal-form-control" type="text" name="keywords" required />
											{duplicate.length > 0 ? (
												<>
													<span className="btl_duplicate_keyword">
														keywords:&nbsp;
														{duplicate.map((item, index) => (
															<span className="duplicate_words_wrapper" key={index}>
																<span className="duplicate_words"> "{item}"</span>
																<span className="duplicate_separator_comma">, </span>
															</span>
														))}
														&nbsp; already exists.
													</span>
												</>
											) : (
												<></>
											)}
											{__(' use comma(,) to add multiple keywords', 'betterlinks')}
										</label>
									</div>
									<div className="btl-modal-form-group" style={{ position: 'relative' }}>
										<label className="btl-modal-form-label btl-required" htmlFor="link_title">
											{__('Choose Link', 'betterlinks')}
										</label>
										<Select2
											isClearable={true}
											name="chooseLink"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={links}
											value={chooseAbleSavedLink}
											onChange={(option) => {
												props.setFieldValue('chooseLink', option ? option.value : '');
												setChooseAbleSavedLink(option ? option : []);
											}}
											required={true}
										/>
										<input
											tabIndex={-1}
											autoComplete="off"
											style={{
												opacity: 0,
												width: '100%',
												height: 0,
												position: 'absolute',
												top: '100%',
											}}
											onChange={() => {}}
											value={chooseAbleSavedLink}
											required={true}
										/>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Post Type', 'betterlinks')}
										</label>
										<Select2
											isMulti
											name="postType"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={postTypes}
											value={postTypes.filter((item) => {
												if (props.values.postType.includes(item.value.toString())) {
													return item;
												}
											})}
											onChange={(option) => {
												props.setFieldValue(
													'postType',
													option.reduce((acc, item) => {
														acc.push(item.value);
														return acc;
													}, [])
												);
											}}
										/>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Category', 'betterlinks')}
										</label>
										<Select2
											isMulti
											name="category"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={postCategories}
											value={postCategories.filter((item) => {
												if (props.values.category.includes(item.value.toString())) {
													return item;
												}
											})}
											onChange={(option) => {
												props.setFieldValue(
													'category',
													option.reduce((acc, item) => {
														acc.push(item.value);
														return acc;
													}, [])
												);
											}}
										/>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Tags', 'betterlinks')}
										</label>
										<Select2
											name="tags"
											isMulti
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={postTags}
											value={postTags.filter((item) => {
												if (props.values.tags.includes(item.value.toString())) {
													return item;
												}
											})}
											onChange={(option) => {
												props.setFieldValue(
													'tags',
													option.reduce((acc, item) => {
														acc.push(item.value);
														return acc;
													}, [])
												);
											}}
										/>
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label"></label>
										<button type="submit" className="btl-modal-submit-button">
											{Object.keys(data).length > 0 ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
										</button>
									</div>
								</div>
								<div className="btl-entry-content-right">
									<div className={`link-options ${openPanelType === 'HTML' ? 'link-options--open' : ''}`}>
										<button className="link-options__head" type="button" onClick={() => setOpenPanelType(openPanelType == 'HTML' ? 'ADVANCED' : 'HTML')}>
											<h4 className="link-options__head--title">{__('HTML Options', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
										</button>
										<div className="link-options__body">
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="openNewTab" type="checkbox" onChange={() => props.setFieldValue('openNewTab', !props.values.openNewTab)} />
												<span className="text">{__('Open New Tab', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="useNoFollow" type="checkbox" onChange={() => props.setFieldValue('useNoFollow', !props.values.useNoFollow)} />
												<span className="text">{__('Use No Follow', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="caseSensitive" type="checkbox" onChange={() => props.setFieldValue('caseSensitive', !props.values.caseSensitive)} />
												<span className="text">{__('Case Sensitive', 'betterlinks')}</span>
											</label>
										</div>
									</div>
									<div className={`link-options ${openPanelType === 'ADVANCED' ? 'link-options--open' : ''} link-options--advance-keyword`}>
										<button className="link-options__head" type="button" onClick={() => setOpenPanelType(openPanelType === 'ADVANCED' ? 'HTML' : 'ADVANCED')}>
											<h4 className="link-options__head--title">{__('Advanced Settings', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
										</button>
										<div className="link-options__body">
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="leftBoundary">
													{__('Left Boundary', 'betterlinks')}
												</label>
												<Select2
													id="leftBoundary"
													name="leftBoundary"
													className="btl-modal-select--mini"
													classNamePrefix="btl-react-select"
													options={boundary}
													value={boundary.filter((item) => item.value == props.values.leftBoundary)}
													onChange={(option) => {
														props.setFieldValue('leftBoundary', option.value);
													}}
												/>
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="rightBoundary">
													{__('Right Boundary', 'betterlinks')}
												</label>
												<Select2
													id="rightBoundary"
													name="rightBoundary"
													className="btl-modal-select--mini"
													classNamePrefix="btl-react-select"
													options={boundary}
													value={boundary.filter((item) => item.value == props.values.rightBoundary)}
													onChange={(option) => {
														props.setFieldValue('rightBoundary', option.value);
													}}
												/>
											</div>
											{props.values.leftBoundary != '' && (
												<div className="btl-modal-form-group">
													<label className="btl-modal-form-label" htmlFor="keywordBefore">
														{__('Keyword Before', 'betterlinks')}
													</label>
													<Field id="keywordBefore" type="text" name="keywordBefore" />
												</div>
											)}
											{props.values.rightBoundary != '' && (
												<div className="btl-modal-form-group">
													<label className="btl-modal-form-label" htmlFor="keywordAfter">
														{__('Keyword After', 'betterlinks')}
													</label>
													<Field id="keywordAfter" type="text" name="keywordAfter" />
												</div>
											)}

											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="limit">
													{__('Limit', 'betterlinks')}
												</label>
												<Field id="limit" type="number" name="limit" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
		</React.Fragment>
	);
};

AddNewKeywords.propTypes = propTypes;
AddNewKeywords.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
	return {
		add_keyword: bindActionCreators(add_keyword, dispatch),
		update_keyword: bindActionCreators(update_keyword, dispatch),
	};
};
export default connect(null, mapDispatchToProps)(AddNewKeywords);
