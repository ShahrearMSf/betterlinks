import { API, namespace } from './../../utils/helper'
export const DRAG_AND_DROP = 'DRAG_AND_DROP'
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA'
export const ADD_NEW_CAT = 'ADD_NEW_CAT'
export const ADD_NEW_LINK = 'ADD_NEW_LINK'
export const DELETE_LINK = 'DELETE_LINK'

export const onDragEnd = (result) => {
    return (dispatch) => {
        dispatch({
            type: DRAG_AND_DROP,
            payload: result,
        })
    }
}
export const fetch_settings_data = () => async (dispatch) => {
    try {
        const res = await API.get(namespace + 'links', {
            params: { limit: 5 },
        })
        dispatch({
            type: FETCH_INITIAL_DATA,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_INITIAL_DATA,
            payload: {},
        })
    }
}

export const add_new_cat = (data) => async (dispatch) => {
    try {
        const res = await API.post(namespace + 'terms', {
            params: data,
        })
        dispatch({
            type: ADD_NEW_CAT,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: ADD_NEW_CAT,
            payload: {},
        })
    }
}

export const add_new_link = (formData) => async (dispatch) => {
    console.log(formData)
    try {
        const res = await API.post(namespace + 'links', {
            params: formData,
        })
        dispatch({
            type: ADD_NEW_LINK,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: ADD_NEW_LINK,
            payload: {},
        })
    }
}

export const delete_link = (catID, linID) => async (dispatch) => {
    try {
        const res = await API.delete(namespace + 'links', {
            params: { ID: linID, term_id: catID },
        })
        dispatch({
            type: DELETE_LINK,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: DELETE_LINK,
            payload: {},
        })
    }
}
