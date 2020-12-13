import { FETCH_TERMS_DATA } from '../actions/terms.actions'
function terms(state = {}, action) {
    const payload = action.payload
    switch (action.type) {
        case FETCH_TERMS_DATA:
            return {
                ...state,
                terms: {
                    ...payload.data,
                },
            }
        default:
            return state
    }
}
export default terms
