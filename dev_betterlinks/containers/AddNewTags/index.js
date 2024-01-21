import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add_new_tag } from 'redux/actions/terms.actions';
import TagModal from './TagModal';
import ActionButton from 'components/ActionButton';

const AddNewTags = (props) => {
	const [open, setOpen] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const { tags, icon = false, row = {} } = props;

	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};

	const __handleChange = (e, props, row) => {
		const value = e.target.value;
		const isExist = (tags || []).some((item) => item.term_slug === value);
		props.setFieldValue('term_slug', value);
		if (!!isExist) {
			return setErrorMsg(__('Tags already exist', 'betterlinks'));
		}
		setErrorMsg('');
	};

	const __handleSubmit = (values, actions) => {
		if ('' === values.term_slug) {
			return setErrorMsg(__("Tag field can't be empty", 'betterlinks'));
		}
		const data = {
			ID: row?.ID || values.term_id,
			term_name: values.term_slug,
			term_slug: values.term_slug,
			term_type: 'tags',
		};
		props.add_new_tag(data);

		closeModal();
	};
	
	return (
		<>
			{(tags || []).length > 0 && icon ? (
				<ActionButton type="edit" label={__('Edit Tag', 'betterlinks')} onClickHandler={openModal} />
			) : (
				<div className="btl-create-autolinks btl-create-tags">
					<button className="btl-create-autolink-button btl-create-tags-button" onClick={openModal}>
						{__('Add New Tag', 'betterlinks')}
					</button>
				</div>
			)}
			<TagModal open={open} errorMsg={errorMsg} closeModal={closeModal} __handleChange={__handleChange} __handleSubmit={__handleSubmit} row={row} />
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	add_new_tag: bindActionCreators(add_new_tag, dispatch),
});
export default connect(null, mapDispatchToProps)(AddNewTags);
