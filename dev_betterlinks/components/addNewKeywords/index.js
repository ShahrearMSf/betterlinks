import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import PropTypes from 'prop-types';
import Select2 from 'react-select';
import { __ } from '@wordpress/i18n';
import { modalCustomStyles, getAutoLinksInitialValues, makeRequest } from '../../utils/helper';

const propTypes = {};

const defaultProps = {};
export default function AddNewKeywords({ links, addNewKeywordHandler }) {
	useEffect(() => {}, []);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [openPanelType, setOpenPanelType] = useState('HTML');
	const [postTypes, setPostTypes] = useState([]);
	const [postTags, setPostTags] = useState([]);
	const [postCategories, setPostCategories] = useState([]);

	function openModal() {
		setIsOpen(true);
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
			<div className="btl-create-autolinks">
				<button className="btl-create-autolink-button" onClick={openModal}>
					{__('Add New Keywords', 'betterlinks')}
				</button>
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={getAutoLinksInitialValues()}
					onSubmit={(values, actions) => {
						addNewKeywordHandler(values);
						actions.setSubmitting(false);
						closeModal();
					}}
				>
					{(props) => (
						<Form className="w-100" onSubmit={props.handleSubmit}>
							<div className="btl-entry-content">
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="keywords">
											{__('Keywords', 'betterlinks')}
										</label>
										<Field id="keywords" className="btl-modal-form-control" type="text" name="keywords" />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Choose Link', 'betterlinks')}
										</label>
										<Select2
											name="chooseLink"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={links}
											onChange={(option) => {
												props.setFieldValue('chooseLink', option.value);
											}}
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
											{__('Publish', 'betterlinks')}
										</button>
									</div>
								</div>
								<div className="btl-entry-content-right">
									<div className={`link-options ${openPanelType === 'HTML' ? 'link-options--open' : ''}`}>
										<button className="link-options__head" type="button" onClick={() => setOpenPanelType(openPanelType == 'HTML' ? 'ADVANCED' : 'HTML')}>
											<h4 className="link-options__head--title">{__('HTML', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
										</button>
										<div className="link-options__body">
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="openNewTab" type="checkbox" />
												<span className="text">{__('Open New Tab', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="useNoFollow" type="checkbox" />
												<span className="text">{__('Use No Follow', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="caseSensitive" type="checkbox" />
												<span className="text">{__('Case Sensitive', 'betterlinks')}</span>
											</label>
										</div>
									</div>
									<div className={`link-options ${openPanelType === 'ADVANCED' ? 'link-options--open' : ''} link-options--advance-keyword`}>
										<button className="link-options__head" type="button" onClick={() => setOpenPanelType(openPanelType === 'ADVANCED' ? 'HTML' : 'ADVANCED')}>
											<h4 className="link-options__head--title">{__('Advance Match', 'betterlinks')}</h4> <i className="btl btl-angle-arrow-down"></i>
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
													options={[
														{ value: 'chocolate', label: 'Chocolate' },
														{ value: 'strawberry', label: 'Strawberry' },
														{ value: 'vanilla', label: 'Vanilla' },
													]}
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
													options={[
														{ value: 'chocolate', label: 'Chocolate' },
														{ value: 'strawberry', label: 'Strawberry' },
														{ value: 'vanilla', label: 'Vanilla' },
													]}
													onChange={(option) => {
														props.setFieldValue('rightBoundary', option.value);
													}}
												/>
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="keywordBefore">
													{__('Keyword Before', 'betterlinks')}
												</label>
												<Field id="keywordBefore" type="text" name="keywordBefore" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="keywordAfter">
													{__('Keyword After', 'betterlinks')}
												</label>
												<Field id="keywordAfter" type="text" name="keywordAfter" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="limit">
													{__('Limit', 'betterlinks')}
												</label>
												<Field id="limit" type="number" name="limit" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="priority">
													{__('Priority', 'betterlinks')}
												</label>
												<Field id="priority" type="number" name="priority" />
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
}

AddNewKeywords.propTypes = propTypes;
AddNewKeywords.defaultProps = defaultProps;
