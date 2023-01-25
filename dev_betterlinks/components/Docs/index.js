import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const propTypes = {};

const defaultProps = {};

export default function Docs(props) {
	return (
		<React.Fragment>
			<div className="btl-docs">
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/doc.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Documentation', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with BetterLinks. Create Shortened URLs and start cross-promoting your brands & products.',
							'betterlinks'
						)}
					</p>
					<a href="https://betterlinks.io/docs/" className="btl-doc__url" target="_blank">
						{__('Documentation', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/user.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Need Help?', 'betterlinks')}</h3>
					<p className="btl-doc__content">{__('Stuck with something? Feel free to reach out to our Live Chat agent or create a support ticket.', 'betterlinks')}</p>
					<a href="https://wpdeveloper.com/support/" className="btl-doc__url" target="_blank">
						{__('Get Help', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/community.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Join the Community', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__('Join the Facebook community and discuss with fellow developers and users. Best way to connect with people and get feedback on your projects.', 'betterlinks')}
					</p>
					<a href="https://www.facebook.com/groups/wpdeveloper.net/" className="btl-doc__url" target="_blank">
						{__('Join the Community', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/heart.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Show Your Love', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'We love to have you in BetterLinks family. We are making it more awesome everyday. Take your 2 minutes to review the plugin and spread the love to encourage us to keep it going.',
							'betterlinks'
						)}
					</p>
					<a href="https://wpdeveloper.com/review-betterlinks" className="btl-doc__url" target="_blank">
						{__('Leave a Review', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
			</div>
		</React.Fragment>
	);
}

Docs.propTypes = propTypes;
Docs.defaultProps = defaultProps;
