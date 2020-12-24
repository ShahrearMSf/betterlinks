import React, { useState } from 'react'
import Modal from 'react-modal'
import Select from './../Select'
import { useFormikContext, Formik, Field, Form } from 'formik'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetch_terms_data } from './../../redux/actions/terms.actions'
import {
    modalCustomStyles,
    site_url,
    generateSlug,
    generateRandomSlug,
    copyToClipboard,
} from './../../utils/helper'
import { redirectType } from './../../utils/data'
import Category from './../Terms/Category'
import Tags from './../Terms/Tags'

const Link = ({
    cat_id,
    cat_name,
    item,
    submitHandler,
    terms,
    fetch_terms_data,
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [isEditMode, setEditMode] = useState(false)
    const [isCopyUrl, setCopyUrl] = useState(false)
    const randomSlug = generateRandomSlug()

    function openModal() {
        if (item) {
            setEditMode(true)
            fetch_terms_data({
                term_type: 'tags',
                ID: item.ID,
            }).then(() => {
                setModalIsOpen(true)
            })
        } else {
            setEditMode(false)
            setModalIsOpen(true)
        }
    }
    const copyShortUrl = (url) => {
        copyToClipboard(url)
        setCopyUrl(true)
    }
    function closeModal() {
        setEditMode(false)
        setModalIsOpen(false)
    }
    const [nameToSlug, setNameToSlug] = useState(false)
    const [slugToSlug, setSlugToSlug] = useState(false)
    const AutoSlugGenerate = () => {
        const { values } = useFormikContext()
        React.useEffect(() => {
            if (nameToSlug) {
                values.link_slug = generateSlug(values.link_title)
                setNameToSlug(false)
            }
            if (slugToSlug) {
                values.link_slug = generateSlug(values.link_slug)
                setSlugToSlug(false)
            }
        }, [values])
        return null
    }
    return (
        <>
            {item ? (
                <button
                    onClick={openModal}
                    className={`dnd-link-button ${
                        isEditMode ? 'btl-rotating' : ''
                    }`}
                >
                    <span className='icon'>
                        {!isEditMode ? (
                            <i className='btl btl-edit'></i>
                        ) : (
                            <i className='btl btl-reload'></i>
                        )}
                    </span>
                </button>
            ) : (
                <button onClick={openModal} className='btl-create-link-button'>
                    <i className='btl btl-add'></i>
                </button>
            )}

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
                        short_url: randomSlug,
                        link_note: '',
                        nofollow: false,
                        sponsored: false,
                        param_forwarding: false,
                        track_me: false,
                        cat_id,
                        cat_name,
                        ...item,
                    }}
                    onSubmit={async (values) => {
                        setEditMode(false)
                        setModalIsOpen(false)
                        return submitHandler(values)
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
                                            onBlur={() => setNameToSlug(true)}
                                            required
                                        />
                                    </div>
                                    <div className='btl-modal-form-group'>
                                        <Field
                                            type='hidden'
                                            className='btl-modal-form-control'
                                            id='link_slug'
                                            name='link_slug'
                                            onBlur={() => setSlugToSlug(true)}
                                            required
                                        />
                                        <AutoSlugGenerate />
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
                                            placeholder=''
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
                                                {site_url}
                                            </span>
                                            <Field
                                                className='btl-dynamic-link'
                                                id='short_url'
                                                name='short_url'
                                                required
                                            />
                                            <button
                                                type='button'
                                                onClick={() =>
                                                    copyShortUrl(
                                                        site_url +
                                                            '/' +
                                                            props.values
                                                                .short_url
                                                    )
                                                }
                                                className='btl-link-copy-button'
                                            >
                                                {isCopyUrl ? (
                                                    <span className='dashicons dashicons-yes'></span>
                                                ) : (
                                                    <i className='btl btl-copy'></i>
                                                )}
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
                                            cat_id={cat_name}
                                            cat_name={cat_name}
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
                                            terms={terms}
                                            isEditMode={isEditMode}
                                            setFieldValue={props.setFieldValue}
                                        />
                                    </div>
                                </div>
                                <div className='btl-entry-content-right'>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='nofollow'
                                            type='checkbox'
                                            onChange={() =>
                                                props.setFieldValue(
                                                    'nofollow',
                                                    !props.values.nofollow
                                                )
                                            }
                                        />
                                        <span className='text'>No Follow</span>
                                    </label>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='sponsored'
                                            type='checkbox'
                                            onChange={() =>
                                                props.setFieldValue(
                                                    'sponsored',
                                                    !props.values.sponsored
                                                )
                                            }
                                        />
                                        <span className='text'>Sponsored</span>
                                    </label>
                                    <label className='btl-checkbox-field'>
                                        <Field
                                            className='btl-check'
                                            name='param_forwarding'
                                            type='checkbox'
                                            onChange={() =>
                                                props.setFieldValue(
                                                    'param_forwarding',
                                                    !props.values
                                                        .param_forwarding
                                                )
                                            }
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
                                            onChange={() =>
                                                props.setFieldValue(
                                                    'track_me',
                                                    !props.values.track_me
                                                )
                                            }
                                        />
                                        <span className='text'>Tracking</span>
                                    </label>
                                </div>
                            </div>
                            <div className='btl-modal-form-group'>
                                <label className='btl-modal-form-label'></label>
                                <button
                                    type='submit'
                                    className='btl-modal-submit-button'
                                >
                                    {item ? 'Update' : 'Publish'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}
const mapStateToProps = (state) => ({
    terms: state.terms,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Link)
