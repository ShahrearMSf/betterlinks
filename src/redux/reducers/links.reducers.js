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
					links: {
						...newState,
					},
				};
			} else {
				const result = move(state.links[sInd].lists, state.links[dInd].lists, source, destination);
				const newState = state.links;
				newState[sInd].lists = result[sInd];
				newState[dInd].lists = result[dInd];

				return {
					...state,
					links: {
						...newState,
					},
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
					[payload.data.cat_id]: {
						...state.links[payload.data.cat_id],
						term_name: payload.data.cat_name,
						term_slug: payload.data.cat_slug,
					},
				},
			};
		case DELETE_CAT:
			let newState = state.links;
			const deletedCatLinks = newState[payload.data.cat_id].lists;
			delete newState[payload.data.cat_id];
			return {
				...state,
				links: {
					...newState,
					[1]: {
						...newState[1],
						lists: [...state.links[1].lists, ...deletedCatLinks],
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
						lists: [...state.links[payload.data.cat_id].lists, payload.data],
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
						lists: state.links[payload.data.term_id].lists.filter((item, index) => item.ID != payload.data.ID),
					},
				},
			};
		default:
			return state;
	}
}
export default links;
