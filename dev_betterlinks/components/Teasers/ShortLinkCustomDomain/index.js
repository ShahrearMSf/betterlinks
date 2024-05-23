import { useState } from 'react';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from '../UpgradeToPro';
import { Form, Formik } from 'formik';
import { is_pro_enabled, saveSettingsHandler } from 'utils/helper';
import { update_option } from 'redux/actions/settings.actions';
import CheckList from '../AutoLinkCreate/CheckList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import ClipLoader from 'react-spinners/ClipLoader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
					const result = betterLinksHooks.applyFilters('BetterLinksCustomDomainSettings', false, { values, setFieldError, isURL });
					if (!result) return;
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
						{betterLinksHooks.applyFilters('BetterLinksCustomDomain', null, { ...props, ClipLoader, formSubmitText, ...{ Tab, Tabs, TabList, TabPanel } })}
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
