import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Topbar from './../group/TopBar';
import TabsGeneral from './../group/TabsGeneral';
import TabsTools from './../group/TabsTools';
const Settings = () => {
	return (
		<React.Fragment>
			<Topbar />
			<Tabs>
				<TabList>
					<Tab>General</Tab>
					<Tab>Tools</Tab>
				</TabList>

				<TabPanel>
					<TabsGeneral />
				</TabPanel>
				<TabPanel>
					<TabsTools />
				</TabPanel>
			</Tabs>
		</React.Fragment>
	);
};
export default Settings;
