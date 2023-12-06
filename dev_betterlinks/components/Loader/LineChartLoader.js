import ContentLoader from 'react-content-loader';

const LineChartLoader = () => {
	return (
		<ContentLoader speed={2} width={'100%'} height={'100%'} viewBox="0 0 600 84" backgroundColor="#f5f5f5" foregroundColor="#f1e9e9">
			<circle cx="93" cy="111" r="71" />
			<circle cx="217" cy="87" r="65" />
			<circle cx="331" cy="60" r="60" />
			<circle cx="427" cy="91" r="44" />
			<circle cx="528" cy="71" r="58" />
			<circle cx="542" cy="77" r="24" />
			<circle cx="488" cy="51" r="47" />
		</ContentLoader>
	);
};

export default LineChartLoader;
