import React from 'react';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

const propTypes = {};

export default function GoPremium(props) {
	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<div className="btl-gopremium-container">
						<h3 className="btl-gopremium-title">{__('Why upgrade to Premium Version?', 'betterlinks')}</h3>
						<div className="btl-gopremium-content">
							<p>
								{__(
									'Get access to Individual Analytics, Social Share for UTM Builder, Role Management, Google Analytics Integration & many more to run successful marketing campaigns.',
									'betterlinks'
								)}
							</p>
							<p>{__('You will also get world class support from our dedicated team, 24/7.', 'betterlinks')}</p>
							<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank" className="button-primary btn-save-settings">
								{__('Get Premium Version', 'betterlinks')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

GoPremium.propTypes = propTypes;