import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add_new_tag } from 'redux/actions/terms.actions';
import CategoryModal from './CategoryModal';
import ActionButton from 'components/ActionButton';
import PermissionModal from 'components/PermissionModal';

const AddNewCategories = (props) => {
    const [open, setOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const { categories, icon = false, row = {}, children } = props;

    // Check if user has permission to manage tags and categories
    const hasPermission = () => {
        // Check if betterLinksProGlobal exists (pro version with role management)
        if (window.betterLinksProGlobal && typeof window.betterLinksProGlobal.user_can_manage_tags_categories !== 'undefined') {
            return window.betterLinksProGlobal.user_can_manage_tags_categories || window.betterLinksProGlobal.user_can_manage_options;
        }
        // Fallback for free version - only admins can manage
        return window.betterLinksGlobal && window.betterLinksGlobal.user_can_manage_options;
    };

    const openModal = () => {
        if (!hasPermission()) {
            setShowPermissionModal(true);
            return;
        }
        setOpen(true);
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
        if (!hasPermission()) {
            setShowPermissionModal(true);
            return;
        }
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
                <ActionButton type="edit" label={__('Edit Category', 'betterlinks')} onClickHandler={openModal}>
                    {children}
                </ActionButton>
            ) : (
                <div className="btl-create-autolinks btl-create-categories">
                    <button className="btl-create-autolink-button btl-create-categories-button" onClick={openModal}>
                        {__('Add New Category', 'betterlinks')}
                    </button>
                </div>
            )}
            <CategoryModal open={open} errorMsg={errorMsg} closeModal={closeModal} __handleChange={__handleChange} __handleSubmit={__handleSubmit} row={row} />
            <PermissionModal
                isOpen={showPermissionModal}
                onClose={() => setShowPermissionModal(false)}
                title={__('Manage Categories Permission Required', 'betterlinks')}
            />
        </>
    );
};

const mapDispatchToProps = (dispatch) => ({
    add_new_tag: bindActionCreators(add_new_tag, dispatch),
});
export default connect(null, mapDispatchToProps)(AddNewCategories);
