// wordpress imports
const { __ } = wp.i18n;
const { create, insert, isCollapsed, applyFormat, useAnchorRef, removeFormat, slice, replace } = wp.richText;
const { useState, useEffect, useRef, useMemo, createInterpolateElement } = wp.element;
const { Popover, Button, ToggleControl, TextControl } = wp.components;
const { RichTextToolbarButton, URLPopover } = wp.blockEditor;
const { useSelect } = wp.data;
const { UP, DOWN, ENTER, TAB, right } = wp.keycodes;
const { getRectangleFromRange } = wp.dom;
import { keyboardReturn } from '@wordpress/icons';

// external library imports
import axios from 'axios';
import reactStringReplace from 'react-string-replace';

// redux imports
import { gutenStore } from 'redux/store';
import { fetch_links_data, onDragEnd, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { betterlinksIcon } from './icon';
import { makeAllLinksArr, makeLinkFormat, generateShortURL, generateSlug, formatDate, betterlinks_nonce } from 'utils/helper';

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

		const [gutenStoreLinks, setGutenStoreLinks] = useState([]);
		const [gutenStoreTerms, setGutenStoreTerms] = useState([]);
		const [gutenStoreSettings, setGutenStoreSettings] = useState({});
		const [isVisible, setVisiblility] = useState(false);
		const [searchedText, setSearchedText] = useState('');
		const [matchedLinks, setMatchedLinks] = useState([]);
		const [selectedIndex, setSelectedIndex] = useState(null);
		const [regex, setRegex] = useState(false);

		//
		const [linkNewTab, setLinkNewTab] = useState(false);
		const [sponsored, setSponsored] = useState(false);
		const [noFollow, setNoFollow] = useState(false);

		//
		const [newLinkTitle, setNewLinkTitle] = useState('');
		const [newLinkTargetUrl, setNewLinkTargetUrl] = useState('');
		const [newLinkShortUrl, setNewLinkShortUrl] = useState('');
		const [isSubmittingNewLink, setIsSubmittingNewLink] = useState(false);
		const [isSubmittedNewLink, setIsSubmittedNewLink] = useState(false);
		const [isNewLinkSubmissionFailed, setIsNewLinkSubmissionFailed] = useState(false);

		const matchedLinksUl = useRef(null);
		const searchFieldRef = useRef(null);

		useEffect(() => {
			const matchedLinksDomUl = matchedLinksUl?.current;
			if (!matchedLinksDomUl && selectedIndex === null) return () => {};

			const allLi = matchedLinksDomUl.querySelectorAll(`li`);
			for (const item of allLi) {
				item.classList.remove('active');
			}
			const selectedLi = matchedLinksDomUl.querySelector(`li.betterlinks-suggessted-link-li-${selectedIndex}`);
			if (!selectedLi) return () => {};
			selectedLi.classList.add('active');

			// to scroll to the selected item
			// when number of matched items are
			// too much to fit inside the screen
			// ---start---
			const scrollableFoundItems = matchedLinksDomUl.closest('.betterlinks-suggession-popover .components-popover__content');
			if (!scrollableFoundItems) return () => {};
			const offsetTopOfTheLi = selectedLi?.offsetTop;
			scrollableFoundItems.scrollTop = offsetTopOfTheLi;
			// ---END---
		}, [selectedIndex]);

		useEffect(() => {
			if (isVisible) {
				document.body.classList.add('betterlinks-formatting-enabled');
			} else {
				document.body.classList.remove('betterlinks-formatting-enabled');
			}
			return () => {
				document.body.classList.remove('betterlinks-formatting-enabled');
			};
		}, [isVisible]);

		useEffect(() => {
			setSelectedIndex(null);
		}, [matchedLinks]);

		//
		const handleNewLinkSubmit = (e) => {
			e.preventDefault();

			if (newLinkTitle.trim() && newLinkTargetUrl.trim() && newLinkShortUrl.trim()) {
				setIsNewLinkSubmissionFailed(true);
			}

			const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
			const values = {
				link_title: newLinkTitle,
				target_url: newLinkTargetUrl,
				short_url: newLinkShortUrl,
				link_date: currentDate,
				link_date_gmt: currentDate,
				link_modified: currentDate,
				link_modified_gmt: currentDate,
				link_note: '',
				cat_id: gutenStoreTerms.filter((item) => item.term_slug == 'uncategorized')[0]?.ID,
				...gutenStoreSettings,
				nofollow: !!noFollow,
				sponsored: !!sponsored,
			};

			const form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
			form_data.append('security', betterlinks_nonce);
			form_data.append('ID', undefined);
			form_data.append('slug', newLinkShortUrl);

			//
			setIsSubmittingNewLink(true);
			setIsSubmittedNewLink(false);

			//
			axios
				.post(ajaxurl, form_data)
				.then((response) => {
					// setSlugIsExists(response.data.data);
					const resData = response?.data?.data;
					console.log('----handleNewLinkSubmit', { resData });
					if (!resData) {
						values.link_slug = generateSlug(values.link_title);
						values.wildcards = Number(values.short_url.includes('*'));
						if (values.cat_id) {
							values.link_title = values.link_title.trim();
							add_new_link(values)(gutenStore.dispatch)
								.then((res) => {
									console.log('----add_new_link', { res });
									setSearchedText(`${betterLinksGlobal.site_url}/${values.short_url}`);
									setIsNewLinkSubmissionFailed(false);
									setIsSubmittingNewLink(false);
									setIsSubmittedNewLink(true);
									setNewLinkTitle('');
									setNewLinkTargetUrl('');
									setNewLinkShortUrl('');
								})
								.catch((err) => {
									console.log({ err });
								});
						}
					} else {
						setIsNewLinkSubmissionFailed(true);
					}
				})
				.catch((error) => {
					console.log(error);
				});

			console.log('++++++++++handleNewLinkSubmit', { e });
		};

		const handleTitleChange = (e) => {
			setNewLinkTitle(e.target.value);
			setNewLinkShortUrl(generateShortURL(gutenStoreSettings, e.target.value));
		};

		const handleTargetUrlChange = (e) => {
			setNewLinkTargetUrl(e.target.value);
		};

		const handleShortUrlChange = (e) => {
			setNewLinkShortUrl(e.target.value.replace(/\s/g, '-'));
		};

		const onClick = () => {
			setVisiblility(true);

			const allLinksArr = makeAllLinksArr(gutenStore);
			const settings = gutenStore?.getState()?.settings?.settings;
			const terms = gutenStore?.getState()?.terms?.terms;

			if (allLinksArr) {
				setGutenStoreLinks(allLinksArr);
			} else {
				fetch_links_data()(gutenStore.dispatch)
					.then(() => {
						const allLinksArr = makeAllLinksArr(gutenStore);
						if (allLinksArr) {
							setGutenStoreLinks(allLinksArr);
						}
					})
					.catch((err) => console.log({ err }));
			}

			if (settings) {
				setGutenStoreSettings(settings);
				setSponsored(!!settings?.sponsored);
				setNoFollow(!!settings?.nofollow);
			} else {
				fetch_settings_data()(gutenStore.dispatch)
					.then(() => {
						const settings = gutenStore?.getState()?.settings?.settings;
						setGutenStoreSettings(settings);
						setSponsored(!!settings?.sponsored);
						setNoFollow(!!settings?.nofollow);
					})
					.catch((err) => console.log(err));
			}

			if (terms) {
				setGutenStoreTerms(terms);
			} else {
				fetch_terms_data()(gutenStore.dispatch)
					.then(() => {
						const terms = gutenStore?.getState()?.terms?.terms;
						setGutenStoreTerms(terms);
					})
					.catch((err) => console.log(err));
			}
		};

		const close = () => {
			setVisiblility(false);
			setSearchedText('');
			setMatchedLinks([]);
			setSelectedIndex(null);
		};

		const handleSubmit = (e) => {
			console.log('----handleSubmit', { e });
			e.preventDefault();
			onChange(applyFormat(value, makeLinkFormat({ url: searchedText, linkNewTab, sponsored, noFollow })));
			close();
		};

		const handleMatchedLiClick = (shortUrl) => {
			console.log('site url:----', { betterLinksGlobal, shortUrl });
			setSearchedText(`${betterLinksGlobal.site_url}/${shortUrl}`);
			setMatchedLinks([]);
			const searchFieldDomRef = searchFieldRef?.current;
			if (!searchFieldDomRef) return false;
			searchFieldDomRef.focus();
		};

		const handleUrlInputChange = (e) => {
			const value = e?.target?.value;
			setSearchedText(value || '');
			const spacesRemoved = value.replace(/\s+/g, '');
			console.log('---handleUrlInputChange:', { e, value, spacesRemoved });
			if (spacesRemoved.length < 2) {
				console.log('---less than 2:', { e, value, spacesRemoved });
				setMatchedLinks([]);
				setRegex(false);
				return false;
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
			setRegex(regex);
			setMatchedLinks(matchedLinks);

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

		const handleOnKeyDown = (e) => {
			//
			console.log('----handleKeyDown', { e });
			e.stopPropagation();
			const matchedLinksCount = matchedLinks.length;
			if (matchedLinksCount < 1) return setSelectedIndex(null);

			switch (e.keyCode) {
				case UP: {
					const prevIndex = typeof selectedIndex === 'number' ? selectedIndex - 1 : matchedLinksCount - 1;
					setSelectedIndex(prevIndex === -1 ? matchedLinksCount - 1 : prevIndex);
					break;
				}

				case DOWN: {
					const prevIndex = typeof selectedIndex === 'number' ? selectedIndex + 1 : 0;
					setSelectedIndex(prevIndex > matchedLinksCount - 1 ? 0 : prevIndex);
					break;
				}

				case ENTER: {
					if (typeof selectedIndex === 'number') {
						const shortUrl = matchedLinks[selectedIndex].short_url;
						const siteUrl = betterLinksGlobal.site_url;
						const url = `${siteUrl}/${shortUrl}`;
						const attributes = { url };

						if (linkNewTab) {
							attributes.target = '_blank';
						}

						console.log('enter pressed', {
							shortUrl,
							siteUrl,
							url,
							attributes,
						});

						// if (nofollow) {
						// 	attributes.rel = 'nofollow';
						// }
						// rel: 'nofollow noindex sponsored noreferrer noopener',
						setSearchedText(url);
					}

					break;
				}
			}
		};

		console.log({
			isSubmittingNewLink,
			isSubmittedNewLink,
			isNewLinkSubmissionFailed,
			gutenStoreLinks,
			selectedIndex,
			matchedLinks,
		});

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
								//
								return (
									<div className="betterlinks-expanded-format-options">
										<ToggleControl label={__(`Open in new tab`)} checked={linkNewTab} onChange={() => setLinkNewTab(!linkNewTab)} />
										<ToggleControl label={__(`Sponsored`)} checked={sponsored} onChange={() => setSponsored(!sponsored)} />
										<ToggleControl label={__(`Nofollow`)} checked={noFollow} onChange={() => setNoFollow(!noFollow)} />
										<hr />
										<form className="betterlinks-format-new-link-form" onSubmit={handleNewLinkSubmit}>
											<h4>Create New Betterlink</h4>
											<input type="text" onChange={handleTitleChange} placeholder={__('Link Title')} value={newLinkTitle} />
											<input type="text" onChange={handleTargetUrlChange} placeholder={__('Target Url')} value={newLinkTargetUrl} />
											<input type="text" onChange={handleShortUrlChange} placeholder={__('Betterlink Shortened Url Slug')} value={newLinkShortUrl} />
											<button type="submit">Create Link</button>
										</form>
									</div>
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

								<input
									type="text"
									ref={searchFieldRef}
									placeholder="Search betterlinks or paste the link"
									onChange={handleUrlInputChange}
									value={searchedText}
									className="btl-url-search-field"
									onKeyDown={handleOnKeyDown}
								/>

								{matchedLinks.length > 0 && regex && (
									<Popover position="left" focusOnMount={false} className="betterlinks-suggession-popover">
										<ul ref={matchedLinksUl} className="betterlinks-suggessions-wrapper-ul">
											{matchedLinks.map((item, index) => {
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
														key={item.ID}
														onClick={() => {
															handleMatchedLiClick(item.short_url);
														}}
														className={`betterlinks-suggessted-link-li betterlinks-suggessted-link-li-${index}`}
													>
														{title}
														{
															// shortUrl
														}
													</li>
												);
											})}
										</ul>
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
