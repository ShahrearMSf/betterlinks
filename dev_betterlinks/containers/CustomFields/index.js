import { useState } from 'react';
import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik, Form, Field, FieldArray } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { generateSlug, saveSettingsHandler } from 'utils/helper';
import Modal from 'react-modal';

const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		width: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const CustomFields = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [modalIsOpen, setModalOpen] = useState(false);

	const closeModal = () => {
		setModalOpen(false);
	};

	const onSubmit = (values, { setFieldError }) => {
		const customFieldsValues = _.map(values?.customFields || [], 'value');
		const hasEmptyValue = _.some(customFieldsValues, (val) => !val || '' === val || val.includes(' ')); // Checks for string is valid or not.
		if (hasEmptyValue) {
			setFieldError('customFields', __('Please fill all the fields', 'betterlinks'));
			return;
		}
		saveSettingsHandler(values, update_option, setFormSubmitText);
	};

	return (
		<>
			<Formik initialValues={{ ...settings }} onSubmit={onSubmit}>
				{({ values }) => {
					return (
						<Form>
							<div className="btl-form-group">
								<div className="btl-form-field">
									<div className="short-description">
										<b style={{ fontWeight: 700 }}>Note: </b>
										<span>{__('Custom Fields Note will be here. For more info, ')}</span>
										<a className="external-analytic-tooltip-anchor" href="#" target="_blank" style={{ color: 'inherit' }}>
											{__('Click here', 'betterlinks-pro')}
										</a>
									</div>
								</div>
							</div>
							<FieldArray
								name="customFields"
								render={(arrayHelpers) => {
									const lastField = !values?.customFields?.length || values?.customFields?.[values?.customFields?.length - 1]?.value;
									const lastIndex = values?.customFields?.length - 1;
									return (
										<>
											<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
												<div>
													<span className="btl-close-modal" onClick={closeModal}>
														<i className="btl btl-cancel" />
													</span>
													<div className="btl-confirmation-alert">
														<h3 className="btl-modal-utm-builder__title">{__('Are you sure to delete this field?', 'betterlinks')}</h3>
														<div className="btl-confirmation-buttons">
															<button
																type="button"
																onClick={() => {
																	const deleteIndex = arrayHelpers.form?.errors?.deleteFieldIndex;
																	arrayHelpers.remove(deleteIndex);
																	closeModal();
																}}
															>
																{__('Yes', 'betterlinks')}
															</button>
															<button type="button" onClick={closeModal}>
																{__('Cancel', 'betterlinks')}
															</button>
														</div>
													</div>
												</div>
											</Modal>
											<div>
												{values?.customFields?.length > 0 ? (
													values.customFields.map((fields, index) => {
														return (
															<div key={index} className="btl-form-group" style={{ columnGap: '5px' }}>
																<Field
																	className="btl-form-control"
																	name={`customFields.${index}.label`}
																	placeholder="Custom field label"
																	onChange={(e) => {
																		const fieldSlug = generateSlug(e.target.value);
																		arrayHelpers.form.setFieldValue(`customFields.${index}.label`, e.target.value);
																		arrayHelpers.form.setFieldValue(`customFields.${index}.value`, fieldSlug);
																	}}
																	autoFocus={true}
																/>
																<div className="btl-utm-action-btns">
																	<button
																		className="button"
																		type="button"
																		style={{ lineHeight: '0' }}
																		onClick={() => {
																			setModalOpen(true);
																			arrayHelpers.form.setFieldError('deleteFieldIndex', index);
																		}}
																	>
																		<span className="dashicons dashicons-trash"></span>
																	</button>
																</div>

																{lastIndex === index && (
																	<button
																		type="button"
																		className="button"
																		style={{ lineHeight: '0' }}
																		onClick={() => {
																			if (!lastField || _.includes(lastField, ' ')) {
																				arrayHelpers.form.setFieldError('customFields', __('Please fill all the fields', 'betterlinks'));
																				return;
																			}
																			arrayHelpers.push('');
																		}}
																	>
																		<span className="dashicons dashicons-plus-alt2" />
																	</button>
																)}
															</div>
														);
													})
												) : (
													<div className="btl-form-group" style={{ columnGap: '5px' }}>
														<Field
															className="btl-form-control"
															name={`customFields.0.label`}
															placeholder={__('Custom field label', 'betterlinks')}
															onChange={(e) => {
																const fieldSlug = generateSlug(e.target.value);
																arrayHelpers.form.setFieldValue('customFields.0.label', e.target.value);
																arrayHelpers.form.setFieldValue('customFields.0.value', fieldSlug);
															}}
														/>

														<button type="button" className="button" style={{ lineHeight: '0' }} onClick={() => arrayHelpers.push('')}>
															<span className="dashicons dashicons-plus-alt2" />
														</button>
													</div>
												)}
											</div>
											{!!arrayHelpers.form?.errors?.customFields && (
												<span style={{ color: 'red', display: 'block', marginTop: '5px' }}>{arrayHelpers.form?.errors?.['customFields']}</span>
											)}
										</>
									);
								}}
							/>
							<button
								className="button-primary btn-save-settings"
								type="submit"
								style={{
									marginTop: '20px',
								}}
							>
								{formSubmitText}
							</button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(CustomFields);
