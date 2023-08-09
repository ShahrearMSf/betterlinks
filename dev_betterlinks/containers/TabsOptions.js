import { __ } from '@wordpress/i18n';
import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabsOptions = ({ settings }) => {
	const optionsTabList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabList', [__('Affiliate Link Disclosure', 'betterlinks')]);
	const optionsTabPanelList = betterLinksHooks.applyFilters('betterLinksSettingsOptionsTabPanelList', [<AffiliateLinkDisclosure settings={settings} />]);
	return (
		<div className="betterlinks-options-tabs-wrapper">
			<Tabs>
				<TabList>
					{optionsTabList.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>
				<div>
					{optionsTabPanelList.map((item, index) => {
						return <TabPanel key={index}>{item}</TabPanel>;
					})}
				</div>
			</Tabs>
		</div>
	);
};

export default TabsOptions;
