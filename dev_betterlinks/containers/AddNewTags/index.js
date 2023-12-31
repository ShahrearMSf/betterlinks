import Modal from 'react-modal';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { modalCustomStyles } from 'utils/helper';
import { Field, Form, Formik } from 'formik';

const AddNewTags = (props) => {
	const [open, setOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [tag, setTag] = useState('');

	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	const __handleChange = (e, setField) => {
		const value = e.target.value;
		const isExist = (props?.tags || []).filter((item) => item.term_slug === value).length;
		if (!!isExist) {
			return setErrorMsg(__('Tags already exist'));
		}
		setErrorMsg('');
	};

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
											<div style={{ width: '100%' }}>
												<Field id="tags" className="btl-modal-form-control" type="text" name="tags" required onChange={(e) => __handleChange(e, props.setFieldValue)} />
												<span className="btl_duplicate_tags" style={{ color: 'red', height: '5px', display: 'block' }}>
													{errorMsg}
												</span>
											</div>
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
