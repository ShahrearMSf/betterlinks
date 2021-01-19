import React from 'react';
import ManageLinks from './pages/ManageLinks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const renderSwitch = (param) => {
	switch (param) {
		case 'betterlinks':
			return <ManageLinks />;
		case 'betterlinks-analytics':
			return <Analytics />;
		case 'betterlinks-settings':
			return <Settings />;
		default:
			return;
	}
};

const Dashboard = ({ query }) => {
	return <React.Fragment>{renderSwitch(query.get('page'))}</React.Fragment>;
};
export default Dashboard;
