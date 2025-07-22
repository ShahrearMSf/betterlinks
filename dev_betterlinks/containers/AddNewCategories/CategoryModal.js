import Modal from 'react-modal';
import { modalCustomStyles } from 'utils/helper';
import { Field, Form, Formik } from 'formik';
import { __ } from '@wordpress/i18n';

const categoryModalStyles = {
    ...modalCustomStyles,
    content: {
        ...modalCustomStyles.content,
        maxWidth: '500px',
        padding: '60px 60px 30px 60px',
    },
};

const CategoryModal = ({ open, errorMsg, closeModal, __handleChange, __handleSubmit, row }) => {
    return (
        <Modal isOpen={open} onRequestClose={closeModal} style={categoryModalStyles} ariaHideApp={false}>
            <span className="btl-close-modal" onClick={closeModal}>
                <span className="btl btl-cancel" />
            </span>
            <Formik
                initialValues={{
                    term_slug: row.term_slug || '',
                    term_name: row.term_name || '',
                    term_id: row.ID || row.id || null,
                }}
                onSubmit={(values, actions) => __handleSubmit(values, actions)}
            >
                {(props) => {
                    return (
                        <Form className="w-100 btl-manage-categories-form" onSubmit={props.handleSubmit}>
                            <div className="btl-entry-content">
                                <div className="btl-entry-content-left" style={{ marginBottom: '20px' }}>
                                    <div className="btl-modal-form-group">
                                        <label className="btl-modal-form-label" htmlFor="categories">
                                            {__('Category', 'betterlinks')}
                                            <span style={{ color: '#f97272', marginLeft: '2px' }}>*</span>
                                        </label>
                                        <div style={{ width: '100%' }}>
                                            <Field id="term_slug" className="btl-modal-form-control" type="text" name="term_slug" required onChange={(e) => __handleChange(e, props)} autoFocus />
                                            <span className="btl_duplicate_categories" style={{ color: 'red', height: '5px', display: 'block' }}>
                                                {errorMsg}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="btl-modal-form-group">
                                        <label className="btl-modal-form-label" />
                                        <button type="submit" className="btl-modal-submit-button" disabled={'' !== errorMsg && '' !== props.values.term_slug}>
                                            {row?.term_slug ? __('Update', 'betterlinks') : __('Publish', 'betterlinks')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default CategoryModal;
