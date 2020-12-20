import { API, namespace } from './../../utils/helper'
export const DRAG_AND_DROP = 'DRAG_AND_DROP'
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA'
export const ADD_NEW_CAT = 'ADD_NEW_CAT'
export const UPDATE_CAT = 'UPDATE_CAT'
export const DELETE_CAT = 'DELETE_CAT'
export const ADD_NEW_LINK = 'ADD_NEW_LINK'
export const DELETE_LINK = 'DELETE_LINK'
export const EDIT_LINK = 'EDIT_LINK'

export const onDragEnd = (result) => async (dispatch) => {
    dispatch({
        type: DRAG_AND_DROP,
        payload: result,
    })
    try {
        await API.put(namespace + 'links', {
            params: {
                ID: result.draggableId,
                cat_id: result.destination.droppableId,
            },
        })
    } catch (e) {
        console.log(e)
    }
}
export const fetch_settings_data = () => async (dispatch) => {
    try {
        const res = await API.get(namespace + 'links', {
            params: {},
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

export const update_cat = (params) => async (dispatch) => {
    try {
        const res = await API.put(namespace + 'terms', {
            params: params,
        })
        dispatch({
            type: UPDATE_CAT,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: UPDATE_CAT,
            payload: {},
        })
    }
}

export const delete_cat = (params) => async (dispatch) => {
    try {
        const res = await API.delete(namespace + 'terms', {
            params: params,
        })
        dispatch({
            type: DELETE_CAT,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: DELETE_CAT,
            payload: {},
        })
    }
}

export const add_new_link = (formData) => async (dispatch) => {
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
export const edit_link = (item) => async (dispatch) => {
    try {
        const res = await API.put(namespace + 'links', {
            params: item,
        })
        dispatch({
            type: EDIT_LINK,
            payload: item,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: EDIT_LINK,
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
