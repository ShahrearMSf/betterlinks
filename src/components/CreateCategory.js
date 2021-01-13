import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useFormikContext, Formik, Field, Form } from 'formik';
import { generateSlug } from './../utils/helper';

const CreateCategory = ({ createCatHandler }) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [nameToSlug, setNameToSlug] = useState(false);
	const [slugToSlug, setSlugToSlug] = useState(false);
	const AutoSlugGenerate = () => {
		const { values } = useFormikContext();
		React.useEffect(() => {
			if (nameToSlug) {
				values.term_slug = generateSlug(values.term_name);
				setNameToSlug(false);
			}
			if (slugToSlug) {
				values.term_slug = generateSlug(values.term_slug);
				setSlugToSlug(false);
			}
		}, [values]);
		return null;
	};
	return (
		<div className="dnd-create-category">
			<button
				className="dnd-create-category-button"
				onClick={() => setIsOpenForm(!isOpenForm)}
			>
				<i className="btl btl-add"></i>
			</button>
			<p className="dnd-create-category-text">
				{__('Add New Category', 'betterlinks')}
			</p>
			{isOpenForm && (
				<Formik
					initialValues={{
						term_name: '',
						term_slug: '',
						term_type: 'category',
					}}
					onSubmit={async (values) => {
						setIsOpenForm(false);
						return createCatHandler(values);
					}}
				>
					<Form className="w-100">
						<span className="btl-form-group">
							<Field
								id="term_name"
								name="term_name"
								placeholder={__('* Name', 'betterlinks')}
								className="btl-form-control"
								onBlur={() => setNameToSlug(true)}
								required
							/>
						</span>
						<span className="btl-form-group">
							<Field
								type="hidden"
								id="term_slug"
								name="term_slug"
								placeholder={__('* Slug', 'betterlinks')}
								className="btl-form-control"
								onBlur={() => setSlugToSlug(true)}
								required
							/>
						</span>
						<AutoSlugGenerate />
						<button className="btl-create-category-submit" type="submit">
							{__('Submit', 'betterlinks')}
						</button>
					</Form>
				</Formik>
			)}
		</div>
	);
};
export default CreateCategory;
