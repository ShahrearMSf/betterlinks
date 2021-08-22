import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const propTypes = {};

const defaultProps = {};

export default function Docs(props) {
	return (
		<React.Fragment>
			<div className="btl-docs">
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src="" alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Documentation', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease.Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Documentation', 'betterlinks')}
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src="" alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Contribute to Betterlinks', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease.Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Report A Bug', 'betterlinks')}
					</a>
				</div>
				<div className="btl-doc">
					<div className="btl-doc__icon">
						<img src="" alt="" />
					</div>
					<h3 className="btl-doc__title">{__('Need Help?', 'betterlinks')}</h3>
					<p className="btl-doc__content">
						{__(
							'Get started by spending some time with the documentation to get familiar with Essential Addons. Build awesome websites for you or your clients with ease.Documentation',
							'betterlinks'
						)}
					</p>
					<a href="#" className="btl-doc__url">
						{__('Initiate Chat', 'betterlinks')}
					</a>
				</div>
			</div>
		</React.Fragment>
	);
}

Docs.propTypes = propTypes;
Docs.defaultProps = defaultProps;
