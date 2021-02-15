import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import { nonce, generateSlug } from './../utils/helper';

const CreateCategory = ({ createCatHandler }) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [slugIsExists, setSlugIsExists] = useState(false);

	const catSlugUniqueCheck = (slug) => {
		let form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/cat_slug_unique_checker');
		form_data.append('security', nonce);
		form_data.append('slug', slug);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					setSlugIsExists(response.data.data);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	return (
		<div className="dnd-create-category">
			<button className="dnd-create-category-button" onClick={() => setIsOpenForm(!isOpenForm)}>
				<i className="btl btl-add"></i>
			</button>
			<p className="dnd-create-category-text">{__('Add New Category', 'betterlinks')}</p>
			{isOpenForm && (
				<Formik
					initialValues={{
						term_name: '',
						term_slug: '',
						term_type: 'category',
					}}
					onSubmit={async (values) => {
						if (!slugIsExists) {
							setIsOpenForm(false);
							return createCatHandler(values);
						}
					}}
				>
					{(props) => (
						<Form className={slugIsExists ? 'w-100 is-invalid' : 'w-100'}>
							<span className="btl-form-group">
								<Field
									id="term_name"
									name="term_name"
									placeholder={__('* Name', 'betterlinks')}
									className="btl-form-control"
									onChange={(e) => {
										const slug = generateSlug(e.target.value);
										props.setFieldValue('term_name', e.target.value);
										props.setFieldValue('term_slug', slug);
										catSlugUniqueCheck(slug);
									}}
									required
								/>
							</span>
							{slugIsExists == true && <span className="errorlog">Already Exists</span>}
							<button className="btl-create-category-submit" type="submit">
								{__('Submit', 'betterlinks')}
							</button>
						</Form>
					)}
				</Formik>
			)}
		</div>
	);
};
export default CreateCategory;
