import React, { useState } from 'react'
import { useFormikContext, Formik, Field, Form } from 'formik'
import { generateSlug } from './../utils/helper'

const CreateCategory = ({ createCatHandler }) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [nameToSlug, setNameToSlug] = useState(false)
    const [slugToSlug, setSlugToSlug] = useState(false)
    const AutoSlugGenerate = () => {
        const { values } = useFormikContext()
        React.useEffect(() => {
            if (nameToSlug) {
                values.term_slug = generateSlug(values.term_name)
                setNameToSlug(false)
            }
            if (slugToSlug) {
                values.term_slug = generateSlug(values.term_slug)
                setSlugToSlug(false)
            }
        }, [values])
        return null
    }
    return (
        <div className="dnd-create-category">
            <button onClick={() => setIsOpenForm(!isOpenForm)}>+</button>
            <p>Add New Category</p>
            {isOpenForm && (
                <Formik
                    initialValues={{
                        term_name: '',
                        term_slug: '',
                        term_type: 'category',
                    }}
                    onSubmit={async (values) => {
                        setIsOpenForm(false)
                        return createCatHandler(values)
                    }}
                >
                    <Form>
                        <p>
                            <label htmlFor='term_name'>Category Name</label>
                            <br />
                            <Field
                                id='term_name'
                                name='term_name'
                                placeholder='all doc'
                                onBlur={() => setNameToSlug(true)}
                                required
                            />
                        </p>
                        <p>
                            <label htmlFor='term_slug'>Category Slug</label>
                            <br />
                            <Field
                                id='term_slug'
                                name='term_slug'
                                placeholder='all-doc'
                                onBlur={() => setSlugToSlug(true)}
                                required
                            />
                        </p>
                        <AutoSlugGenerate />
                        <button type='submit'>Publish</button>
                    </Form>
                </Formik>
            )}
        </div>
    )
}
export default CreateCategory
