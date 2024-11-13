import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';
import { route_path, plugin_root_url, betterlinks_custom_domain_menu, betterlinks_quick_setup_step } from 'utils/helper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_settings_data } from 'redux/actions/settings.actions';

const Navbar = (props) => {
	const [customDomainMenu, setCustomDomainMenu] = useState(betterlinks_custom_domain_menu);
	const { menuNotice, settings, page } = props;
	const currentPage = page;

	const shouldShowSubmenu = ['isShowManageTagsMenu', 'isShowSettingsMenu', 'isShowCustomDomainMenu', 'isShowLinkScannerMenu', 'isShowAnalyticsMenu', 'isShowKeywordsLinkingMenu'].some((item, i) =>
		betterLinksHooks.applyFilters(item, i !== 2)
	);
	let rootLinks = 'betterlinks';
	if (!betterLinksHooks.applyFilters('isShowManageLinksMenu', true) && shouldShowSubmenu) {
		rootLinks = currentPage;
	}
	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data();
		}
		if (settings.settings) {
			setCustomDomainMenu(settings?.settings?.enable_custom_domain_menu);
		}
	}, [settings?.settings?.enable_custom_domain_menu]);

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
					{betterLinksHooks.applyFilters('isShowCustomDomainMenu', customDomainMenu) && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-custom-domain' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-custom-domain'}>{__('Custom Domain', 'betterlinks')}</Link>
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
					{betterLinksHooks.applyFilters('isShowSettingsMenu', true) && betterlinks_quick_setup_step !== 'complete' && (
						<li className={`wp-first-item ${currentPage == 'betterlinks-quick-setup' ? 'current' : ''}`}>
							<Link to={route_path + 'admin.php?page=betterlinks-quick-setup'}>{__('Quick Setup', 'betterlinks')}</Link>
						</li>
					)}
				</ul>
			)}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
	fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
