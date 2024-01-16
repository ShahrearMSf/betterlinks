import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import { makeRequest, menu_notice } from 'utils/helper';

const NewFeature = () => {
	const [dashboardNotice, setDashboardNotice] = useState(menu_notice !== localStorage.getItem('betterlinks__admin_dashboard_notice'));

	useEffect(() => {
		const stored_dashboard_notice = localStorage.getItem('betterlinks__admin_dashboard_notice');
		if (menu_notice !== stored_dashboard_notice) {
			const btl = document.querySelector('.btl-dashboard-notice .notice-dismiss');
			btl?.addEventListener('click', () => {
				try {
					makeRequest({
						action: 'betterlinks__admin_dashboard_notice',
					}).then((response) => {
						if (response.data) {
							localStorage.setItem('betterlinks__admin_dashboard_notice', response.data.result);
							setDashboardNotice(menu_notice !== response.data.result);
						}
					});
				} catch (error) {
					console.log('error is ' + error.message);
				}
			});
		}
	}, []);
	if (!dashboardNotice) return null;
	return (
		<div className="notice is-dismissible btl-dashboard-notice">
			<p>
				{__('📣 NEW: BetterLinks Pro 1.8.0 is here, with new ', 'betterlinks')}
				<a target="_blank" href="https://betterlinks.io/docs/how-to-customize-link-preview/">
					{__('Customize Link Preview', 'betterlinks')}
				</a>
				{__(' feature & more! Check out the ', 'betterlinks')}
				<a target="_blank" href="https://betterlinks.io/changelog/">
					{__('Changelog', 'betterlinks')}
				</a>
				{__(' for more details 🎉', 'betterlinks')}
			</p>
		</div>
	);
};

export default NewFeature;
