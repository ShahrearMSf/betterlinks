import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { plugin_root_url } from 'utils/helper';

const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '400px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const propTypes = {};

const defaultProps = {};

export default function UpgradeToPro({ isOpenModal, closeModal }) {
	return (
		<React.Fragment>
			<Modal isOpen={isOpenModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
				<div className="betterlinks-upgradetopro">
					<img src={plugin_root_url + 'assets/images/exclamation.svg'} alt="icon" style={{ opacity: 0.5 }} />
					<h3>{__('Opps...', 'betterlinks')}</h3>
					<p>
						{__('You need to', 'betterlinks')} <strong>{__('upgrade', 'betterlinks')}</strong> {__('to the', 'betterlinks')}{' '}
						<a href="https://wpdeveloper.net/in/upgrade-betterlinks" target="_blank">
							{__('Premium', 'betterlinks')}
						</a>{' '}
						{__('Version to use this feature', 'betterlinks')}
					</p>
					<button className="btn-close" onClick={closeModal}>
						{__('Close', 'betterlinks')}
					</button>
				</div>
			</Modal>
		</React.Fragment>
	);
}

UpgradeToPro.propTypes = propTypes;
UpgradeToPro.defaultProps = defaultProps;
