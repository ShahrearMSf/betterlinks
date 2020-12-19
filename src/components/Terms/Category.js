import React, { useState } from 'react'
import { useField } from 'formik'
import Select2 from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetch_terms_data } from './../../redux/actions/terms.actions'

const Category = (props) => {
    const [field] = useField(props.name)
    const [isFetchData, setIsFetchData] = useState(false)
    const fetchData = () => {
        if (!isFetchData) {
            props.fetch_terms_data({ term_type: 'category' })
            setIsFetchData(true)
        }
    }

    const onChange = (option) => {
        if (option == null) {
            return props.setFieldValue(field.name, '')
        }
        return props.setFieldValue(field.name, option.value)
    }

    return (
        <React.Fragment>
            {console.log('category: ', props.cat_id)}
            <Select2
                className='btl-modal-select'
                id={field.id}
                name={field.name}
                defaultValue={{ label: props.cat_name, value: props.cat_id }}
                classNamePrefix='btl-react-select'
                onMenuOpen={() => fetchData()}
                onChange={onChange}
                options={
                    props.terms.terms &&
                    Object.entries(props.terms.terms)
                        .filter(
                            ([key, value]) => value.term_type === 'category'
                        )
                        .map(([key, value]) => ({
                            value: value.ID,
                            label: value.term_name,
                        }))
                }
            />
        </React.Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(Category)
