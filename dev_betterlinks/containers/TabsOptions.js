import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import CreateLinkExternally from 'components/CreateLinkExternally';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import CustomizeMetaTags from 'components/Teasers/CustomizeMetaTags';
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import PasswordProtection from 'components/Teasers/PasswordProtection';
import ShortLinkCustomDomain from 'components/Teasers/ShortLinkCustomDomain';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { is_pro_enabled } from 'utils/helper';
import CustomFields from './CustomFields';
import { tabList } from 'utils/data';

const TabsOptions = ({ settings, autoCreateLinkSettings, terms, trackingSettings, setAutoCreateLinkSettings }) => {
	const panelList = [
		<CustomFields settings={settings} />,
		<CreateLinkExternally settings={settings} terms={terms} />,
		<ExternalAnalytics trackingSettings={trackingSettings} />,
		<AutoLinkCreate autoCreateLinkSettings={autoCreateLinkSettings} terms={terms} setAutoCreateLinkSettings={setAutoCreateLinkSettings} />,
		<AffiliateLinkDisclosure settings={settings} />,
		<PasswordProtection settings={settings} />,
		<CustomizeMetaTags settings={settings} />,
		<ShortLinkCustomDomain settings={settings} />,
	];
	const optionsTabList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabList', tabList);
	const optionsTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
	return (
		<div className="betterlinks-options-tabs-wrapper">
			<Tabs>
				<TabList>
					{optionsTabList.map((item, index) => (
						<Tab key={index}>
							{item.label}
							{'pro' === item.type && !is_pro_enabled && <ProBadge />}
						</Tab>
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
