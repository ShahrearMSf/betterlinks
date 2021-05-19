import React, { Suspense } from 'react';
import Topbar from './group/TopBar';

// import ManageLinks from './pages/ManageLinks';
// import Analytics from './pages/Analytics';
// import Settings from './pages/Settings';

const ManageLinks = React.lazy(() => import('./pages/ManageLinks'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));

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

const Dashboard = () => {
	return (
		<React.Fragment>
			<Topbar currentPage={betterLinksQuery.get('page')} />
			<Suspense fallback="">{renderSwitch(betterLinksQuery.get('page'))}</Suspense>
		</React.Fragment>
	);
};
export default Dashboard;
