// Quick Setup Settings
export const QUICK_SETUP = 'QUICK_SETUP';

export const update_quick_setup = (data) => (dispatch) => {
	// console.info(data);
	dispatch({
		type: 'UPDATE_OPTIONS',
		payload: data,
	});
	// console.info('update_quick_setup');
};
