import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';

const RedirectType = (props) => {
	const [field, , { setValue: setThisFieldValue }] = useField(props.name);
	const [selectValue, setSelectValue] = useState(field.value);

	useEffect(() => {
		if (field.value === 'pro') {
			setThisFieldValue(selectValue.value, false);
			props.setFieldValue(field.name, selectValue.value);
			props.setUpgradeToProModal(true);
		} else {
			setSelectValue((props.value || []).find((item) => item.value == field.value));
		}
	}, [field.value, props.value]);

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
				value={selectValue}
				isMulti={props.isMulti}
			/>
		</React.Fragment>
	);
};
export default RedirectType;
