const {
	// useState,
	useEffect,
	useRef,
	// useMemo,
} = wp.element;

export const LinkPreview = ({ close, activeAttributes }) => {
	const btnRef = useRef(null);

	useEffect(() => {
		// clearing all selection
		if (getSelection().empty) {
			// Chrome
			getSelection().empty();
		} else if (getSelection().removeAllRanges) {
			// Firefox
			getSelection().removeAllRanges();
		}

		//
		if (btnRef?.current) {
			btnRef.current.focus();
		}

		return () => {
			console.log('----LinkPreview component cleanup runned');
			close();
		};
	}, []);

	const handlePreviewLinkEditClick = () => {
		console.log('----------handlePreviewLinkEditClick fired');
	};

	const { url } = activeAttributes;

	return (
		<div className="betterlinks-format-link-preview-wrapper">
			<a href={url} target="_blank">
				{url?.replace(/^https?\:\/\//gi, '')}
				<i class="btl btl-visit-url"></i>
			</a>
			<button onClick={handlePreviewLinkEditClick} ref={btnRef}>
				<span className="dashicons dashicons-edit"></span>
			</button>
		</div>
	);
};
