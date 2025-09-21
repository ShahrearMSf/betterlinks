import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import CreatableSelect from 'react-select/creatable';
import { modalCustomStyles } from 'utils/helper';
import { makeRequest } from 'utils/helper';
import UTMConfirmationModal from './UTMConfirmationModal';

const utmTemplateModalStyles = {
    ...modalCustomStyles,
    content: {
        ...modalCustomStyles.content,
        maxWidth: '700px',
        padding: '0',
        border: 'none',
        borderRadius: '12px',
        background: '#F9FAFB',
        position: 'absolute',
    },
};

const UTMTemplateModal = ({
    isOpen,
    onClose,
    isCreatingTemplate,
    activeTemplate,
    templateForm,
    setTemplateForm,
    terms,
    handleTemplateCreate,
    handleTemplateUpdate,
    handleTemplateDelete,
}) => {
    const [isApplying, setIsApplying] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalState, setModalState] = useState('confirmation'); // 'confirmation' or 'success'
    const [modalMessage, setModalMessage] = useState('');
    const [preventMainModalClose, setPreventMainModalClose] = useState(false);

    const getCategoryOptions = () => {
        if (!terms || terms.length === 0) return [];

        return terms
            .filter(term => term.term_type === 'category')
            .map(term => ({
                value: parseInt(term.ID),
                label: term.term_name
                //label: `${term.term_name} (${term.link_count || 0} links)`
            }));
    };

    const getSelectedCategories = () => {
        if (!templateForm.categories || !terms || terms.length === 0) return [];

        return templateForm.categories.map(catId => {
            const category = terms.find(term => parseInt(term.ID) === parseInt(catId));
            return category ? {
                value: parseInt(category.ID),
                label: category.term_name
                //label: `${category.term_name} (${category.link_count || 0} links)`
            } : null;
        }).filter(Boolean);
    };

    const getTotalLinksInSelectedCategories = () => {
        if (!templateForm.categories || !terms || terms.length === 0) return 0;

        return templateForm.categories.reduce((total, catId) => {
            const category = terms.find(term => parseInt(term.ID) === parseInt(catId));
            return total + (category ? (parseInt(category.link_count) || 0) : 0);
        }, 0);
    };

    const handleCategoryChange = (selectedOptions) => {
        const categoryIds = selectedOptions ? selectedOptions.map(option => option.value) : [1]; // Default to Uncategorized if empty
        setTemplateForm({ ...templateForm, categories: categoryIds });
    };

    const handleSubmit = () => {
        // Show confirmation modal before proceeding
        setModalState('confirmation');
        setShowModal(true);
    };



    const handleConfirmSubmit = async () => {
        setIsApplying(true);

        try {
            let successMsg = '';

            // Apply UTM template to existing links if categories are selected
            if (templateForm.categories && templateForm.categories.length > 0) {
                // Check if at least one UTM parameter is provided
                const hasUtmData = templateForm.utm_source || templateForm.utm_medium ||
                    templateForm.utm_campaign || templateForm.utm_term || templateForm.utm_content;

                if (!hasUtmData) {
                    setModalMessage(__('Please provide at least one UTM parameter to apply to links.', 'betterlinks'));
                    setModalState('success');
                    setIsApplying(false);
                    return;
                }

                const response = await makeRequest({
                    action: 'betterlinks/admin/apply_utm_template_to_links',
                    template_data: {
                        utm_source: templateForm.utm_source || '',
                        utm_medium: templateForm.utm_medium || '',
                        utm_campaign: templateForm.utm_campaign || '',
                        utm_term: templateForm.utm_term || '',
                        utm_content: templateForm.utm_content || ''
                    },
                    category_ids: templateForm.categories,
                    rewrite_existing: templateForm.utm_enable_to_rewrite_existing_utm_template || false
                });

                if (response?.data?.success) {
                    const { updated_count, skipped_count, total_links } = response.data.data;
                    successMsg = __('Updated: %d links', 'betterlinks').replace('%d', updated_count) + '\n' +
                        __('Skipped: %d links', 'betterlinks').replace('%d', skipped_count) + '\n' +
                        __('Total: %d links', 'betterlinks').replace('%d', total_links);
                } else {
                    successMsg = __('Failed to apply UTM template to links.', 'betterlinks');
                }
            }

            // Prepare success message for template save
            if (!successMsg) {
                successMsg = isCreatingTemplate
                    ? __('UTM template created successfully!', 'betterlinks')
                    : __('UTM template updated successfully!', 'betterlinks');
            }

            // Prevent main modal from closing until user clicks OK on success
            setPreventMainModalClose(true);

            // Show success state immediately
            setModalMessage(successMsg);
            setModalState('success');
            setIsApplying(false);

        } catch (error) {
            console.error('Error applying UTM template:', error);
            setModalMessage(__('An error occurred while applying the UTM template.', 'betterlinks'));
            setModalState('success');
            setIsApplying(false);
        }
    };

    // Handle success modal OK button click
    const handleSuccessOk = () => {
        // Save the template when user clicks OK on success modal
        try {
            if (isCreatingTemplate) {
                handleTemplateCreate();
            } else {
                handleTemplateUpdate();
            }
        } catch (error) {
            console.error('Error saving template:', error);
        }

        // Reset states and close modals
        setPreventMainModalClose(false);
        setShowModal(false);
        // The template handlers will close the main modal
    };

    const handleDeleteAndClose = () => {
        if (activeTemplate) {
            handleTemplateDelete(activeTemplate.template_index);
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={utmTemplateModalStyles}
            ariaHideApp={false}
            className="btl-utm-template-modal-override"
        >
            <div className="btl-utm-template-modal">
                {/* Header with close button */}
                <div className="btl-utm-template-modal__header">
                    <h3 className="btl-utm-template-modal__title">
                        {isCreatingTemplate
                            ? __('Create New UTM Template', 'betterlinks')
                            : __('Edit UTM Template', 'betterlinks')
                        }
                    </h3>
                    <button className="btl-utm-close-modal" onClick={onClose} aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="btl-utm-template-modal__body">
                    <div className="btl-utm-template-fields">
                        {/* Template Name */}
                        <div className="btl-utm-field-group">
                            <label className="btl-field-label">{__('Template Name', 'betterlinks')}</label>
                            <input
                                type="text"
                                value={templateForm.template_name}
                                onChange={(e) => setTemplateForm({ ...templateForm, template_name: e.target.value })}
                                placeholder={__('Enter template name...', 'betterlinks')}
                                className="btl-form-input"
                            />
                        </div>

                        {/* Assign to Categories */}
                        <div className="btl-utm-field-group btl-utm-category-select">
                            <label className="btl-field-label">
                                {__('Assign to Categories', 'betterlinks')}
                                <div className="btl-tooltip">
                                    <span className="dashicons dashicons-info-outline"></span>
                                    <span className="btl-tooltiptext">{__('Select which categories should use this UTM template. If no category is selected, it will apply to "Uncategorized" links.', 'betterlinks')}</span>
                                </div>
                            </label>
                            <CreatableSelect
                                isMulti
                                value={getSelectedCategories()}
                                onChange={handleCategoryChange}
                                options={getCategoryOptions()}
                                className="btl-react-select-container"
                                classNamePrefix="btl-react-select"
                                placeholder={__('Select categories...', 'betterlinks')}
                            />
                            {templateForm.categories && templateForm.categories.length > 0 && (
                                <div className="btl-utm-links-count">
                                    <span className="btl-links-count-text">
                                        *{__('Number of BetterLinks Available', 'betterlinks')}: <strong>{getTotalLinksInSelectedCategories()}</strong>
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* UTM Parameters */}
                        <div className="btl-utm-global-form">
                            {/* UTM Source */}
                            <div className="btl-utm-field-group">
                                <label className="btl-field-label">{__('UTM Source', 'betterlinks')}</label>
                                <input
                                    type="text"
                                    value={templateForm.utm_source}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_source: e.target.value })}
                                    placeholder={__('eg: Twitter, Facebook', 'betterlinks')}
                                    className="btl-form-input"
                                />
                            </div>

                            {/* UTM Medium */}
                            <div className="btl-utm-field-group">
                                <label className="btl-field-label">{__('UTM Medium', 'betterlinks')}</label>
                                <input
                                    type="text"
                                    value={templateForm.utm_medium}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_medium: e.target.value })}
                                    placeholder={__('e.g. social, email, cpc', 'betterlinks')}
                                    className="btl-form-input"
                                />
                            </div>

                            {/* UTM Campaign */}
                            <div className="btl-utm-field-group">
                                <label className="btl-field-label">{__('UTM Campaign', 'betterlinks')}</label>
                                <input
                                    type="text"
                                    value={templateForm.utm_campaign}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_campaign: e.target.value })}
                                    placeholder={__('eg: summer sale', 'betterlinks')}
                                    className="btl-form-input"
                                />
                            </div>

                            {/* UTM Term */}
                            <div className="btl-utm-field-group">
                                <label className="btl-field-label">{__('UTM Term', 'betterlinks')}</label>
                                <input
                                    type="text"
                                    value={templateForm.utm_term}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_term: e.target.value })}
                                    placeholder={__('e.g: paid keywords', 'betterlinks')}
                                    className="btl-form-input"
                                />
                            </div>

                            {/* UTM Content */}
                            <div className="btl-utm-field-group">
                                <label className="btl-field-label">{__('UTM Content', 'betterlinks')}</label>
                                <input
                                    type="text"
                                    value={templateForm.utm_content}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_content: e.target.value })}
                                    placeholder={__('eg: text AD name', 'betterlinks')}
                                    className="btl-form-input"
                                />
                            </div>
                        </div>
                        {/* Checkboxes */}
                        <div className="btl-utm-checkboxes">
                            <div className="btl-checkbox-group">
                                <label className="btl-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={templateForm.utm_enable_to_rewrite_existing_utm_template}
                                        onChange={(e) => setTemplateForm({ ...templateForm, utm_enable_to_rewrite_existing_utm_template: e.target.checked })}
                                        className="btl-checkbox-input"
                                    />
                                    <span className="btl-checkbox-custom"></span>
                                    <span className="btl-checkbox-text">
                                        {__('Overwrite Existing UTM', 'betterlinks')}
                                        <div className="btl-tooltip">
                                            <span className="dashicons dashicons-info-outline"></span>
                                            <span className="btl-tooltiptext">{__('Enable to overwrite existing UTM parameters on links', 'betterlinks')}</span>
                                        </div>
                                    </span>
                                </label>
                            </div>

                            <div className="btl-checkbox-group">
                                <label className="btl-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={templateForm.utm_auto_apply_new_link}
                                        onChange={(e) => setTemplateForm({ ...templateForm, utm_auto_apply_new_link: e.target.checked })}
                                        className="btl-checkbox-input"
                                    />
                                    <span className="btl-checkbox-custom"></span>
                                    <span className="btl-checkbox-text">
                                        {__('Use this UTM for ALL future Links', 'betterlinks')}
                                        <div className="btl-tooltip">
                                            <span className="dashicons dashicons-info-outline"></span>
                                            <span className="btl-tooltiptext">{__('Automatically apply this UTM template to all new links in selected categories', 'betterlinks')}</span>
                                        </div>
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Add New Field Button */}
                        {/* <div className="btl-add-field-section">
                            <button type="button" className="btl-add-field-btn">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M8 5.5V10.5M5.5 8H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                {__('Add New Field', 'betterlinks')}
                            </button>
                        </div> */}
                    </div>
                </div>

                {/* Footer */}
                <div className="btl-utm-template-modal__footer">
                    <div className="btl-utm-template-modal__actions">
                        <button
                            type="button"
                            className="btl-utm-btn btl-utm-btn-primary"
                            onClick={handleSubmit}
                            disabled={isApplying}
                        >
                            {isApplying ? (
                                __('Creating...', 'betterlinks')
                            ) : (
                                isCreatingTemplate
                                    ? __('Create Template', 'betterlinks')
                                    : __('Update Template', 'betterlinks')
                            )}
                        </button>

                        <button
                            type="button"
                            className="btl-utm-btn btl-utm-btn-secondary"
                            onClick={onClose}
                        >
                            {__('Cancel', 'betterlinks')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Unified Modal */}
            <UTMConfirmationModal
                isOpen={showModal}
                modalState={modalState}
                onClose={() => {
                    if (modalState === 'success') {
                        // When success modal is closed via OK button, save template and close main modal
                        handleSuccessOk();
                    } else {
                        // For confirmation modal, just close
                        setShowModal(false);
                    }
                }}
                onConfirm={handleConfirmSubmit}
                isApplying={isApplying}
                // Confirmation props
                confirmationTitle={__('Apply UTM Template', 'betterlinks')}
                confirmationMessage={
                    templateForm.categories && templateForm.categories.length > 0
                        ? __('This will overwrite existing UTM settings on %d existing URLs.', 'betterlinks').replace('%d', getTotalLinksInSelectedCategories())
                        : __('This will save the UTM template.')
                }
                confirmationSubMessage={templateForm.utm_auto_apply_new_link ? __('All new shortlinks in this category will automatically use this template.', 'betterlinks') : ''}
                confirmButtonText={__('Apply UTM Template', 'betterlinks')}
                cancelButtonText={__('Cancel', 'betterlinks')}
                // Success props
                successMessage={modalMessage}
            />
        </Modal>
    );
};

export default UTMTemplateModal;
