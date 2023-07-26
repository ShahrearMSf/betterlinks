import { __ } from '@wordpress/i18n';
import { site_url } from 'utils/helper';
import LinkCopyButton from './LinkCopyButton';

const LinkCopyUrl = (props) => {
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
