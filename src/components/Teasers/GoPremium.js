import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function GoPremium(props) {
	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<div className="btl-gopremium-container">
						<h3 className="btl-gopremium-title">Why upgrade to Premium Version?</h3>
						<div className="btl-gopremium-content">
							<p>The premium version helps us to continue development of the product incorporating even more features and enhancements.</p>
							<p>You will also get world class support from our dedicated team, 24/7.</p>
							<a href="https://wpdeveloper.net/in/upgrade-betterlinks" target="_blank" className="button-primary btn-save-settings">
								Get Premium Version
							</a>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

GoPremium.propTypes = propTypes;
GoPremium.defaultProps = defaultProps;
