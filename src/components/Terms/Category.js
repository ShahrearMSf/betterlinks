import React from 'react';
import { useField } from 'formik';
import Select2 from 'react-select';

const Category = (props) => {
	const { data, cat_id } = props;
	const [field] = useField(props.name);

	const onChange = (option) => {
		if (option == null) {
			return props.setFieldValue(field.name, '');
		}
		return props.setFieldValue(field.name, option.value);
	};

	const defaultValue = () => {
		if (cat_id) {
			const { ID, term_name } = data.terms.filter((item) => item.ID == cat_id)[0];
			return { value: ID, label: term_name };
		} else {
			const { ID, term_name } = data.terms.filter((item) => item.term_slug == 'uncategorized')[0];
			return { value: ID, label: term_name };
		}
	};
	return (
		<React.Fragment>
			{data.terms ? (
				<Select2
					className="btl-modal-select"
					id={field.id}
					name={field.name}
					defaultValue={defaultValue()}
					classNamePrefix="btl-react-select"
					onChange={onChange}
					options={data.terms
						.filter((item) => item.term_type == 'category' && item.term_slug != 'uncategorized')
						.map((item) => ({
							value: item.ID,
							label: item.term_name,
						}))}
				/>
			) : (
				<div>
					<Select2 className="btl-modal-select" id={field.id} classNamePrefix="btl-react-select" />
				</div>
			)}
		</React.Fragment>
	);
};
export default Category;
