import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import CreateLinkExternally from 'components/CreateLinkExternally';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import CustomizeMetaTags from 'components/Teasers/CustomizeMetaTags';
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import PasswordProtection from 'components/Teasers/PasswordProtection';
import ShortLinkGenerator from 'components/ShortLinkGenerator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { is_fbs_enabled, is_pro_enabled } from 'utils/helper';
import CustomFields from './CustomFields';
import { tabList } from 'utils/data';
import FluentBoardSettings from 'components/FluentBoardSettings';
import AutoLinkKeywords from 'components/Teasers/AutoLinkKeywords';
import UTMBuilderGlobalSettings from 'components/UTMBuilderGlobalSettings';

const TabsOptions = ({ settings, postdatas, autoCreateLinkSettings, terms, trackingSettings, setAutoCreateLinkSettings }) => {
	const panelList = [
		<CustomFields settings={settings} />,
		<UTMBuilderGlobalSettings settings={settings} />,
		<CreateLinkExternally settings={settings} terms={terms} />,
		is_fbs_enabled && <FluentBoardSettings settings={settings} terms={terms} />,
		<ExternalAnalytics trackingSettings={trackingSettings} />,
		<AutoLinkCreate autoCreateLinkSettings={autoCreateLinkSettings} terms={terms} setAutoCreateLinkSettings={setAutoCreateLinkSettings} />,
		<AffiliateLinkDisclosure settings={settings} postTypes={postdatas?.postTypes || []} />,
		<PasswordProtection settings={settings} />,
		<CustomizeMetaTags settings={settings} />,
		<AutoLinkKeywords settings={settings} postdatas={postdatas} />,
		<ShortLinkGenerator />,
	].filter(Boolean);
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
