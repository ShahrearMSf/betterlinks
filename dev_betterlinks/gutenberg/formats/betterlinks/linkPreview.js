const {
	// useState,
	useEffect,
	// useRef,
	// useMemo,
} = wp.element;

export const LinkPreview = ({ close }) => {
	useEffect(() => {
		return () => {
			console.log('----LinkPreview component cleanup runned');
			close();
		};
	}, []);

	return (
		<>
			<h1>test bar</h1>
		</>
	);
};
