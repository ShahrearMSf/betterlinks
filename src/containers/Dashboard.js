import React from 'react';
import ManageLinks from './pages/ManageLinks';
import Analytics from './pages/Analytics';

const Dashboard = ({ query }) => {
	return <React.Fragment>{query.get('page') == 'betterlinks' ? <ManageLinks /> : <Analytics />}</React.Fragment>;
};
export default Dashboard;
