import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';

const ProBadge = () => {
	if (is_pro_enabled) return;
	return <span className="pro-badge">{__('Pro', 'betterlinks')}</span>;
};

export default ProBadge;
