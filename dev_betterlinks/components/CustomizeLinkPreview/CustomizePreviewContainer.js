import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Facebook, Linkedin, Twitter } from './SocialPreview';

const socialMedia = [__('Facebook', 'betterlinks'), __('X (Formerly Twitter)', 'betterlinks'), __('LinkedIn', 'betterlinks')];
const CustomizePreviewContainr = () => {
	return (
		<div className="btl-modal-customize-link-preview-box">
			<h3 class="btl-modal-customize-link-preview__title">{__('Social Link Preview', 'betterlinks')}</h3>
			<Tabs>
				<TabList>
					{socialMedia.map((item, index) => (
						<Tab key={index}>{item}</Tab>
					))}
				</TabList>
				{[<Facebook />, <Twitter />, <Linkedin />].map((item, index) => {
					return <TabPanel key={index}>{item}</TabPanel>;
				})}
			</Tabs>
		</div>
	);
};

export default CustomizePreviewContainr;
