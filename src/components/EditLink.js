import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import Select2 from 'react-select'
import { Formik, Field, Form } from 'formik'
import { modalCustomStyles } from './../utils/helper'

const EditLink = ({ item, editLinkHandler }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false)
    }

    return (
        <>
            <button onClick={openModal}>
                <span className="icon"><i className="btl btl-edit"></i></span>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalCustomStyles}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>close</button>
                <Formik
                    initialValues={{ ...item }}
                    onSubmit={async (values) => {
                        setModalIsOpen(false)
                        console.log('submit', values)
                        return editLinkHandler(values)
                    }}
                >
                    <Form>
                        <div className='entry-content-left'>
                            <div>
                                <label htmlFor='link_title'>Title</label>
                                <Field
                                    id='link_title'
                                    name='link_title'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='link_slug'>Slug</label>
                                <Field
                                    id='link_slug'
                                    name='link_slug'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='term_name'>Redirect Type</label>
                                <Select2
                                    id='redirect_type'
                                    name='redirect_type'
                                    options={[
                                        {
                                            value: 'chocolate',
                                            label: 'Chocolate',
                                        },
                                        {
                                            value: 'strawberry',
                                            label: 'Strawberry',
                                        },
                                        { value: 'vanilla', label: 'Vanilla' },
                                    ]}
                                    isMulti={false}
                                />
                            </div>
                            <div>
                                <label htmlFor='term_slug'>Target URL</label>
                                <Field
                                    id='target_url'
                                    name='target_url'
                                    placeholder='http://wpdeveloper.com'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='term_slug'>Better Links</label>
                                <Field
                                    id='short_url'
                                    name='short_url'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='link_note'>Notes</label>
                                <Field id='link_note' name='link_note' />
                            </div>
                            <div>
                                <label htmlFor='term_id'>Category</label>
                                <Select2
                                    id='term_id'
                                    name='term_id'
                                    options={[
                                        {
                                            value: 1,
                                            label: 'Chocolate',
                                        },
                                    ]}
                                    isMulti={false}
                                />
                            </div>
                        </div>
                        <div className='entry-content-right'>
                            <div>
                                <label>No Follow</label>
                                <Field name='nofollow' type='checkbox' />
                            </div>
                            <div>
                                <label>Sponsored</label>
                                <Field name='sponsored' type='checkbox' />
                            </div>
                            <div>
                                <label>Parameter Forwarding</label>
                                <Field
                                    name='param_forwarding'
                                    type='checkbox'
                                />
                            </div>
                            <div>
                                <label>Tracking</label>
                                <Field name='track_me' type='checkbox' />
                            </div>
                        </div>
                        <button type='submit'>Publish</button>
                    </Form>
                </Formik>
            </Modal>
        </>
    )
}
export default EditLink
