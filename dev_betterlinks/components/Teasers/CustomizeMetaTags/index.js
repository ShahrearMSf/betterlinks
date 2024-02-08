import { useState } from 'react';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from '../UpgradeToPro';
import { is_pro_enabled, pro_version_check, saveSettingsHandler } from 'utils/helper';
import { __ } from '@wordpress/i18n';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import CheckList from '../AutoLinkCreate/CheckList';

const CustomizeMetaTags = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	const pro_version = pro_version_check();

	if (pro_version !== null && pro_version < 8) {
		// this feature is from 1.8.0 version, betterlinks-pro
		return (
			<div className="btl-form-group">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
					{__('To Utilize the Customize Link Preview Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro v-1.8.0', 'betterlinks')}
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
						{!is_pro_enabled && <CheckList title={__('Enable Customize Link Preview', 'betterlinks')} onClick={openUpgradeToProModal} />}
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
