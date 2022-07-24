import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';

const RedirectType = (props) => {
	const [field] = useField(props.name);
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
				defaultValue={props.value && props.value.filter((item) => item.value == props.defaultValue)}
				onChange={onChange}
				options={props.value}
				isMulti={props.isMulti}
			/>
		</React.Fragment>
	);
};
export default RedirectType;
