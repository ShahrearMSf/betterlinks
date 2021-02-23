import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_cat, delete_cat } from './../../redux/actions/links.actions';
import { modalCustomSmallStyles } from './../../utils/helper';
import CatForm from '../Terms/CatForm';
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
			cat_id: catId,
		});
	};

	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setCatAction(false);
		setModalIsOpen(false);
	}
	return (
		<React.Fragment>
			<div className="category-head">
				<h4 className="title">{catName}</h4>
				{cat_slug != 'uncategorized' && (
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
				<CatForm catId={parseInt(catId)} catName={catName} catSlug={cat_slug} submitHandler={update_cat} hideHandler={setModalIsOpen} />
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
