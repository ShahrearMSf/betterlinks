import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { modalCustomStyles } from 'utils/helper';

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
                                {confirmationMessage.match(/\d+/)?.[0] || '0'} {__('existing URLs', 'betterlinks')}.
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
                    className="btl-btn btl-btn-secondary"
                    onClick={onClose}
                    disabled={isApplying}
                >
                    {cancelButtonText || __('Cancel', 'betterlinks')}
                </button>
                <button
                    type="button"
                    className="btl-btn btl-btn-primary"
                    onClick={onConfirm}
                    disabled={isApplying}
                >
                    {isApplying ? __('Applying...', 'betterlinks') : (confirmButtonText || __('Confirm', 'betterlinks'))}
                </button>
            </div>
        </div>
    );

    const renderSuccessContent = () => (
        <div className="btl-unified-modal__content btl-unified-modal__content--success">
            {/* Success Icon */}
            <div className="btl-unified-modal__success-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#2961ff" />
                    <path d="M16 24L22 30L32 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h3 className="btl-unified-modal__title">{__('Success!', 'betterlinks')}</h3>

            <div className="btl-unified-modal__message">
                <p className="btl-unified-modal__success-text">{successMessage}</p>
            </div>

            <div className="btl-unified-modal__actions">
                <button
                    type="button"
                    className="btl-btn btl-btn-primary"
                    onClick={onClose}
                >
                    {__('OK', 'betterlinks')}
                </button>
            </div>
        </div>
    );

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
