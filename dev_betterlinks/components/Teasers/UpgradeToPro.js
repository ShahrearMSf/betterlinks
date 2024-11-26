import React from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { is_pro_enabled, plugin_root_url } from 'utils/helper';

const customStyles = {
	overlay: {
		background: 'rgba(35, 40, 45, 0.62)',
		zIndex: '999999',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		maxWidth: '525px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

const propTypes = {};
const features = [
	__('Custom Domain', 'betterlinks'),
	__('Link Scanner', 'betterlinks'),
	__('External Tracking', 'betterlinks'),
	__('Auto-Link Creation', 'betterlinks'),
	__('Customize Link Preview', 'betterlinks'),
	__('Auto-Link Keywords', 'betterlinks'),
	__('Password Protected Redirect', 'betterlinks'),
	__('Insights with Individual Analytics', 'betterlinks'),
];
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
					<p className="heading">{__('Upgrade for Exclusive Benefits', 'betterlinks')}</p>
					<p className="description">{__('Explore link management capabilities with advanced features designed for peak performance.', 'betterlinks')}</p>

					<div className="feature-section">
						<p>{__('Here’s what’s inside BetterLinks Pro.', 'betterlinks')}</p>
						<div className="features">
							{features.map((feature) => (
								<div className="feature">
									<span className="dashicons dashicons-yes" />
									<span>{feature}</span>
								</div>
							))}
						</div>
						<a href="https://betterlinks.io/features/" target="_blank">
							{__('See More amazing features', 'betterlinks')}
						</a>
					</div>
					<div className="upgrade-links">
						<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank" className="button button-primary">
							<img src={plugin_root_url + 'assets/images/crown.svg'} alt="Crown" />
							{__('Upgrade to PRO', 'betterlinks')}
						</a>
					</div>
				</div>
			</Modal>
		</React.Fragment>
	);
}

UpgradeToPro.propTypes = propTypes;
