import React, { useState } from 'react'
import Select2 from 'react-select'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetch_terms_data } from './../../redux/actions/terms.actions'

const Terms = (props) => {
    const [isFetchData, setIsFetchData] = useState(false)
    const fetchData = () => {
        if (!isFetchData) {
            props.fetch_terms_data()
            setIsFetchData(true)
        }
    }

    return (
        <React.Fragment>
            <Select2
                className='btl-modal-form-control btl-modal-select'
                onMenuOpen={() => fetchData()}
                options={
                    props.terms.terms &&
                    Object.entries(props.terms.terms)
                        .filter(
                            ([key, value]) => value.term_type === props.type
                        )
                        .map(([key, value]) => ({
                            value: value.ID,
                            label: value.term_name,
                        }))
                }
                isMulti={props.isMulti}
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
export default connect(mapStateToProps, mapDispatchToProps)(Terms)
