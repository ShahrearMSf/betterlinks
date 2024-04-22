import { is_pro_enabled } from 'utils/helper';
import { Formik, Field, Form } from 'formik';

const FullSiteLinkChecker = () => {
	if (is_pro_enabled) {
		return betterLinksHooks.applyFilters('betterLinksFullSiteLinkChecker', null);
	}
	return (
		<div className="btl-tab-panel-inner btl-broken-links-panel btl-broken-links-panel-disabled">
			<h1>Full site broken link checker</h1>
		</div>
	);
};

export default FullSiteLinkChecker;
