import { API, namespace } from './../../utils/helper'
export const FETCH_CLICKS_DATA = 'FETCH_CLICKS_DATA'
export const fetch_clicks_data = (params) => async (dispatch) => {
    try {
        const res = await API.get(namespace + 'clicks', {
            params: params,
        })
        dispatch({
            type: FETCH_CLICKS_DATA,
            payload: res.data,
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: FETCH_CLICKS_DATA,
            payload: {},
        })
    }
}
