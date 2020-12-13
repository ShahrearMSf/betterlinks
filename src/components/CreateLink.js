import React, { useState } from 'react'
import Modal from 'react-modal'
import Select2 from 'react-select'
import { Formik, Field, Form } from 'formik'
import { modalCustomStyles, generateRandomSlug } from './../utils/helper'
import { redirectType } from './../utils/data'
import Terms from './Terms'

const CreateLink = ({ term_id, term_name, createLinkHandler }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false)
    }
    return (
        <>
            <button onClick={openModal} className='btl-create-link-button'>
                <i className='btl btl-add'></i>
            </button>
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
                        link_title: '',
                        link_slug: '',
                        redirect_type: '',
                        target_url: '',
                        short_url: generateRandomSlug(),
                        link_note: '',
                        nofollow: '',
                        sponsored: '',
                        param_forwarding: '',
                        track_me: '',
                    }}
                    onSubmit={async (values) => {
                        console.log(values)
                        setModalIsOpen(false)
                        return createLinkHandler(values)
                    }}
                >
                    {(props) => (
                        <Form className='w-100'>
                            <div className='btl-entry-content'>
                                <div className='btl-entry-content-left'>
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
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label btl-required'
                                            htmlFor='redirect_type'
                                        >
                                            Redirect Type
                                        </label>
                                        <Select2
                                            className='btl-modal-form-control btl-modal-select'
                                            id='redirect_type'
                                            name='redirect_type'
                                            defaultValue={redirectType[0]}
                                            options={redirectType}
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label btl-required'
                                            htmlFor='target_url'
                                        >
                                            Target URL
                                        </label>
                                        <Field
                                            className='btl-modal-form-control'
                                            id='target_url'
                                            name='target_url'
                                            placeholder='http://wpdeveloper.com'
                                            required
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label'
                                            htmlFor='short_url'
                                        >
                                            Better Links
                                        </label>
                                        <Field
                                            className='btl-modal-form-control'
                                            id='short_url'
                                            name='short_url'
                                            required
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label'
                                            htmlFor='link_note'
                                        >
                                            Notes
                                        </label>
                                        <Field
                                            className='btl-modal-form-control'
                                            id='link_note'
                                            name='link_note'
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label'
                                            htmlFor='cat_id'
                                        >
                                            Category
                                        </label>
                                        <Terms
                                            name='cat_id'
                                            setFieldValue={props.setFieldValue}
                                            type='category'
                                            isMulti={false}
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label'
                                            htmlFor='tags_id'
                                        >
                                            Tags
                                        </label>
                                        <Terms
                                            name='tags_id'
                                            setFieldValue={props.setFieldValue}
                                            type='tags'
                                            isMulti={true}
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label className='btl-modal-form-label'></label>
                                        <button type='submit'>Publish</button>
                                    </div>
                                </div>
                                <div className='btl-entry-content-right'>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='nofollow'
                                            type='checkbox'
                                        />
                                        <span className='text'>No Follow</span>
                                    </label>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='sponsored'
                                            type='checkbox'
                                        />
                                        <span className='text'>Sponsored</span>
                                    </label>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='param_forwarding'
                                            type='checkbox'
                                        />
                                        <span className='text'>
                                            Parameter Forwarding
                                        </span>
                                    </label>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='track_me'
                                            type='checkbox'
                                        />
                                        <span className='text'>Tracking</span>
                                    </label>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
export default CreateLink
