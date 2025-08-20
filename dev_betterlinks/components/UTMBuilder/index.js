import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import queryString from 'query-string';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { plugin_root_url, betterlinks_settings } from 'utils/helper';

const propTypes = {};

export default function UTMBuilder({ targetUrl, saveValueHandler, closeModalHandler, categoryId = 1 }) {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const parseUrl = queryString.parseUrl(targetUrl, { parseFragmentIdentifier: true });

	// Get UTM defaults based on category
	const getUTMDefaults = (currentCategoryId) => {
		// Safety check for betterlinks_settings
		if (!betterlinks_settings || typeof betterlinks_settings !== 'object') {
			console.log('UTM Builder - betterlinks_settings not available');
			return {};
		}

		const globalTemplatesRaw = betterlinks_settings.global_utm_templates || [];
		const globalDefaults = betterlinks_settings.global_utm_defaults || {};

		// Handle both array and single object formats
		const globalTemplates = Array.isArray(globalTemplatesRaw) ? globalTemplatesRaw : [globalTemplatesRaw];

		// Find template for the current category (default to 1 if no categoryId)
		const catId = parseInt(currentCategoryId) || 1;

		console.log('UTM Builder - Looking for category:', catId);
		console.log('UTM Builder - Available templates:', globalTemplates);
		console.log('UTM Builder - Raw templates:', globalTemplatesRaw);

		const categoryTemplate = globalTemplates.find(template => {
			console.log('UTM Builder - Checking template:', template);
			console.log('UTM Builder - Template categories:', template.categories);

			// Handle both string and integer category IDs
			if (template.categories && Array.isArray(template.categories)) {
				return template.categories.some(templateCatId => {
					const templateCatIdInt = parseInt(templateCatId);
					const currentCatIdInt = parseInt(catId);
					console.log('UTM Builder - Comparing:', templateCatIdInt, 'with', currentCatIdInt);
					return templateCatIdInt === currentCatIdInt;
				});
			}
			return false;
		});

		console.log('UTM Builder - Found template:', categoryTemplate);

		// If category template exists, use it; otherwise use global defaults
		if (categoryTemplate) {
			const templateDefaults = {
				utm_source: categoryTemplate.utm_source || '',
				utm_medium: categoryTemplate.utm_medium || '',
				utm_campaign: categoryTemplate.utm_campaign || '',
				utm_term: categoryTemplate.utm_term || '',
				utm_content: categoryTemplate.utm_content || ''
			};
			console.log('UTM Builder - Using template defaults:', templateDefaults);
			return templateDefaults;
		}

		console.log('UTM Builder - Using global defaults:', globalDefaults);
		return globalDefaults;
	};
	console.log('UTM Builder - Current categoryId:', categoryId);
	const utmDefaults = getUTMDefaults(categoryId);

	const [UTMBuilderState, setUTMBuilderState] = useState({
		utm_source: parseUrl.query.utm_source ? parseUrl.query.utm_source : (utmDefaults.utm_source || ''),
		utm_medium: parseUrl.query.utm_medium ? parseUrl.query.utm_medium : (utmDefaults.utm_medium || ''),
		utm_campaign: parseUrl.query.utm_campaign ? parseUrl.query.utm_campaign : (utmDefaults.utm_campaign || ''),
		utm_term: parseUrl.query.utm_term ? parseUrl.query.utm_term : (utmDefaults.utm_term || ''),
		utm_content: parseUrl.query.utm_content ? parseUrl.query.utm_content : (utmDefaults.utm_content || ''),
	});

	// Update UTM fields when categoryId changes
	useEffect(() => {
		console.log('UTM Builder - useEffect triggered, categoryId:', categoryId);

		const newDefaults = getUTMDefaults(categoryId);
		const currentParseUrl = queryString.parseUrl(targetUrl, { parseFragmentIdentifier: true });

		console.log('UTM Builder - Category changed:', categoryId);
		console.log('UTM Builder - New defaults:', newDefaults);

		// Update UTM fields: URL params > existing values > template defaults
		setUTMBuilderState(prevState => {
			console.log('UTM Builder - Previous state:', prevState);

			// Check if we have any template defaults to apply
			const hasTemplateDefaults = Object.values(newDefaults).some(value => value && value.trim() !== '');

			if (hasTemplateDefaults) {
				const newState = {
					utm_source: currentParseUrl.query.utm_source || newDefaults.utm_source || prevState.utm_source || '',
					utm_medium: currentParseUrl.query.utm_medium || newDefaults.utm_medium || prevState.utm_medium || '',
					utm_campaign: currentParseUrl.query.utm_campaign || newDefaults.utm_campaign || prevState.utm_campaign || '',
					utm_term: currentParseUrl.query.utm_term || newDefaults.utm_term || prevState.utm_term || '',
					utm_content: currentParseUrl.query.utm_content || newDefaults.utm_content || prevState.utm_content || '',
				};

				console.log('UTM Builder - New state with template:', newState);
				return newState;
			}

			console.log('UTM Builder - No template defaults, keeping current state');
			return prevState;
		});
	}, [categoryId, targetUrl]);

	const UTMSaveValueHandler = () => {
		const rawURL = queryString.exclude(targetUrl, ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']);
		saveValueHandler(
			'target_url',
			queryString.stringifyUrl({ url: rawURL, query: Object.entries(UTMBuilderState).reduce((a, [k, v]) => (!v || v == '' ? a : ((a[k] = v), a)), {}) })
		);
		closeModalHandler();
	};
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};
	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};
	return (
		<React.Fragment>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-modal-utm-builder">
				<h3 className="btl-modal-utm-builder__title">
					{__('UTM Builder', 'betterlinks')}
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline"></span>
						<span className="btl-tooltiptext" style={{ width: '220px' }}>
							{__('Add Campaign Parameters to Track Custom Campaigns', 'betterlinks')}
						</span>
					</div>
				</h3>
				<div className="btl-modal-utm-builder__body">
					{!betterLinksHooks.applyFilters('isActivePro', false) && (
						<div className="btl-modal-utm-builder__form-group btl-modal-utm-templates">
							<label htmlFor="savedtemplate">{__('Template', 'betterlinks')}</label>
							<div>
								<div name="savedtemplate" id="savedtemplate" onClick={() => openUpgradeToProModal()}>
									{__('Pick a Template', 'betterlinks')} <img src={plugin_root_url + 'assets/images/locked.svg'} alt="locked" style={{ marginLeft: 5 }} />
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
								placeholder={__('e.g: Example-campaign', 'betterlinks')}
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
							<button type="button" onClick={(e) => openUpgradeToProModal()}>
								{__('Save New Template', 'betterlinks')} <img src={plugin_root_url + 'assets/images/locked-white.svg'} alt="locked" />
							</button>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

UTMBuilder.propTypes = propTypes;
