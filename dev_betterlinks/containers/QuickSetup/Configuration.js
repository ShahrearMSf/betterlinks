import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import RedirectType from 'components/RedirectType';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { Field, Form, Formik } from 'formik';
import { SetupContext } from 'index';
import { useContext, useState } from 'react';
import { redirectType } from 'utils/data';
import { is_pro_enabled, site_url } from 'utils/helper';

const Configuration = () => {
	const { settings, setSettings, modal } = useContext(SetupContext);
	const { setUpgradeToProModal, openUpgradeToProModal } = modal;

	const handleOptions = (props, key) => {
		props.setFieldValue(key, !props.values?.[key]);
		setSettings((prev) => ({
			...prev,
			[key]: !props.values?.[key],
		}));
	};
	return (
		<>
			<div className="configuration">
				<div className="header">
					<h3>{__('Configuration', 'betterlinks')}</h3>
					<p>
						{__(
							'Let’s adjust core settings to match your preferences, including link options, redirect types and tracking options, for a seamless setup experience.',
							'betterlinks'
						)}
					</p>
				</div>
				<div className="option">
					<Formik initialValues={{ ...settings }}>
						{(props) => {
							return (
								<Form>
									<div className="btl-tab-panel-inner">
										<span className="btl-form-group">
											<label className="btl-form-label">{__('Link Options', 'betterlinks')}</label>
											<div className="link-options__body">
												<label className="btl-checkbox-field block">
													<Field
														className="btl-check"
														name="nofollow"
														type="checkbox"
														onChange={() => {
															handleOptions(props, 'nofollow');
														}}
													/>
													<span className="text">
														{__('No Follow', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field block">
													<Field
														className="btl-check"
														name="sponsored"
														type="checkbox"
														onChange={() => {
															handleOptions(props, 'sponsored');
														}}
													/>
													<span className="text">
														{__('Sponsored', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field block">
													<Field className="btl-check" name="param_forwarding" type="checkbox" onChange={() => handleOptions(props, 'param_forwarding')} />
													<span className="text">
														{__('Parameter Forwarding', 'betterlinks')}
														<div className="btl-tooltip">
															<span className="dashicons dashicons-info-outline"></span>
															<span className="btl-tooltiptext">{__('This will pass the parameters you have set in the target URL', 'betterlinks')}</span>
														</div>
													</span>
												</label>
												<label className="btl-checkbox-field block">
													<Field className="btl-check" name="track_me" type="checkbox" onChange={() => handleOptions(props, 'track_me')} />
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
													<Field
														className="btl-text-field"
														name="prefix"
														value={props.values?.prefix ?? 'go'}
														type="text"
														onChange={(option) => {
															props.setFieldValue('prefix', option.target.value);
															setSettings((prev) => ({
																...prev,
																prefix: option.target.value,
															}));
														}}
													/>
												</div>
												<div className="short-description">
													<b style={{ fontWeight: 700 }}>{__('Note:', 'betterlinks')} </b>
													{__('The prefix will be added before your Shortened URL’s slug eg.', 'betterlinks')}
													{betterLinksHooks.applyFilters('site_url', site_url)}
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
											<label className="btl-form-label">{__('Redirect Type', 'betterlinks')}</label>
											<RedirectType
												className="btl-modal-select--full"
												classNamePrefix="btl-react-select"
												id="redirect_type"
												name="redirect_type"
												setUpgradeToProModal={setUpgradeToProModal}
												value={[
													...redirectType,
													{
														value: is_pro_enabled ? 'cloak' : 'pro',
														label: is_pro_enabled ? (
															__('Cloaked', 'betterlinks')
														) : (
															<>
																{__('Cloaked', 'betterlinks')}
																<ProBadge />
															</>
														),
													},
												]}
												defaultValue={settings.redirect_type == 'cloak' && !is_pro_enabled ? '307' : settings.redirect_type}
												setFieldValue={props.setFieldValue}
												isMulti={false}
												isQuickSetup={true}
												setSettings={setSettings}
											/>
										</span>
										<span className="btl-form-group">
											<label className="btl-form-label">{__('Wildcards', 'betterlinks')}</label>
											<div className="link-options__body">
												<label className="btl-checkbox-field block">
													<Field className="btl-check" name="wildcards" type="checkbox" onChange={() => handleOptions(props, 'wildcards')} />
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
										{betterLinksHooks.applyFilters(
											'BetterLinksQuickSetupConfig',
											<span className="btl-form-group btl-form-group--teaser">
												<label className="btl-form-label" onClick={openUpgradeToProModal}>
													{__('Force HTTPS', 'betterlinks')} <ProBadge />
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
											</span>,
											{ ...props, handleOptions }
										)}
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</>
	);
};

export default Configuration;
