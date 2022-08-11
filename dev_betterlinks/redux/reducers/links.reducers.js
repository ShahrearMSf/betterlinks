import { FETCH_INITIAL_DATA, DRAG_AND_DROP, ADD_NEW_CAT, UPDATE_CAT, DELETE_CAT, ADD_NEW_LINK, EDIT_LINK, DELETE_LINK, HANDLE_LINK_FAVORITE } from 'redux/actions/links.actions';
import { move, reorder } from 'utils/helper';
function links(state = {}, action) {
	const payload = action.payload;
	switch (action.type) {
		case FETCH_INITIAL_DATA: {
			const data = payload.data;
			const newLinksData = {};
			for (const key in data) {
				const newLinksListsArr = [];
				for (const item of data[key]?.lists || []) {
					newLinksListsArr.push({ ...item, favorite: JSON.parse(item.favorite || '{}') });
				}
				newLinksData[key] = {
					...data[key],
					lists: newLinksListsArr,
				};
			}
			delete payload.data;
			return {
				...state,
				links: newLinksData,
			};
		}
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
				const newLists = reorder(state.links[sInd].lists, source.index, destination.index);

				return {
					...state,
					links: {
						...state.links,
						[sInd]: {
							...state.links[sInd],
							lists: newLists,
						},
					},
				};
			} else {
				const newLists = move(state.links[sInd].lists, state.links[dInd].lists, source, destination);
				return {
					...state,
					links: {
						...state.links,
						[sInd]: {
							...state.links[sInd],
							lists: newLists[sInd],
						},
						[dInd]: {
							...state.links[dInd],
							lists: newLists[dInd],
						},
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
			if (state.links[payload.data.cat_id] && state.links[payload.data.cat_id].lists) {
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
			}
			return {
				...state,
				links: {
					...state.links,
					[payload.data.cat_id]: {
						term_name: payload.data.cat_slug,
						term_slug: payload.data.cat_slug,
						term_type: 'category',
						lists: [payload.data],
					},
				},
			};
		case EDIT_LINK: {
			if (state.links[payload.cat_id] && state.links[payload.cat_id].lists) {
				const linksAtPayloadCat = state.links[payload.cat_id].lists;
				const itemIndexInTheCat = linksAtPayloadCat.findIndex((item) => item.ID == payload.ID);
				const isCategoryChanged = itemIndexInTheCat === -1;
				if (isCategoryChanged) {
					const newStateLinks = {
						...state.links,
					};
					delete newStateLinks[payload.cat_id];
					for (const property in newStateLinks) {
						if (state.links[property] && state.links[property].lists) {
							const linksOnTheOldCat = state.links[property].lists;
							const indexInOldCatList = linksOnTheOldCat.findIndex((item) => item.ID === payload.ID);
							if (indexInOldCatList !== -1) {
								return {
									...state,
									links: {
										...state.links,
										[property]: {
											...state.links[property],
											lists: [...linksOnTheOldCat.slice(0, indexInOldCatList), ...linksOnTheOldCat.slice(indexInOldCatList + 1)],
										},
										[payload.cat_id]: {
											...state.links[payload.cat_id],
											// the 'reorder' is used here cause it sends data using post request to the server & this way the 'position/index/serial' of the link in the category stay saved (in 'DND view') when someone change a link's category using 'edit_link'
											lists: reorder([payload, ...linksAtPayloadCat], 0, 0),
										},
									},
								};
							}
						}
					}
				}
				return {
					...state,
					links: {
						...state.links,
						[payload.cat_id]: {
							...state.links[payload.cat_id],
							lists: [...linksAtPayloadCat.slice(0, itemIndexInTheCat), payload, ...linksAtPayloadCat.slice(itemIndexInTheCat + 1)],
						},
					},
				};
			}
			return {
				...state,
				links: {
					...state.links,
					[payload.cat_id]: {
						term_name: payload.cat_id,
						term_slug: payload.cat_id,
						term_type: 'category',
						lists: [payload],
					},
				},
			};
		}
		case HANDLE_LINK_FAVORITE: {
			const newLinks = {};
			for (const [key, value] of Object.entries(state.links || {})) {
				const linkLists = (value.lists || []).map((item, index) => {
					if (item.ID == payload.ID) {
						return {
							...item,
							favorite: {
								...item.favorite,
								favForAll: payload.favForAll,
							},
						};
					}
					return item;
				});
				newLinks[`${key}`] = {
					...value,
					lists: linkLists,
				};
			}
			return {
				...state,
				links: {
					...newLinks,
				},
			};
		}
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
