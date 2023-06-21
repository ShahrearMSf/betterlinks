import React, { useEffect } from 'react';
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
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import BrokenLinks from 'components/Teasers/BrokenLinks';
import GoPremium from 'components/Teasers/GoPremium';
import Docs from 'components/Docs';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Settings = (props) => {
	const query = useQuery();
	const currentTab = query.get('import');
	const migration = query.get('migration');
	const { settings } = props.settings;
	let tabList = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabList', [
		__('General', 'betterlinks'),
		__('Tools', 'betterlinks'),
		__('Role Management', 'betterlinks'),
		__('Tracking', 'betterlinks'),
		__('Broken Link Checker', 'betterlinks'),
		__('Auto Link Create', 'betterlinks'),
		__('Go Premium', 'betterlinks'),
	]);
	let tabPanel = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabPanel', [
		<TabsGeneral settings={settings} />,
		<TabsTools query={query} />,
		<RoleManagement />,
		<ExternalAnalytics />,
		<BrokenLinks />,
		<AutoLinkCreate />,
		<GoPremium />,
	]);
	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data();
		}
		if (!props.postdatas.fetchedAll) {
			props.fetch_post_types_data();
		}
	}, []);

	return (
		<React.Fragment>
			<Topbar label={__('BetterLinks Settings', 'betterlinks')} />
			<Tabs defaultIndex={currentTab == 'true' ? 1 : 0}>
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
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_post_types_data: bindActionCreators(fetch_post_types_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
