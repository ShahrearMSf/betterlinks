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
        dispatch({
            type: FETCH_INITIAL_DATA,
            payload: console.log(e),
        })
    }
}

export const add_new_cat = () => {
    return (dispatch) => {
        dispatch({
            type: ADD_NEW_CAT,
            payload: {
                rahim: {
                    term_name: 'rahim',
                    term_type: 'category',
                    lists: [],
                },
            },
        })
    }
}
export const add_new_link = (catName) => {
    return (dispatch) => {
        dispatch({
            type: ADD_NEW_LINK,
            payload: {
                cat: catName,
                data: {
                    ID: 25,
                    link_title: 'lorem Ipsum dolor',
                },
            },
        })
    }
}
export const delete_link = (catName, linkIndex) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_LINK,
            payload: {
                cat: catName,
                data: linkIndex,
            },
        })
    }
}
