import { betterlinks_auth, saveSettingsHandler, site_url } from 'utils/helper';
import { Form, Formik } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';

const CreateLinkExternally = ({ settings, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	return (
		<>
			<Formik initialValues={{ ...settings }} onSubmit={(values) => saveSettingsHandler(values, update_option, setFormSubmitText)}>
				{(props) => {
					return (
						<Form>
							<div className="btl-form-group">
								<div className="btl-form-field">
									<div className="short-description">
										<b style={{ fontWeight: 700 }}>Note: </b>
										<span>{__('It will allow you to create link externally from your bookmark. For more info, ')}</span>
										<a className="external-analytic-tooltip-anchor" href="#" target="_blank" style={{ color: 'inherit' }}>
											{__('Click here', 'betterlinks-pro')}
										</a>
									</div>
								</div>
							</div>
							<span className="btl-form-group">
								<label className="btl-form-label" style={{ 'min-width': '120px' }}>
									{__('Enable', 'betterlinks-pro')}
									{/* <div className="btl-tooltip">
										<span className="dashicons dashicons-info-outline" />
										<span className="btl-tooltiptext" style={{ width: '255px', 'text-align': 'left', 'line-height': '1.2em' }}>
											{__('When enabled, this will allow you to Customize the Meta attributes of the shortened URL. ', 'betterlinks-pro')}
											<a target="_blank" href="#" style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}>
												{__('Learn More', 'betterlinks-pro')}
											</a>
										</span>
									</div> */}
								</label>
								<div className="btl-form-field">
									<label className="btl-checkbox-field block">
										<input
											className="btl-check"
											name="enable_cle"
											type="checkbox"
											onChange={() => props.setFieldValue('enable_cle', !props.values?.enable_cle)}
											checked={props.values?.enable_cle}
										/>
										<span className="text">{__('', 'betterlinks-pro')}</span>
									</label>
								</div>
							</span>
							{props.values.enable_cle && (
								<div
									style={{
										display: 'flex',
										'column-gap': '5px',
										'align-items': 'center',
										marginBottom: '20px',
									}}
								>
									<a
										href={`javascript:location.href='${site_url}/index.php?action=btl_cle&api_secret=${betterlinks_auth}&target_url='+encodeURI(location.href)`}
										className="button button-primary"
									>
										Create Link Externally
									</a>
									<span>Just drag this button in your bookmark</span>
								</div>
							)}
							<button className="button-primary btn-save-settings" type="submit">
								{formSubmitText}
							</button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	update_option: bindActionCreators(update_option, dispatch),
});

export default connect(null, mapDispatchToProps)(CreateLinkExternally);
