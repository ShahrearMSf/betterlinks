import React from 'react';
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';
import { route_path, plugin_root_url } from 'utils/helper';
const Navbar = ({ menuNotice }) => {
	const currentPage = betterLinksQuery.get('page');
	const shouldShowSubmenu = ['isShowManageTagsMenu', 'isShowSettingsMenu', 'isShowLinkScannerMenu', 'isShowAnalyticsMenu', 'isShowKeywordsLinkingMenu'].some((item, i) =>
		betterLinksHooks.applyFilters(item, i !== 2)
	);
	let rootLinks = 'betterlinks';
	if (!betterLinksHooks.applyFilters('isShowManageLinksMenu', true) && shouldShowSubmenu) {
		rootLinks = currentPage;
	}
	return (
		<React.Fragment>
			<Link
				to={`${route_path}admin.php?page=${rootLinks}`}
				className="wp-has-submenu wp-has-current-submenu wp-menu-open menu-top menu-icon-generic toplevel_page_betterlinks menu-top-last"
				aria-haspopup="false"
				style={{ backgroundColor: '#20639a' }}
			>
				<div className="wp-menu-arrow">
					<div />
				</div>
				<div className="wp-menu-image dashicons-before" aria-hidden="true">
					<img src={plugin_root_url + 'assets/images/logo.svg'} alt="logo" />
				</div>
				<div className="wp-menu-name">
					{__('BetterLinks', 'betterlinks')}
					{menuNotice && <span className="btl-menu-notice">1</span>}
				</div>
			</Link>
			{shouldShowSubmenu && (
				<ul className="wp-submenu wp-submenu-wrap">
					{betterLinksHooks.applyFilters('isShowManageLinksMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks'}>{__('Manage Links', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowKeywordsLinkingMenu', false) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-keywords-linking' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-keywords-linking'}>{__('Auto-Link Keywords', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowManageTagsMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-manage-tags' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-manage-tags'}>{__('Manage Tags', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowAnalyticsMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-analytics' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-analytics'}>{__('Analytics', 'betterlinks')}</Link>
						</li>
					)}
					{betterLinksHooks.applyFilters('isShowLinkScannerMenu', true) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-link-scanner' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-link-scanner'}>{__('Link Scanner', 'betterlinks')}</Link>
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

export default Navbar;
