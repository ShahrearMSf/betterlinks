import { __ } from '@wordpress/i18n';
import ProBadge from 'components/Badge/ProBadge';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { is_pro_enabled } from 'utils/helper';
import BrokenLinks from 'components/Teasers/BrokenLinks';
import FullSiteLinkChecker from 'components/Teasers/FullSiteLinkChecker.js';

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
				{/* <div className="btl-tab-panel-inner" style={{ height: 'fit-content' }}> */}
				{brokenLinkCheckerTabPanelList.map((item, index) => {
					return <TabPanel key={index}>{item}</TabPanel>;
				})}
				{/* </div> */}
			</Tabs>
		</>
	);
};

export default TabsBrokenLinkChecker;
