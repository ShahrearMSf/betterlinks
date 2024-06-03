import { __ } from '@wordpress/i18n';
import ShortLinkCustomDomain from 'components/Teasers/ShortLinkCustomDomain';
import Topbar from 'containers/TopBar';
const CustomDomain = () => {
	return (
		<>
			<Topbar label={__('BetterLinks Custom Domain', 'betterlinks')} />
			<div className="btl-tab-panel-inner">
				<ShortLinkCustomDomain />
			</div>
		</>
	);
};

export default CustomDomain;
