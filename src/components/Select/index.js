import React from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';

const Select = (props) => {
	const [field] = useField(props.name);
	const defaultValue = field.value ? field.value : '307';

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
				defaultValue={props.value && props.value.filter((item) => item.value == defaultValue)}
				onChange={onChange}
				options={props.value && props.value.map((item) => item)}
				isMulti={props.isMulti}
			/>
		</React.Fragment>
	);
};
export default Select;
