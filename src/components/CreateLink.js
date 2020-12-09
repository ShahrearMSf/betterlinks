import React, { useState } from 'react'
import Modal from 'react-modal'
import Select2 from 'react-select'
import { Formik, Field, Form } from 'formik'

const CreateLink = ({ catId, createLinkHandler }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }
    function openModal() {
        setModalIsOpen(true)
    }

    function closeModal() {
        setModalIsOpen(false)
    }

    return (
        <div>
            <button onClick={openModal}>Create Link</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <button onClick={closeModal}>close</button>
                <Formik
                    initialValues={{
                        redirect_type: '',
                        target_url: '',
                        link_note: '',
                        link_note: '',
                        term_id: catId,
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
                                            value: catId,
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
        </div>
    )
}
export default CreateLink
