import { makeRequest } from 'utils/helper';
export const FETCH_POST_TYPES_DATA = 'FETCH_POST_TYPES_DATA';

export const fetch_post_types_data = () => async (dispatch) => {
	try {
		const postTypesProps = {};

		// get post type info for adding or updating keywords
		await makeRequest({
			action: 'betterlinks/admin/get_post_types',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				postTypesProps.postTypes = data;
			}
		});

		await makeRequest({
			action: 'betterlinks/admin/get_post_tags',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				postTypesProps.postTags = data;
			}
		});

		await makeRequest({
			action: 'betterlinks/admin/get_post_categories',
		}).then((response) => {
			const data = Object.entries(response.data.data).reduce((acc, item) => {
				acc.push({ label: item[1], value: item[0] });
				return acc;
			}, []);
			postTypesProps.postCategories = data;
		});

		dispatch({
			type: FETCH_POST_TYPES_DATA,
			payload: { ...postTypesProps, fetchedAll: true },
		});
	} catch (e) {
		console.error('error on fetching post typesdata:', e);
	}
};
