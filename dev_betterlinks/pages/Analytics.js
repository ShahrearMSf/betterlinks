import React, { useState } from 'react';
import queryString from 'query-string';
import { __ } from '@wordpress/i18n';
import Topbar from 'containers/TopBar';
import Clicks from 'containers/Clicks3';
import { subDays } from 'date-fns';
import SingleClicks from 'containers/Clicks3/SingleClicks';
import Chart from 'react-apexcharts';

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
	const id = betterLinksQuery.get('id');
	return (
		<React.Fragment>
			<Topbar propsForAnalytics={propsForAnalytics} label={__('BetterLinks Analytics', 'betterlinks')} />
			{betterLinksHooks.applyFilters(
				'analyticsInnerChild',
				id ? <SingleClicks id={id} propsForAnalytics={propsForAnalytics} /> : <Clicks propsForAnalytics={propsForAnalytics} />,
				{ ...parsed, Chart }
			)}
		</React.Fragment>
	);
};
export default Analytics;
