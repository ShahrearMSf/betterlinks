import { is_pro_enabled } from 'utils/helper';

export const analyticsData = (data, id) => {
	let results = {
		clicks: {},
	};
	data.total_count.forEach((element) => {
		results.clicks[element.c_date] = element.click_count;
	});

	if (is_pro_enabled) {
		results['unique_clicks'] = {};
		data.unique_count.forEach((element) => {
			results.unique_clicks[element.c_date] = element.uniq_count;
		});
	}


	// data?.forEach?.((element) => {
	// 	let date = element.created_at.split(' ')[0];
	// 	if (results.clicks.hasOwnProperty(date)) {
	// 		results.clicks[date] += 1;
	// 	} else {
	// 		results.clicks[date] = 1;
	// 	}

	// 	if (is_pro_enabled) {
	// 		// Unique clicks
	// 		if (results.unique_clicks.hasOwnProperty(date)) {
	// 			if (!results.unique_clicks[date].includes(element.ip)) {
	// 				results.unique_clicks[date].push(element.ip);
	// 			}
	// 		} else {
	// 			results.unique_clicks[date] = [element.ip];
	// 		}
	// 	}
	// });
	return results;
};

export const getData = (clicks, analyticsTab, filterText, id = null) => {
	if (id) {
		return clicks?.filter?.((item) => {
			if (item.link_id != id) return;
			const json = JSON.stringify(item);
			return json.toLowerCase().includes(filterText.toLowerCase());
		});
	}

	let find = [];
	for (let index = 0; index < clicks.length; index++) {
		const element = clicks[index];
		if (!find.find((item) => item.link_id == element.link_id)) {
			if (element.link_title) {
				element.link_title.toLowerCase().includes(filterText?.toLowerCase());
			}
			find.push(element);
		}
	}
	// 1 means performance tab, when performance is selected
	if (1 == analyticsTab) {
		if (!is_pro_enabled && !is_extra_data_tracking_compatible) return [];
		return find
			.sort((a, b) => +a?.total_clicks - +b?.total_clicks)
			.reverse()
			.slice(0, 5);
	}

	return find.filter((item) => {
		const json = JSON.stringify(item);
		return json.toLowerCase().includes(filterText?.toLowerCase());
	});
};
