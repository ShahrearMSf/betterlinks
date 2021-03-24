import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_settings_data } from './../../redux/actions/settings.actions';
import 'react-tabs/style/react-tabs.css';
import TabsGeneral from './../group/TabsGeneral';
import TabsTools from './../group/TabsTools';
import Migration from './../group/Migration';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Settings = (props) => {
	const query = useQuery();
	const currentTab = query.get('import');
	const migration = query.get('migration');
	const { settings } = props.settings;
	let tabList = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabList', [__('General', 'betterlinks'), __('Tools', 'betterlinks')]);
	let tabPanel = betterLinksHooks.applyFilters('betterLinksSettingsFilterTabPanel', [<TabsGeneral settings={settings} />, <TabsTools query={query} />]);
	useEffect(() => {
		if (!settings) {
			props.fetch_settings_data();
		}
	}, []);
	return (
		<React.Fragment>
			<Tabs defaultIndex={currentTab == 'true' ? 1 : 0}>
				<TabList>
					{tabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>
				{tabPanel.map((item, index) => (
					<TabPanel key={index}>{item}</TabPanel>
				))}
			</Tabs>
			{migration && <Migration mode={migration} />}
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	settings: state.settings,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
