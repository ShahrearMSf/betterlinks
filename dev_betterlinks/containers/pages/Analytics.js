import React from 'react';
import queryString from 'query-string';
import Clicks from './../group/Clicks';

const Analytics = (props) => {
	const parsed = queryString.parse(location.search);
	return <React.Fragment>{betterLinksHooks.applyFilters('analyticsInnerChild', <Clicks />, parsed)}</React.Fragment>;
};
export default Analytics;
