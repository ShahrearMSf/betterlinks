import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { fetch_links_data } from 'redux/actions/links.actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettingsHandler, makeRequest, betterlinks_nonce, plugin_root_url, is_pro_enabled } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import UTMTemplateModal from './UTMTemplateModal';
import ConfirmModal from '../PermissionModal/ConfirmModal';
import '../../../assets/scss/components/_utm_builder_style.scss';

const UTMBuilderGlobalSettings = ({ settings, update_option, fetch_links_data }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [utmTemplates, setUtmTemplates] = useState([]);
	const [activeTemplate, setActiveTemplate] = useState(null);
	const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [terms, setTerms] = useState([]);
	const [termsLoading, setTermsLoading] = useState(true); // Loading state for terms/categories
	const [lastAppliedTemplates, setLastAppliedTemplates] = useState({}); // Track last applied template per category
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState(null);
	const [expandedTemplates, setExpandedTemplates] = useState(new Set());
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const [templateForm, setTemplateForm] = useState({
		template_name: '',
		utm_source: '',
		utm_medium: '',
		utm_campaign: '',
		utm_term: '',
		utm_content: '',
		categories: [], // No default category
		utm_enable_to_rewrite_existing_utm_template: false,
		utm_enable_to_reset_existing_utm_template: false,
		utm_auto_apply_new_link: false
	});

	// Helper function to normalize category ID to string for consistency
	const normalizeCategoryId = (catId) => {
		// Handle various data types and edge cases
		if (catId === null || catId === undefined || catId === '' || catId === 'NaN' || catId === 'undefined' || catId === 'null') {
			return '1'; // Default to Uncategorized
		}
		
		// Convert to string first
		const catIdStr = String(catId).toLowerCase();
		
		// Special handling for Uncategorized
		if (catIdStr === '1' || catIdStr === 'uncategorized' || catIdStr === 'true') {
			return '1';
		}
		
		// Try to parse as number
		const catIdNum = parseInt(catId);
		if (!isNaN(catIdNum) && catIdNum > 0) {
			return String(catIdNum);
		}
		
		// For any other invalid cases, default to Uncategorized
		return '1';
	};

	// Helper function to find a category by ID with robust comparison
	const findCategoryById = (catId) => {
		if (!terms || !Array.isArray(terms)) return null;
		
		// Normalize the input category ID
		const normalizedCatId = normalizeCategoryId(catId);
		
		// Find category using normalized comparison
		return terms.find(term => {
			const normalizedTermId = normalizeCategoryId(term.ID);
			return normalizedTermId === normalizedCatId;
		});
	};

	// Helper function to generate tooltip text based on category state
	const getCategoryTooltipText = (categoryName, isActive, isDeleted, isLoading, isDemoTemplate) => {
		if (isDemoTemplate) {
			return __('Demo Category', 'betterlinks');
		}
		if (isLoading) {
			return __('Loading Category', 'betterlinks');
		}
		if (isDeleted) {
			return __('Deleted Category', 'betterlinks');
		}
		if (categoryName === __('Unassigned', 'betterlinks')) {
			return __('Unassigned Category', 'betterlinks');
		}
		if (isActive) {
			return __('Active Category', 'betterlinks');
		}
		return __('Inactive Category', 'betterlinks');
	};

	// Helper function to clean up corrupted last applied templates data
	const cleanupLastAppliedTemplates = (lastAppliedData) => {
		const cleaned = {};
		
		if (!lastAppliedData || typeof lastAppliedData !== 'object') {
			return cleaned;
		}
		
		Object.keys(lastAppliedData).forEach(categoryId => {
			const normalizedCategoryId = normalizeCategoryId(categoryId);
			const templateData = lastAppliedData[categoryId];
			
			// Only keep valid template data
			if (templateData && 
				typeof templateData === 'object' && 
				templateData.template_index && 
				templateData.applied_at) {
				cleaned[normalizedCategoryId] = templateData;
			}
		});
		
		return cleaned;
	};

	useEffect(() => {
		// Load existing UTM templates from settings
		const existingTemplates = settings?.global_utm_templates || [];
		setUtmTemplates(existingTemplates);

		// Initialize last applied templates tracking from settings or calculate from existing templates
		const existingLastApplied = settings?.utm_last_applied_templates || {};
		
		// Clean up corrupted data
		const cleanedLastApplied = cleanupLastAppliedTemplates(existingLastApplied);

		// If no tracking data exists, calculate from existing templates based on timestamps
		if (Object.keys(cleanedLastApplied).length === 0 && existingTemplates.length > 0) {
			const calculatedLastApplied = {};
			existingTemplates.forEach(template => {
				if (template.categories && template.categories.length > 0) {
					template.categories.forEach(categoryId => {
						const normalizedCategoryId = normalizeCategoryId(categoryId);
						const currentLastApplied = calculatedLastApplied[normalizedCategoryId];
						const templateTimestamp = new Date(template.updated_at || template.created_at || 0).getTime();

						if (!currentLastApplied || templateTimestamp > new Date(currentLastApplied.applied_at || 0).getTime()) {
							calculatedLastApplied[normalizedCategoryId] = {
								template_index: template.template_index,
								applied_at: template.updated_at || template.created_at || new Date().toISOString()
							};
						}
					});
				}
			});
			setLastAppliedTemplates(calculatedLastApplied);
		} else {
			// Use the already cleaned data
			setLastAppliedTemplates(cleanedLastApplied);
		}

		// Fetch terms/categories using makeRequest
		setTermsLoading(true); // Start loading
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
		}).finally(() => {
			setTermsLoading(false); // End loading regardless of success or failure
		});
	}, [settings]);

	// Helper function to check if a template is the most recently applied for any of its categories
	const isTemplateActiveForAnyCategory = (template) => {
		if (!template.categories || template.categories.length === 0) return false;

		return template.categories.some(categoryId => {
			const normalizedCategoryId = normalizeCategoryId(categoryId);
			const lastApplied = lastAppliedTemplates[normalizedCategoryId];
			return lastApplied && lastApplied.template_index === template.template_index;
		});
	};

	// Helper function to check if a specific category is active for this template
	const isCategoryActiveForTemplate = (template, categoryId) => {
		const normalizedCategoryId = normalizeCategoryId(categoryId);
		const lastApplied = lastAppliedTemplates[normalizedCategoryId];
		return lastApplied && lastApplied.template_index === template.template_index;
	};

	// Helper function to filter out deleted categories
	const filterValidCategories = (categories) => {
		if (!categories || !Array.isArray(categories)) return [];
		
		return categories.filter(catId => {
			return findCategoryById(catId) !== null;
		});
	};

	const handleTemplateCreate = () => {
		if (!templateForm.template_name.trim()) {
			alert(__('Please enter a template name', 'betterlinks'));
			return;
		}

		const templateIndex = Date.now(); // Use timestamp as unique ID
		const createdAt = new Date().toISOString();

		// Filter out deleted categories before saving and normalize IDs
		const validCategories = filterValidCategories(templateForm.categories).map(catId => normalizeCategoryId(catId));

		const newTemplate = {
			...templateForm,
			categories: validCategories, // Use filtered categories
			template_index: templateIndex,
			created_at: createdAt
		};

		const updatedTemplates = [...utmTemplates, newTemplate];
		setUtmTemplates(updatedTemplates);

		// Update last applied templates tracking for each valid category
		// Clean up any existing corrupted data and save the normalized version
		const cleanedExistingData = cleanupLastAppliedTemplates(lastAppliedTemplates);
		const updatedLastApplied = { ...cleanedExistingData };
		if (validCategories && validCategories.length > 0) {
			validCategories.forEach(categoryId => {
				const normalizedCategoryId = normalizeCategoryId(categoryId);
				updatedLastApplied[normalizedCategoryId] = {
					template_index: templateIndex,
					applied_at: createdAt
				};
			});
		}
		setLastAppliedTemplates(updatedLastApplied);

		// Save to settings
		const updatedSettings = {
			...settings,
			global_utm_templates: updatedTemplates,
			utm_last_applied_templates: updatedLastApplied
		};
		saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

		// Reset form and close modal
		closeModal();
	};

	const handleTemplateUpdate = () => {
		if (!activeTemplate) return;

		const updatedAt = new Date().toISOString();

		// Filter out deleted categories before saving and normalize IDs
		const validCategories = filterValidCategories(templateForm.categories).map(catId => normalizeCategoryId(catId));

		const updatedTemplates = utmTemplates.map(template =>
			template.template_index === activeTemplate.template_index
				? { 
					...templateForm, 
					categories: validCategories, // Use filtered categories
					template_index: activeTemplate.template_index, 
					updated_at: updatedAt 
				}
				: template
		);

		setUtmTemplates(updatedTemplates);

		// Update last applied templates tracking for each valid category
		// Clean up any existing corrupted data and save the normalized version
		const cleanedExistingData = cleanupLastAppliedTemplates(lastAppliedTemplates);
		const updatedLastApplied = { ...cleanedExistingData };
		if (validCategories && validCategories.length > 0) {
			validCategories.forEach(categoryId => {
				const normalizedCategoryId = normalizeCategoryId(categoryId);
				updatedLastApplied[normalizedCategoryId] = {
					template_index: activeTemplate.template_index,
					applied_at: updatedAt
				};
			});
		}
		setLastAppliedTemplates(updatedLastApplied);

		// Save to settings
		const updatedSettings = {
			...settings,
			global_utm_templates: updatedTemplates,
			utm_last_applied_templates: updatedLastApplied
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
			categories: [],
			utm_enable_to_rewrite_existing_utm_template: false,
			utm_enable_to_reset_existing_utm_template: false,
			utm_auto_apply_new_link: false
		});
		// Don't reset isCreatingTemplate and activeTemplate here - let the caller decide
	};

	const handleTemplateDelete = (templateIndex) => {
		setTemplateToDelete(templateIndex);
		setShowDeleteConfirm(true);
	};

	const confirmTemplateDelete = () => {
		if (templateToDelete) {
			const updatedTemplates = utmTemplates.filter(template =>
				template.template_index !== templateToDelete
			);
			setUtmTemplates(updatedTemplates);

			// Save to settings
			const updatedSettings = {
				...settings,
				global_utm_templates: updatedTemplates
			};
			saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

			if (activeTemplate && activeTemplate.template_index === templateToDelete) {
				setActiveTemplate(null);
				resetTemplateForm();
			}

			// Reset confirmation modal state
			setTemplateToDelete(null);
			setShowDeleteConfirm(false);
		}
	};

	const confirmTemplateDeleteAndResetParams = async () => {
		if (templateToDelete) {
			// First, find the template to get its categories
			const templateToDeleteObj = utmTemplates.find(template =>
				template.template_index === templateToDelete
			);

			if (templateToDeleteObj && templateToDeleteObj.categories && templateToDeleteObj.categories.length > 0) {
				try {
					// Reset UTM parameters for links in the template's categories
					await makeRequest({
						action: 'betterlinks/admin/apply_utm_template_to_links',
						template_data: {
							utm_source: '',
							utm_medium: '',
							utm_campaign: '',
							utm_term: '',
							utm_content: ''
						},
						category_ids: templateToDeleteObj.categories,
						rewrite_existing: true,
						reset_existing: true
					});

					// Refresh links data to show updated URLs
					if (fetch_links_data) {
						fetch_links_data();
					}
				} catch (error) {
					console.error('Error resetting UTM parameters:', error);
				}
			}

			// Then delete the template (same as confirmTemplateDelete)
			const updatedTemplates = utmTemplates.filter(template =>
				template.template_index !== templateToDelete
			);
			setUtmTemplates(updatedTemplates);

			// Save to settings
			const updatedSettings = {
				...settings,
				global_utm_templates: updatedTemplates
			};
			saveSettingsHandler(updatedSettings, update_option, setFormSubmitText);

			if (activeTemplate && activeTemplate.template_index === templateToDelete) {
				setActiveTemplate(null);
				resetTemplateForm();
			}

			// Reset confirmation modal state
			setTemplateToDelete(null);
			setShowDeleteConfirm(false);
		}
	};

	const cancelTemplateDelete = () => {
		setTemplateToDelete(null);
		setShowDeleteConfirm(false);
	};

	const handleTemplateSelect = (template) => {
		setActiveTemplate(template);
		
		// Filter out deleted categories when loading the template for editing and normalize IDs
		const validCategories = filterValidCategories(template.categories).map(catId => normalizeCategoryId(catId));
		
		setTemplateForm({
			...template,
			categories: validCategories, // Use filtered categories
			// Ensure new fields have default values for existing templates
			utm_enable_to_rewrite_existing_utm_template: template.utm_enable_to_rewrite_existing_utm_template || false,
			utm_enable_to_reset_existing_utm_template: template.utm_enable_to_reset_existing_utm_template || false,
			utm_auto_apply_new_link: template.utm_auto_apply_new_link || false
		});
		setIsCreatingTemplate(false);
		setIsModalOpen(true);
	};

	const openCreateModal = () => {
		if (!is_pro_enabled) {
			openUpgradeToProModal();
			return;
		}
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

	const handleTemplateCopy = (template) => {
		// Filter out deleted categories when copying and normalize IDs
		const validCategories = filterValidCategories(template.categories).map(catId => normalizeCategoryId(catId));
		
		// Create a copy with a new name and preserve all fields including checkboxes
		const copiedTemplate = {
			...template,
			categories: validCategories, // Use filtered categories
			template_name: `Copy - ${template.template_name}`,
			// Preserve checkbox states - ensure they have default values if not set
			utm_enable_to_rewrite_existing_utm_template: template.utm_enable_to_rewrite_existing_utm_template || false,
			utm_auto_apply_new_link: template.utm_auto_apply_new_link || false
		};

		setActiveTemplate(null); // No active template since we're creating a new one
		setTemplateForm(copiedTemplate);
		setIsCreatingTemplate(true); // Set as creating since this is a new template
		setIsModalOpen(true);
	};

	const toggleTemplateExpansion = (templateIndex) => {
		const newExpanded = new Set(expandedTemplates);
		if (newExpanded.has(templateIndex)) {
			newExpanded.delete(templateIndex);
		} else {
			newExpanded.add(templateIndex);
		}
		setExpandedTemplates(newExpanded);
	};

	const isTemplateExpanded = (templateIndex) => {
		return expandedTemplates.has(templateIndex);
	};

	const shouldShowExpandButton = (template) => {
		// Show expand button if title is long or has many categories
		return template.template_name.length > 25 || (template.categories && template.categories.length > 2);
	};

	// Static demo templates for free users
	const demoTemplates = [
		{
			template_name: "Comprehensive Social Media Campaign Strategy to Boost Brand Awareness, Engagement, and Conversions Across Multiple Platforms Through Targeted Content, Analytics, and Audience-Centric Marketing Approaches",
			utm_source: "facebook",
			utm_medium: "social",
			utm_campaign: "product_launch",
			utm_term: "new_product",
			utm_content: "ad_creative_1",
			categories: [],
			template_index: "demo_1",
			created_at: "2025-01-01T00:00:00.000Z"
		},
		{
			template_name: "Email Newsletter",
			utm_source: "email",
			utm_medium: "newsletter",
			utm_campaign: "weekly_update",
			utm_term: "",
			utm_content: "header_link",
			categories: ["1"],
			template_index: "demo_2",
			created_at: "2025-01-01T00:00:00.000Z"
		},
		{
			template_name: "Google Ads Campaign",
			utm_source: "google",
			utm_medium: "cpc",
			utm_campaign: "search_ads",
			utm_term: "keywords",
			utm_content: "ad_text",
			categories: ["1"],
			template_index: "demo_3",
			created_at: "2025-01-01T00:00:00.000Z"
		}
	];

	// Handle demo template actions (show upgrade modal)
	const handleDemoTemplateAction = () => {
		openUpgradeToProModal();
	};


	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
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
								<div className="btl-utm-templates-title btl-d-title">
									{__('Dynamic UTM Templates', 'betterlinks')}
									<div className="btl-tooltip">
										<span className="dashicons dashicons-info-outline"></span>
										<span className="btl-tooltiptext">
											{__('Easily create dynamic and reusable UTM templates for your links. For more info, ', 'betterlinks')}
											<a href="https://betterlinks.io/docs/Create-Dynamic-UTM-Template-with-BetterLinks" target="_blank" rel="noopener noreferrer">
												{__('click here', 'betterlinks')}
											</a>
											.
										</span>
									</div>
								</div>
								<button className="button-primary btn-save-settings" onClick={openCreateModal} style={{ cursor: is_pro_enabled ? 'pointer' : 'not-allowed' }}>
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
								fetch_links_data={fetch_links_data}
							/>

							{/* Delete Confirmation Modal */}
							<ConfirmModal
								isOpen={showDeleteConfirm}
								onClose={cancelTemplateDelete}
								onConfirm={confirmTemplateDeleteAndResetParams}
								onSecondaryConfirm={confirmTemplateDelete}
								title={__('Delete UTM Template', 'betterlinks')}
								subtitle={__('Are you sure you want to delete this UTM template? This action cannot be undone.', 'betterlinks')}
								icon={plugin_root_url + '/assets/images/icons/warning.svg'}
								confirmButtonText={__('Delete & Remove UTM', 'betterlinks')}
								secondaryConfirmButtonText={__('Delete Template', 'betterlinks')}
								showCancelButton={false}
								cancelButtonText={__('Cancel', 'betterlinks')}
								isDangerous={true}
								extraClass="btl-utm-delete-confirm-modal"
							/>
							{/* Templates List */}
							{(is_pro_enabled ? utmTemplates.length > 0 : true) && (
								<div className="btl-utm-templates-list-display">
									<h4>{__('Configured Templates', 'betterlinks')}</h4>
									<div className="btl-utm-templates-list">
										{(is_pro_enabled ? utmTemplates : demoTemplates).map(template => {
											const isActiveTemplate = is_pro_enabled ? isTemplateActiveForAnyCategory(template) : false;
											const isDemoTemplate = !is_pro_enabled;
											return (
												<div key={template.template_index} className={`btl-utm-template-item ${isTemplateExpanded(template.template_index) ? 'expanded' : ''} ${isDemoTemplate ? 'btl-utm-template-demo' : ''}`}>
													<div className="btl-utm-template-row">
														<div className="btl-utm-template-content">
															<div
																className="btl-utm-template-header"
																onClick={() => shouldShowExpandButton(template) && toggleTemplateExpansion(template.template_index)}
																style={{ cursor: shouldShowExpandButton(template) ? 'pointer' : 'default' }}
															>
																<h5 className="btl-utm-template-name">
																	{template.template_name}
																</h5>
																{!isTemplateExpanded(template.template_index) && (
																	<div className="btl-utm-template-categories">
																		<span className="btl-utm-categories-label">{__('Categories:', 'betterlinks')} </span>
																		{template.categories && template.categories.length > 0
																			? template.categories.slice(0, 2).map((catId, index) => {
																				const category = isDemoTemplate ? { term_name: 'Uncategorized' } : findCategoryById(catId);
																				let categoryName;
																				if (isDemoTemplate) {
																					categoryName = 'Uncategorized';
																				} else if (termsLoading) {
																					categoryName = 'Loading...';
																				} else if (category) {
																					categoryName = category.term_name;
																				} else {
																					categoryName = 'Deleted';
																				}

																				const isActive = is_pro_enabled ? isCategoryActiveForTemplate(template, catId) : false;
																				const isDeleted = categoryName === 'Deleted';
																				const isLoading = categoryName === 'Loading...';
																				const tooltipText = getCategoryTooltipText(categoryName, isActive, isDeleted, isLoading, isDemoTemplate);

																				return (
																					<div key={catId} className="btl-tooltip">
																						<span className={`btl-utm-category-tag ${isDeleted ? 'btl-utm-category-deleted' : (isLoading ? 'btl-utm-category-loading' : (isActive ? 'btl-utm-category-active' : ''))}`}>
																							{categoryName}
																						</span>
																						<span className="btl-tooltiptext">{tooltipText}</span>
																					</div>
																				);
																			})
																			: <div className="btl-tooltip">
																				<span className="btl-utm-category-tag">{__('Unassigned', 'betterlinks')}</span>
																				<span className="btl-tooltiptext">{__('Category not assigned yet.', 'betterlinks')}</span>
																			  </div>
																		}
																		{template.categories && template.categories.length > 2 && (
																			<span className="btl-utm-more-categories">
																				{template.categories.length - 2} More...
																			</span>
																		)}
																	</div>
																)}
															</div>
														</div>

														<div className="btl-utm-template-actions">
															<button
																type="button"
																className="btl-utm-action-btn btl-utm-btn-ac"
																style={{ cursor: is_pro_enabled ? 'pointer' : 'not-allowed' }}
																onClick={() => isDemoTemplate ? handleDemoTemplateAction() : handleTemplateCopy(template)}
															>
																<div className="btl-tooltip btl-utm-line">
																	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3.34333 13.9475C3.08779 13.8018 2.87523 13.5912 2.72715 13.3371C2.57906 13.0829 2.50071 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333M5.83333 8.05583C5.83333 7.46639 6.06749 6.90109 6.48429 6.48429C6.90109 6.06749 7.46639 5.83333 8.05583 5.83333H15.2775C15.5694 5.83333 15.8584 5.89082 16.128 6.00251C16.3977 6.1142 16.6427 6.27791 16.849 6.48429C17.0554 6.69067 17.2191 6.93567 17.3308 7.20532C17.4425 7.47497 17.5 7.76397 17.5 8.05583V15.2775C17.5 15.5694 17.4425 15.8584 17.3308 16.128C17.2191 16.3977 17.0554 16.6427 16.849 16.849C16.6427 17.0554 16.3977 17.2191 16.128 17.3308C15.8584 17.4425 15.5694 17.5 15.2775 17.5H8.05583C7.76397 17.5 7.47497 17.4425 7.20532 17.3308C6.93567 17.2191 6.69067 17.0554 6.48429 16.849C6.27791 16.6427 6.1142 16.3977 6.00251 16.128C5.89082 15.8584 5.83333 15.5694 5.83333 15.2775V8.05583Z" stroke="#475467" className="btl-icon-light" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																		<path d="M3.34333 13.9475C3.08779 13.8018 2.87523 13.5912 2.72715 13.3371C2.57906 13.0829 2.50071 12.7942 2.5 12.5V4.16667C2.5 3.25 3.25 2.5 4.16667 2.5H12.5C13.125 2.5 13.465 2.82083 13.75 3.33333M5.83333 8.05583C5.83333 7.46639 6.06749 6.90109 6.48429 6.48429C6.90109 6.06749 7.46639 5.83333 8.05583 5.83333H15.2775C15.5694 5.83333 15.8584 5.89082 16.128 6.00251C16.3977 6.1142 16.6427 6.27791 16.849 6.48429C17.0554 6.69067 17.2191 6.93567 17.3308 7.20532C17.4425 7.47497 17.5 7.76397 17.5 8.05583V15.2775C17.5 15.5694 17.4425 15.8584 17.3308 16.128C17.2191 16.3977 17.0554 16.6427 16.849 16.849C16.6427 17.0554 16.3977 17.2191 16.128 17.3308C15.8584 17.4425 15.5694 17.5 15.2775 17.5H8.05583C7.76397 17.5 7.47497 17.4425 7.20532 17.3308C6.93567 17.2191 6.69067 17.0554 6.48429 16.849C6.27791 16.6427 6.1142 16.3977 6.00251 16.128C5.89082 15.8584 5.83333 15.5694 5.83333 15.2775V8.05583Z" stroke="#FFFFFF" className="btl-icon-dark" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																	<span className="btl-tooltiptext">{__('Duplicate', 'betterlinks')}</span>
																</div>
															</button>
															<button
																type="button"
																className="btl-utm-action-btn btl-utm-btn-ac"
																style={{ cursor: is_pro_enabled ? 'pointer' : 'not-allowed' }}
																onClick={() => isDemoTemplate ? handleDemoTemplateAction() : handleTemplateSelect(template)}
																title={__('Edit', 'betterlinks')}
															>
																<div className="btl-tooltip btl-utm-line">
																	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M5.8335 5.83333H5.00016C4.55814 5.83333 4.13421 6.00893 3.82165 6.32149C3.50909 6.63405 3.3335 7.05797 3.3335 7.5V15C3.3335 15.442 3.50909 15.866 3.82165 16.1785C4.13421 16.4911 4.55814 16.6667 5.00016 16.6667H12.5002C12.9422 16.6667 13.3661 16.4911 13.6787 16.1785C13.9912 15.866 14.1668 15.442 14.1668 15V14.1667M13.3335 4.16667L15.8335 6.66667M16.9877 5.48759C17.3159 5.15938 17.5003 4.71424 17.5003 4.25009C17.5003 3.78594 17.3159 3.34079 16.9877 3.01259C16.6595 2.68438 16.2143 2.5 15.7502 2.5C15.286 2.5 14.8409 2.68438 14.5127 3.01259L7.50016 10.0001V12.5001H10.0002L16.9877 5.48759Z" stroke="#475467" className="btl-icon-light" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																		<path d="M5.8335 5.83333H5.00016C4.55814 5.83333 4.13421 6.00893 3.82165 6.32149C3.50909 6.63405 3.3335 7.05797 3.3335 7.5V15C3.3335 15.442 3.50909 15.866 3.82165 16.1785C4.13421 16.4911 4.55814 16.6667 5.00016 16.6667H12.5002C12.9422 16.6667 13.3661 16.4911 13.6787 16.1785C13.9912 15.866 14.1668 15.442 14.1668 15V14.1667M13.3335 4.16667L15.8335 6.66667M16.9877 5.48759C17.3159 5.15938 17.5003 4.71424 17.5003 4.25009C17.5003 3.78594 17.3159 3.34079 16.9877 3.01259C16.6595 2.68438 16.2143 2.5 15.7502 2.5C15.286 2.5 14.8409 2.68438 14.5127 3.01259L7.50016 10.0001V12.5001H10.0002L16.9877 5.48759Z" stroke="#FFFFFF" className="btl-icon-dark" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																	<span className="btl-tooltiptext">{__('Edit', 'betterlinks')}</span>
																</div>
															</button>
															<button
																type="button"
																className="btl-utm-action-btn btl-utm-btn-ac"
																style={{ cursor: is_pro_enabled ? 'pointer' : 'not-allowed' }}
																onClick={() => isDemoTemplate ? handleDemoTemplateAction() : handleTemplateDelete(template.template_index)}
																title={__('Delete', 'betterlinks')}
															>
																<div className="btl-tooltip">
																	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M3.3335 5.83333H16.6668M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M4.16683 5.83333L5.00016 15.8333C5.00016 16.2754 5.17576 16.6993 5.48832 17.0118C5.80088 17.3244 6.2248 17.5 6.66683 17.5H13.3335C13.7755 17.5 14.1994 17.3244 14.512 17.0118C14.8246 16.6993 15.0002 16.2754 15.0002 15.8333L15.8335 5.83333M7.50016 5.83333V3.33333C7.50016 3.11232 7.58796 2.90036 7.74424 2.74408C7.90052 2.5878 8.11248 2.5 8.3335 2.5H11.6668C11.8878 2.5 12.0998 2.5878 12.2561 2.74408C12.4124 2.90036 12.5002 3.11232 12.5002 3.33333V5.83333" stroke="#475467" className="btl-icon-light" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																		<path d="M3.3335 5.83333H16.6668M8.3335 9.16667V14.1667M11.6668 9.16667V14.1667M4.16683 5.83333L5.00016 15.8333C5.00016 16.2754 5.17576 16.6993 5.48832 17.0118C5.80088 17.3244 6.2248 17.5 6.66683 17.5H13.3335C13.7755 17.5 14.1994 17.3244 14.512 17.0118C14.8246 16.6993 15.0002 16.2754 15.0002 15.8333L15.8335 5.83333M7.50016 5.83333V3.33333C7.50016 3.11232 7.58796 2.90036 7.74424 2.74408C7.90052 2.5878 8.11248 2.5 8.3335 2.5H11.6668C11.8878 2.5 12.0998 2.5878 12.2561 2.74408C12.4124 2.90036 12.5002 3.11232 12.5002 3.33333V5.83333" stroke="#FFFFFF" className="btl-icon-dark" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
																	</svg>
																	<span className="btl-tooltiptext">{__('Delete', 'betterlinks')}</span>
																</div>
															</button>
														</div>
													</div>

													{isTemplateExpanded(template.template_index) && (
														<>
															<div className="btl-utm-template-separator"></div>
															<div className="btl-utm-template-categories-expanded">
																<div className="btl-utm-categories-label">{__('Categories:', 'betterlinks')}</div>
																<div className="btl-utm-categories-grid">
																	{template.categories && template.categories.length > 0
																		? template.categories.map((catId) => {
																			const category = isDemoTemplate ? { term_name: 'Uncategorized' } : findCategoryById(catId);
																			let categoryName;
																			if (isDemoTemplate) {
																				categoryName = 'Uncategorized';
																			} else if (termsLoading) {
																				categoryName = 'Loading...';
																			} else if (category) {
																				categoryName = category.term_name;
																			} else {
																				categoryName = 'Deleted';
																			}

																			const isActive = is_pro_enabled ? isCategoryActiveForTemplate(template, catId) : false;
																			const isDeleted = categoryName === 'Deleted';
																			const isLoading = categoryName === 'Loading...';
																			const tooltipText = getCategoryTooltipText(categoryName, isActive, isDeleted, isLoading, isDemoTemplate);

																			return (
																				<div key={catId} className="btl-tooltip">
																					<span className={`btl-utm-category-tag ${isDeleted ? 'btl-utm-category-deleted' : (isLoading ? 'btl-utm-category-loading' : (isActive ? 'btl-utm-category-active' : ''))}`}>
																						{categoryName}
																					</span>
																					<span className="btl-tooltiptext">{tooltipText}</span>
																				</div>
																			);
																		})
																		: <div className="btl-tooltip">
																			<span className="btl-utm-category-tag">{__('Unassigned', 'betterlinks')}</span>
																			<span className="btl-tooltiptext">{__('Unassigned Category', 'betterlinks')}</span>
																		  </div>
																	}
																</div>
															</div>
														</>
													)}
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* Empty State when no templates exist - only show for pro users */}
							{is_pro_enabled && utmTemplates.length === 0 && (
								<div className="btl-utm-empty-state">
									<div className="btl-utm-empty-content">
										<div className="btl-utm-empty-icon">
											<img 
												src={plugin_root_url + 'assets/images/icons/empty-template.svg'} 
												alt="No UTM Templates" 
												width="56" 
												height="56"
											/>
										</div>
										<h4 className="btl-utm-empty-title">
											{__('No UTM Templates Found', 'betterlinks')}
										</h4>
										<p className="btl-utm-empty-description">
											{__('Create your first UTM template to auto-apply parameters to links by category and track campaign performance.', 'betterlinks')}
										</p>
										<button
											className="btl-utm-empty-cta"
											onClick={openCreateModal}
										>
											{__('Create First Template', 'betterlinks')}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</Form>
			)}
		</Formik>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	update_option: bindActionCreators(update_option, dispatch),
	fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
});

export default connect(null, mapDispatchToProps)(UTMBuilderGlobalSettings);
