import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from './Select'
import { Formik, Field, Form } from 'formik'
import { modalCustomStyles, generateRandomSlug } from './../utils/helper'
import { redirectType } from './../utils/data'
import Category from './Terms/Category'
import Tags from './Terms/Tags'

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
                        cat_id: term_id,
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
                                        <Select
                                            id='redirect_type'
                                            name='redirect_type'
                                            value={redirectType}
                                            setFieldValue={props.setFieldValue}
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
                                        <div className='btl-link-field-copyable'>
                                            <span className='btl-static-link'>
                                                http://eaeltest.local/
                                            </span>
                                            <Field
                                                className='btl-dynamic-link'
                                                id='short_url'
                                                name='short_url'
                                                required
                                            />
                                            <button className='btl-link-copy-button'>
                                                <i className='btl btl-copy'></i>
                                            </button>
                                        </div>
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
                                        <Category
                                            name='cat_id'
                                            cat_id={term_id}
                                            cat_name={term_name}
                                            setFieldValue={props.setFieldValue}
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label
                                            className='btl-modal-form-label'
                                            htmlFor='tags_id'
                                        >
                                            Tags
                                        </label>
                                        <Tags
                                            name='tags_id'
                                            setFieldValue={props.setFieldValue}
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <label className='btl-modal-form-label'></label>
                                        <button
                                            type='submit'
                                            className='btl-modal-submit-button'
                                            style={{ marginTop: '20px' }}
                                        >
                                            Publish
                                        </button>
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
