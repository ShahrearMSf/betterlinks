import { FETCH_INITIAL_DATA, DRAG_AND_DROP, ADD_NEW_CAT, UPDATE_CAT, DELETE_CAT, ADD_NEW_LINK, EDIT_LINK, DELETE_LINK } from '../actions/links.actions';
import { move, reorder } from '../../utils/helper';
function links(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_INITIAL_DATA:
			return {
				...state,
				links: payload.data,
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
				const items = reorder(state.links[sInd].lists, source.index, destination.index);
				const newState = state.links;
				newState[sInd].lists = items;
				return {
					...state,
					newState,
				};
			} else {
				const result = move(state.links[sInd].lists, state.links[dInd].lists, source, destination);
				const newState = state.links;
				newState[sInd].lists = result[sInd];
				newState[dInd].lists = result[dInd];

				return {
					...state,
					newState,
				};
			}
		case ADD_NEW_CAT:
			return {
				...state,
				links: {
					...state.links,
					[payload.data.ID]: {
						...state.links[payload.data.ID],
						...payload.data,
					},
				},
			};
		case UPDATE_CAT:
			return {
				...state,
				links: {
					...state.links,
					[payload.data.ID]: {
						...state.links[payload.data.ID],
						term_name: payload.data.term_name,
						term_slug: payload.data.term_slug,
					},
				},
			};
		case DELETE_CAT:
			let newState = state.links;
			const { cat_id } = payload.data;
			const deletedCatLinks =
				newState[cat_id] && newState[cat_id].lists.length > 0
					? newState[cat_id].lists.reduce((prev, current, index, arr) => {
							current.cat_id = Object.keys(newState)[0];
							arr[index] = current;
							return arr;
					  }, 0)
					: [];

			delete newState[cat_id];
			return {
				...state,
				links: {
					...newState,
					[Object.keys(newState)[0]]: {
						...newState[Object.keys(newState)[0]],
						lists: [...state.links[Object.keys(newState)[0]].lists, ...deletedCatLinks],
					},
				},
			};
		case ADD_NEW_LINK:
			return {
				...state,
				links: {
					...state.links,
					[payload.data.cat_id]: {
						...state.links[payload.data.cat_id],
						lists: [payload.data, ...state.links[payload.data.cat_id].lists],
					},
				},
			};
		case EDIT_LINK:
			return {
				...state,
				links: {
					...state.links,
					[payload.cat_id]: {
						...state.links[payload.cat_id],
						lists: [...state.links[payload.cat_id].lists.filter((item, index) => item.ID != payload.ID), payload],
					},
				},
			};
		case DELETE_LINK:
			return {
				...state,
				links: {
					...state.links,
					[payload.data.term_id]: {
						...state.links[payload.data.term_id],
						lists: state.links[payload.data.term_id] ? state.links[payload.data.term_id].lists.filter((item, index) => item.ID != payload.data.ID) : [],
					},
				},
			};
		default:
			return state;
	}
}
export default links;
