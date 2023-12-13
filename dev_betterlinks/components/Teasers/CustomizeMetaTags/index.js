import { useState } from 'react';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from '../UpgradeToPro';
import { is_pro_enabled, pro_version_check, saveSettingsHandler } from 'utils/helper';
import { __ } from '@wordpress/i18n';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';

const CustomizeMetaTags = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	const pro_version = pro_version_check();

	if (pro_version !== null && pro_version < 7.2) {
		return (
			<div className="btl-form-group">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
					{__('To Utilize the Customize Meta Tags Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro', 'betterlinks')}
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
									{__('Enable Customize Meta Tags', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
								</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<input className="btl-check" name="" type="checkbox" disabled={true} />
										<span className="text" />
									</label>
								</div>
							</span>
						)}
						{betterLinksHooks.applyFilters('BetterLinksCustomizeMetaTags', null, props)}
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
export default connect(null, mapDispatchToProps)(CustomizeMetaTags);
