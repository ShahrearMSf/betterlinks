export const CHANGE_LINKS_VIEW = 'CHANGE_LINKS_VIEW';
export const linksView = (data) => (dispatch) => {
	dispatch({
		type: CHANGE_LINKS_VIEW,
		payload: data,
	});
	localStorage.setItem('betterLinksView', data);
};
