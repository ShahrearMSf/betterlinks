import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_post_types_data } from 'redux/actions/posttypesdata.actions';
import Topbar from 'containers/TopBar';
import TabsGeneral from 'containers/TabsGeneral';
import TabsTools from 'containers/TabsTools';
import Migration from 'containers/Migration';
import RoleManagement from 'components/Teasers/RoleManagement';
import BrokenLinks from 'components/Teasers/BrokenLinks';
import GoPremium from 'components/Teasers/GoPremium';
import Docs from 'components/Docs';
import TabsOptions from 'containers/TabsOptions';
import { is_pro_enabled, makeRequest } from 'utils/helper';
import { fetch_terms_data } from 'redux/actions/terms.actions';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Settings = (props) => {
	const [autoCreateLinkSettings, setAutoCreateLinkSettings] = useState({});
	const [trackingSettings, setTrackingSettings] = useState({});
	const query = useQuery();
	const currentTab = query.get('import');
	const migration = query.get('migration');
	const { settings } = props.settings;
	const { terms } = props.terms;
	let tabList = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabList', [
		__('General', 'betterlinks'),
		__('Advanced Options', 'betterlinks'),
		__('Tools', 'betterlinks'),
		__('Role Management', 'betterlinks'),
		__('Broken Link Checker', 'betterlinks'),
		__('Go Premium', 'betterlinks'),
	]);
	let tabPanel = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabPanel', [
		<TabsGeneral settings={settings} />,
		<TabsOptions
			settings={settings}
			autoCreateLinkSettings={autoCreateLinkSettings}
			terms={terms}
			trackingSettings={trackingSettings}
			setTrackingSettings={setTrackingSettings}
			setAutoCreateLinkSettings={setAutoCreateLinkSettings}
		/>,
		<TabsTools query={query} />,
		<RoleManagement />,
		<BrokenLinks />,
		<GoPremium />,
	]);
	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data();
		}
		if (!props.postdatas.fetchedAll) {
			props.fetch_post_types_data();
		}
		if (is_pro_enabled) {
			makeRequest({
				action: 'betterlinks/admin/get_auto_create_links_settings',
			}).then((response) => {
				if (response.data.data) {
					const settings = response.data.data;
					setAutoCreateLinkSettings({
						enable_auto_link: settings.enable_auto_link,
						post_shortlinks: settings.enable_auto_link && settings.post_shortlinks,
						post_default_cat: settings.enable_auto_link && settings.post_shortlinks && settings.post_default_cat,
						page_shortlinks: settings.enable_auto_link && settings.page_shortlinks,
						page_default_cat: settings.enable_auto_link && settings.page_shortlinks && settings.page_default_cat,
					});
				}
			});

			if (!props.terms) {
				props.fetch_terms_data();
			}

			// External Analytics settings
			makeRequest({
				action: 'betterlinks/admin/get_external_analytics',
			}).then((response) => {
				if (response.data) {
					setTrackingSettings({ ...response.data.data });
				}
			});
		}
	}, []);

	return (
		<React.Fragment>
			<Topbar label={__('BetterLinks Settings', 'betterlinks')} />
			<Tabs defaultIndex={currentTab == 'true' ? 2 : 0}>
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
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_post_types_data: bindActionCreators(fetch_post_types_data, dispatch),
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
