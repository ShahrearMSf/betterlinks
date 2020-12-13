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
        <div>
            <button onClick={openModal}>
                <i className='btl btl-add'></i>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalCustomStyles}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>close</button>
                <Formik
                    initialValues={{
                        link_title: '',
                        link_slug: '',
                        redirect_type: '',
                        target_url: '',
                        short_url: generateRandomSlug(),
                        link_note: '',
                        term_id: '',
                        nofollow: '',
                        sponsored: '',
                        param_forwarding: '',
                        track_me: '',
                    }}
                    onSubmit={async (values) => {
                        setModalIsOpen(false)
                        return createLinkHandler(values)
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
                                <label htmlFor='redirect_type'>
                                    Redirect Type
                                </label>
                                <Select2
                                    id='redirect_type'
                                    name='redirect_type'
                                    defaultValue={redirectType[0]}
                                    options={redirectType}
                                    isMulti={false}
                                />
                            </div>
                            <div>
                                <label htmlFor='target_url'>Target URL</label>
                                <Field
                                    id='target_url'
                                    name='target_url'
                                    placeholder='http://wpdeveloper.com'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='short_url'>Better Links</label>
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
                                <Terms
                                    name='cat_ids'
                                    type='category'
                                    isMulti={false}
                                />
                            </div>
                            <div>
                                <label htmlFor='term_id'>Tags</label>
                                <Terms
                                    name='tag_ids'
                                    type='tags'
                                    isMulti={true}
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
        </div>
    )
}
export default CreateLink
