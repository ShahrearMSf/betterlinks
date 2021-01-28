import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLocation } from 'react-router-dom';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

import 'react-tabs/style/react-tabs.css';
import Topbar from './../group/TopBar';
import TabsGeneral from './../group/TabsGeneral';
import TabsTools from './../group/TabsTools';
import Migration from './../group/Migration';
const Settings = () => {
	const query = useQuery();
	const currentTab = query.get('import');
	const migration = query.get('migration');
	return (
		<React.Fragment>
			<Topbar />
			<Tabs defaultIndex={currentTab == 'true' ? 1 : 0}>
				<TabList>
					<Tab>General</Tab>
					<Tab>Tools</Tab>
				</TabList>

				<TabPanel>
					<TabsGeneral />
				</TabPanel>
				<TabPanel>
					<TabsTools query={query} />
				</TabPanel>
			</Tabs>
			{migration && <Migration />}
		</React.Fragment>
	);
};
export default Settings;
