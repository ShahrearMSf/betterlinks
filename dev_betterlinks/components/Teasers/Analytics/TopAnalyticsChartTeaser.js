import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const btl_prefix = 'btl-';
const ExpandIcon = <span className="dashicons dashicons-arrow-up-alt2" />;
const teaserData = [
	{
		title: __('Top 5 Referer - Clicks', 'betterlinks'),
		id: 'top-referer',
	},
	{
		title: __('Top Devices - Clicks', 'betterlinks'),
		id: 'top-devices',
	},
	{
		title: __('Top OS - Clicks', 'betterlinks'),
		id: 'top-os',
	},
	{
		title: __('Top Browsers - Clicks', 'betterlinks'),
		id: 'top-browsers',
	},
];
const TopAnalyticsChartTeaser = () => {
	return (
		<div className="btl-top-charts btl-top-charts-teaser">
			{teaserData.map(({ title, id }) => (
				<Accordion key={id} defaultExpanded={true}>
					<AccordionSummary expandIcon={ExpandIcon} aria-controls={`${btl_prefix}content`} id={`${btl_prefix}header`}>
						<Typography>
							{title} <span className="pro-badge">Pro</span>{' '}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<img src={`${plugin_root_url}assets/images/teasers/${id}.png`} alt={title} />
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default TopAnalyticsChartTeaser;
