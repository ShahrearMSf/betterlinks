export const CHANGE_LINKS_VIEW = 'CHANGE_LINKS_VIEW';
export const linksView = (data) => (dispatch) => {
	console.log(data);
	dispatch({
		type: CHANGE_LINKS_VIEW,
		payload: data,
	});
};
