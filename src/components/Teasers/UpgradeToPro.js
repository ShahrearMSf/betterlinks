import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { plugin_root_url } from './../../utils/helper';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '350px',
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
					<img src={plugin_root_url + 'assets/images/exclamation.svg'} alt="icon" />
					<h3>Opps...</h3>
					<p>
						You need to <strong>upgrade</strong> to the{' '}
						<a href="https://betterlinks.io/" target="_blank">
							Premium
						</a>{' '}
						Version to use this feature
					</p>
					<button className="btn-close" onClick={closeModal}>
						close
					</button>
				</div>
			</Modal>
		</React.Fragment>
	);
}

UpgradeToPro.propTypes = propTypes;
UpgradeToPro.defaultProps = defaultProps;
