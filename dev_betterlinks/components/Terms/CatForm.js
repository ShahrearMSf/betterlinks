import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';
import { __ } from '@wordpress/i18n';
import { betterlinks_nonce, generateSlug } from './../../utils/helper';

const propTypes = {
	catId: PropTypes.number,
	catName: PropTypes.string,
	catSlug: PropTypes.string,
	submitHandler: PropTypes.func,
	hideHandler: PropTypes.func,
};

const defaultProps = {
	catId: 0,
	catName: '',
	catSlug: '',
};

export default function CatForm({ catId, catName, catSlug, submitHandler, hideHandler }) {
	const [slugIsExists, setSlugIsExists] = useState(false);
	const catSlugUniqueCheck = (slug, ID) => {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/cat_slug_unique_checker');
		form_data.append('security', betterlinks_nonce);
		form_data.append('ID', ID);
		form_data.append('slug', slug);
		return axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					setSlugIsExists(response.data.data);
					return response.data.data;
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const onSubmit = (values) => {
		catSlugUniqueCheck(values.term_slug, values.ID).then((isUnique) => {
			if (!isUnique) {
				const term_name = values.term_name.trim();
				if (term_name) {
					values.term_name = term_name;
					hideHandler(false);
					return submitHandler(values);
				}
			}
		});
	};
	return (
		<React.Fragment>
			<Formik
				initialValues={{
					ID: catId,
					term_name: catName,
					term_slug: catSlug,
					term_type: 'category',
				}}
				onSubmit={(values, { setSubmitting }) => {
					setSubmitting(false);
					onSubmit(values);
				}}
			>
				{(props) => (
					<Form className={slugIsExists ? 'w-100 is-invalid' : 'w-100'}>
						<span className={catId > 0 ? 'btl-modal-form-group' : 'btl-form-group'}>
							{catId > 0 && (
								<label className="btl-modal-form-label btl-required" htmlFor="cat_name">
									{__('Category Name', 'betterlinks')}
								</label>
							)}
							<Field
								id="term_name"
								name="term_name"
								placeholder={__('* Name', 'betterlinks')}
								className={catId > 0 ? 'btl-modal-form-control' : 'btl-form-control'}
								onChange={(e) => {
									const slug = generateSlug(e.target.value);
									props.setFieldValue('term_name', e.target.value);
									props.setFieldValue('term_slug', slug);
									setSlugIsExists(false);
								}}
								required
							/>
						</span>
						{slugIsExists == true && <div className="errorlog">Already Exists</div>}
						{catId > 0 ? (
							<div className="btl-modal-form-group">
								<label className="btl-modal-form-label"></label>
								<button type="submit" className="btl-modal-submit-button">
									{__('Update', 'betterlinks')}
								</button>
							</div>
						) : (
							<button className="btl-create-category-submit" type="submit">
								{__('Submit', 'betterlinks')}
							</button>
						)}
					</Form>
				)}
			</Formik>
		</React.Fragment>
	);
}

CatForm.propTypes = propTypes;
CatForm.defaultProps = defaultProps;
