import { __ } from '@wordpress/i18n';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import CustomizeMetaTags from 'components/Teasers/CustomizeMetaTags';
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import PasswordProtection from 'components/Teasers/PasswordProtection';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabsOptions = ({ settings, autoCreateLinkSettings, terms, trackingSettings, setTrackingSettings, setAutoCreateLinkSettings }) => {
	const tabList = [
		__('Tracking', 'betterlinks'),
		__('Auto-Create Links', 'betterlinks'),
		__('Affiliate Link Disclosure', 'betterlinks'),
		__('Password Protected Redirect', 'betterlinks'),
		__('Customize Link Preview', 'betterlinks'),
	];
	const panelList = [
		<ExternalAnalytics trackingSettings={trackingSettings} setTrackingSettings={setTrackingSettings} />,
		<AutoLinkCreate autoCreateLinkSettings={autoCreateLinkSettings} terms={terms} setAutoCreateLinkSettings={setAutoCreateLinkSettings} />,
		<AffiliateLinkDisclosure settings={settings} />,
		<PasswordProtection settings={settings} />,
		<CustomizeMetaTags settings={settings} />,
	];
	const optionsTabList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabList', tabList);
	const optionsTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
	return (
		<div className="betterlinks-options-tabs-wrapper">
			<Tabs>
				<TabList>
					{optionsTabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>
				<div className="btl-tab-panel-inner" style={{ height: 'fit-content', width: '800px' }}>
					{optionsTabPanelList.map((item, index) => {
						return <TabPanel key={index}>{item}</TabPanel>;
					})}
				</div>
			</Tabs>
		</div>
	);
};

export default TabsOptions;
