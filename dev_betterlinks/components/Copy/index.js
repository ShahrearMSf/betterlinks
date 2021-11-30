import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { copyShortUrl } from 'utils/helper';
const propTypes = {
	siteUrl: PropTypes.string,
	shortUrl: PropTypes.string,
};

const defaultProps = {};

export default function Copy({ siteUrl, shortUrl }) {
	const [isCopyUrl, setCopyUrl] = useState(false);
	const copyShortUrlHandler = (shortUrl) => {
		copyShortUrl(shortUrl);
		setCopyUrl(true);
	};
	return (
		<button type="button" onClick={() => copyShortUrlHandler(shortUrl)} className="btl-link-copy-button">
			{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-copy"></i>}
		</button>
	);
}

Copy.propTypes = propTypes;
Copy.defaultProps = defaultProps;
