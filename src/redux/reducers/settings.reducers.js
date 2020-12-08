import {
    FETCH_INITIAL_DATA,
    DRAG_AND_DROP,
    ADD_NEW_CAT,
    ADD_NEW_LINK,
    DELETE_LINK,
} from '../actions/settings.actions'
const reorder = (list, startIndex, endIndex) => {
    console.log('list', list)
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    console.log('result', result)
    return result
}
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone

    return result
}
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
        case DRAG_AND_DROP:
            const { source, destination } = payload
            // dropped outside the list
            if (!destination) {
                return {
                    ...state,
                }
            }
            const sInd = +source.droppableId
            const dInd = +destination.droppableId
            if (sInd === dInd) {
                const items = reorder(
                    state.settings[sInd].lists,
                    source.index,
                    destination.index
                )
                const newState = state.settings
                newState[sInd].lists = items

                return {
                    ...state,
                    settings: {
                        ...newState,
                    },
                }
            } else {
                const result = move(
                    state.settings[sInd].lists,
                    state.settings[dInd].lists,
                    source,
                    destination
                )
                const newState = state.settings
                newState[sInd].lists = result[sInd]
                newState[dInd].lists = result[dInd]

                return {
                    ...state,
                    settings: {
                        ...newState,
                    },
                }
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
