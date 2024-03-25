import { __ } from '@wordpress/i18n';

const CustomTrackingScriptTeaser = ({ openUpgradeToProModal }) => {
	return (
		<button className="link-options__head" type="button" onClick={openUpgradeToProModal}>
			<h4 className="link-options__head--title">
				{__('Custom Tracking Scripts', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
			</h4>{' '}
			<i className="btl btl-angle-arrow-down" />
		</button>
	);
};

export default CustomTrackingScriptTeaser;
