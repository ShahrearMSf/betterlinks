import { __ } from '@wordpress/i18n';
import Category from 'components/Terms/Category';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { saveSettingsHandler } from 'utils/helper';

const FluentBoardSettings = ({ settings, terms, update_option, fetch_terms_data }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{ ...settings }}
				onSubmit={(values) => {
					saveSettingsHandler(values, update_option, setFormSubmitText);
					fetch_terms_data();
				}}
			>
				{(props) => (
					<Form className="btl-fbs">
						<span className="btl-form-group">
							<label className="btl-form-label" style={{ 'min-width': '230px' }}>
								{__('Enable Link Management', 'betterlinks')}
								<div className="btl-tooltip" style={{ marginLeft: '5px' }}>
									<span className="dashicons dashicons-info-outline" />
									<span
										className="btl-tooltiptext"
										style={{
											width: '255px',
											textAlign: 'left',
											lineHeight: '1.2em',
										}}
									>
										{__('Enabling this option will allow you to create short links for tasks directly within the Fluent Boards. For more info, ', 'betterlinks')}
										<a href="https://betterlinks.io/docs/fluent-boards-link-management-with-betterlinks" target="_blank" style={{ color: 'inherit' }}>
											{__('Click Here', 'betterlinks')}
										</a>
									</span>
								</div>
							</label>
							<div className="btl-form-field">
								<label className="btl-checkbox-field block">
									<input
										className="btl-check"
										name="fbs.enable_fbs"
										type="checkbox"
										onChange={(e) => props.setFieldValue('fbs.enable_fbs', e.target.checked)}
										checked={props.values?.fbs?.enable_fbs}
									/>
									<span className="text">{__('', 'betterlinks')}</span>
								</label>
							</div>
						</span>
						<span className="btl-form-group">
							<label className="btl-form-label" style={{ 'min-width': '120px' }}>
								{__('Choose a Default Category', 'betterlinks')}
								<div className="btl-tooltip" style={{ marginLeft: '5px' }}>
									<span className="dashicons dashicons-info-outline" />
									<span
										className="btl-tooltiptext"
										style={{
											width: '255px',
											textAlign: 'left',
											lineHeight: '1.2em',
										}}
									>
										{__(
											'This category will be assigned by default when you create links inside Fluent Boards for your tasks. You can manage your links from BetterLinks Dashboard afterwards.',
											'betterlinks'
										)}
									</span>
								</div>
							</label>
							<div className="btl-form-field">
								<Category catId={parseInt(props.values?.fbs?.cat_id)} data={{ terms }} fieldName="fbs.cat_id" setFieldValue={props.setFieldValue} />
							</div>
						</span>
						<button className="button-primary btn-save-settings" type="submit">
							{formSubmitText}
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};
const mapDispatchToProps = (dispatch) => ({
	update_option: bindActionCreators(update_option, dispatch),
	fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
});

export default connect(null, mapDispatchToProps)(FluentBoardSettings);
