import { __ } from '@wordpress/i18n';
import { SetupContext } from 'pages/QuickSetup';
import { useContext } from 'react';
import Modal from 'react-modal';
import { modalCustomSmallStyles } from 'utils/helper';
const ConfirmationModal = () => {
	const { modalIsOpen, setModalIsOpen, modalConfirm, setModalConfirm } = useContext(SetupContext);
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const confirmModal = () => {
		setModalConfirm(true);
		closeModal();
	};
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomSmallStyles} ariaHideApp={false}>
			<div>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel" />
				</span>
				<div className="btl-confirmation-alert">
					<h3 className="btl-modal-utm-builder__title">{__('Are you sure to do this task?', 'betterlinks')}</h3>
					<div className="btl-confirmation-buttons">
						<button type="button" onClick={confirmModal}>
							{__('Yes', 'betterlinks')}
						</button>
						<button type="button" onClick={closeModal}>
							{__('Cancel', 'betterlinks')}
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
