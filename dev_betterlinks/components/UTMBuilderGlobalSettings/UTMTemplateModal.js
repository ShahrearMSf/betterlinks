import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import CreatableSelect from 'react-select/creatable';
import { modalCustomStyles } from 'utils/helper';
import './UTMTemplateModal.scss';

const utmTemplateModalStyles = {
    ...modalCustomStyles,
    content: {
        ...modalCustomStyles.content,
        maxWidth: '700px',
        padding: '0',
        border: 'none',
        borderRadius: '12px',
        background: 'transparent',
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

    const handleSubmit = () => {
        if (isCreatingTemplate) {
            handleTemplateCreate();
        } else {
            handleTemplateUpdate();
        }
        // Don't close here - parent component will handle it
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
        >
            <span className="btl-close-modal" onClick={onClose}>
                <span className="btl btl-cancel" />
            </span>
            <div className="btl-utm-template-modal">
                <div className="btl-utm-template-modal__header">
                    <h3 className="btl-utm-template-modal__title">
                        {isCreatingTemplate
                            ? __('Create New UTM Template', 'betterlinks')
                            : __('Edit UTM Template', 'betterlinks')
                        }
                    </h3>
                </div>

                <div className="btl-utm-template-modal__body">
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
                            <div className="btl-utm-field-description">
                                {__('Select which categories should use this UTM template. If no category is selected, it will apply to "Uncategorized" links.', 'betterlinks')}
                            </div>
                        </div>

                        <div className="btl-utm-global-form">
                            <div className="btl-utm-field-row">
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
                            </div>

                            <div className="btl-utm-field-row">
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
                            </div>

                            <div className="btl-utm-field-group btl-utm-field-full">
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
                        {/* Add 2 Checkbox setting Here */}
                        <div className="btl-utm-field-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={templateForm.utm_enable_to_rewrite_existing_utm_template}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_enable_to_rewrite_existing_utm_template: e.target.checked })}
                                />
                                {__('Enable to Rewrite Existing UTM Template', 'betterlinks')}
                            </label>
                        </div>
                        <div className="btl-utm-field-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={templateForm.utm_auto_apply_new_link}
                                    onChange={(e) => setTemplateForm({ ...templateForm, utm_auto_apply_new_link: e.target.checked })}
                                />
                                {__('Automatically Apply UTM to New Links', 'betterlinks')}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="btl-utm-template-modal__footer">
                    <div className="btl-utm-template-modal__actions">
                        <button
                            type="button"
                            className="button-primary"
                            onClick={handleSubmit}
                        >
                            {isCreatingTemplate
                                ? __('Create Template', 'betterlinks')
                                : __('Update Template', 'betterlinks')
                            }
                        </button>

                        {activeTemplate && (
                            <button
                                type="button"
                                className="button-secondary button-danger"
                                onClick={handleDeleteAndClose}
                            >
                                {__('Delete Template', 'betterlinks')}
                            </button>
                        )}

                        <button
                            type="button"
                            className="button-secondary"
                            onClick={onClose}
                        >
                            {__('Cancel', 'betterlinks')}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UTMTemplateModal;
