import { API, namespace } from './../../utils/helper'
export const FETCH_TERMS_DATA = 'FETCH_TERMS_DATA'
export const fetch_terms_data = (type) => async (dispatch) => {
    try {
        const res = await API.get(namespace + 'terms', {
            params: { term_type: type },
        })
        dispatch({
            type: FETCH_TERMS_DATA,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_TERMS_DATA,
            payload: {},
        })
    }
}
