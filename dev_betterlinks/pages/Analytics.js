import React from 'react';
import queryString from 'query-string';
import { __ } from '@wordpress/i18n';
import Topbar from 'containers/TopBar';
import Clicks from 'containers/Clicks';

const Analytics = () => {
	const parsed = queryString.parse(location.search);
	return (
		<React.Fragment>
			<Topbar label={__('BetterLinks Analytics', 'betterlinks')} />
			{betterLinksHooks.applyFilters('analyticsInnerChild', <Clicks />, parsed)}
		</React.Fragment>
	);
};
export default Analytics;
