import { useState } from 'react';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from '../UpgradeToPro';
import { Field, Form, Formik } from 'formik';
import { is_pro_enabled, saveSettingsHandler, site_url } from 'utils/helper';
import { update_option } from 'redux/actions/settings.actions';
import CheckList from '../AutoLinkCreate/CheckList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import { isURL } from '@wordpress/url';
import ClipLoader from 'react-spinners/ClipLoader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ARecordConfig from './ARecordConfig';
import DomainConfig from './DomainConfig';
import ServerConfig from './ServerConfig';
import ApacheConfig from './ApacheConfig';
import NginxConfig from './NginxConfig';
import CodeBlock from './CodeBlock';

const ShortLinkCustomDomain = (props) => {
	const { update_option } = props;
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	const { settings } = props.settings;
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={{ ...settings, server_type: 'apache' }}
				onSubmit={(values, { setFieldError }) => {
					const result = betterLinksHooks.applyFilters('BetterLinksCustomDomainSettings', false, { values, setFieldError, isURL });
					if (!result) {
						window.scrollTo(0, 250);
						return;
					}
					saveSettingsHandler(values, update_option, setFormSubmitText);
				}}
			>
				{(props) => (
					<Form>
						{betterLinksHooks.applyFilters('BetterLinksCustomDomain', <TeaserContent values={props.values} />, {
							...props,
							ClipLoader,
							CodeBlock,
							formSubmitText,
							...{ Tab, Tabs, TabList, TabPanel, Field },
						})}
					</Form>
				)}
			</Formik>
		</>
	);
};
const mapStateToProps = (state) => ({
	settings: state.settings,
});
const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShortLinkCustomDomain);

const TeaserContent = ({ values }) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<CheckList title={__('Enable Custom Domain', 'betterlinks')} onClick={openUpgradeToProModal} is_pro={true} />
			<span className="btl-form-group btl-form-group--top">
				<label className="btl-form-label">{__('Custom Domain', 'betterlinks')}</label>
				<div className="link-options__body" style={{ flexDirection: 'column' }}>
					<div style={{ maxWidth: 250, display: 'flex', alignItems: 'center' }} onClick={openUpgradeToProModal}>
						<input type="text" className="btl-text-field btl-text-field-teaser" placeholder="http://example.com" disabled />
						<button type="button" className="button button-secondary" style={{ cursor: 'not-allowed' }} onClick={(e) => e.preventDefault()}>
							{__('Verify', 'betterlinks-pro')}
						</button>
					</div>
				</div>
			</span>
			<span className="btl-form-group btl-domain-configuration" style={{ alignItems: 'flex-start' }}>
				<label className="btl-form-label" style={{ marginTop: '10px' }}>
					{__('Domain Configuration', 'betterlinks-pro')}
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline" />
						<span className="btl-tooltiptext" style={{ width: '255px', 'text-align': 'left', 'line-height': '1.2em' }}>
							{__('Choose how you want to point your custom domain. For more info, ', 'betterlinks-pro')}
							<a target="_blank" href="#" style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}>
								{__('Click Here', 'betterlinks-pro')}
							</a>
						</span>
					</div>
				</label>
				<div className="btl-form-field">
					<label className="btl-checkbox-field block" />
					<DomainConfig name="A Records" type="a_records" copy={false} code={``}>
						<ARecordConfig custom_host={'example.com'} siteIp={'127.0.0.1'} />
					</DomainConfig>
				</div>
			</span>
			<span className="btl-form-group btl-domain-configuration" style={{ alignItems: 'flex-start' }}>
				<label className="btl-form-label" style={{ marginTop: '10px' }}>
					{__('Server Configuration', 'betterlinks-pro')}
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline" />
						<span className="btl-tooltiptext" style={{ width: '255px', 'text-align': 'left', 'line-height': '1.2em' }}>
							{__('Choose how you want to point your custom domain. For more info, ', 'betterlinks-pro')}
							<a target="_blank" href="#" style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}>
								{__('Click Here', 'betterlinks-pro')}
							</a>
						</span>
					</div>
				</label>
				<div className="btl-form-field">
					<label className="btl-checkbox-field block"></label>
					<div>
						<ServerConfig />
						{'apache' === values?.server_type && (
							<DomainConfig name=".htaccess" type="htaccess">
								<ApacheConfig host={'yoursite.com'} custom_domain={'http://example.com'} />
							</DomainConfig>
						)}
						{'nginx' === values?.server_type && (
							<DomainConfig name="Nginx" type="nginx">
								<NginxConfig site_url={`http://yoursite.com`} />
							</DomainConfig>
						)}
					</div>
				</div>
			</span>
		</>
	);
};
