import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';

const GraphTeaser = () => {
	if (is_pro_enabled) return null;
	return (
		<div className="btl-analytics-chart-overlay">
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5" color="text.secondary" gutterBottom>
						{__('Unlock Details Analytics With BetterLinks PRO 🔒', 'betterlinks')}
					</Typography>
					<List>
						{[
							'👉 Top Performing Links Click Sources',
							'👉 Get Access to Unique Click Data',
							'👉 Get Access to Individual Click Data',
							'👉 Identify most Clicked Links',
							'👉 Measure Performance of your Shortened Links',
						].map((item) => (
							<ListItem disableGutters>
								{/* <ListItemIcon>👉</ListItemIcon> */}
								<ListItemText primary={item} />
							</ListItem>
						))}
					</List>
					<div className="analytics-upgrade-btn">
						<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank">
							Upgrade To BetterLinks PRO
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default GraphTeaser;
