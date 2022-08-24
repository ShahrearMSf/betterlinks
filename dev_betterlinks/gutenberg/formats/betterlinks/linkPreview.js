// WordPress Imports
const {
	useState,
	useEffect,
	useRef,
	// useMemo,
} = wp.element;
// const {
// 	//
// 	// Button
// 	Popover,
// } = wp.components;

export const LinkPreview = ({ close, activeAttributes }) => {
	const [showFormatTooltip, setShowFormatTooltip] = useState(false);

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

		const btnEl = btnRef?.current;
		if (btnEl) {
			btnEl.focus();
			btnEl.closest('body').classList.add('betterlinks-format-link-preview-mounted');
		}
		console.log('----LinkPreview useEffec runned with []', { btnEl });

		return () => {
			close();
			const btnEl = btnRef?.current;
			if (btnEl) {
				btnEl.focus();
				btnEl.closest('body').classList.remove('betterlinks-format-link-preview-mounted');
			}
			console.log('----LinkPreview component cleanup runned', { btnEl });
		};
	}, []);

	const handleChangeLink = () => {
		console.log('----------handleChangeLink fired');
	};

	const handleEditBetterLink = () => {
		console.log('----------handleEditBetterLink fired');
	};

	const { url } = activeAttributes;

	return (
		<div className="betterlinks-format-link-preview-wrapper">
			<a href={url} target="_blank">
				{url?.replace(/^https?\:\/\//gi, '')}
				<i class="btl btl-visit-url"></i>
			</a>

			<button className="betterlinks-format-change-link btl-tooltip" onClick={handleChangeLink} ref={btnRef}>
				<span className="dashicons dashicons-edit"></span>
				<span class="btl-tooltiptext">Change Link</span>
			</button>

			<button
				className="betterlinks-format-edit-link icon btl-tooltip"
				onMouseEnter={() => setShowFormatTooltip(true)}
				onMouseLeave={() => setShowFormatTooltip(false)}
				onClick={handleEditBetterLink}
				ref={btnRef}
			>
				<i class="btl btl-edit"></i>
				<span class="btl-tooltiptext">Edit In Betterlinks</span>
			</button>
		</div>
	);
};
