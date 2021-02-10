import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { site_url, plugin_root_url, copyToClipboard } from './../../utils/helper';
const LinkCopyUrl = (props) => {
	const [isCopyUrl, setCopyUrl] = useState(false);
	const copyShortUrl = (url) => {
		copyToClipboard(url);
		setCopyUrl(true);
		window.setTimeout(function () {
			setCopyUrl(false);
		}, 3000);
	};
	return (
		<React.Fragment>
			<div className="btl-short-url-wrapper">
				<span className="btl-short-url">{site_url + '/' + props.shortUrl}</span>
				<button className="btl-short-url-copy-button btl-tooltip" onClick={() => copyShortUrl(site_url + '/' + props.shortUrl)}>
					<span className="icon">
						{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <img width="25" src={plugin_root_url + '/assets/images/copy-icon.svg'} alt="icon" />}
					</span>
					<span className="btl-tooltiptext">{__('Copy Link', 'betterlinks')}</span>
				</button>
			</div>
		</React.Fragment>
	);
};
export default LinkCopyUrl;
