import React, { useState } from 'react'
import { useField } from 'formik'
import CreatableSelect2 from 'react-select/creatable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetch_terms_data } from './../../redux/actions/terms.actions'

const Tags = (props) => {
    const [field] = useField(props.name)
    const [isFetchData, setIsFetchData] = useState(false)
    const fetchData = () => {
        if (!isFetchData) {
            props.fetch_terms_data()
            setIsFetchData(true)
        }
    }

    const onChange = (option) => {
        if (option == null) {
            return props.setFieldValue(field.name, '')
        }
        return option.map((item) => item.value)
    }

    return (
        <React.Fragment>
            <CreatableSelect2
                className='btl-modal-form-control btl-modal-select'
                isClearable
                id={field.id}
                name={field.name}
                onMenuOpen={() => fetchData()}
                onChange={onChange}
                options={
                    props.terms.terms &&
                    Object.entries(props.terms.terms)
                        .filter(([key, value]) => value.term_type === 'tags')
                        .map(([key, value]) => ({
                            value: value.ID,
                            label: value.term_name,
                        }))
                }
                isMulti={true}
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
export default connect(mapStateToProps, mapDispatchToProps)(Tags)
