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
		title: __('Top Social Media - Clicks', 'betterlinks'),
		id: 'top-social-media',
	},
	{
		title: __('Top Devices - Clicks', 'betterlinks'),
		id: 'top-devices',
	},
];
const graphTeaser = [
	{
		title: __('Top OS - Clicks', 'betterlinks'),
		id: 'top-os',
		defaultExpanded: false,
	},
	{
		title: __('Top Browsers - Clicks', 'betterlinks'),
		id: 'top-browsers',
		defaultExpanded: false,
	},
	{
		title: __('Top Medium - Clicks', 'betterlinks'),
		id: 'top-medium',
		defaultExpanded: false,
	},
];
const TopAnalyticsChartTeaser = () => {
	return (
		<div className="btl-top-charts btl-top-charts-teaser">
			<div className="btl-top-charts-1">
				{teaserData.map(({ title, id }) => (
					<Accordion key={id} defaultExpanded={true} disabled={true}>
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
			<div className="btl-top-charts-2">
				{graphTeaser.map(({ title, id }) => (
					<Accordion key={id} defaultExpanded={true} disabled={true}>
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
		</div>
	);
};

export default TopAnalyticsChartTeaser;
