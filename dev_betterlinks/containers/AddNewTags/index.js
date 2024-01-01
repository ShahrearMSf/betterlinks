import Modal from 'react-modal';
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { modalCustomStyles } from 'utils/helper';
import { Field, Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add_new_tag } from 'redux/actions/terms.actions';

const AddNewTags = (props) => {
	const [open, setOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	// const [tag, setTag] = useState('');

	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	const __handleChange = (e, setFieldValue) => {
		const value = e.target.value;
		const isExist = (props?.tags || []).some((item) => item.term_slug === value);
		if (!!isExist) {
			return setErrorMsg(__('Tags already exist'));
		}
		setFieldValue('tag', value);
		setErrorMsg('');
	};

	const __handleSubmit = (values, actions) => {
		const data = {
			term_id: null,
			term_name: values.tag,
			term_slug: values.tag,
			term_type: 'tags',
		};
		props.add_new_tag(data);

		closeModal();
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
				<Formik
					initialValues={{
						tag: '',
					}}
					onSubmit={(values, actions) => __handleSubmit(values, actions)}
				>
					{(props) => {
						return (
							<Form className="w-100" onSubmit={props.handleSubmit}>
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

const mapDispatchToProps = (dispatch) => ({
	add_new_tag: bindActionCreators(add_new_tag, dispatch),
});
export default connect(null, mapDispatchToProps)(AddNewTags);
