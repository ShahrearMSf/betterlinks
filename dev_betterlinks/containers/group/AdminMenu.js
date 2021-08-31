import React from 'react';
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';
import { route_path, plugin_root_url } from '../../utils/helper';
const AdminMenu = () => {
	const currentPage = betterLinksQuery.get('page');
	let rootLinks = 'betterlinks';
	if (
		!betterLinksHooks.applyFilters('isShowManageLinksMenu', true) &&
		(betterLinksHooks.applyFilters('isShowSettingsMenu', true) || betterLinksHooks.applyFilters('isShowAnalyticsMenu', true))
	) {
		rootLinks = currentPage;
	}
	return (
		<React.Fragment>
			<Link
				to={`${route_path}admin.php?page=${rootLinks}`}
				className="wp-has-submenu wp-has-current-submenu wp-menu-open menu-top menu-icon-generic toplevel_page_betterlinks menu-top-last"
				aria-haspopup="false"
			>
				<div className="wp-menu-arrow">
					<div></div>
				</div>
				<div className="wp-menu-image dashicons-before" aria-hidden="true">
					<img src={plugin_root_url + 'assets/images/logo.svg'} alt="logo" />
				</div>
				<div className="wp-menu-name">{__('BetterLinks', 'betterlinks')}</div>
			</Link>
			{(betterLinksHooks.applyFilters('isShowSettingsMenu', true) || betterLinksHooks.applyFilters('isShowAnalyticsMenu', true)) && (
				<ul className="wp-submenu wp-submenu-wrap">
					<li className="wp-submenu-head" aria-hidden="true">
						{__('BetterLinks', 'betterlinks')}
					</li>
					{betterLinksHooks.applyFilters('isShowManageLinksMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks'}>{__('Manage Links', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowAnalyticsMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-analytics' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-analytics'}>{__('Analytics', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowSettingsMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-settings' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-settings'}>{__('Settings', 'betterlinks')}</Link>
						</li>
					)}
				</ul>
			)}
		</React.Fragment>
	);
};

export default AdminMenu;
