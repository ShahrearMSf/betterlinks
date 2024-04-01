import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import CreateLinkExternally from 'components/CreateLinkExternally';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import CustomizeMetaTags from 'components/Teasers/CustomizeMetaTags';
import ExternalAnalytics from 'components/Teasers/ExternalAnalytics';
import PasswordProtection from 'components/Teasers/PasswordProtection';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { is_pro_enabled } from 'utils/helper';
import CustomFields from './CustomFields';

const TabsOptions = ({ settings, autoCreateLinkSettings, terms, trackingSettings, setTrackingSettings, setAutoCreateLinkSettings }) => {
	const tabList = [
		__('Create Link Externally', 'betterlinks'),
		{
			label: __('Custom Fields', 'betterlinks'),
			type: 'free',
		},
		{
			label: __('Tracking', 'betterlinks'),
			type: 'pro',
		},
		{
			label: __('Auto-Create Links', 'betterlinks'),
			type: 'pro',
		},
		{
			label: __('Affiliate Link Disclosure', 'betterlinks'),
			type: 'pro',
		},
		{
			label: __('Password Protected Redirect', 'betterlinks'),
			type: 'pro',
		},
		{
			label: __('Customize Link Preview', 'betterlinks'),
			type: 'pro',
		},
	];
	const panelList = [
		<CustomFields settings={settings} />,
		<CreateLinkExternally settings={settings} />,
		<ExternalAnalytics trackingSettings={trackingSettings} />,
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
