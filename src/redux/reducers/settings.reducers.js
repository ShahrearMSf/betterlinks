import { object } from 'prop-types'
import {
    FETCH_INITIAL_DATA,
    ADD_NEW_CAT,
    ADD_NEW_LINK,
    DELETE_LINK,
} from '../actions/settings.actions'
function settings(state = {}, action) {
    const payload = action.payload
    switch (action.type) {
        case FETCH_INITIAL_DATA:
            return {
                ...state,
                settings: {
                    ...payload.data,
                },
            }
        case ADD_NEW_CAT:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...payload,
                },
            }
        case ADD_NEW_LINK:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [payload.cat]: {
                        ...state.settings[payload.cat],
                        lists: [
                            ...state.settings[payload.cat].lists,
                            payload.data,
                        ],
                    },
                },
            }
        case DELETE_LINK:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [payload.cat]: {
                        ...state.settings[payload.cat],
                        lists: state.settings[payload.cat].lists.filter(
                            (item, index) => index != payload.data
                        ),
                    },
                },
            }
        default:
            return state
    }
}
export default settings
