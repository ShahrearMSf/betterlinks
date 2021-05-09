import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { plugin_root_url } from './../../utils/helper';

const propTypes = {};

const defaultProps = {};

export default function UTMBuilder({ targetUrl, saveValueHandler, closeModalHandler }) {
	const parseUrl = queryString.parseUrl(targetUrl, { parseFragmentIdentifier: true });
	const [UTMBuilderState, setUTMBuilderState] = useState({
		utm_source: parseUrl.query.utm_source ? parseUrl.query.utm_source : '',
		utm_medium: parseUrl.query.utm_medium ? parseUrl.query.utm_medium : '',
		utm_campaign: parseUrl.query.utm_campaign ? parseUrl.query.utm_campaign : '',
		utm_term: parseUrl.query.utm_term ? parseUrl.query.utm_term : '',
		utm_content: parseUrl.query.utm_content ? parseUrl.query.utm_content : '',
	});

	const UTMSaveValueHandler = () => {
		const rawURL = queryString.exclude(targetUrl, ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']);
		saveValueHandler(
			'target_url',
			queryString.stringifyUrl({ url: rawURL, query: Object.entries(UTMBuilderState).reduce((a, [k, v]) => (!v || v == '' ? a : ((a[k] = v), a)), {}) })
		);
		closeModalHandler();
	};
	return (
		<React.Fragment>
			<div className="btl-modal-utm-builder">
				<h3 className="btl-modal-utm-builder__title">
					{__('UTM Builder', 'betterlinks')}
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline"></span>
						<span className="btl-tooltiptext">{__('UTM Builder', 'betterlinks')}r</span>
					</div>
				</h3>
				<div className="btl-modal-utm-builder__body">
					{!betterLinksHooks.applyFilters('isActivePro', false) && (
						<div className="btl-modal-utm-builder__form-group btl-modal-utm-templates">
							<label htmlFor="savedtemplate">{__('Template', 'betterlinks-pro')}</label>
							<div>
								<div name="savedtemplate" id="savedtemplate" onClick={() => alert('Upgrade To Pro')}>
									{__('No Template Chosen', 'betterlinks-pro')} <img src={plugin_root_url + 'assets/images/locked.svg'} alt="locked" />
								</div>
							</div>
						</div>
					)}
					<div className="btl-modal-utm-builder__form-group">
						<label htmlFor="utmCampaign">{__('Campaign', 'betterlinks')}</label>
						<div>
							<input
								id="utmCampaign"
								value={UTMBuilderState.utm_campaign}
								onChange={(e) => setUTMBuilderState({ ...UTMBuilderState, utm_campaign: e.target.value })}
								type="text"
								name="utm_campaign"
								placeholder={__('e.g: ACME-campaign', 'betterlinks')}
							/>
						</div>
					</div>
					<div className="btl-modal-utm-builder__form-group">
						<label htmlFor="utmMedium">{__('Medium', 'betterlinks')}</label>
						<div>
							<input
								id="utmMedium"
								value={UTMBuilderState.utm_medium}
								onChange={(e) => setUTMBuilderState({ ...UTMBuilderState, utm_medium: e.target.value })}
								type="text"
								name="utm_medium"
								placeholder={__('e.g: cpc, banner, email', 'betterlinks')}
							/>
						</div>
					</div>
					<div className="btl-modal-utm-builder__form-group">
						<label htmlFor="utmSource">{__('Source', 'betterlinks')}</label>
						<div>
							<input
								id="utmSource"
								value={UTMBuilderState.utm_source}
								onChange={(e) => setUTMBuilderState({ ...UTMBuilderState, utm_source: e.target.value })}
								type="text"
								name="utm_source"
								placeholder={__('e.g: Twitter, Facebook', 'betterlinks')}
							/>
						</div>
					</div>
					<div className="btl-modal-utm-builder__form-group">
						<label htmlFor="utmTerm">{__('Term', 'betterlinks')}</label>
						<div>
							<input
								id="utmTerm"
								value={UTMBuilderState.utm_term}
								onChange={(e) => setUTMBuilderState({ ...UTMBuilderState, utm_term: e.target.value })}
								type="text"
								name="utm_term"
								placeholder={__('e.g: paid keywords', 'betterlinks')}
							/>
						</div>
					</div>
					<div className="btl-modal-utm-builder__form-group">
						<label htmlFor="utmContent">{__('Content', 'betterlinks')}</label>
						<div>
							<input
								id="utmContent"
								value={UTMBuilderState.utm_content}
								onChange={(e) => setUTMBuilderState({ ...UTMBuilderState, utm_content: e.target.value })}
								type="text"
								name="utm_content"
								placeholder={__('e.g: text AD name', 'betterlinks')}
							/>
						</div>
					</div>
					<div className="btl-modal-utm-builder__form-group">
						<button type="button" onClick={() => UTMSaveValueHandler()}>
							{__('Save Link', 'betterlinks')}
						</button>
						{!betterLinksHooks.applyFilters('isActivePro', false) && (
							<button type="button" onClick={(e) => alert('Upgrade To Pro')}>
								{__('Save New Template', 'betterlinks-pro')} <img src={plugin_root_url + 'assets/images/locked-white.svg'} alt="locked" />
							</button>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

UTMBuilder.propTypes = propTypes;
UTMBuilder.defaultProps = defaultProps;
