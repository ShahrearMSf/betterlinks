import { List, ListItem, ListItemText } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';
import { ReactComponent as Stepper } from '../../../assets/images/teasers/stepper.svg';
import { ReactComponent as Link } from '../../../assets/images/teasers/link.svg';
import { ReactComponent as Analytics } from '../../../assets/images/teasers/analytics.svg';
import { ReactComponent as Eye } from '../../../assets/images/teasers/eye.svg';
import { ReactComponent as Selector } from '../../../assets/images/teasers/selector.svg';
import { UpgradeToProSpecial } from 'components/Teasers/UpgradeToProSpecial';

const GraphTeaser = () => {
	if (is_pro_enabled) return null;
	return (
		<UpgradeToProSpecial
			description={__('Track your links with detailed analytics, dynamic infographics, insights on OS,  browser,top medium - social, search platforms and more.', 'betterlinks')}
		>
			<List>
				{[
					<div className="btl-graphteaser-icon">
						<Stepper />
						<p>{__('Track your top-performing link Click Sources', 'betterlinks')}</p>
					</div>,
					<div className="btl-graphteaser-icon">
						<Link />
						<p>{__('Access exclusive click data for Better Insights', 'betterlinks')}</p>
					</div>,
					<div className="btl-graphteaser-icon">
						<Analytics />
						<p>{__('Measure the performance of your shortened links', 'betterlinks')}</p>
					</div>,
					<div className="btl-graphteaser-icon">
						<Eye />
						<p>{__('Identify your most-clicked links for optimal strategy', 'betterlinks')}</p>
					</div>,
					<div className="btl-graphteaser-icon">
						<Selector />
						<p>{__('Get detailed individual click stats at your fingertips', 'betterlinks')}</p>
					</div>,
				].map((item) => (
					<ListItem disableGutters>
						<ListItemText primary={item} />
					</ListItem>
				))}
			</List>
		</UpgradeToProSpecial>
	);
};

export default GraphTeaser;
