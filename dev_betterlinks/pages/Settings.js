import React, { useEffect, useState, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { prefetchAllSettingsData, setAutoCreateLinkSettings } from 'redux/actions/settings.actions';
import Topbar from 'containers/TopBar';
import TabsGeneral from 'containers/TabsGeneral';
import TabsTools from 'containers/TabsTools';
import Migration from 'containers/Migration';
import RoleManagement from 'components/Teasers/RoleManagement';
import GoPremium from 'components/Teasers/GoPremium';
import Docs from 'components/Docs';
import TabsOptions from 'containers/TabsOptions';
import { is_pro_enabled, plugin_root_url } from 'utils/helper';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

/**
 * Loading component for settings page initial load
 */
const SettingsLoader = () => (
	<div className="betterlinks-settings-loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
		<img style={{ width: '100px', height: '100px' }} src={`${plugin_root_url}assets/images/dark-mode-loader.gif`} alt={__('Loading...', 'betterlinks')} />
	</div>
);

const Settings = (props) => {
	const {
		settings: settingsState,
		postdatas,
		terms,
		prefetchAllSettingsData,
		setAutoCreateLinkSettings,
	} = props;

	const { settings, tracking, isPrefetching, isPrefetched, autoCreateLinkSettings } = settingsState || {};
	const query = useQuery();
	const currentTab = query.get('import');
	const migration = query.get('migration');
	const advancedTab = query.get('advanced');
	const termsData = terms?.terms;

	// Prefetch all settings data on mount
	useEffect(() => {
		prefetchAllSettingsData();
	}, []);

	// Show loader only during initial prefetch, not on subsequent tab switches
	// Check this BEFORE useMemo hooks to prevent accessing undefined settings
	const isInitialLoading = !settings || (isPrefetching && !isPrefetched);

	// Memoize tab lists - this doesn't depend on settings data
	const tabList = useMemo(() => {
		return betterLinksHooks.applyFilters('betterLinksSettingsFilterTabList', [
			__('General', 'betterlinks'),
			__('Advanced Options', 'betterlinks'),
			__('Tools', 'betterlinks'),
			__('Role Management', 'betterlinks'),
			__('Go Premium', 'betterlinks'),
		]);
	}, []);

	// Memoize tab panels - only compute when settings are available
	const tabPanel = useMemo(() => {
		// Return empty array if settings not loaded yet - we'll show loader anyway
		if (!settings) {
			return [];
		}
		
		return betterLinksHooks.applyFilters('betterLinksSettingsFilterTabPanel', [
			<TabsGeneral settings={settings} key="general" />,
			<TabsOptions
				key="options"
				settings={settings}
				postdatas={postdatas || {}}
				autoCreateLinkSettings={autoCreateLinkSettings || {}}
				terms={termsData}
				trackingSettings={tracking}
				setTrackingSettings={() => {}} // Deprecated - tracking now managed via Redux
				setAutoCreateLinkSettings={(newSettings) => setAutoCreateLinkSettings(newSettings)}
			/>,
			<TabsTools query={query} key="tools" />,
			<RoleManagement key="role" />,
			<GoPremium key="premium" />,
		]);
	}, [settings, postdatas, autoCreateLinkSettings, termsData, tracking, query]);

	if (isInitialLoading) {
		return (
			<React.Fragment>
				<Topbar label={__('BetterLinks Settings', 'betterlinks')} />
				<SettingsLoader />
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			<Topbar label={__('BetterLinks Settings', 'betterlinks')} />
			<Tabs defaultIndex={currentTab == 'true' ? 2 : advancedTab == 'true' ? 1 : 0}>
				<TabList>
					{tabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>
				{tabPanel.map((item, index) => {
					return <TabPanel key={index}>{item}</TabPanel>;
				})}
			</Tabs>
			{migration && <Migration mode={migration} />}
			<Docs />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	settings: state.settings,
	postdatas: state.postdatas,
	terms: state.terms,
});

const mapDispatchToProps = (dispatch) => {
	return {
		prefetchAllSettingsData: bindActionCreators(prefetchAllSettingsData, dispatch),
		setAutoCreateLinkSettings: bindActionCreators(setAutoCreateLinkSettings, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
