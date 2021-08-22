import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { plugin_root_path, plugin_root_url } from '../../utils/helper';

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
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease. Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Documentation', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/bug.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Contribute to Betterlinks', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease. Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Report A Bug', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src={plugin_root_url + 'assets/images/user.svg'} alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Need Help?', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease. Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Initiate Chat', 'betterlinks')}
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
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease. Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Initiate Chat', 'betterlinks')}
						<img src={plugin_root_url + 'assets/images/arrow-right.svg'} alt="" />
					</a>
				</div>
			</div>
		</React.Fragment>
	);
}

Docs.propTypes = propTypes;
Docs.defaultProps = defaultProps;
