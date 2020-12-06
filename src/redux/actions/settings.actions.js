import { API, namespace } from './../../utils/helper'
export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA'

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
