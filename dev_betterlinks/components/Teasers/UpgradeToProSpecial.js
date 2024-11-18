import { CardContent, Card, Typography } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { ReactComponent as Locked } from '../../../assets/images/locked-2.svg';
import { is_pro_enabled, plugin_root_url } from 'utils/helper';

export const UpgradeToProSpecial = ({ title = null, description = '', children }) => {
	if (is_pro_enabled) return null;
	return (
		<div className="btl-analytics-chart-overlay" style={{ zIndex: '10' }}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5" color="text.secondary" gutterBottom>
						{title || __('Get BetterLinks PRO ', 'betterlinks')}
						<Locked />
					</Typography>
					<Typography variant="p" color="text.secondary" gutterBottom>
						{description}
					</Typography>
					<div>{children}</div>
					<div className="analytics-upgrade-btn">
						<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank">
							<img src={plugin_root_url + '/assets/images/crown.svg'} alt="" />
							{__('Upgrade To BetterLinks PRO', 'betterlinks')}
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
