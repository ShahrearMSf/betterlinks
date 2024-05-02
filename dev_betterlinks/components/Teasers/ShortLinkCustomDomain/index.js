import { useState } from 'react';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from '../UpgradeToPro';
import { Form, Formik } from 'formik';
import { is_pro_enabled, saveSettingsHandler, site_url } from 'utils/helper';
import { update_option } from 'redux/actions/settings.actions';
import CheckList from '../AutoLinkCreate/CheckList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';

const ShortLinkCustomDomain = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<Formik
				enableReinitialize
				initialValues={{ ...settings }}
				onSubmit={(values, { setFieldError }) => {
					if (!is_pro_enabled) return;

					const { enable_shortlink_custom_domain: enabled, shortlink_custom_domain: url } = values;
					if (enabled && ('' === url || !isURL(url))) {
						setFieldError('error__shortlink_custom_domain', "Please fill in your custom domain or ensure it's a valid URL.");
						return;
					}
					if (enabled) localStorage.setItem('btl_custom_domain', url);
					else localStorage.setItem('btl_custom_domain', site_url);

					saveSettingsHandler(values, update_option, setFormSubmitText);
				}}
			>
				{(props) => (
					<Form>
						{!is_pro_enabled && (
							<>
								<CheckList title={__('Enable Custom Domain', 'betterlinks')} onClick={openUpgradeToProModal} />
								<span className="btl-form-group btl-form-group--top">
									<label className="btl-form-label">Custom Domain</label>
									<div className="link-options__body" style={{ flexDirection: 'column' }}>
										<div style={{ maxWidth: 250 }} onClick={openUpgradeToProModal}>
											<input className="btl-text-field btl-text-field-teaser" placeholder="Your custom domain here..." disabled />
										</div>
									</div>
								</span>
							</>
						)}
						{betterLinksHooks.applyFilters('BetterLinksCustomDomain', null, props)}
						{is_pro_enabled && (
							<>
								<button className="button-primary btn-save-settings" type="submit">
									{formSubmitText}
								</button>
							</>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(ShortLinkCustomDomain);
