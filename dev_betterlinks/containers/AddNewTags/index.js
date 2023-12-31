import Modal from 'react-modal';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { modalCustomStyles } from 'utils/helper';
import { Field, Form, Formik } from 'formik';
import Tags from 'components/Terms/Tags';

const AddNewTags = (props) => {
	const [open, setOpen] = useState(false);

	const openModal = () => {
		console.log('hello');
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	const tags = (props?.tags || []).map((item) => ({
		value: item.term_slug,
		label: item.term_name,
	}));

	return (
		<>
			{/* <ActionButton type="edit" label={__('Edit Keyword', 'betterlinks')} onClickHandler={openModal} /> */}
			<div className="btl-create-autolinks btl-create-tags">
				<button className="btl-create-autolink-button btl-create-tags-button" onClick={openModal}>
					{__('Add New Tags', 'betterlinks')}
				</button>
			</div>
			<Modal isOpen={open} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<span className="btl btl-cancel" />
				</span>
				<Formik initialValues={{}}>
					{(props) => {
						return (
							<Form className="w-100" onSubmit={() => {}}>
								<div className="btl-entry-content">
									<div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label" htmlFor="tags">
												{__('Tags', 'betterlinks')}
											</label>
											<Tags linkId={0} fieldName="tags_id" data={tags} setFieldValue={props.setFieldValue} disabled={false} />
										</div>
										<div className="btl-modal-form-group">
											<label className="btl-modal-form-label"></label>
											<button type="submit" className="btl-modal-submit-button">
												{__('Publish', 'betterlinks')}
											</button>
										</div>
									</div>
								</div>
							</Form>
						);
					}}
				</Formik>
			</Modal>
		</>
	);
};

export default AddNewTags;
