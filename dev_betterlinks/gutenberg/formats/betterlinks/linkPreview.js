// WordPress Imports
const {
	useState,
	useEffect,
	useRef,
	// useMemo,
} = wp.element;
const {
	//
	// Button
	Popover,
} = wp.components;

// redux import
import { betterlinksGutenStore } from 'redux/store';
// import {
// 	// //
// 	// fetch_links_data,
// 	// onDragEnd,
// 	// add_new_cat,
// 	// add_new_link,
// 	// delete_link,
// edit_link,
// } from 'redux/actions/links.actions';

// internal imports
// import { Link } from 'containers/Link';
import {
	// makeLinkFormat,
	// generateShortURL,
	// generateSlug,
	// formatDate,
	// betterlinks_nonce,
	// //
	// siteUrlWithoutHttp,
	// siteUrlRegex,
	getShortUrlFromLink,
} from 'utils/helper';

export const LinkPreview = ({ reset, activeAttributes, value, removeBtlFormat, setIsChangeLink, setShowLinkModal, setLinkData, close }) => {
	const { url } = activeAttributes;

	const [islinkNotFound, setIslinkNotFound] = useState(false);

	const btnRef = useRef(null);

	useEffect(() => {
		const btnEl = btnRef?.current;
		if (btnEl) {
			btnEl.closest('body')?.classList?.add('betterlinks-format-link-preview-mounted');
		}
		console.log('----LinkPreview useEffec runned with []', { btnEl });

		return () => {
			reset();
			const btnEl = btnRef?.current;
			if (btnEl) {
				btnEl.closest('body')?.classList?.remove('betterlinks-format-link-preview-mounted');
			}
			setIslinkNotFound(false);
			console.log('----LinkPreview component cleanup runned', { btnEl });
		};
	}, [value.start, value.end]);

	const handleChangeLink = () => {
		console.log('----------handleChangeLink fired');
		setIsChangeLink(true);
	};

	const handleEditBetterLink = () => {
		const justShortlink = getShortUrlFromLink({ url });
		const foundLink = (betterlinksGutenStore?.getState()?.links?.links || []).find((item) => item.short_url === justShortlink);
		console.log('----------handleEditBetterLink fired', {
			justShortlink,
			url,
			foundLink,
		});
		if (foundLink) {
			setShowLinkModal(true);
			setLinkData(foundLink);
		} else {
			setIslinkNotFound(true);
		}
	};

	return (
		<>
			<div className="betterlinks-format-link-preview-wrapper">
				<a href={url} target="_blank">
					{url?.replace(/^https?\:\/\//gi, '')}
					<i className="btl btl-visit-url"></i>
				</a>

				<button className="betterlinks-format-change-link btl-tooltip" onClick={handleChangeLink} ref={btnRef}>
					<span className="dashicons dashicons-edit"></span>
					<span className="btl-tooltiptext">Change Link</span>
				</button>

				<button
					className="betterlinks-format-edit-link icon btl-tooltip"
					onClick={() => {
						handleEditBetterLink();
					}}
					ref={btnRef}
				>
					<i className="btl btl-edit"></i>
					<span className="btl-tooltiptext">Edit In BetterLinks</span>
				</button>

				<button
					className="betterlinks-format-remove-link btl-tooltip"
					onClick={() => {
						removeBtlFormat(value);
						close();
					}}
					ref={btnRef}
				>
					<span className="dashicons dashicons-editor-unlink"></span>
					<span className="btl-tooltiptext">Remove Link</span>
				</button>
			</div>

			{islinkNotFound && (
				<Popover position="left" focusOnMount={false} className="betterlinks-link-deleted-after-applying-format">
					<h5 style={{ width: '400px', color: 'red', padding: '0 20px' }}>
						Error!! Link not found. You probably 'changed the short url' or 'deleted this link' from your betterlinks. <br />
						<button
							onClick={() => {
								handleChangeLink();
								setIslinkNotFound(false);
							}}
						>
							click here
						</button>{' '}
						to apply a new link here
					</h5>
				</Popover>
			)}
		</>
	);
};
