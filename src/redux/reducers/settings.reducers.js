import { FETCH_INITIAL_DATA, DRAG_AND_DROP, ADD_NEW_CAT, UPDATE_CAT, DELETE_CAT, ADD_NEW_LINK, EDIT_LINK, DELETE_LINK } from '../actions/settings.actions';
import { move, reorder } from './../../utils/helper';
function settings(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_INITIAL_DATA:
			return {
				...state,
				settings: {
					...payload.data,
				},
			};
		case DRAG_AND_DROP:
			const { source, destination } = payload;
			// dropped outside the list
			if (!destination) {
				return {
					...state,
				};
			}
			const sInd = +source.droppableId;
			const dInd = +destination.droppableId;
			if (sInd === dInd) {
				const items = reorder(state.settings[sInd].lists, source.index, destination.index);
				const newState = state.settings;
				newState[sInd].lists = items;

				return {
					...state,
					settings: {
						...newState,
					},
				};
			} else {
				const result = move(state.settings[sInd].lists, state.settings[dInd].lists, source, destination);
				const newState = state.settings;
				newState[sInd].lists = result[sInd];
				newState[dInd].lists = result[dInd];

				return {
					...state,
					settings: {
						...newState,
					},
				};
			}
		case ADD_NEW_CAT:
			return {
				...state,
				settings: {
					...state.settings,
					[payload.data.ID]: {
						...state.settings[payload.data.ID],
						...payload.data,
					},
				},
			};
		case UPDATE_CAT:
			return {
				...state,
				settings: {
					...state.settings,
					[payload.data.cat_id]: {
						...state.settings[payload.data.cat_id],
						term_name: payload.data.cat_name,
						term_slug: payload.data.cat_slug,
					},
				},
			};
		case DELETE_CAT:
			let newState = state.settings;
			const deletedCatLinks = newState[payload.data.cat_id].lists;
			delete newState[payload.data.cat_id];
			return {
				...state,
				settings: {
					...newState,
					[1]: {
						...newState[1],
						lists: [...state.settings[1].lists, ...deletedCatLinks],
					},
				},
			};
		case ADD_NEW_LINK:
			return {
				...state,
				settings: {
					...state.settings,
					[payload.data.cat_id]: {
						...state.settings[payload.data.cat_id],
						lists: [...state.settings[payload.data.cat_id].lists, payload.data],
					},
				},
			};
		case EDIT_LINK:
			return {
				...state,
				settings: {
					...state.settings,
					[payload.cat_id]: {
						...state.settings[payload.cat_id],
						lists: [...state.settings[payload.cat_id].lists.filter((item, index) => item.ID != payload.ID), payload],
					},
				},
			};
		case DELETE_LINK:
			return {
				...state,
				settings: {
					...state.settings,
					[payload.data.term_id]: {
						...state.settings[payload.data.term_id],
						lists: state.settings[payload.data.term_id].lists.filter((item, index) => item.ID != payload.data.ID),
					},
				},
			};
		default:
			return state;
	}
}
export default settings;
