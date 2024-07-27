import React, { Suspense } from 'react';
import ManageLinks from 'pages/ManageLinks';
import Analytics from 'pages/Analytics';
import Settings from 'pages/Settings';
import KeywordsLinking from 'pages/KeywordsLinking';
import { __ } from '@wordpress/i18n';
import ManageTags from './ManageTags';
import CustomDomain from './CustomDomain';
import LinkScanner from './LinkScanner';

const renderSwitch = (param) => {
	// window.scrollTo(0, 0);
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
