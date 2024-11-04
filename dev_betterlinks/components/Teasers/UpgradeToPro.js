import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { is_pro_enabled, plugin_root_url } from 'utils/helper';

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

export default function UpgradeToPro({ isOpenModal, closeModal }) {
	if (is_pro_enabled) return '';
	return (
		<React.Fragment>
			<Modal isOpen={isOpenModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel" />
				</span>
				<div className="betterlinks-upgradetopro">
					<div className="pro-crown">
						<img src={plugin_root_url + 'assets/images/crown1.png'} alt="icon" />
					</div>
					<p className="heading">{__('Upgrade to use this feature', 'betterlinks')}</p>
					<p className="description">{__('After turning on the Internal Knowledge Base option in BetterDocs, you’ll have all the features you.', 'betterlinks')}</p>

					<div className="feature-section">
						<p>{__('Here’s what’s inside inside BetterDocs Pro.', 'betterlinks')}</p>
						<div className="features">
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
							<div className="feature">
								<span className="dashicons dashicons-yes" />
								<span>{__('Easy Link Migration', 'betterlinks')}</span>
							</div>
						</div>
						<a href="https://betterlinks.io/features/" target="_blank">
							{__('See More amazing worthy features', 'betterlinks')}
						</a>
					</div>
					<div className="upgrade-links">
						<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank" className="button button-primary">
							{__('Upgrade to PRO', 'betterlinks')}
						</a>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
}

UpgradeToPro.propTypes = propTypes;
