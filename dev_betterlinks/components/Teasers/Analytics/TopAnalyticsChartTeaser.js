import { __ } from '@wordpress/i18n';
import GraphTeaser from 'containers/Clicks/GraphTeaser';
import { plugin_root_url } from 'utils/helper';

const TopAnalyticsChartTeaser = ({ darkMode }) => {
	return (
		<div className="btl-top-charts btl-top-charts-teaser">
			<img style={{ width: '100%' }} src={`${plugin_root_url}assets/images/teasers/${darkMode ? 'dark' : 'light'}-chart-teaser.png`} />
			<GraphTeaser />
		</div>
	);
};

export default TopAnalyticsChartTeaser;
