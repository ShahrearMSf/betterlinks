const { useEffect } = wp.element;
const { Spinner } = wp.components;

export const LoadingSpinner = ({ anchorRect = {} }) => {
	useEffect(() => {
		document?.body?.classList?.add('betterlinks-loading-spinner-mounted');
		return () => {
			document?.body?.classList?.remove('betterlinks-loading-spinner-mounted');
		};
	}, []);
	return (
		<div className="betterlinks-submitted-link-for-gutenberg">
			<Spinner />
		</div>
	);
};
