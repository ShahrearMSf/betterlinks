import UpgradeToPro from '../UpgradeToPro';
import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';
import { is_pro_enabled, saveSettingsHandler } from 'utils/helper';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import ReactQuill from 'react-quill';

const AffiliateLinkDisclosure = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<Formik enableReinitialize initialValues={{ ...settings }} onSubmit={(values) => saveSettingsHandler(values, update_option, setFormSubmitText)}>
				{(props) => (
					<Form>
						{!is_pro_enabled && (
							<span className="btl-form-group btl-form-group--teaser btl-form-group-affiliate-link-disclosure" onClick={openUpgradeToProModal}>
								<label className="btl-form-label">
									{__('Affiliate Link Disclosure', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
								</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<input className="btl-check" name="is_autolink_headings" type="checkbox" disabled={true} />
										<span className="text" />
									</label>
								</div>
							</span>
						)}
						{betterLinksHooks.applyFilters('BetterLinksOptionsTabSettings', null, { ...props, ReactQuill })}
						{is_pro_enabled && (
							<button className="button-primary btn-save-settings" type="submit">
								{formSubmitText}
							</button>
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
export default connect(null, mapDispatchToProps)(AffiliateLinkDisclosure);
