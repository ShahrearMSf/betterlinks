import UpgradeToPro from '../UpgradeToPro';
import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';
import { betterlinkspro_version, is_pro_enabled, saveSettingsHandler } from 'utils/helper';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import ReactQuill from 'react-quill';

const PasswordProtection = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	const pro_version = betterlinkspro_version ? parseFloat(betterlinkspro_version?.slice(2)) : null;

	if (pro_version !== null && pro_version < 6.3) {
		return (
			<div className="btl-form-group">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
					{__('To use Password Protection Feature, Please update your Betterlinks Pro to the latest version available', 'betterlinks')}
				</div>
			</div>
		);
	}
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<Formik enableReinitialize initialValues={{ ...settings }} onSubmit={(values) => saveSettingsHandler(values, update_option, setFormSubmitText)}>
				{(props) => (
					<Form>
						{!is_pro_enabled && (
							<span className="btl-form-group btl-form-group--teaser btl-form-group-password-protection" onClick={openUpgradeToProModal}>
								<label className="btl-form-label">
									{__('Enable Password Protection', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
								</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<input className="btl-check" name="enable_password_protection" type="checkbox" disabled={true} />
										<span className="text" />
									</label>
								</div>
							</span>
						)}
						{betterLinksHooks.applyFilters('BetterLinksPasswordProtection', null, { ...props, ReactQuill })}
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
export default connect(null, mapDispatchToProps)(PasswordProtection);
