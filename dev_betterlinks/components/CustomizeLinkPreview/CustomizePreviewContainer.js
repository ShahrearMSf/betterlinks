import { __ } from '@wordpress/i18n';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Facebook, Linkedin, Twitter } from './SocialPreview';
import { is_pro_enabled, site_url as site_link } from 'utils/helper';
const site_url = (is_pro_enabled && localStorage.getItem('btl_custom_domain')) || site_link;

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
				{[<Facebook site_url={site_url} />, <Twitter site_url={site_url} />, <Linkedin site_url={site_url} />].map((item, index) => {
					return <TabPanel key={index}>{item}</TabPanel>;
				})}
			</Tabs>
		</div>
	);
};

export default CustomizePreviewContainr;
