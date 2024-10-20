import { Checkbox } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { SetupContext } from 'pages/QuickSetup';
import { useContext } from 'react';
import Modal from 'react-modal';
import { modalCustomSmallStyles } from 'utils/helper';
const ConfirmationModal = () => {
	const { modalIsOpen, setModalIsOpen, modalConfirm, setModalConfirm, migrationSettings } = useContext(SetupContext);
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const confirmModal = () => {
		setModalConfirm(true);
		closeModal();
	};
	const { thirstyaffiliates, prettylinks, simple301redirects } = migrationSettings;
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomSmallStyles} ariaHideApp={false} parentSelector={() => document.querySelector('.migration')}>
			<div>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel" />
				</span>
				<div className="btl-confirmation-alert">
					<h3 className="btl-modal-utm-builder__title">{__('Are you sure to do this task?', 'betterlinks')}</h3>
					<div className="migration-options">
						{thirstyaffiliates && (
							<div className="btl-ta">
								<p>{__('Thirsty Affiliates', 'betterlinks')}</p>
								<div>
									<Checkbox color="primary" checked={true} onClick={() => {}} />
									<label>{__('Links', 'betterlinks')}</label>
								</div>
								<div>
									<Checkbox color="primary" checked={true} onClick={() => {}} />
									<label>{__('Clicks', 'betterlinks')}</label>
								</div>
							</div>
						)}
						{prettylinks && (
							<div className="btl-pl">
								<p>{__('Pretty Links', 'betterlinks')}</p>
								<div>
									<Checkbox color="primary" checked={true} onClick={() => {}} />
									<label>{__('Links', 'betterlinks')}</label>
								</div>
							</div>
						)}
						{simple301redirects && (
							<div className="btl-s3r">
								<p>{__('Simple 301 Redirects', 'betterlinks')}</p>
								<div>
									<Checkbox color="primary" checked={true} onClick={() => {}}></Checkbox>
									<label>{__('Links', 'betterlinks')}</label>
								</div>
							</div>
						)}
					</div>
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
