import { __ } from '@wordpress/i18n';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabsOptions = ({ settings, autoCreateLinkSettings, terms }) => {
	const tabList = [__('Tracking', 'betterlinks'), __('Auto-Create Links', 'betterlinks'), __('Affiliate Link Disclosure', 'betterlinks')];
	const panelList = [<ExternalAnalytics />, <AutoLinkCreate autoCreateLinkSettings={autoCreateLinkSettings} terms={terms} />, <AffiliateLinkDisclosure settings={settings} />];
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
