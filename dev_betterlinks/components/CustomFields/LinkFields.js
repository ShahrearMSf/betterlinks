import { __ } from '@wordpress/i18n';
import { Field } from 'formik';
import { useEffect } from 'react';

const LinkFields = ({ props, customFields }) => {
	useEffect(() => {
		if (customFields?.length > 0 && undefined === props.values?.param_struct?.useCustomFields) {
			props.setFieldValue('param_struct.useCustomFields', true);
		}
	}, []);

	return (
		<>
			<div className="btl-modal-form-group">
				<label className="btl-modal-form-label" htmlFor="useCustomFields">
					{__('Custom Fields', 'betterlinks')}
				</label>
				<Field
					id="useCustomFields"
					className="btl-check"
					name="param_struct.useCustomFields"
					type="checkbox"
					checked={props.values?.param_struct?.useCustomFields}
					onChange={() => props.setFieldValue('param_struct.useCustomFields', !props.values?.param_struct?.useCustomFields)}
					disabled={false}
				/>
			</div>
			{props.values?.param_struct?.useCustomFields &&
				customFields.map((field, index) => {
					return (
						<div key={index} className="btl-modal-form-group">
							<label className="btl-modal-form-label" htmlFor={field.value}>
								{__(field.label, 'betterlinks')}
							</label>
							<Field
								className="btl-modal-form-control"
								id={field.value}
								name={`param_struct[${field.value}]`}
								onChange={(e) => {
									props.setFieldValue(`param_struct[${field.value}]`, e.target.value);
								}}
							/>
						</div>
					);
				})}
		</>
	);
};

export default LinkFields;
