import { FETCH_INITIAL_DATA } from '../actions/settings.actions'
const initialState = {
    settings: [],
    loading: true,
}

function settings(state = initialState, action) {
    switch (action.type) {
        case FETCH_INITIAL_DATA:
            return {
                ...state,
                settings: action.payload,
                loading: false,
            }
        default:
            return state
    }
}
export default settings
