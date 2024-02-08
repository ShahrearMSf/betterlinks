import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { makeRequest, menu_notice } from 'utils/helper';

const NewFeature = () => {
	const [dashboardNotice, setDashboardNotice] = useState(menu_notice !== localStorage.getItem('betterlinks__admin_dashboard_notice'));

	if (!dashboardNotice) return null;
	return (
		// <div
		// 	className="notice is-dismissible btl-dashboard-notice"
		// 	style={{
		// 		position: 'absolute',
		// 		top: 0,
		// 		width: '100%',
		// 		right: 0,
		// 	}}
		// >
		<>
			<p>
				{__('📣 NEW: BetterLinks 1.8.0 is here, with new ', 'betterlinks')}
				<a target="_blank" href="#">
					{__('Manage Tags', 'betterlinks')}
				</a>
				{__(' feature & more! Check out the ', 'betterlinks')}
				<a target="_blank" href="https://betterlinks.io/changelog/">
					{__('Changelog', 'betterlinks')}
				</a>
				{__(' for more details 🎉', 'betterlinks')}
			</p>
			{/* <p>
				{__('📣 NEW: BetterLinks Pro 1.8.0 is here, with new ', 'betterlinks')}
				<a target="_blank" href="https://betterlinks.io/docs/configure-customize-link-preview/">
					{__('Customize Link Preview', 'betterlinks')}
				</a>
				{__(' feature & more! Check out the ', 'betterlinks')}
				<a target="_blank" href="https://betterlinks.io/changelog/">
					{__('Changelog', 'betterlinks')}
				</a>
				{__(' for more details 🎉', 'betterlinks')}
			</p> */}
			{/* // {</div>} */}
		</>
	);
};

export default NewFeature;
