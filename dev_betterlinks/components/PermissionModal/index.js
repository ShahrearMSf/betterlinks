import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';

const PermissionModal = ({ isOpen, onClose, title = __('Permission Required', 'betterlinks') }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={title}
            className="btl-permission-modal"
            overlayClassName="btl-modal-overlay"
            appElement={document.getElementById('wpbody') || document.body}
            style={{
                overlay: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 999999,
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
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '0 !important',
                    maxWidth: '450px',
                    width: '90%',
                    maxHeight: '90vh',
                    overflow: 'visible',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    transform: 'none',
                    margin: '0'
                }
            }}
        >
            <div className="btl-modal-header">
                {/* <h2>{title}</h2> */}
                <button onClick={onClose} className="btl-modal-close">
                    ×
                </button>
            </div>
            <div className="btl-modal-content">
                <div className="btl-permission-message">
                    <div className="btl-permission-icon">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#dc3545" strokeWidth="2" fill="none" />
                            <path d="M15 9l-6 6" stroke="#dc3545" strokeWidth="2" />
                            <path d="m9 9 6 6" stroke="#dc3545" strokeWidth="2" />
                        </svg>
                    </div>
                    <p>{__("You don't have permission to perform this action.", 'betterlinks')}</p>
                    <p className="btl-permission-sub-text">
                        {__('Please contact your administrator if you need access to this feature.', 'betterlinks')}
                    </p>
                </div>
            </div>
            <div className="btl-modal-footer">
                <button onClick={onClose} className="button button-primary">
                    {__('OK', 'betterlinks')}
                </button>
            </div>
        </Modal>
    );
};

export default PermissionModal;
