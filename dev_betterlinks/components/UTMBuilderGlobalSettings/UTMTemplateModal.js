import React, { useState, useEffect } from 'react';
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
    fetch_links_data,
}) => {
    const [isApplying, setIsApplying] = useState(false);
    const [isProcessingOk, setIsProcessingOk] = useState(false); // Track OK button loading in success modal
    const [showModal, setShowModal] = useState(false);
    const [modalState, setModalState] = useState('confirmation'); // 'confirmation' or 'success'
    const [modalMessage, setModalMessage] = useState('');
    const [preventMainModalClose, setPreventMainModalClose] = useState(false);
    const [utmStatusCounts, setUtmStatusCounts] = useState({
        total_links: 0,
        links_with_utm: 0,
        links_without_utm: 0
    });
    const [resetTargetCount, setResetTargetCount] = useState(0);
    const [isResetMode, setIsResetMode] = useState(false); // Track if we're in reset mode

    // Fetch UTM status counts when categories change
    useEffect(() => {
        fetchUtmStatusCounts();
    }, [templateForm.categories]);

    // Re-fetch counts when rewrite checkbox changes (though counts don't change, this ensures we have fresh data)
    useEffect(() => {
        if (templateForm.categories && templateForm.categories.length > 0) {
            fetchUtmStatusCounts();
        }
    }, [templateForm.utm_enable_to_rewrite_existing_utm_template]);

    const getCategoryOptions = () => {
        if (!terms || terms.length === 0) {
            return [];
        }

        const categories = terms.filter(term => term.term_type === 'category');

        const options = categories
            .sort((a, b) => a.term_name.localeCompare(b.term_name))
            .map(term => ({
                value: parseInt(term.ID),
                label: term.term_name
                //label: `${term.term_name} (${term.link_count || 0} links)`
            }));

        return options;
    };

    const getSelectedCategories = () => {
        if (!templateForm.categories || !terms || terms.length === 0) {
            return [];
        }

        const selectedCategories = templateForm.categories.map(catId => {
            // Try multiple comparison methods to handle data type inconsistencies
            const category1 = terms.find(term => parseInt(term.ID) === parseInt(catId));
            const category2 = terms.find(term => String(term.ID) === String(catId));
            const category3 = terms.find(term => term.ID == catId);

            const category = category1 || category2 || category3;

            return category ? {
                value: parseInt(category.ID),
                label: category.term_name
                //label: `${category.term_name} (${category.link_count || 0} links)`
            } : null;
        }).filter(Boolean);

        return selectedCategories;
    };

    const getTotalLinksInSelectedCategories = () => {
        if (!templateForm.categories || !terms || terms.length === 0) return 0;

        return templateForm.categories.reduce((total, catId) => {
            // Try multiple comparison methods to handle data type inconsistencies
            const category1 = terms.find(term => parseInt(term.ID) === parseInt(catId));
            const category2 = terms.find(term => String(term.ID) === String(catId));
            const category3 = terms.find(term => term.ID == catId);

            const category = category1 || category2 || category3;
            const linkCount = category ? (parseInt(category.link_count) || 0) : 0;

            return total + linkCount;
        }, 0);
    };

    const fetchUtmStatusCounts = async () => {
        if (!templateForm.categories || templateForm.categories.length === 0) {
            setUtmStatusCounts({ total_links: 0, links_with_utm: 0, links_without_utm: 0 });
            return;
        }

        try {
            const response = await makeRequest({
                action: 'betterlinks/admin/get_utm_status_counts',
                category_ids: templateForm.categories
            });

            if (response?.data?.success) {
                setUtmStatusCounts(response.data.data);
            } else {
                setUtmStatusCounts({ total_links: 0, links_with_utm: 0, links_without_utm: 0 });
            }
        } catch (error) {
            console.error('Error fetching UTM status counts:', error);
            setUtmStatusCounts({ total_links: 0, links_with_utm: 0, links_without_utm: 0 });
        }
    };

    const getRelevantLinkCount = () => {
        // If rewrite checkbox is enabled, show all links (since it will apply to all)
        if (templateForm.utm_enable_to_rewrite_existing_utm_template) {
            return utmStatusCounts.total_links;
        }
        
        // If it's a reset action, show only links with UTM
        if (templateForm.utm_enable_to_reset_existing_utm_template) {
            return utmStatusCounts.links_with_utm;
        }
        
        // For normal apply action, show only links without UTM
        return utmStatusCounts.links_without_utm;
    };

    const handleCategoryChange = (selectedOptions) => {
        const categoryIds = selectedOptions ? selectedOptions.map(option => option.value) : []; // No default category
        
        // If all categories are cleared, reset UTM status counts and checkbox states
        if (categoryIds.length === 0) {
            setUtmStatusCounts({ total_links: 0, links_with_utm: 0, links_without_utm: 0 });
            setTemplateForm({ 
                ...templateForm, 
                categories: categoryIds,
                utm_enable_to_rewrite_existing_utm_template: false,
                utm_auto_apply_new_link: false
            });
        } else {
            setTemplateForm({ ...templateForm, categories: categoryIds });
        }
    };

    const handleResetUTMParameters = async () => {
        if (!templateForm.categories || templateForm.categories.length === 0) {
            return;
        }

        // Store the exact count that will be affected by reset (links with UTM)
        setResetTargetCount(utmStatusCounts.links_with_utm);

        // Set reset mode flag
        setIsResetMode(true);

        // Set a flag to indicate this is a reset action
        setTemplateForm({
            ...templateForm,
            utm_enable_to_reset_existing_utm_template: true
        });

        // Show confirmation modal for reset action
        setModalState('confirmation');
        setShowModal(true);
    };

    const handleSubmit = () => {
        // Clear reset mode when doing a normal template update/create
        setIsResetMode(false);

        // Reset any existing reset flag when doing a normal template update/create
        if (templateForm.utm_enable_to_reset_existing_utm_template) {
            setTemplateForm(prev => ({
                ...prev,
                utm_enable_to_reset_existing_utm_template: false
            }));
        }

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
                // Check if we're resetting UTMs or applying them
                const isResetting = templateForm.utm_enable_to_reset_existing_utm_template;

                // If not resetting, check if at least one UTM parameter is provided
                if (!isResetting) {
                    const hasUtmData = templateForm.utm_source || templateForm.utm_medium ||
                        templateForm.utm_campaign || templateForm.utm_term || templateForm.utm_content;

                    if (!hasUtmData) {
                        setModalMessage(__('Please provide at least one UTM parameter to apply to links.', 'betterlinks'));
                        setModalState('success');
                        setIsApplying(false);
                        return;
                    }
                }

                const response = await makeRequest({
                    action: 'betterlinks/admin/apply_utm_template_to_links',
                    template_data: {
                        utm_source: isResetting ? '' : (templateForm.utm_source || ''),
                        utm_medium: isResetting ? '' : (templateForm.utm_medium || ''),
                        utm_campaign: isResetting ? '' : (templateForm.utm_campaign || ''),
                        utm_term: isResetting ? '' : (templateForm.utm_term || ''),
                        utm_content: isResetting ? '' : (templateForm.utm_content || '')
                    },
                    category_ids: templateForm.categories,
                    rewrite_existing: isResetting ? true : (templateForm.utm_enable_to_rewrite_existing_utm_template || false),
                    reset_existing: isResetting ? true : false
                });

                if (response?.data?.success) {
                    const { updated_count, skipped_count, total_links } = response.data.data;
                    if (isResetting) {
                        // For reset operations, use the stored target count to show the exact count from confirmation
                        const actualResetCount = resetTargetCount;
                        successMsg = __('UTM parameters reset successfully!', 'betterlinks') + '\n' +
                            __('Updated: %d links', 'betterlinks').replace('%d', actualResetCount) + '\n' +
                            __('Skipped: %d links', 'betterlinks').replace('%d', skipped_count) + '\n' +
                            __('Total: %d links', 'betterlinks').replace('%d', actualResetCount + skipped_count);
                    } else {
                        successMsg = __('Updated: %d links', 'betterlinks').replace('%d', updated_count) + '\n' +
                            __('Skipped: %d links', 'betterlinks').replace('%d', skipped_count) + '\n' +
                            __('Total: %d links', 'betterlinks').replace('%d', total_links);
                    }
                } else {
                    successMsg = isResetting 
                        ? __('Failed to reset UTM parameters.', 'betterlinks')
                        : __('Failed to apply UTM template to links.', 'betterlinks');
                }

                // Reset the flag after processing
                setTemplateForm(prev => ({
                    ...prev,
                    utm_enable_to_reset_existing_utm_template: false
                }));

                // Clear the reset target count after processing
                if (isResetting) {
                    setResetTargetCount(0);
                }

                // Refresh UTM status counts after any UTM operation (apply, update, or reset)
                await fetchUtmStatusCounts();
            }

            // Prepare success message for template save (only when not resetting)
            if (!successMsg && !templateForm.utm_enable_to_reset_existing_utm_template) {
                successMsg = isCreatingTemplate
                    ? __('UTM template created successfully.', 'betterlinks')
                    : __('UTM template updated successfully.', 'betterlinks');
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

            // Reset the flag in case of error
            setTemplateForm(prev => ({
                ...prev,
                utm_enable_to_reset_existing_utm_template: false
            }));

            // Refresh UTM status counts even in error case for any UTM operations
            // This ensures the UI reflects the actual current state
            await fetchUtmStatusCounts();
        }
    };

    // Handle success modal OK button click
    const handleSuccessOk = async () => {
        setIsProcessingOk(true); // Show loading state on OK button

        try {
            // Check if this is a reset operation using isResetMode instead of the form flag
            if (isResetMode) {
                // For reset operations, refresh the links data to show updated URLs
                if (fetch_links_data) {
                    await fetch_links_data();
                }
            } else {
                // This is a template save operation (create or update)
                try {
                    if (isCreatingTemplate) {
                        handleTemplateCreate();
                    } else {
                        handleTemplateUpdate();

                    }
                } catch (error) {
                    console.error('Error saving template:', error);
                }
            }

            // Refresh UTM status counts for all operations to ensure real-time updates
            await fetchUtmStatusCounts();

            // Reset states and close modals
            setPreventMainModalClose(false);
            setShowModal(false);

            // Store reset mode state before clearing it
            const wasResetMode = isResetMode;
            setIsResetMode(false); // Clear reset mode after success
        } catch (error) {
            console.error('Error in handleSuccessOk:', error);
        } finally {
            setIsProcessingOk(false); // Clear loading state
        }

        // If it was a reset action, just close the main modal without saving template
        // if (wasResetMode) {
        //     onClose();
        // }
        // The template handlers will close the main modal for save actions
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
                                    <span className="btl-tooltiptext">{__('Select which categories should use this UTM template. You must select at least one category for the template to be active.', 'betterlinks')}</span>
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
                                isValidNewOption={() => false}
                                noOptionsMessage={() => __('Not Found', 'betterlinks')}
                                formatCreateLabel={() => null}
                            />
                            {templateForm.categories && templateForm.categories.length > 0 && (
                                <div className="btl-utm-links-count">
                                    <span className="btl-links-count-text">
                                        *{__('Total BetterLinks', 'betterlinks')}: <strong>{utmStatusCounts.total_links}</strong>
                                        {utmStatusCounts.total_links > 0 && (
                                            <>
                                                {' | '}
                                                {__('Without UTM', 'betterlinks')}: <strong>{utmStatusCounts.links_without_utm}</strong>
                                                {' | '}
                                                {__('With UTM', 'betterlinks')}: <strong>{utmStatusCounts.links_with_utm}</strong>
                                            </>
                                        )}
                                    </span>
                                     {/* Reset UTM Button */}
                                    {!isCreatingTemplate && utmStatusCounts.links_with_utm > 0 && (
                                    <button 
                                        type="button"
                                        className="btl-utm-btn-reset"
                                        onClick={handleResetUTMParameters}
                                    >
                                        {__('Reset Existing UTM', 'betterlinks')}
                                    </button>
                                    )}
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
                                    placeholder={__('eg: newsletter', 'betterlinks')}
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
                                        onChange={(e) => setTemplateForm({
                                            ...templateForm,
                                            utm_enable_to_rewrite_existing_utm_template: e.target.checked
                                        })}
                                        disabled={!(templateForm.categories && templateForm.categories.length > 0)}
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
                                        disabled={!(templateForm.categories && templateForm.categories.length > 0)}
                                        className="btl-checkbox-input"
                                    />
                                    <span className="btl-checkbox-custom"></span>
                                    <span className="btl-checkbox-text">
                                        {__('Apply this UTM for ALL future Links', 'betterlinks')}
                                        <div className="btl-tooltip">
                                            <span className="dashicons dashicons-info-outline"></span>
                                            <span className="btl-tooltiptext">{__('This UTM template will be auto-applied to all new links in selected categories.', 'betterlinks')}</span>
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
                        // For confirmation modal, just close and reset any flags
                        setShowModal(false);
                        setIsResetMode(false); // Clear reset mode
                        // Reset the reset flag if user cancels the confirmation
                        if (templateForm.utm_enable_to_reset_existing_utm_template) {
                            setTemplateForm(prev => ({
                                ...prev,
                                utm_enable_to_reset_existing_utm_template: false
                            }));
                        }
                    }
                }}
                onConfirm={handleConfirmSubmit}
                isApplying={isApplying}
                isProcessingOk={isProcessingOk}
                // Confirmation props
                confirmationTitle={isResetMode ? __('Reset UTM Parameters', 'betterlinks') : __('Apply UTM Template', 'betterlinks')}
                confirmationMessage={
                    isResetMode
                        ? (templateForm.categories && templateForm.categories.length > 0
                            ? __('This will remove all UTM parameters from', 'betterlinks')
                            : __('This will remove all UTM parameters', 'betterlinks'))
                        : (templateForm.categories && templateForm.categories.length > 0
                            ? (templateForm.utm_enable_to_rewrite_existing_utm_template
                                ? __('This will overwrite existing UTM settings on', 'betterlinks')
                                : __('This action will apply UTM values on', 'betterlinks'))
                            : __('This action will apply UTM values', 'betterlinks'))
                }
                totalLinks={getRelevantLinkCount()}
                confirmationSubMessage={!isResetMode && templateForm.utm_auto_apply_new_link ? __('All new shortlinks in this category will automatically use this template.', 'betterlinks') : ''}
                confirmButtonText={isResetMode ? __('Reset UTM Parameters', 'betterlinks') : __('Apply UTM Template', 'betterlinks')}
                cancelButtonText={__('Cancel', 'betterlinks')}
                // Success props
                successMessage={modalMessage}
            />
        </Modal>
    );
};

export default UTMTemplateModal;
