import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import CatForm from 'components/Terms/CatForm';

const CreateCategory = ({ createCatHandler }) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	return (
		<div className="dnd-create-category">
			<button className="dnd-create-category-button" onClick={() => setIsOpenForm(!isOpenForm)}>
				<i className="btl btl-add"></i>
			</button>
			<p className="dnd-create-category-text">{__('Add New Category', 'betterlinks')}</p>
			{isOpenForm && <CatForm hideHandler={setIsOpenForm} submitHandler={createCatHandler} />}
		</div>
	);
};
export default CreateCategory;
