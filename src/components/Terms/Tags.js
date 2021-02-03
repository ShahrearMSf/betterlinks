import React from 'react';
import { useField } from 'formik';
import CreatableSelect2 from 'react-select/creatable';

const Tags = (props) => {
	const { data } = props;
	const [field] = useField(props.name);
	const onChange = (option) => {
		if (option == null) {
			return props.setFieldValue(field.name, '');
		}

		return props.setFieldValue(
			field.name,
			option.map((item) => item.value)
		);
	};
	return (
		<React.Fragment>
			<CreatableSelect2
				className="btl-modal-form-control btl-modal-select"
				isClearable
				id={field.id}
				name={field.name}
				defaultValue={[]}
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
				isMulti={true}
			/>
		</React.Fragment>
	);
};

export default Tags;
