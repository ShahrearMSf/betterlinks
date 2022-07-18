import React from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';
import { is_pro_enabled } from 'utils/helper';

const Select = (props) => {
	const [field, , { setValue }] = useField(props.name);
	const defaultValue = field.value ? field.value : '307';
	if (field.value == 'cloak' && !is_pro_enabled) {
		setValue('307');
	}

	const onChange = (option) => {
		if (option == null) {
			return props.setFieldValue(field.name, '');
		}
		return props.setFieldValue(field.name, props.isMulti ? option.map((item) => item.value) : option.value);
	};

	return (
		<React.Fragment>
			<Select2
				className="btl-modal-select--full"
				classNamePrefix="btl-react-select"
				id={field.id}
				name={field.name}
				defaultValue={(props.value && props.value.find((item) => item.value == defaultValue)) || { label: '307 (Temporary)', value: '307' }}
				onChange={onChange}
				options={props.value}
				isMulti={props.isMulti}
				isDisabled={props.disabled}
			/>
		</React.Fragment>
	);
};
export default Select;
