import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import CreatableSelect2 from 'react-select/creatable';
import { API, namespace } from './../../utils/helper';

const propTypes = {
	linkId: PropTypes.number,
	data: PropTypes.object,
	fieldName: PropTypes.string,
	setFieldValue: PropTypes.func,
};

const defaultProps = {};

const Tags = ({ fieldName, linkId, setFieldValue, data, disabled }) => {
	const [saveTags, setSaveTags] = useState(null);
	useEffect(async () => {
		if (linkId) {
			const res = await API.get(namespace + 'terms', {
				params: {
					ID: linkId,
					term_type: 'tags',
				},
			});
			if (res.data.data) {
				setSaveTags(
					res.data.data.map((item) => ({
						value: item.term_id,
						label: item.term_name,
					}))
				);
			}
		} else {
			setSaveTags([]);
		}
	}, []);
	const [field] = useField(fieldName);
	const onChange = (option) => {
		if (option == null) {
			return setFieldValue(field.name, '');
		}

		return setFieldValue(
			field.name,
			option.map((item) => item.value)
		);
	};
	return (
		<React.Fragment>
			{saveTags && (
				<CreatableSelect2
					className="btl-modal-form-control btl-modal-select"
					isClearable
					id={field.id}
					name={field.name}
					defaultValue={saveTags}
					onChange={onChange}
					classNamePrefix="btl-react-select"
					options={
						data.terms &&
						data.terms
							.filter((item) => item.term_type == 'tags')
							.map((item) => ({
								value: item.ID,
								label: item.term_name,
							}))
					}
					isDisabled={disabled}
					isMulti={true}
				/>
			)}
		</React.Fragment>
	);
};

export default Tags;
Tags.propTypes = propTypes;
Tags.defaultProps = defaultProps;
