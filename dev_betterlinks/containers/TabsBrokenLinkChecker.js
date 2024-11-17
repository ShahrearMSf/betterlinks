import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { is_pro_enabled } from 'utils/helper';
const BrokenLinks = lazy(() => import(/* webpackChunkName: "broken-links" */ 'components/Teasers/BrokenLinks'));
const FullSiteLinkChecker = lazy(() => import(/* webpackChunkName: "full-site-link-scanner" */ 'components/Teasers/FullSiteLinkChecker.js'));
import { lazy } from 'react';

const TabsBrokenLinkChecker = () => {
	const tabList = [
		{
			label: __('Full Site Link Scanner', 'betterlinks'),
			type: 'pro',
		},
		{
			label: __('BetterLinks Checker', 'betterlinks'),
			type: 'pro',
		},
	];
	const panelList = [<FullSiteLinkChecker />, <BrokenLinks />];
	const brokenLinkCheckerTabList = betterLinksHooks.applyFilters('betterLinksSettingsBrokenLinkCheckerTabList', tabList);
	const brokenLinkCheckerTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', panelList);
	return (
		<>
			<Tabs>
				<TabList>
					{brokenLinkCheckerTabList.map((item, index) => (
						<Tab key={index}>
							{item.label}
							{'pro' === item.type && !is_pro_enabled && <ProBadge />}
						</Tab>
					))}
				</TabList>
				{brokenLinkCheckerTabPanelList.map((item, index) => {
					return <TabPanel key={index}>{item}</TabPanel>;
				})}
			</Tabs>
		</>
	);
};

export default TabsBrokenLinkChecker;
