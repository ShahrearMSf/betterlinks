import React from 'react';
import { __ } from '@wordpress/i18n';

const ConfirmationModal = ({
    showConfirmation,
    setShowConfirmation,
    selectedPostType,
    selectedCategories,
    selectedTags,
    redirectType,
    linkPrefix,
    selectedBetterlinkCategory,
    selectedBetterlinkTags,
    postCount,
    confirmGeneration
}) => {
    if (!showConfirmation) return null;

    return (
        <div className="btl-modal-overlay btl-fade-in" onClick={() => setShowConfirmation(false)}>
            <div className="btl-confirmation-modal btl-slide-in" onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className="btl-confirmation-header">
                    <div className="btl-confirmation-header-content">
                        <div className="btl-confirmation-title">{__('Confirm Auto Link Generation', 'betterlinks')}</div>
                        <div className="btl-confirmation-subtitle">{__('Please review your settings before starting the generation process.', 'betterlinks')}</div>
                    </div>
                    <button
                        className="btl-confirmation-close"
                        onClick={() => setShowConfirmation(false)}
                        aria-label={__('Close', 'betterlinks')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="btl-confirmation-body">
                    {/* Two Column Layout */}
                    <div className="btl-confirmation-grid">
                        {/* Content Selection */}
                        <div className="btl-confirmation-section">
                            <div className="btl-conf-pre-title btl-confirmation-content-title">{__('Selected Post Type', 'betterlinks')}</div>
                            <div className="btl-confirmation-content-content">
                                <div className="btl-confirmation-post-type">
                                    <span className="btl-confirmation-label">{__('Post Type', 'betterlinks')}</span>
                                    <span className="btl-confirmation-tag btl-tag-primary">{selectedPostType.label}</span>
                                </div>

                                <div className="btl-confirmation-field">
                                    <span className="btl-confirmation-label">{__('Selected Categories', 'betterlinks')}</span>
                                    <div className="btl-confirmation-tags-list">
                                        {selectedCategories.length > 0 ? (
                                            selectedCategories.map((cat, index) => (
                                                <span key={index} className="btl-confirmation-tag btl-tag-category">{cat.label}</span>
                                            ))
                                        ) : (
                                            <span className="btl-confirmation-empty">{__('All categories', 'betterlinks')}</span>
                                        )}
                                    </div>
                                </div>

                                {selectedTags.length > 0 && (
                                    <div className="btl-confirmation-field">
                                        <span className="btl-confirmation-label">{__('Tags:', 'betterlinks')}</span>
                                        <div className="btl-confirmation-tags-list">
                                            {selectedTags.map((tag, index) => (
                                                <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Link Configuration */}
                        <div className="btl-confirmation-section">
                            <div className="btl-conf-pre-title btl-confirmation-link-title">{__('Link Configuration', 'betterlinks')}</div>
                            <div className="btl-confirmation-link-content">
                                <div className="btl-confirmation-field">
                                    <span className="btl-confirmation-label">{__('Redirect Type:', 'betterlinks')}</span>
                                    <span className="btl-confirmation-value">{redirectType}</span>
                                </div>

                                <div className="btl-confirmation-field">
                                    <span className="btl-confirmation-label">{__('Link Prefix:', 'betterlinks')}</span>
                                    <span className="btl-confirmation-value">{linkPrefix} {` (e.g., yourdomain.com/${linkPrefix}/your-link-name)`}</span>
                                </div>

                                {selectedBetterlinkCategory && (
                                    <div className="btl-confirmation-field">
                                        <span className="btl-confirmation-label">{__('BetterLinks Category:', 'betterlinks')}</span>
                                        <span className="btl-confirmation-value">{selectedBetterlinkCategory.label}</span>
                                    </div>
                                )}

                                {selectedBetterlinkTags.length > 0 && (
                                    <div className="btl-confirmation-field">
                                        <span className="btl-confirmation-label">{__('BetterLinks Tags:', 'betterlinks')}</span>
                                        <div className="btl-confirmation-tags-list">
                                            {selectedBetterlinkTags.map((tag, index) => (
                                                <span key={index} className="btl-confirmation-tag btl-tag-default">{tag.label}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Posts to Process Summary */}
                    <div className="btl-confirmation-summary">
                        <div className="btl-confirmation-summary-count">
                           {postCount}
                        </div>
                        <div className="btl-confirmation-summary-content">
                            <div className="btl-confirmation-summary-title">{__('Posts Selected', 'betterlinks')}</div>
                            <div className="btl-confirmation-summary-subtitle">
                                {__('Estimated Time ~', 'betterlinks')} {Math.ceil(postCount / 10)} {__('minutes', 'betterlinks')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="btl-confirmation-footer">
                    <button
                        className="btl-confirmation-btn btl-confirmation-btn-secondary"
                        onClick={() => setShowConfirmation(false)}
                    >
                        {__('Edit', 'betterlinks')}
                    </button>
                    <button
                        className="btl-confirmation-btn btl-confirmation-btn-primary"
                        onClick={confirmGeneration}
                    >
                        {__('Start Generation', 'betterlinks')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;

