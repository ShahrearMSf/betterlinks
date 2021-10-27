import React, { useState } from 'react';
import Modal from 'react-modal';
import { Field, Form, Formik, FormikProps } from 'formik';
import PropTypes from 'prop-types';
import Select from './../Select';
import { __ } from '@wordpress/i18n';
import { modalCustomStyles } from './../../utils/helper';

const propTypes = {};

const defaultProps = {};
export default function AddNewKeywords(props) {
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
					Add New Keywords
				</button>
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={{ email: '', color: 'red', firstName: '' }}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							actions.setSubmitting(false);
						}, 1000);
					}}
				>
					{(props) => (
						<Form className="w-100">
							<div className="btl-entry-content">
								<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Keyword', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" type="text" name="email" placeholder="Email" />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Choose Link', 'betterlinks')}
										</label>
										<Select />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Post Type', 'betterlinks')}
										</label>
										<Field className="btl-modal-form-control" type="text" name="text" placeholder="Email" />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Category', 'betterlinks')}
										</label>
										<Select />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Tags', 'betterlinks')}
										</label>
										<Select />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label" htmlFor="link_title">
											{__('Term Group', 'betterlinks')}
										</label>
										<Select />
									</div>
									<div className="btl-modal-form-group">
										<label className="btl-modal-form-label"></label>
										<button type="submit" className="btl-modal-submit-button">
											Publish
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
												<Field className="btl-check" name="ONT" type="checkbox" />
												<span className="text">{__('Open New Tab', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="UNF" type="checkbox" />
												<span className="text">{__('Use No Follow', 'betterlinks')}</span>
											</label>
											<label className="btl-checkbox-field">
												<Field className="btl-check" name="CS" type="checkbox" />
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
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Left Boundary', 'betterlinks')}
												</label>
												<select id="status">
													<option value="publish">{__('Active', 'betterlinks')}</option>
													<option value="expired">{__('Expired', 'betterlinks')}</option>
													<option value="draft">{__('Draft', 'betterlinks')}</option>
												</select>
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Right Boundary', 'betterlinks')}
												</label>
												<select id="status">
													<option value="publish">{__('Active', 'betterlinks')}</option>
													<option value="expired">{__('Expired', 'betterlinks')}</option>
													<option value="draft">{__('Draft', 'betterlinks')}</option>
												</select>
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Keyword Before', 'betterlinks')}
												</label>
												<input type="text" value="example-1.com" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Keyword After', 'betterlinks')}
												</label>
												<input type="text" value="example-1.com" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Limit', 'betterlinks')}
												</label>
												<input type="number" value="example-1.com" />
											</div>
											<div className="btl-modal-form-group">
												<label className="btl-modal-form-label" htmlFor="status">
													{__('Priority', 'betterlinks')}
												</label>
												<input type="number" value="example-1.com" />
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
