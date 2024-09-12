import React, { lazy, Suspense } from 'react';
// import ManageLinks from 'pages/ManageLinks';
// import Analytics from 'pages/Analytics';
// import Settings from 'pages/Settings';
// import KeywordsLinking from 'pages/KeywordsLinking';
import { __ } from '@wordpress/i18n';
// import ManageTags from './ManageTags';
// import CustomDomain from './CustomDomain';
// import LinkScanner from './LinkScanner';
const LinkScanner = lazy(() => import(/* webpackChunkName: "link-scanner" */ './LinkScanner'));
const ManageLinks = lazy(() => import(/* webpackChunkName: "manage-links" */ './ManageLinks'));
const Analytics = lazy(() => import(/* webpackChunkName: "analytics" */ './Analytics'));
const Settings = lazy(() => import(/* webpackChunkName: "settings" */ './Settings'));
const KeywordsLinking = lazy(() => import(/* webpackChunkName: "keyword-linking" */ './KeywordsLinking'));
const ManageTags = lazy(() => import(/* webpackChunkName: "manage-tags" */ './ManageTags'));
const CustomDomain = lazy(() => import(/* webpackChunkName: "custom-domain" */ './CustomDomain'));

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
		default:
			return;
	}
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
			<Suspense fallback="">{renderSwitch(betterLinksQuery.get('page'))}</Suspense>
		</React.Fragment>
	);
};
export default Dashboard;
