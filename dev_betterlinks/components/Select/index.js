import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';
import { is_pro_enabled } from 'utils/helper';

const Select = (props) => {
	const [field, , { setValue: setThisFieldValue }] = useField(props.name);
	const defaultValue = field.value ? field.value : '307';
	const [selectValue, setSelectValue] = useState(field.value || []);

	if (field.value == 'cloak' && !is_pro_enabled) {
		setThisFieldValue('307');
	}

	useEffect(() => {
		if (field.value === 'pro' && props.setUpgradeToProModal) {
			setThisFieldValue(selectValue[0]?.value, false);
			props.setFieldValue(field.name, selectValue[0]?.value);
			props.setUpgradeToProModal(true);
		} else {
			setSelectValue((props.value || []).filter((item) => item.value == field.value));
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
				className={`btl-modal-select--full ${props.value && props.value.find((item) => item.value == 'pro') ? 'btl-modal-select-need-pro-teaser' : ''}`}
				classNamePrefix="btl-react-select"
				id={field.id}
				name={field.name}
				defaultValue={(props.value && props.value.filter((item) => item.value == defaultValue)) || [{ label: '307 (Temporary)', value: '307' }]}
				onChange={onChange}
				options={props.value}
				value={selectValue}
				isMulti={props.isMulti}
				isDisabled={props.disabled}
			/>
		</React.Fragment>
	);
};
export default Select;
