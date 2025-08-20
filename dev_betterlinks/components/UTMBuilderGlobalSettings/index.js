import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettingsHandler, makeRequest, betterlinks_nonce } from 'utils/helper';
import CreatableSelect from 'react-select/creatable';
import './style.scss';

const UTMBuilderGlobalSettings = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [utmTemplates, setUtmTemplates] = useState([]);
	const [activeTemplate, setActiveTemplate] = useState(null);
	const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
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

		// Reset form
		setTemplateForm({
			template_name: '',
			utm_source: '',
			utm_medium: '',
			utm_campaign: '',
			utm_term: '',
			utm_content: '',
			categories: [1] // Default to Uncategorized
		});
		setIsCreatingTemplate(false);
	};

	const handleTemplateUpdate = () => {
		if (!activeTemplate) return;

		const updatedTemplates = utmTemplates.map(template =>
			template.template_index === activeTemplate.template_index
				? { ...templateForm, template_index: activeTemplate.template_index, updated_at: new Date().toISOString() }
				: template
		);

		setUtmTemplates(updatedTemplates);
		setActiveTemplate(null);
		setTemplateForm({
			template_name: '',
			utm_source: '',
			utm_medium: '',
			utm_campaign: '',
			utm_term: '',
			utm_content: '',
			categories: [1]
		});
	};

	const handleTemplateDelete = (templateIndex) => {
		if (confirm(__('Are you sure you want to delete this template?', 'betterlinks'))) {
			const updatedTemplates = utmTemplates.filter(template =>
				template.template_index !== templateIndex
			);
			setUtmTemplates(updatedTemplates);

			if (activeTemplate && activeTemplate.template_index === templateIndex) {
				setActiveTemplate(null);
				setTemplateForm({
					template_name: '',
					utm_source: '',
					utm_medium: '',
					utm_campaign: '',
					utm_term: '',
					utm_content: '',
					categories: [1]
				});
			}
		}
	};

	const handleTemplateSelect = (template) => {
		setActiveTemplate(template);
		setTemplateForm({ ...template });
		setIsCreatingTemplate(false);
	};

	const getCategoryOptions = () => {
		if (!terms || terms.length === 0) return [];

		return terms
			.filter(term => term.term_type === 'category')
			.map(term => ({
				value: parseInt(term.ID),
				label: term.term_name
			}));
	};

	const getSelectedCategories = () => {
		if (!templateForm.categories || !terms || terms.length === 0) return [];

		return templateForm.categories.map(catId => {
			const category = terms.find(term => parseInt(term.ID) === parseInt(catId));
			return category ? { value: parseInt(category.ID), label: category.term_name } : null;
		}).filter(Boolean);
	};

	const handleCategoryChange = (selectedOptions) => {
		const categoryIds = selectedOptions ? selectedOptions.map(option => option.value) : [1]; // Default to Uncategorized if empty
		setTemplateForm({ ...templateForm, categories: categoryIds });
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
							<h3>{__('UTM Templates & Category Assignment', 'betterlinks')}</h3>
							<div className="btl-utm-templates-header">
								<div className="btl-utm-templates-list">
									<label>{__('Existing Templates', 'betterlinks')}</label>
									<select
										value={activeTemplate?.template_index || ''}
										onChange={(e) => {
											const template = utmTemplates.find(t => t.template_index == e.target.value);
											if (template) handleTemplateSelect(template);
										}}
										className="btl-form-control"
									>
										<option value="">{__('Select a template...', 'betterlinks')}</option>
										{utmTemplates.map(template => (
											<option key={template.template_index} value={template.template_index}>
												{template.template_name}
											</option>
										))}
									</select>
								</div>
								<button
									type="button"
									className="button-secondary"
									onClick={() => {
										setIsCreatingTemplate(true);
										setActiveTemplate(null);
										setTemplateForm({
											template_name: '',
											utm_source: '',
											utm_medium: '',
											utm_campaign: '',
											utm_term: '',
											utm_content: '',
											categories: [1] // Default to Uncategorized
										});
									}}
								>
									{__('Create New Template', 'betterlinks')}
								</button>
							</div>

							{/* Template Form */}
							{(isCreatingTemplate || activeTemplate) && (
								<div className="btl-utm-template-form">
									<h4>
										{isCreatingTemplate
											? __('Create New UTM Template', 'betterlinks')
											: __('Edit UTM Template', 'betterlinks')
										}
									</h4>

									<div className="btl-utm-template-fields">
										<div className="btl-utm-field-group">
											<label>{__('Template Name', 'betterlinks')}</label>
											<input
												type="text"
												value={templateForm.template_name}
												onChange={(e) => setTemplateForm({ ...templateForm, template_name: e.target.value })}
												placeholder={__('Enter template name...', 'betterlinks')}
												className="btl-form-control"
											/>
										</div>

										<div className="btl-utm-field-group">
											<label>{__('Assign to Categories', 'betterlinks')}</label>
											<CreatableSelect
												isMulti
												value={getSelectedCategories()}
												onChange={handleCategoryChange}
												options={getCategoryOptions()}
												className="btl-react-select-container"
												classNamePrefix="btl-react-select"
												placeholder={__('Select categories...', 'betterlinks')}
											/>
											<div className="short-description">
												{__('Select which categories should use this UTM template. If no category is selected, it will apply to "Uncategorized" links.', 'betterlinks')}
											</div>
										</div>

										<div className="btl-utm-global-form">
											<div className="btl-utm-field-group">
												<label>{__('UTM Source', 'betterlinks')}</label>
												<input
													type="text"
													value={templateForm.utm_source}
													onChange={(e) => setTemplateForm({ ...templateForm, utm_source: e.target.value })}
													placeholder={__('e.g: Twitter, Facebook', 'betterlinks')}
													className="btl-form-control"
												/>
											</div>

											<div className="btl-utm-field-group">
												<label>{__('UTM Medium', 'betterlinks')}</label>
												<input
													type="text"
													value={templateForm.utm_medium}
													onChange={(e) => setTemplateForm({ ...templateForm, utm_medium: e.target.value })}
													placeholder={__('e.g: social, email, cpc', 'betterlinks')}
													className="btl-form-control"
												/>
											</div>

											<div className="btl-utm-field-group">
												<label>{__('UTM Campaign', 'betterlinks')}</label>
												<input
													type="text"
													value={templateForm.utm_campaign}
													onChange={(e) => setTemplateForm({ ...templateForm, utm_campaign: e.target.value })}
													placeholder={__('e.g: summer_sale', 'betterlinks')}
													className="btl-form-control"
												/>
											</div>

											<div className="btl-utm-field-group">
												<label>{__('UTM Term', 'betterlinks')}</label>
												<input
													type="text"
													value={templateForm.utm_term}
													onChange={(e) => setTemplateForm({ ...templateForm, utm_term: e.target.value })}
													placeholder={__('e.g: paid keywords', 'betterlinks')}
													className="btl-form-control"
												/>
											</div>

											<div className="btl-utm-field-group">
												<label>{__('UTM Content', 'betterlinks')}</label>
												<input
													type="text"
													value={templateForm.utm_content}
													onChange={(e) => setTemplateForm({ ...templateForm, utm_content: e.target.value })}
													placeholder={__('e.g: text AD name', 'betterlinks')}
													className="btl-form-control"
												/>
											</div>
										</div>

										<div className="btl-utm-template-actions">
											{isCreatingTemplate ? (
												<button type="button" className="button-primary" onClick={handleTemplateCreate}>
													{__('Create Template', 'betterlinks')}
												</button>
											) : (
												<button type="button" className="button-primary" onClick={handleTemplateUpdate}>
													{__('Update Template', 'betterlinks')}
												</button>
											)}

											{activeTemplate && (
												<button
													type="button"
													className="button-secondary button-danger"
													onClick={() => handleTemplateDelete(activeTemplate.template_index)}
												>
													{__('Delete Template', 'betterlinks')}
												</button>
											)}

											<button
												type="button"
												className="button-secondary"
												onClick={() => {
													setIsCreatingTemplate(false);
													setActiveTemplate(null);
													setTemplateForm({
														template_name: '',
														utm_source: '',
														utm_medium: '',
														utm_campaign: '',
														utm_term: '',
														utm_content: '',
														categories: [1]
													});
												}}
											>
												{__('Cancel', 'betterlinks')}
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Templates List */}
							{utmTemplates.length > 0 && (
								<div className="btl-utm-templates-list-display">
									<h4>{__('Configured Templates', 'betterlinks')}</h4>
									<div className="btl-utm-templates-grid">
										{utmTemplates.map(template => (
											<div key={template.template_index} className="btl-utm-template-card">
												<h5>{template.template_name}</h5>
												<div className="btl-utm-template-info">
													<p><strong>{__('Categories:', 'betterlinks')}</strong> {
														template.categories && template.categories.length > 0
															? template.categories.map(catId => {
																const category = terms?.find(term => parseInt(term.ID) === parseInt(catId));
																return category ? category.term_name : 'Unknown';
															}).join(', ')
															: __('Uncategorized', 'betterlinks')
													}</p>
													<p><strong>{__('UTM Source:', 'betterlinks')}</strong> {template.utm_source || '-'}</p>
													<p><strong>{__('UTM Medium:', 'betterlinks')}</strong> {template.utm_medium || '-'}</p>
													<p><strong>{__('UTM Campaign:', 'betterlinks')}</strong> {template.utm_campaign || '-'}</p>
												</div>
												<div className="btl-utm-template-actions">
													<button
														type="button"
														className="button-secondary button-small"
														onClick={() => handleTemplateSelect(template)}
													>
														{__('Edit', 'betterlinks')}
													</button>
													<button
														type="button"
														className="button-secondary button-small button-danger"
														onClick={() => handleTemplateDelete(template.template_index)}
													>
														{__('Delete', 'betterlinks')}
													</button>
												</div>
											</div>
										))}
									</div>
								</div>
							)}
						</div>

						{/* Save Button */}
						<div className="btl-form-group" style={{ marginTop: '30px', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
							<div className="short-description" style={{ marginTop: '10px' }}>
								{__('Save your UTM templates and category assignments. These will be automatically applied when creating new links based on their category.', 'betterlinks')}
							</div>
							<button className="button-primary btn-save-settings" type="submit">
								{formSubmitText}
							</button>
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
