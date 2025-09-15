import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettingsHandler, makeRequest, betterlinks_nonce, plugin_root_url } from 'utils/helper';
import UTMTemplateModal from './UTMTemplateModal';
import '../../../assets/scss/components/_utm_builder_style.scss';

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
								<button className="button-primary btn-save-settings" onClick={openCreateModal} style={{ cursor: 'pointer' }}>
									<img style={{ marginRight: '8px' }} src={plugin_root_url + 'assets/images/add-icon.svg'} alt="Add icon" />
									{__('Create New Template', 'betterlinks')}
								</button>
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
														className="btl-utm-action-btn btl-utm-btn-ac"
														onClick={() => {
															// Copy template functionality can be added here
															console.log('Copy template:', template);
														}}
													>
														<div className="btl-tooltip">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M3.34333 13.9475C3.08779 13.8018 2.87523 13.5912 2.72715 13.3371C2.57906 13.0829 2.50071 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333M5.83333 8.05583C5.83333 7.46639 6.06749 6.90109 6.48429 6.48429C6.90109 6.06749 7.46639 5.83333 8.05583 5.83333H15.2775C15.5694 5.83333 15.8584 5.89082 16.128 6.00251C16.3977 6.1142 16.6427 6.27791 16.849 6.48429C17.0554 6.69067 17.2191 6.93567 17.3308 7.20532C17.4425 7.47497 17.5 7.76397 17.5 8.05583V15.2775C17.5 15.5694 17.4425 15.8584 17.3308 16.128C17.2191 16.3977 17.0554 16.6427 16.849 16.849C16.6427 17.0554 16.3977 17.2191 16.128 17.3308C15.8584 17.4425 15.5694 17.5 15.2775 17.5H8.05583C7.76397 17.5 7.47497 17.4425 7.20532 17.3308C6.93567 17.2191 6.69067 17.0554 6.48429 16.849C6.27791 16.6427 6.1142 16.3977 6.00251 16.128C5.89082 15.8584 5.83333 15.5694 5.83333 15.2775V8.05583Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
															</svg>
															<span className="btl-tooltiptext">{__('Copy', 'betterlinks')}</span>
														</div>
													</button>
													<button
														type="button"
														className="btl-utm-action-btn btl-utm-btn-ac"
														onClick={() => handleTemplateSelect(template)}
														title={__('Edit', 'betterlinks')}
													>

														<div className="btl-tooltip">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M5.8335 5.83333H5.00016C4.55814 5.83333 4.13421 6.00893 3.82165 6.32149C3.50909 6.63405 3.3335 7.05797 3.3335 7.5V15C3.3335 15.442 3.50909 15.866 3.82165 16.1785C4.13421 16.4911 4.55814 16.6667 5.00016 16.6667H12.5002C12.9422 16.6667 13.3661 16.4911 13.6787 16.1785C13.9912 15.866 14.1668 15.442 14.1668 15V14.1667M13.3335 4.16667L15.8335 6.66667M16.9877 5.48759C17.3159 5.15938 17.5003 4.71424 17.5003 4.25009C17.5003 3.78594 17.3159 3.34079 16.9877 3.01259C16.6595 2.68438 16.2143 2.5 15.7502 2.5C15.286 2.5 14.8409 2.68438 14.5127 3.01259L7.50016 10.0001V12.5001H10.0002L16.9877 5.48759Z" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
															</svg>
															<span className="btl-tooltiptext">{__('Edit', 'betterlinks')}</span>
														</div>

													</button>
													<button
														type="button"
														className="btl-utm-action-btn btl-utm-btn-ac"
														onClick={() => handleTemplateDelete(template.template_index)}
														title={__('Delete', 'betterlinks')}
													>

														<div className="btl-tooltip">
															<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path d="M3.3335 5.83333H16.6668M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M4.16683 5.83333L5.00016 15.8333C5.00016 16.2754 5.17576 16.6993 5.48832 17.0118C5.80088 17.3244 6.2248 17.5 6.66683 17.5H13.3335C13.7755 17.5 14.1994 17.3244 14.512 17.0118C14.8246 16.6993 15.0002 16.2754 15.0002 15.8333L15.8335 5.83333M7.50016 5.83333V3.33333C7.50016 3.11232 7.58796 2.90036 7.74424 2.74408C7.90052 2.5878 8.11248 2.5 8.3335 2.5H11.6668C11.8878 2.5 12.0998 2.5878 12.2561 2.74408C12.4124 2.90036 12.5002 3.11232 12.5002 3.33333V5.83333" stroke="#475467" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
															</svg>
															<span className="btl-tooltiptext">{__('Delete', 'betterlinks')}</span>
														</div>
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
