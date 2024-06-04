import { __ } from '@wordpress/i18n';
import { Form, Formik } from 'formik';

const FluentBoardSettings = ({ settings, terms }) => {
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{ ...settings }}
				onSubmit={(values) => {
					saveSettingsHandler(values, update_option, setFormSubmitText);
				}}
			>
				{(props) => (
					<Form className="btl-fbs">
						<span className="btl-form-group">
							<label className="btl-form-label" style={{ 'min-width': '120px' }}>
								{__('Enable Fluent Board', 'betterlinks')}
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
					</Form>
				)}
			</Formik>
		</>
	);
};

export default FluentBoardSettings;
