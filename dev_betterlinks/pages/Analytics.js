import React, { useState } from 'react';
import queryString from 'query-string';
import { __ } from '@wordpress/i18n';
import Topbar from 'containers/TopBar';
import Clicks from 'containers/Clicks';
import { subDays } from 'date-fns';

const Analytics = () => {
	const [customDateFilter, setCustomDateFilter] = useState([
		{
			startDate: betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30)),
			endDate: new Date(),
			key: 'selection',
		},
	]);
	const propsForAnalytics = {
		customDateFilter,
		setCustomDateFilter,
		isResetAnalytics: true,
	};
	const parsed = queryString.parse(location.search);
	return (
		<React.Fragment>
			<Topbar propsForAnalytics={propsForAnalytics} label={__('BetterLinks Analytics', 'betterlinks')} />
			{betterLinksHooks.applyFilters('analyticsInnerChild', <Clicks propsForAnalytics={propsForAnalytics} />, parsed)}
		</React.Fragment>
	);
};
export default Analytics;
