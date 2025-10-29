import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

const propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.string,
    setFieldValue: PropTypes.func,
    className: PropTypes.string,
    classNamePrefix: PropTypes.string,
    isMulti: PropTypes.bool,
    placeholder: PropTypes.string,
};

const UrlGenerationType = (props) => {
    const [field, , { setValue: setThisFieldValue }] = useField(props.name);
    const [selectValue, setSelectValue] = useState(null);

    useEffect(() => {
        // Find the current selected option from the available options
        const currentOption = (props.options || []).find((item) => item.value === field.value);
        if (currentOption) {
            setSelectValue(currentOption);
        } else {
            // If current field value is not found in options, set it to the default value
            const defaultOption = (props.options || []).find((item) => item.value === (props.defaultValue || 'random_mixed'));
            if (defaultOption) {
                setSelectValue(defaultOption);
                setThisFieldValue(defaultOption.value, false);
                props.setFieldValue(field.name, defaultOption.value);
            }
        }
    }, [field.value, props.options, props.defaultValue]);


    const handleChange = (option) => {
        if (option == null) {
            return props.setFieldValue(field.name, '');
        }

        // Update the selected value
        setSelectValue(option);

        // Update field value
        setThisFieldValue(option.value, false);
        props.setFieldValue(field.name, option.value);
    };

    return (
        <Select
            name={props.name}
            options={props.options || []}
            value={selectValue}
            onChange={handleChange}
            className={props.className}
            classNamePrefix={props.classNamePrefix}
            isMulti={props.isMulti}
            placeholder={props.placeholder || __('Select option...', 'betterlinks')}
            /* Use default CSS-based styling (no inline style overrides) so appearance matches RedirectType */
            isSearchable={false}
        />
    );
};

UrlGenerationType.propTypes = propTypes;
UrlGenerationType.defaultProps = {
    className: '',
    classNamePrefix: 'btl-react-select',
    isMulti: false,
    placeholder: '',
};

export default UrlGenerationType;
