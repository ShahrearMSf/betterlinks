import React from 'react';
import ContentLoader from 'react-content-loader';

const BarLoader = () => (
	<ContentLoader width={'100%'} height={'100%'} viewBox="0 0 350 300">
		<rect x="6" y="24" rx="0" ry="0" width="57" height="259" />
		<rect x="76" y="89" rx="0" ry="0" width="57" height="195" />
		<rect x="144" y="120" rx="0" ry="0" width="57" height="167" />
		<rect x="214" y="163" rx="0" ry="0" width="57" height="123" />
		<rect x="282" y="53" rx="0" ry="0" width="57" height="233" />
	</ContentLoader>
);

export default BarLoader;
