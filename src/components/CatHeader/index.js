import React, { useState } from 'react'
import Modal from 'react-modal'
import { Formik, Field, Form } from 'formik'
import { modalCustomStyles } from './../../utils/helper'
const CatHeader = (props) => {
    const { cat_id, cat_name } = props
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isCatAction, setCatAction] = useState(false)
    const [isDeleteConfirm, setDeleteConfrim] = useState(false)
    const catActionHandler = () => {
        setDeleteConfrim(false)
        setCatAction(!isCatAction)
    }
    const deleteHandler = () => {
        setCatAction(!isCatAction)
        setDeleteConfrim(!isDeleteConfirm)
    }
    const noDelete = () => {
        setCatAction(false)
        setDeleteConfrim(false)
    }
    const confirmDelete = () => {
        setDeleteConfrim(false)
        setDeleteConfrim(false)
        console.log('Category Delete')
    }

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setCatAction(false)
        setModalIsOpen(false)
    }
    return (
        <React.Fragment>
            <div className='category-head'>
                <h4 className='title'>{cat_name}</h4>
                <div className='dropdown'>
                    <button className='icon' onClick={() => catActionHandler()}>
                        <i className='btl btl-more'></i>
                    </button>

                    <div className='dropdown-menu'>
                        {isCatAction && (
                            <ul>
                                <li>
                                    <button
                                        onClick={openModal}
                                        className='link'
                                    >
                                        Edit
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className='link delete'
                                        onClick={() => deleteHandler()}
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        )}
                        {isDeleteConfirm && (
                            <div className='btl-confirm-message'>
                                <p className='action-text'>Are Your Sure?</p>
                                <div className='action-set'>
                                    <button
                                        className='action yes'
                                        onClick={confirmDelete}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className='action no'
                                        onClick={noDelete}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalCustomStyles}
                ariaHideApp={false}
            >
                <span className='btl-close-modal' onClick={closeModal}>
                    <i className='btl btl-cancel'></i>
                </span>
                <Formik
                    initialValues={{
                        cat_id: '',
                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                        setModalIsOpen(false)
                        return
                    }}
                >
                    {(props) => (
                        <Form className='w-100'>
                            <div className='btl-entry-content'>
                                <div
                                    className='btl-entry-content-left'
                                    style={{ marginBottom: '20px' }}
                                >
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label btl-required'
                                            htmlFor='link_title'
                                        >
                                            Title
                                        </label>
                                        <Field
                                            className='btl-modal-form-control'
                                            id='link_title'
                                            name='link_title'
                                            required
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label btl-required'
                                            htmlFor='link_slug'
                                        >
                                            Slug
                                        </label>
                                        <Field
                                            className='btl-modal-form-control'
                                            id='link_slug'
                                            name='link_slug'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='btl-modal-form-group'>
                                <label className='btl-modal-form-label'></label>
                                <button
                                    type='submit'
                                    className='btl-modal-submit-button'
                                >
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </React.Fragment>
    )
}
export default CatHeader
