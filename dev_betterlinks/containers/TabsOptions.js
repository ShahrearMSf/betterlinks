import AffiliateLinkDisclosure from 'components/Teasers/AffiliateLinkDisclosure';
import AutoLinkCreate from 'components/Teasers/AutoLinkCreate';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const TabsOptions = () => {
	return (
		<div className="betterlinks-options-tabs-wrapper">
			<Tabs>
				<TabList>
					<Tab>Auto Create Links</Tab>
					<Tab>Affiliate Link Disclosure</Tab>
				</TabList>
				<div>
					<TabPanel>
						<AutoLinkCreate />
					</TabPanel>
					<TabPanel>
						<AffiliateLinkDisclosure />
					</TabPanel>
				</div>
			</Tabs>
		</div>
	);
};

export default TabsOptions;
