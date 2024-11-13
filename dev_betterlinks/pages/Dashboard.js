import React, { Suspense, lazy } from 'react';
// import ManageLinks from 'pages/ManageLinks';
// import Analytics from 'pages/Analytics';
// import Settings from 'pages/Settings';
// import KeywordsLinking from 'pages/KeywordsLinking';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';
// import ManageTags from './ManageTags';
// import CustomDomain from './CustomDomain';
// import QuickSetup from './QuickSetup';

const ManageLinks = lazy(() => import(/* webpackChunkName: "ManageLinks" */ 'pages/ManageLinks'));
const Analytics = lazy(() => import(/* webpackChunkName: "Analytics" */ 'pages/Analytics'));
const Settings = lazy(() => import(/* webpackChunkName: "Settings" */ 'pages/Settings'));
const KeywordsLinking = lazy(() => import(/* webpackChunkName: "KeywordsLinking" */ 'pages/KeywordsLinking'));
const ManageTags = lazy(() => import(/* webpackChunkName: "ManageTags" */ 'pages/ManageTags'));
const CustomDomain = lazy(() => import(/* webpackChunkName: "CustomDomain" */ 'pages/CustomDomain'));
const QuickSetup = lazy(() => import(/* webpackChunkName: "QuickSetup" */ './QuickSetup'));
// const QuickSetup = lazy(() => )

const renderSwitch = (param) => {
	switch (param) {
		case 'betterlinks':
			return <ManageLinks />;
		case 'betterlinks-keywords-linking':
			return <KeywordsLinking />;
		case 'betterlinks-analytics':
			return <Analytics />;
		case 'betterlinks-manage-tags':
			return <ManageTags />;
		case 'betterlinks-custom-domain':
			return <CustomDomain />;
		case 'betterlinks-link-scanner':
			return <LinkScanner />;
		case 'betterlinks-settings':
			return <Settings />;
		case 'betterlinks-quick-setup':
			return <QuickSetup />;
		default:
			return;
	}
};
const Loading = () => {
	return (
		<div className="betterlinks-loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
			<img style={{ width: '100px', height: '100px' }} src={`${plugin_root_url}assets/images/dark-mode-loader.gif`} />
		</div>
	);
};
const Dashboard = ({ notice }) => {
	return (
		<React.Fragment>
			{notice && (
				<div className="notice notice-warning" style={{ marginBottom: '10px' }}>
					<p>
						<b>{__('Caution!', 'betterlinks')}</b> {__('To ensure proper functionality, Please activate BetterLinks REST API endpoints.', 'betterlinks')}
					</p>
				</div>
			)}
			<Suspense fallback={<Loading />}>{renderSwitch(betterLinksQuery.get('page'))}</Suspense>
		</React.Fragment>
	);
};
export default Dashboard;
