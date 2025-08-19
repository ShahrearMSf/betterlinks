import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add_new_tag } from 'redux/actions/terms.actions';
import CategoryModal from './CategoryModal';
import ActionButton from 'components/ActionButton';

const AddNewCategories = (props) => {
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const { categories, icon = false, row = {}, children } = props;

    // Check if this is the default 'Uncategorized' category (ID: 1)
    const isDefaultCategory = row && (row.id == 1 || row.ID == 1);

    const openModal = () => {
        // Prevent opening modal for default category
        if (!isDefaultCategory) {
            setOpen(true);
        }
    };
    const closeModal = () => {
        setOpen(false);
    };

    const __handleChange = (e, props) => {
        const value = e.target.value;
        const isExist = (categories || []).some((item) => item.term_slug === value);
        props.setFieldValue('term_slug', value);
        if (!!isExist) {
            return setErrorMsg(__('Category already exist', 'betterlinks'));
        }
        setErrorMsg('');
    };

    const __handleSubmit = (values, actions) => {
        if ('' === values.term_slug) {
            return setErrorMsg(__("Category field can't be empty", 'betterlinks'));
        }
        const data = {
            ID: row?.ID || row?.id || values.term_id,
            term_name: values.term_slug,
            term_slug: values.term_slug,
            term_type: 'category',
        };
        props.add_new_tag(data);

        closeModal();
    };

    return (
        <>
            {(categories || []).length > 0 && icon ? (
                isDefaultCategory ? (
                    // For default category, just show the children (category name) without edit button
                    <ActionButton type="not" label={__("Default Category can't be edited", 'betterlinks')}>
                        {children}
                    </ActionButton>
                ) : (
                    <ActionButton type="edit" label={__('Edit Category', 'betterlinks')} onClickHandler={openModal}>
                        {children}
                    </ActionButton>
                )
            ) : (
                <div className="btl-create-autolinks btl-create-categories">
                    <button className="btl-create-autolink-button btl-create-categories-button" onClick={openModal}>
                        {__('Add New Category', 'betterlinks')}
                    </button>
                </div>
            )}
            <CategoryModal open={open} errorMsg={errorMsg} closeModal={closeModal} __handleChange={__handleChange} __handleSubmit={__handleSubmit} row={row} />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    add_new_tag: bindActionCreators(add_new_tag, dispatch),
});
export default connect(null, mapDispatchToProps)(AddNewCategories);
