import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { modalCustomStyles, plugin_root_url } from 'utils/helper';

const unifiedModalStyles = {
    ...modalCustomStyles,
    content: {
        ...modalCustomStyles.content,
        maxWidth: '500px',
        padding: '0',
        border: 'none',
        borderRadius: '12px',
        background: 'transparent',
        position: 'absolute',
    },
};

const UTMConfirmationModal = ({
    isOpen,
    modalState, // 'confirmation' or 'success'
    onClose,
    onConfirm,
    isApplying,
    // Confirmation props
    confirmationTitle,
    confirmationMessage,
    confirmationSubMessage,
    confirmButtonText,
    cancelButtonText,
    // Success props
    successMessage,
}) => {
    const renderConfirmationContent = () => (
        <div className="btl-unified-modal__content">
            <h3 className="btl-unified-modal__title">{confirmationTitle}</h3>

            <div className="btl-unified-modal__message">
                <p className="btl-unified-modal__main-message">
                    {confirmationMessage.includes('existing URLs') ? (
                        <>
                            {__('This action will overwrite the current UTM on', 'betterlinks')}{' '}
                            <div className="btl-highlight-number">
                                {confirmationMessage.match(/\d+/)?.[0] || '0'} {__('URLs', 'betterlinks')}.
                            </div>
                        </>
                    ) : (
                        confirmationMessage
                    )}
                </p>
                {confirmationSubMessage && (
                    <p className="btl-unified-modal__sub-message">{confirmationSubMessage}</p>
                )}
            </div>

            <div className="btl-unified-modal__actions">
                <button
                    type="button"
                    className="btl-utm-btn btl-utm-btn-secondary"
                    onClick={onClose}
                    disabled={isApplying}
                >
                    {cancelButtonText || __('Cancel', 'betterlinks')}
                </button>
                <button
                    type="button"
                    className="btl-utm-btn btl-utm-btn-primary"
                    onClick={onConfirm}
                    disabled={isApplying}
                >
                    {isApplying ? __('Applying...', 'betterlinks') : (confirmButtonText || __('Confirm', 'betterlinks'))}
                </button>
            </div>
        </div>
    );

    const renderSuccessContent = () => {
        // Parse statistics from successMessage if it contains statistics
        const parseStatistics = (message) => {
            if (!message || typeof message !== 'string') return null;

            const lines = message.split('\n');
            const stats = {};

            lines.forEach(line => {
                const updatedMatch = line.match(/Updated:\s*(\d+)\s*links?/i);
                const skippedMatch = line.match(/Skipped:\s*(\d+)\s*links?/i);
                const totalMatch = line.match(/Total:\s*(\d+)\s*links?/i);

                if (updatedMatch) stats.updated = parseInt(updatedMatch[1]);
                if (skippedMatch) stats.skipped = parseInt(skippedMatch[1]);
                if (totalMatch) stats.total = parseInt(totalMatch[1]);
            });

            // Only return stats if we found at least one statistic
            return Object.keys(stats).length > 0 ? stats : null;
        };

        const statistics = parseStatistics(successMessage);

        return (
            <div className="btl-unified-modal__content btl-unified-modal__content--success">
                {/* Success Icon */}
                <div className="btl-unified-modal__success-icon">
                    <img className="locked" src={plugin_root_url + 'assets/images/success-icon.svg'} alt="icon" />
                </div>

                <div>
                    <h1 className="btl-unified-modal__title">{__('Template applied!', 'betterlinks')}</h1>
                    <div className="btl-unified-modal__subtitle">{__('UTM values applied successfully.', 'betterlinks')}</div>
                </div>

                <div className="btl-unified-modal__message">
                    {statistics ? (
                        <div className="btl-utm-statistics">
                            <div className="btl-utm-statistics__row">
                                <span className="btl-utm-statistics__label">{__('Skipped', 'betterlinks')}</span>
                                <span className="btl-utm-statistics__value btl-utm-statistics__value--blue">
                                    {statistics.skipped || 0} {__('links', 'betterlinks')}
                                </span>
                            </div>
                            <div className="btl-utm-statistics__row">
                                <span className="btl-utm-statistics__label">{__('Updated', 'betterlinks')}</span>
                                <span className="btl-utm-statistics__value btl-utm-statistics__value--blue">
                                    {statistics.updated || 0} {__('links', 'betterlinks')}
                                </span>
                            </div>
                            <div className="btl-utm-statistics__separator"></div>
                            <div className="btl-utm-statistics__row btl-utm-statistics__row--total">
                                <span className="btl-utm-statistics__label btl-utm-statistics__label--total">{__('Total', 'betterlinks')}</span>
                                <span className="btl-utm-statistics__value btl-utm-statistics__value--total">
                                    {statistics.total || 0} {__('links', 'betterlinks')}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="btl-unified-modal__success-text">{successMessage}</p>
                    )}
                </div>

                <div className="btl-unified-modal__actions">
                    <button
                        type="button"
                        className="btl-utm-btn btl-utm-btn-primary"
                        onClick={onClose}
                    >
                        {__('OK', 'betterlinks')}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={unifiedModalStyles}
            ariaHideApp={false}
            className="btl-unified-modal-override"
        >
            <div className="btl-unified-modal">
                {/* Header with close button */}
                <div className="btl-unified-modal__header">
                    <button className="btl-unified-close-modal" onClick={onClose} aria-label="Close">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="btl-unified-modal__body">
                    {modalState === 'confirmation' ? renderConfirmationContent() : renderSuccessContent()}
                </div>
            </div>
        </Modal>
    );
};

export default UTMConfirmationModal;
