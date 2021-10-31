import React, { useState } from 'react';
import Modal from 'react-modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import PropTypes from 'prop-types';
import Select2 from 'react-select';
import { __ } from '@wordpress/i18n';
import { modalCustomStyles } from './../../utils/helper';

const propTypes = {};

const defaultProps = {};
export default function AddNewKeywords({ addNewKeywordHandler }) {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [isOpenLinkPanel, setOpenLinkPanel] = useState({
		html: true,
		advanced: false,
	});

	const togglePanel = (type) => {
		setOpenLinkPanel({
			html: false,
			advanced: false,
			[type]: !isOpenLinkPanel[type],
		});
	};

	function openModal() {
		setIsOpen(true);
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
					initialValues={{
						keywords: '',
						chooseLink: '',
						postType: '',
						category: '',
						tags: '',
						termGroup: '',
						openNewTab: '',
						useNoFollow: '',
						caseSensitive: '',
						leftBoundary: '',
						rightBoundary: '',
						keywordBefore: '',
						keywordBefore: '',
						limit: '',
						priority: '',
					}}
					onSubmit={(values, actions) => {
						addNewKeywordHandler(values);
						actions.setSubmitting(false);
					}}
				>
					{(props) => (
						<Form className="w-100" onSubmit={props.handleSubmit}>
							<div className="btl-entry-content">
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Keyword', 'betterlinks')}
										</label>
										<Select2
											name="keywords"
											isMulti
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
											onChange={(option) => {
												props.setFieldValue(
													'keywords',
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
											{__('Choose Link', 'betterlinks')}
										</label>
										<Select2
											name="chooseLink"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
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
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
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
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
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
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
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
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Term Group', 'betterlinks')}
										</label>
										<Select2
											name="termGroup"
											className="btl-modal-select--full"
											classNamePrefix="btl-react-select"
											options={[
												{ value: 'chocolate', label: 'Chocolate' },
												{ value: 'strawberry', label: 'Strawberry' },
												{ value: 'vanilla', label: 'Vanilla' },
											]}
											onChange={(option) => {
												props.setFieldValue('termGroup', option.value);
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
									<div className={`link-options ${isOpenLinkPanel.html ? 'link-options--open' : ''}`}>
										<button className="link-options__head" type="button" onClick={() => togglePanel('html')}>
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
									<div className={`link-options ${isOpenLinkPanel.advanced ? 'link-options--open' : ''} link-options--advance-keyword`}>
										<button className="link-options__head" type="button" onClick={() => togglePanel('advanced')}>
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
