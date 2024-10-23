import React from 'react';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

export default function GoPremium() {
	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<div className="btl-gopremium-container">
						<h3 className="btl-gopremium-title">
							{__('Why upgrade to ', 'betterlinks')}
							<span className="btl-gopremium-focus-text btl-text-orange">Premium Version?</span>
						</h3>
						<div className="btl-gopremium-content">
							<p>
								{__(
									'Get access to Individual Analytics, Social Share for UTM Builder, Role Management, Google Analytics Integration & many more to run successful marketing campaigns.',
									'betterlinks'
								)}
							</p>
						</div>
						<div className="btl-gopremium-footer">
							<p>
								<img src={plugin_root_url + '/assets/images/support.svg'} alt="support icon" />
								{__('World class support from our ', 'betterlinks')}
								<span className="btl-gopremium-focus-text btl-text-orange">{__(' dedicated team, 24/7.', 'betterlinks')}</span>
							</p>
							<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank" title={__('Upgrade to PRO', 'betterlinks')}>
								<img src={plugin_root_url + '/assets/images/crown.svg'} alt="crown icon" />
								{__('Upgrade to PRO', 'betterlinks')}
							</a>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
