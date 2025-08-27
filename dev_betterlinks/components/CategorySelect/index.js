import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';
import { __ } from '@wordpress/i18n';

const CategorySelect = (props) => {
    const [field, , { setValue: setThisFieldValue }] = useField(props.name);
    const [selectValue, setSelectValue] = useState(null);

    useEffect(() => {
        // Find the current selected option from the available options
        const currentOption = (props.options || []).find((item) => item.value === field.value);
        if (currentOption) {
            setSelectValue(currentOption);
        } else {
            // If current field value is not found in options, set it to the default value
            const defaultOption = (props.options || []).find((item) => item.value === (props.defaultValue || '1'));
            if (defaultOption) {
                setSelectValue(defaultOption);
                setThisFieldValue(defaultOption.value, false);
                props.setFieldValue(field.name, defaultOption.value);
            }
        }
    }, [field.value, props.options, props.defaultValue]);

    const onChange = (option) => {
        if (option == null) {
            return props.setFieldValue(field.name, '1'); // Default to 'Uncategorized' (ID: 1)
        }

        // Update the selected value
        setSelectValue(option);

        // Update form field value
        props.setFieldValue(field.name, option.value);
    };

    return (
        <React.Fragment>
            <Select2
                className="btl-modal-select--full"
                classNamePrefix="btl-react-select"
                id={field.id}
                name={field.name}
                onChange={onChange}
                options={props.options}
                value={selectValue}
                isMulti={false}
                placeholder={__('Select a category...', 'betterlinks')}
            />
        </React.Fragment>
    );
};

export default CategorySelect;
