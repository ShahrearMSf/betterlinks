import React from 'react';
import ContentLoader from 'react-content-loader';
import BarLoader from './BarLoader';

const ChartLoader = () => (
	<>
		<br />
		<hr />
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<ContentLoader viewBox="0 0 300 300" height={300} width={'100%'}>
				<rect x="-4" y="7" rx="0" ry="0" width="317" height="24" />
				<circle cx="127" cy="187" r="112" />
				<rect x="1" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="22" y="45" rx="0" ry="0" width="47" height="12" />
				<rect x="81" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="103" y="46" rx="0" ry="0" width="47" height="10" />
				<rect x="161" y="46" rx="0" ry="0" width="12" height="12" />
				<rect x="193" y="46" rx="0" ry="0" width="47" height="12" />
			</ContentLoader>
			<ContentLoader viewBox="0 0 300 300" height={300} width={'100%'}>
				<rect x="-4" y="7" rx="0" ry="0" width="317" height="24" />
				<circle cx="127" cy="187" r="112" />
				<rect x="1" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="22" y="45" rx="0" ry="0" width="47" height="12" />
				<rect x="81" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="103" y="46" rx="0" ry="0" width="47" height="10" />
				<rect x="161" y="46" rx="0" ry="0" width="12" height="12" />
				<rect x="193" y="46" rx="0" ry="0" width="47" height="12" />
			</ContentLoader>
			<ContentLoader viewBox="0 0 300 300" height={300} width={'100%'}>
				<rect x="-4" y="7" rx="0" ry="0" width="317" height="24" />
				<circle cx="127" cy="187" r="112" />
				<rect x="1" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="22" y="45" rx="0" ry="0" width="47" height="12" />
				<rect x="81" y="45" rx="0" ry="0" width="12" height="12" />
				<rect x="103" y="46" rx="0" ry="0" width="47" height="10" />
				<rect x="161" y="46" rx="0" ry="0" width="12" height="12" />
				<rect x="193" y="46" rx="0" ry="0" width="47" height="12" />
			</ContentLoader>
		</div>
		<br />
		<hr />
		<div style={{ display: 'flex', justifyContent: 'space-around' }}>
			<BarLoader />
			<BarLoader />
			<BarLoader />
		</div>
	</>
);

export default ChartLoader;
