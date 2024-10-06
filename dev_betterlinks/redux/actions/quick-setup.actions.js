// Quick Setup Settings
export const QUICK_SETUP = 'QUICK_SETUP';

export const update_quick_setup = (data) => (dispatch) => {
	dispatch({
		type: CHANGE_LINKS_VIEW,
		payload: data,
	});
};
