import React, { useState } from 'react';
import { useField } from 'formik';
import CreatableSelect2 from 'react-select/creatable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_terms_data } from './../../redux/actions/terms.actions';

const Tags = (props) => {
	const [field] = useField(props.name);
	const [isFetchData, setIsFetchData] = useState(false);
	const fetchData = () => {
		if (!isFetchData) {
			props.fetch_terms_data({ term_type: 'tags' });
			setIsFetchData(true);
		}
	};

	const onChange = (option) => {
		if (option == null) {
			return props.setFieldValue(field.name, '');
		}

		return props.setFieldValue(
			field.name,
			option.map((item) => item.value)
		);
	};
	const onCreateOptionHandler = (inputValue, optionLabel) => {
		console.log(inputValue, optionLabel);
	};
	return (
		<React.Fragment>
			<CreatableSelect2
				className="btl-modal-form-control btl-modal-select"
				isClearable
				id={field.id}
				name={field.name}
				onMenuOpen={() => fetchData()}
				defaultValue={
					props.isEditMode
						? props.terms.terms &&
						  Object.entries(props.terms.terms).map(([key, value]) => ({
								value: value.term_id,
								label: value.term_name,
						  }))
						: false
				}
				onChange={onChange}
				classNamePrefix="btl-react-select"
				options={
					props.terms.terms &&
					Object.entries(props.terms.terms).map(([key, value]) => ({
						value: value.term_id,
						label: value.term_name,
					}))
				}
				isMulti={true}
			/>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Tags);
