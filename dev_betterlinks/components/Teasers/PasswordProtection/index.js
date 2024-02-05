import UpgradeToPro from '../UpgradeToPro';
import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';
import { is_pro_enabled, pro_version_check, saveSettingsHandler } from 'utils/helper';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import ReactQuill from 'react-quill';
import CheckList from '../AutoLinkCreate/CheckList';
import SelectTeaser from '../AutoLinkCreate/SelectTeaser';

const PasswordProtection = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	const pro_version = pro_version_check();

	if (pro_version !== null && pro_version < 6.3) {
		return (
			<div className="btl-form-group">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
					{__('To Utilize the Password Protected Redirect Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro', 'betterlinks')}
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
							<>
								<CheckList title={__('Password Protected Redirect', 'betterlinks')} onClick={openUpgradeToProModal} />
								<div style={{ filter: 'blur(1px)' }}>
									<CheckList title={__('Enable Cookie', 'betterlinks')} onClick={openUpgradeToProModal} />
									<CheckList title={__('Advanced Settings', 'betterlinks')} onClick={openUpgradeToProModal} />
									<SelectTeaser title={__('Form Template', 'betterlinks')} onClick={openUpgradeToProModal} />
									<CheckList title={__('Enable Title', 'betterlinks')} onClick={openUpgradeToProModal} />
									<CheckList title={__('Enable Instruction', 'betterlinks')} onClick={openUpgradeToProModal} />
									<CheckList title={__('Show Protected URL', 'betterlinks')} onClick={openUpgradeToProModal} />
								</div>
							</>
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
