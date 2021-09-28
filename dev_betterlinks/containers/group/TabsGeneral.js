import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RedirectType from './../../components/RedirectType';
import { fetch_clicks_data } from './../../redux/actions/clicks.actions';
import { update_option } from './../../redux/actions/settings.actions';
import { redirectType } from './../../utils/data';
import UpgradeToPro from './../../components/Teasers/UpgradeToPro';
import { site_url, exists_clicks_json, betterlinks_nonce, exists_links_json, delayStatusChanged } from './../../utils/helper';
const TabsGeneral = ({ settings, fetch_clicks_data, update_option }) => {
	const [cacheButtonText, setCacheButtonText] = useState('Refresh Stats');
	const [fastRedirectButtonText, setFastRedirectButtonText] = useState('Active Now');
	const [formSubmitText, setFormSubmitText] = useState('Save Settings');
	const [fastRedirectStatus, setFastRedirectStatus] = useState(exists_links_json);
	const [fastClicksButtonText, setFastClicksButtonText] = useState('Active Now');
	const [fastClicksStatus, setFastClicksStatus] = useState(exists_clicks_json);
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const writeLinkJSONHandler = () => {
		setFastRedirectButtonText('Activating...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/write_json_links&security=${betterlinks_nonce}`).then(
			(response) => {
				if (response.data) {
					delayStatusChanged(null, 'Activated!', 'Active Now', setFastRedirectButtonText);
					setTimeout(() => {
						setFastRedirectStatus(true);
					}, 1500);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	const writeClicksJSONHandler = () => {
		setFastClicksButtonText('Activating...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/write_json_clicks&security=${betterlinks_nonce}`).then(
			(response) => {
				if (response.data) {
					delayStatusChanged(null, 'Activated!', 'Refresh Stats', setFastClicksButtonText);
					setTimeout(() => {
						setFastClicksStatus(true);
					}, 1500);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	const analyticClicksHandler = () => {
		setCacheButtonText('Refreshing...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/analytics&security=${betterlinks_nonce}`).then(
			(response) => {
				if (response.data) {
					delayStatusChanged(null, 'Done!', 'Refresh Stats', setCacheButtonText);
					// update analytic data
					fetch_clicks_data();
				}
			},
			(error) => {
				console.log(error);
			}
		);
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
			<Formik
				enableReinitialize
				initialValues={{ ...settings }}
				onSubmit={(values) => {
					update_option(values);
					delayStatusChanged('Saving...', 'Saved!', 'Save Settings', setFormSubmitText);
				}}
			>
				{(props) => (
					<Form>
						<div className="btl-tab-panel-inner">
							<span className="btl-form-group">
								<label className="btl-form-label">
									{__('Link Redirection Status', 'betterlinks')} <br />
									{__('(Fast Mode)', 'betterlinks')}
								</label>
								<div className="btl-form-field">
									<div className="status">
										<div className={`active-status ${fastRedirectStatus ? 'Active' : 'Disable'}`}>{fastRedirectStatus ? 'Active' : 'Disable'}</div>
										{!fastRedirectStatus && (
											<button type="button" onClick={writeLinkJSONHandler} className="button button-primary">
												{fastRedirectButtonText}
											</button>
										)}
									</div>
									<div className="short-description">
										<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
										{__(
											"If it's enabled, when you click on the link, it will fetch the target URL from the .json file and will redirect it. Otherwise, it will fetch directly from the database",
											'betterlinks'
										)}
									</div>
								</div>
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">
									{!fastClicksStatus ? (
										<React.Fragment>
											{__('Click Data Status ', 'betterlinks')} <br /> {__('(Fast Mode)', 'betterlinks')}
										</React.Fragment>
									) : (
										__('Fetch Analytics Data', 'betterlinks')
									)}
								</label>
								<div className="btl-form-field">
									<div className="status">
										<div className={`active-status ${fastClicksStatus ? 'Active' : 'Disable'}`}>{fastClicksStatus ? 'Active' : 'Disable'}</div>
										{!fastClicksStatus ? (
											<button type="button" onClick={writeClicksJSONHandler} className="button button-primary">
												{fastClicksButtonText}
											</button>
										) : (
											<button type="button" onClick={analyticClicksHandler} className="button button-primary">
												{cacheButtonText}
											</button>
										)}
									</div>
									<div className="short-description">
										<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
										{!fastClicksStatus
											? __(
													"If it's enabled, before a link is redirected, the click data will be saved in the json file in 1 hour time interval. Otherwise, it will be directly inserted into the database",
													'betterlinks'
											  )
											: __("Analytics data is updated within 1 hour interval. Hit the 'Refresh Stats' button to instantly update your analytics data", 'betterlinks')}
									</div>
								</div>
							</span>
							{settings && (
								<span className="btl-form-group">
									<label className="btl-form-label">{__('Redirect Type', 'betterlinks')}</label>
									<RedirectType
										className="btl-modal-select--full"
										classNamePrefix="btl-react-select"
										id="redirect_type"
										name="redirect_type"
										value={redirectType}
										defaultValue={settings.redirect_type}
										setFieldValue={props.setFieldValue}
										isMulti={false}
									/>
								</span>
							)}

							<span className="btl-form-group">
								<label className="btl-form-label">{__('Link Options', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="nofollow" type="checkbox" onChange={() => props.setFieldValue('nofollow', !props.values.nofollow)} />
										<span className="text">
											{__('No Follow', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="sponsored" type="checkbox" onChange={() => props.setFieldValue('sponsored', !props.values.sponsored)} />
										<span className="text">
											{__('Sponsored', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="param_forwarding" type="checkbox" onChange={() => props.setFieldValue('param_forwarding', !props.values.param_forwarding)} />
										<span className="text">
											{__('Parameter Forwarding', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will pass the parameters you have set in the target URL', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="track_me" type="checkbox" onChange={() => props.setFieldValue('track_me', !props.values.track_me)} />
										<span className="text">
											{__('Tracking', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will let you check Analytics report of your links', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>

							<span className="btl-form-group btl-form-group--top">
								<label className="btl-form-label">{__('Link Prefix', 'betterlinks')}</label>
								<div className="link-options__body" style={{ flexDirection: 'column' }}>
									<div style={{ maxWidth: '200px' }}>
										<Field class="btl-text-field" name="prefix" />
									</div>
									<div class="short-description">
										<b style={{ fontWeight: 700 }}>{__('Note:', 'betterlinks')} </b>
										{__('The prefix will be added before your Shortened URL’s slug eg.', 'betterlinks')}
										{site_url}
										{props.values.prefix && (
											<>
												/<strong>{props.values.prefix}</strong>
											</>
										)}
										{__('/your-affiliate-link-name.', 'betterlinks')}
									</div>
								</div>
							</span>

							<span className="btl-form-group">
								<label className="btl-form-label">{__('Wildcards', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="wildcards" type="checkbox" onChange={() => props.setFieldValue('wildcards', !props.values.wildcards)} />
										<span className="text">
											{__('Use Wildcards?', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('To use wildcards, put an asterisk (*) after the folder name that you want to redirect.', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>

							<span className="btl-form-group">
								<label className="btl-form-label">{__('Bot Clicks', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="disablebotclicks" type="checkbox" onChange={() => props.setFieldValue('disablebotclicks', !props.values.disablebotclicks)} />
										<span className="text">
											{__('Disable Bot Clicks', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will prevent your site from bot traffic', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">{__('Gutenberg Redirect', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<Field
											className="btl-check"
											name="is_allow_gutenberg"
											type="checkbox"
											onChange={() => props.setFieldValue('is_allow_gutenberg', !props.values.is_allow_gutenberg)}
										/>
										<span className="text">
											{__('Allow Instant Redirect', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will allow you to redirect your links instantly from Gutenberg Editor.', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>
							{!betterLinksHooks.applyFilters('isActivePro', false) && (
								<span className="btl-form-group btl-form-group--teaser">
									<label className="btl-form-label">
										{__('Force HTTPS', 'betterlinks')} <span class="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field block" onClick={openUpgradeToProModal}>
											<input className="btl-check" name="force_https" type="checkbox" disabled={true} />
											<span className="text">
												{__('Enable HTTPS Redirection', 'betterlinks')}
												<div className="btl-tooltip">
													<span className="dashicons dashicons-info-outline"></span>
													<span className="btl-tooltiptext">{__('This will allow you to redirect your Target URLs in HTTPS.', 'betterlinks')}</span>
												</div>
											</span>
										</label>
									</div>
								</span>
							)}
							{betterLinksHooks.applyFilters('BetterLinksAddOptionSettingsTabGeneral', null, props)}
							<button className="button-primary btn-save-settings" type="submit">
								{formSubmitText}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});

const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsGeneral);
