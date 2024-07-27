import { __ } from '@wordpress/i18n';
import { is_pro_enabled, site_url as site_link } from 'utils/helper';
import LinkCopyButton from './LinkCopyButton';

const LinkCopyUrl = (props) => {
	const site_url = betterLinksHooks.applyFilters('site_url', site_link);
	return (
		<React.Fragment>
			<div className="btl-short-url-wrapper">
				<span className="btl-short-url">{site_url + '/' + props.shortUrl}</span>
				<LinkCopyButton shortUrl={props.shortUrl} />
			</div>
		</React.Fragment>
	);
};
export default LinkCopyUrl;
