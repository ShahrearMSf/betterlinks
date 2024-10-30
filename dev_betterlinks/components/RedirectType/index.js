import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';
import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';

const RedirectType = (props) => {
	const [field, , { setValue: setThisFieldValue }] = useField(props.name);
	const [selectValue, setSelectValue] = useState(field?.value != 'cloak' && is_pro_enabled ? field : { label: __('307 (Temporary)', 'betterlinks'), value: '307' });

	useEffect(() => {
		if (field?.value === 'pro') {
			setThisFieldValue(selectValue?.value, false);
			props.setFieldValue(field.name, selectValue?.value);
		} else {
			setSelectValue((props.value || []).find((item) => item.value == field.value));
		}
	}, []);

	const onChange = (option) => {
		if (option == null) {
			return props.setFieldValue(field.name, '');
		}
		// for quick setup wizard only
		if (!!props?.isQuickSetup) {
			if (option?.value === 'pro') {
				props.setUpgradeToProModal(true);
				setThisFieldValue(selectValue?.value, field.value);
				props.setFieldValue(field.name, field.value);
			} else {
				props.setFieldValue(field.name, option?.value);
				setSelectValue((props.value || []).find((item) => item.value == option.value));
			}

			props?.setSettings((prev) => ({
				...prev,
				redirect_type: props.isMulti ? option.map((item) => item.value) : option.value !== 'pro' ? option.value : field.value,
			}));
		}
		// for quick setup wizard only
		return props.setFieldValue(field.name, props.isMulti ? option.map((item) => item.value) : option.value !== 'pro' ? option.value : field.value);
	};

	return (
		<React.Fragment>
			<Select2
				className={`btl-modal-select--full ${props.value && props.value.find((item) => item.value == 'pro') ? 'btl-modal-select-need-pro-teaser' : ''}`}
				classNamePrefix="btl-react-select"
				id={field.id}
				name={field.name}
				defaultValue={props.value && props.value.filter((item) => item.value == (props.defaultValue || '307'))}
				onChange={onChange}
				options={props.value}
				value={selectValue}
				isMulti={props.isMulti}
			/>
		</React.Fragment>
	);
};
export default RedirectType;
