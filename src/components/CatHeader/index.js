import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_cat, delete_cat } from './../../redux/actions/links.actions';
import { useFormikContext, Formik, Field, Form } from 'formik';
import { generateSlug, modalCustomSmallStyles } from './../../utils/helper';
const CatHeader = (props) => {
	const { catId, catName, cat_slug, update_cat, delete_cat } = props;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isCatAction, setCatAction] = useState(false);
	const [isDeleteConfirm, setDeleteConfrim] = useState(false);
	const catActionHandler = () => {
		setDeleteConfrim(false);
		setCatAction(!isCatAction);
	};
	const deleteHandler = () => {
		setCatAction(!isCatAction);
		setDeleteConfrim(!isDeleteConfirm);
	};
	const noDelete = () => {
		setCatAction(false);
		setDeleteConfrim(false);
	};
	const confirmDelete = () => {
		setDeleteConfrim(false);
		setDeleteConfrim(false);
		delete_cat({
			catId: catId,
		});
	};

	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setCatAction(false);
		setModalIsOpen(false);
	}
	const [nameToSlug, setNameToSlug] = useState(false);
	const [slugToSlug, setSlugToSlug] = useState(false);
	const AutoSlugGenerate = () => {
		const { values } = useFormikContext();
		React.useEffect(() => {
			if (nameToSlug) {
				values.cat_slug = generateSlug(values.cat_name);
				setNameToSlug(false);
			}
			if (slugToSlug) {
				values.cat_slug = generateSlug(values.cat_slug);
				setSlugToSlug(false);
			}
		}, [values]);
		return null;
	};
	return (
		<React.Fragment>
			<div className="category-head">
				<h4 className="title">{catName}</h4>
				{catId != 1 && (
					<div className="dropdown">
						<button className="icon" onClick={() => catActionHandler()}>
							<i className="btl btl-more"></i>
						</button>
						<div className="dropdown-menu">
							{isCatAction && (
								<ul>
									<li>
										<button onClick={openModal} className="link">
											{__('Edit', 'betterlinks')}
										</button>
									</li>
									<li>
										<button className="link delete" onClick={() => deleteHandler()}>
											{__('Delete', 'betterlinks')}
										</button>
									</li>
								</ul>
							)}
							{isDeleteConfirm && (
								<div className="btl-confirm-message">
									<p className="action-text">{__('Are Your Sure?', 'betterlinks')}</p>
									<div className="action-set">
										<button className="action yes" onClick={confirmDelete}>
											{__('Yes', 'betterlinks')}
										</button>
										<button className="action no" onClick={noDelete}>
											{__('No', 'betterlinks')}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomSmallStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				<Formik
					initialValues={{
						cat_id: catId,
						cat_name: catName,
						cat_slug: cat_slug,
					}}
					onSubmit={async (values) => {
						setModalIsOpen(false);
						setCatAction(false);
						return update_cat(values);
					}}
				>
					{(props) => (
						<Form className="w-100">
							<div className="btl-modal-form-group">
								<label className="btl-modal-form-label btl-required" htmlFor="cat_name">
									{__('Category Name', 'betterlinks')}
								</label>
								<Field className="btl-modal-form-control" id="cat_name" name="cat_name" onBlur={() => setNameToSlug(true)} required />
							</div>
							<div className="btl-modal-form-group">
								<Field type="hidden" className="btl-modal-form-control" id="cat_slug" name="cat_slug" onBlur={() => setSlugToSlug(true)} required />
								<AutoSlugGenerate />
							</div>
							<div className="btl-modal-form-group">
								<label className="btl-modal-form-label"></label>
								<button type="submit" className="btl-modal-submit-button">
									{__('Update', 'betterlinks')}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	links: state.links,
});

const mapDispatchToProps = (dispatch) => {
	return {
		update_cat: bindActionCreators(update_cat, dispatch),
		delete_cat: bindActionCreators(delete_cat, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CatHeader);
