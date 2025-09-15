import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettingsHandler, makeRequest, betterlinks_nonce } from 'utils/helper';
import UTMTemplateModal from './UTMTemplateModal';
import './style.scss';

const UTMBuilderGlobalSettings = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [utmTemplates, setUtmTemplates] = useState([]);
	const [activeTemplate, setActiveTemplate] = useState(null);
	const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [terms, setTerms] = useState([]);
	const [templateForm, setTemplateForm] = useState({
		template_name: '',
		utm_source: '',
		utm_medium: '',
		utm_campaign: '',
		utm_term: '',
		utm_content: '',
		categories: [1] // Default to Uncategorized (ID: 1)
	});

	useEffect(() => {
		// Load existing UTM templates from settings
		const existingTemplates = settings?.global_utm_templates || [];
		setUtmTemplates(existingTemplates);

		// Fetch terms/categories using makeRequest
		const form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/get_terms');
		form_data.append('security', betterlinks_nonce);

		makeRequest({
			action: 'betterlinks/admin/get_terms'
		}).then((response) => {
			if (response?.data?.success && response?.data?.data) {
				setTerms(response.data.data);
			}
		}).catch((error) => {
			console.error('Error fetching terms:', error);
		});
	}, [settings]);

	const handleTemplateCreate = () => {
		if (!templateForm.template_name.trim()) {
			alert(__('Please enter a template name', 'betterlinks'));
			return;
		}

		const newTemplate = {
			...templateForm,
			template_index: Date.now(), // Use timestamp as unique ID
			created_at: new Date().toISOString()
		};

		const updatedTemplates = [...utmTemplates, newTemplate];
		setUtmTemplates(updatedTemplates);

		// Save to settings
		const updatedSettings = {
			...settings,
			global_utm_templates: updatedTemplates
		};
		saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

		// Reset form and close modal
		closeModal();
	};

	const handleTemplateUpdate = () => {
		if (!activeTemplate) return;

		const updatedTemplates = utmTemplates.map(template =>
			template.template_index === activeTemplate.template_index
				? { ...templateForm, template_index: activeTemplate.template_index, updated_at: new Date().toISOString() }
				: template
		);

		setUtmTemplates(updatedTemplates);

		// Save to settings
		const updatedSettings = {
			...settings,
			global_utm_templates: updatedTemplates
		};
		saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

		// Reset form and close modal
		closeModal();
	};

	const resetTemplateForm = () => {
		setTemplateForm({
			template_name: '',
			utm_source: '',
			utm_medium: '',
			utm_campaign: '',
			utm_term: '',
			utm_content: '',
			categories: [1],
			utm_enable_to_rewrite_existing_utm_template: false,
			utm_auto_apply_new_link: false
		});
		// Don't reset isCreatingTemplate and activeTemplate here - let the caller decide
	};

	const handleTemplateDelete = (templateIndex) => {
		if (confirm(__('Are you sure you want to delete this template?', 'betterlinks'))) {
			const updatedTemplates = utmTemplates.filter(template =>
				template.template_index !== templateIndex
			);
			setUtmTemplates(updatedTemplates);

			// Save to settings
			const updatedSettings = {
				...settings,
				global_utm_templates: updatedTemplates
			};
			saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

			if (activeTemplate && activeTemplate.template_index === templateIndex) {
				setActiveTemplate(null);
				resetTemplateForm();
			}
		}
	};

	const handleTemplateSelect = (template) => {
		setActiveTemplate(template);
		setTemplateForm({
			...template,
			// Ensure new fields have default values for existing templates
			utm_enable_to_rewrite_existing_utm_template: template.utm_enable_to_rewrite_existing_utm_template || false,
			utm_auto_apply_new_link: template.utm_auto_apply_new_link || false
		});
		setIsCreatingTemplate(false);
		setIsModalOpen(true);
	};

	const openCreateModal = () => {
		setActiveTemplate(null);
		resetTemplateForm();
		setIsCreatingTemplate(true);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		resetTemplateForm();
		setIsCreatingTemplate(false);
		setActiveTemplate(null);
	};



	return (
		<Formik
			enableReinitialize
			initialValues={{
				...settings,
				global_utm_templates: utmTemplates
			}}
			onSubmit={(values) => {
				const updatedValues = {
					...values,
					global_utm_templates: utmTemplates
				};
				saveSettingsHandler(updatedValues, update_option, setFormSubmitText);
			}}
		>
			{() => (
				<Form>
					<div className="btl-utm-global-settings">
						{/* Template Management Section */}
						<div className="btl-utm-templates-section">
							<div className="btl-utm-templates-wrapper">
								<h3>{__('UTM Templates & Category Assignment', 'betterlinks')}</h3>
								<div
									type="button"
									className="btl-utm-templates-crt-btn"
									onClick={openCreateModal}
								>
									{__('Create New Template', 'betterlinks')}
								</div>
							</div>

							{/* UTM Template Modal */}
							<UTMTemplateModal
								isOpen={isModalOpen}
								onClose={closeModal}
								isCreatingTemplate={isCreatingTemplate}
								activeTemplate={activeTemplate}
								templateForm={templateForm}
								setTemplateForm={setTemplateForm}
								terms={terms}
								handleTemplateCreate={handleTemplateCreate}
								handleTemplateUpdate={handleTemplateUpdate}
								handleTemplateDelete={handleTemplateDelete}
							/>

							{/* Templates List */}
							{utmTemplates.length > 0 && (
								<div className="btl-utm-templates-list-display">
									<h4>{__('Configured Templates', 'betterlinks')}</h4>
									<div className="btl-utm-templates-list">
										{utmTemplates.map(template => (
											<div key={template.template_index} className="btl-utm-template-item">
												<div className="btl-utm-template-content">
													<h5 className="btl-utm-template-name">{template.template_name}</h5>
													<span className="btl-utm-template-categories">
														{__('Categories:', 'betterlinks')} {
															template.categories && template.categories.length > 0
																? template.categories.map(catId => {
																	const category = terms?.find(term => parseInt(term.ID) === parseInt(catId));
																	return category ? category.term_name : 'Unknown';
																}).join(', ')
																: __('Uncategorized', 'betterlinks')
														}
													</span>
												</div>
												<div className="btl-utm-template-actions">
													<button
														type="button"
														className="btl-utm-action-btn btl-utm-copy-btn"
														onClick={() => {
															// Copy template functionality can be added here
															console.log('Copy template:', template);
														}}
														title={__('Copy Template', 'betterlinks')}
													>
														<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor" />
														</svg>
													</button>
													<button
														type="button"
														className="btl-utm-action-btn btl-utm-edit-btn"
														onClick={() => handleTemplateSelect(template)}
														title={__('Edit Template', 'betterlinks')}
													>
														<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor" />
														</svg>
													</button>
													<button
														type="button"
														className="btl-utm-action-btn btl-utm-delete-btn"
														onClick={() => handleTemplateDelete(template.template_index)}
														title={__('Delete Template', 'betterlinks')}
													>
														<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor" />
														</svg>
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const mapDispatchToProps = (dispatch) => ({
	update_option: bindActionCreators(update_option, dispatch),
});

export default connect(null, mapDispatchToProps)(UTMBuilderGlobalSettings);
