import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { plugin_root_url } from 'utils/helper';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    onSecondaryConfirm = null, // Second confirm action
    title = __('Confirm Action', 'betterlinks'),
    subtitle = __('Are you sure you want to proceed?', 'betterlinks'),
    icon = null, // Custom icon path or null for default
    confirmButtonText = __('Confirm', 'betterlinks'),
    secondaryConfirmButtonText = null, // Text for second confirm button
    cancelButtonText = __('Cancel', 'betterlinks'),
    showCancelButton = true,
    confirmButtonClass = 'button button-primary',
    secondaryConfirmButtonClass = 'button button-primary',
    cancelButtonClass = 'button button-secondary',
    isDangerous = false // For delete actions, changes styling
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check for dark mode
    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.body.classList.contains('betterlinks-dark-mode'));
        };

        checkDarkMode();

        // Set up observer to watch for dark mode changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        onClose();
    };

    const handleSecondaryConfirm = () => {
        if (onSecondaryConfirm) {
            onSecondaryConfirm();
        }
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    // Default icon based on action type
    const getDefaultIcon = () => {
        if (isDangerous) {
            return plugin_root_url + '/assets/images/exclamation.svg';
        }
        return plugin_root_url + '/assets/images/access-icon.svg';
    };

    const iconSrc = icon || getDefaultIcon();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleCancel}
            contentLabel={title}
            className="btl-confirmation-modal btl-confirmation-modal-expanded"
            overlayClassName="btl-modal-overlay"
            appElement={document.getElementById('wpbody') || document.body}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(35, 40, 45, 0.62)',
                    zIndex: 999998,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                content: {
                    position: 'relative',
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto',
                    border: 'none',
                    background: isDarkMode ? '#1f283d' : '#fff',
                    borderRadius: '8px',
                    width: '90%',
                    maxWidth: '700px',
                    margin: '0',
                    transform: 'none',
                    overflow: 'visible',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    outline: 'none',
                    padding: '0',
                    zIndex: 999999
                }
            }}
        >
            <div className="btl-modal-header">
                <button onClick={handleCancel} className="btl-modal-close">
                    ×
                </button>
            </div>
            <div className="btl-modal-confirm-content" style={{ backgroundColor: isDarkMode ? '#1f283d' : '#fff' }}>
                <div className="btl-permission-message">
                    <div className="btl-permission-icon">
                        <img 
                            width={'48px'}
                            height={'48px'}
                            src={iconSrc} 
                            alt={isDangerous ? "Warning icon" : "Confirmation icon"} 
                            style={{
                                filter: isDangerous ? 'hue-rotate(0deg) saturate(1.5)' : 'none'
                            }}
                        />
                    </div>
                    <div 
                        className="btl-permission-text" 
                        style={{ color: isDarkMode ? '#fff' : '#333' }}
                    >
                        {title}
                    </div>
                    {subtitle && (
                        <div 
                            className="btl-permission-sub-text"
                            style={{ color: isDarkMode ? '#ccc' : '#666' }}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
                <div className="btl-modal-footer" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {showCancelButton && (
                        <button
                            onClick={handleCancel}
                            className={cancelButtonClass}
                            style={{
                                backgroundColor: isDarkMode ? '#36405a' : '#f1f1f1',
                                color: isDarkMode ? '#ffffffff' : '#ffffffff',
                                border: isDarkMode ? '1px solid #4a5568' : '1px solid #ddd'
                            }}
                        >
                            {cancelButtonText}
                        </button>
                    )}

                    {/* Primary confirm button */}
                    <button
                        onClick={handleConfirm}
                        className={confirmButtonClass}
                        style={{
                            backgroundColor: isDangerous ? '#dc3545' : (isDarkMode ? '#2961ff' : '#0073aa'),
                            color: '#fff',
                            border: 'none'
                        }}
                    >
                        {confirmButtonText}
                    </button>

                    {/* Secondary confirm button (if provided) */}
                    {onSecondaryConfirm && secondaryConfirmButtonText && (
                        <button
                            onClick={handleSecondaryConfirm}
                            className={secondaryConfirmButtonClass}
                            style={{
                                backgroundColor: isDangerous ? '#28a745' : (isDarkMode ? '#28a745' : '#28a745'),
                                color: '#fff',
                                border: 'none'
                            }}
                        >
                            {secondaryConfirmButtonText}
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
