// wordpress imports
const { __ } = wp.i18n;
const { create, insert, isCollapsed, applyFormat, useAnchorRef, removeFormat, slice, replace } = wp.richText;
const { useState, useEffect, useRef, useMemo, createInterpolateElement } = wp.element;
const { Popover, Button, ToggleControl, TextControl } = wp.components;
const { RichTextToolbarButton, URLPopover } = wp.blockEditor;
const { useSelect } = wp.data;
const { getRectangleFromRange } = wp.dom;
import { keyboardReturn } from '@wordpress/icons';

// external library imports
import reactStringReplace from 'react-string-replace';

// redux imports
import { gutenStore } from 'redux/store';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';

// local imports
import { betterlinksIcon } from './icon';
import { makeAllLinksArr } from 'utils/helper';

const name = 'betterlinks/link-format';
const title = __('Betterlinks');

export const betterlinksFormat = {
	name,
	title,
	tagName: 'a',
	className: 'betterlinks-linked-text',
	attributes: {
		url: 'href',
		target: 'target',
	},
	edit: ({ isActive, contentRef, value, onChange }) => {
		console.log('---betterlinks/link-format edit:', { isActive });

		const [gutenStoreLinks, setgutenStoreLinks] = useState([]);
		const [isVisible, setVisiblility] = useState(false);
		const [searchedText, setSearchedText] = useState('');
		const [matchedLinks, setMatchedLinks] = useState([]);
		const [matchedLinksJsx, setMatchedLinksJsx] = useState(null);

		useEffect(() => {
			//  if needed to scroll to found elements popover ul -> start
			//
			// const scrollableFoundItems = document.querySelector('.btl-url-popover-slot + .components-popover .components-popover__content');
			// const firstLiOffsetTop = scrollableFoundItems.querySelector('li:first-child')?.OffsetTop;
			// const lastLiOffsetTop = scrollableFoundItems.querySelector('li:last-child')?.OffsetTop;
			// //
			// scrollableFoundItems.scrollTop = firstLiOffsetTop;
			// scrollableFoundItems.scrollTop = lastLiOffsetTop;
			//
			//  if needed to scroll to found elements popover ul -> end

			//
			document.body.classList.add('betterlinks-formatting-enabled');
			return () => {
				document.body.classList.remove('betterlinks-formatting-enabled');
			};
		}, [isVisible]);

		const onClick = () => {
			setVisiblility(true);

			const allLinksArr = makeAllLinksArr(gutenStore);
			if (allLinksArr) {
				return setgutenStoreLinks(allLinksArr);
			}

			fetch_links_data()(gutenStore.dispatch)
				.then(() => {
					const allLinksArr = makeAllLinksArr(gutenStore);
					if (allLinksArr) {
						return setgutenStoreLinks(allLinksArr);
					}
				})
				.catch((err) => console.log({ err }));
		};

		console.log({ gutenStoreLinks });

		const close = () => {
			setVisiblility(false);
			setSearchedText('');
			setMatchedLinks([]);
			setMatchedLinksJsx(null);
		};
		const setTarget = () => {};

		const handleSubmit = (e) => {
			console.log('----handleSubmit', { e });
			e.preventDefault();
			close();
			onChange(
				applyFormat(value, {
					type: 'core/link',
					attributes: {
						url: 'alexa.com',
						rel: 'nofollow noindex sponsored noreferrer noopener',
						target: '_blank',
						'aria-label': 'alexa (opens in new tab)',
					},
				})
			);
		};

		const handleMatchedLiClick = (shortUrl) => {
			console.log('site url:----', betterLinksGlobal.site_url);
		};

		const handleUrlInputChange = (e) => {
			const value = e?.target?.value;
			console.log('---handleUrlInputChange:', { e, value });
			setSearchedText(value || '');
			const spacesRemoved = value.replace(/\s+/g, '');
			if (spacesRemoved.length < 2) {
				return setMatchedLinks([]);
			}
			const regex = new RegExp(
				// wrapped 'inputValue' with parenthesis to use regex capturegroup and use it later inside 'string.replace' function like: '$1'
				`(${value})`,
				'gi'
			);
			const matchedLinks = gutenStoreLinks.filter(
				(item) => regex.test(item.link_title)
				// || regex.test(item.short_url)
			);
			setMatchedLinks(matchedLinks);

			setMatchedLinksJsx(
				matchedLinks.map((item, index) => {
					const title = reactStringReplace(
						// used DomPersar to convert the html entities back to the unescaped actual value & show it to preview
						new DOMParser().parseFromString(item.link_title, 'text/html').documentElement.textContent,
						regex,
						(match, i) => {
							return (
								<span key={i} className="hl">
									{match}
								</span>
							);
						}
					);
					// const shortUrl = reactStringReplace(item.short_url, regex, (match, i) => (
					// 	<span key={i} class="hl">
					// 		{match}
					// 	</span>
					// ));
					return (
						<li
							index={index}
							key={item.ID}
							onClick={() => {
								handleMatchedLiClick(item.short_url);
							}}
							className={`betterlinks-suggessted-link-li `}
						>
							{title}
							{
								// shortUrl
							}
						</li>
					);
				})
			);

			console.log('---handleUrlInputChange', { matchedLinks });
		};

		const anchorRect = useMemo(() => {
			const selection = window.getSelection();
			const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			if (!range) {
				return false;
			}

			if (isVisible) {
				const elRectFromRange = getRectangleFromRange(range);
				console.log({ elRectFromRange });
				return elRectFromRange;
			}

			console.log("----'if isVisible' checked out to be false");

			// let element = range.startContainer;

			// // If the caret is right before the element, select the next element.
			// element = element.nextElementSibling || element;

			// while (element.nodeType !== window.Node.ELEMENT_NODE) {
			// 	element = element.parentNode;
			// }

			// const closest = element.closest('a');
			// if (closest) {
			// 	return closest.getBoundingClientRect();
			// }
		}, [isVisible, value.start, value.end]);

		return (
			<>
				<style>{`


				`}</style>

				<RichTextToolbarButton icon={betterlinksIcon} title={title} onClick={onClick} isActive={isActive} />

				{isVisible && (
					<div className="betterlinks-links-popover-wrapper">
						<URLPopover
							className="btl-url-popover-slot"
							anchorRect={anchorRect}
							onClose={close}
							renderSettings={() => {
								return (
									<>
										<ToggleControl
											//
											className="btl-open-in-new-tab"
											label={__(`Hanzala's Open in new tab`)}
											onChange={setTarget}
										/>
									</>
								);
							}}
						>
							<form className="btl-links-search-form" onSubmit={handleSubmit}>
								{/* <TextControl
									//
									className="btl-url-search-field"
									value={searchedText}
									onChange={handleUrlInputChange}
								/> */}

								<input type="text" onChange={handleUrlInputChange} value={searchedText} className="btl-url-search-field" />

								{matchedLinks.length > 0 && (
									<Popover position="left" focusOnMount={false}>
										<ul className="betterlinks-suggessions-wrapper">{matchedLinksJsx}</ul>
									</Popover>
								)}

								<Button
									//
									className="btl-submit-button"
									icon={keyboardReturn}
									label={__('Apply')}
									type="submit"
								/>
							</form>
						</URLPopover>
					</div>
				)}
			</>
		);
	},
};
