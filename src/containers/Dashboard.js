import React from 'react';
import Settings from './Settings';
import Clicks from './Clicks';

const Dashboard = ({ query }) => {
	return <React.Fragment>{query.get('page') == 'betterlinks' ? <Settings /> : <Clicks />}</React.Fragment>;
};
export default Dashboard;
