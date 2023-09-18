import { ADD_NEW_PASSWORD } from './actionstrings';

export const add_new_password = (data) => (dispatch) => {
	console.log({ password: data });
	return;
	dispatch({
		type: ADD_NEW_PASSWORD,
		payload: data,
	});
};
