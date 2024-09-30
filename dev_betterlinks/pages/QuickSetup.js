import { __ } from '@wordpress/i18n';
import SetupCanvas from 'containers/QuickSetup/SetupCanvas';
import Topbar from 'containers/TopBar';
const QuickSetup = () => {
	return (
		<>
			<Topbar label={__('BetterLinks Quick Setup', 'betterlinks')} />
			<SetupCanvas />
		</>
	);
};

export default QuickSetup;
