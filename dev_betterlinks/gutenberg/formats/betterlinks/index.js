// wordpress imports
const { __ } = wp.i18n;
const { applyFormat, removeFormat, create, insert, isCollapsed } = wp.richText;
const { useState, useEffect, useRef, useMemo } = wp.element;
const { Popover, Button } = wp.components;
const { RichTextToolbarButton, URLPopover, RichTextShortcut } = wp.blockEditor;
const { UP, DOWN, ENTER } = wp.keycodes;
const { getRectangleFromRange } = wp.dom;
import { keyboardReturn } from '@wordpress/icons';

// external library imports
import reactStringReplace from 'react-string-replace';

// redux imports
import { betterlinksGutenStore } from 'redux/store';
import { fetch_links_data, add_new_link } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { betterlinksIcon } from './icon';
import {
	makeLinkFormat,
	// //
	// generateShortURL,
	// generateSlug,
	// formatDate,
	// betterlinks_nonce,
	siteUrlWithoutHttp,
	// siteUrlRegex,
} from 'utils/helper';
import { RenderSettings } from './renderSettings';
import { LinkPreview } from './linkPreview';
import { Link } from 'containers/Link';

const name = 'betterlinks/link-format';
const title = __('BetterLinks');

export const betterlinksFormat = {
	name,
	title,
	tagName: 'a',
	className: 'betterlinks-linked-text',
	attributes: {
		url: 'href',
		target: 'target',
		rel: 'rel',
	},
	edit: ({
		//
		isActive,
		value,
		onChange,
		activeAttributes,
	}) => {
		const [isVisible, setIsVisible] = useState(false);
		const [searchedText, setSearchedText] = useState('');
		const [matchedLinks, setMatchedLinks] = useState([]);
		const [selectedIndex, setSelectedIndex] = useState(null);
		const [regex, setRegex] = useState(false);

		const [linkNewTab, setLinkNewTab] = useState(false);
		const [sponsored, setSponsored] = useState(false);
		const [noFollow, setNoFollow] = useState(false);

		const [submitDone, setSubmitDone] = useState(false);
		const [isLinkInvalid, setIsLinkInvalid] = useState(false);
		const [showLinkModal, setShowLinkModal] = useState(false);
		const [isChangeLink, setIsChangeLink] = useState(false);

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
			const searchFieldDomRef = searchFieldRef?.current;
			if (((isVisible && !isActive) || isChangeLink) && searchFieldDomRef?.focus) {
				console.log('$$$@#@#@#@%%%%%%searchFieldDomRef e focus hoise');
				searchFieldDomRef.focus();
			}

			if (isVisible || isActive) {
				document.body.classList.add('betterlinks-formatting-enabled');
			} else {
				document.body.classList.remove('betterlinks-formatting-enabled');
			}
			return () => {
				document.body.classList.remove('betterlinks-formatting-enabled');
			};
		}, [isVisible, isActive, isChangeLink]);

		useEffect(() => {
			setSelectedIndex(null);
		}, [matchedLinks]);

		useEffect(() => {
			return () => {
				console.log('===-075----[value] useEffect cleanup runned');
				close();
			};
		}, [value.start, value.end]);
		const onClick = () => {
			console.log('----onClick fired');
			setIsVisible(true);

			if (!betterlinksGutenStore?.getState()?.links?.links) {
				fetch_links_data(true)(betterlinksGutenStore.dispatch)
					.then(() => {})
					.catch((err) => console.log('error!! failed fetching links', err));
			}

			const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			if (settings) {
				setSponsored(!!settings?.sponsored);
				setNoFollow(!!settings?.nofollow);
			} else {
				fetch_settings_data()(betterlinksGutenStore.dispatch)
					.then(() => {
						const settings = betterlinksGutenStore?.getState()?.settings?.settings;
						setSponsored(!!settings?.sponsored);
						setNoFollow(!!settings?.nofollow);
					})
					.catch((err) => console.log('error!! failed fetching betterlinks Settings data', err));
			}

			if (!betterlinksGutenStore?.getState()?.terms?.terms) {
				fetch_terms_data()(betterlinksGutenStore.dispatch)
					.then(() => {})
					.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
			}
		};

		const removeBtlFormat = (value) => {
			onChange(removeFormat(value, name));
		};

		const reset = () => {
			console.log('---reset runned');
			setSearchedText('');
			setMatchedLinks([]);
			setSelectedIndex(null);
			setIsLinkInvalid(false);
		};

		const close = () => {
			console.log('----close runned');
			reset();
			setIsVisible(false);
			setSubmitDone(false);
			setIsChangeLink(false);
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			const newText = searchedText.trim();
			if (!newText) return false;
			// scenario: the search filed is empty

			const siteUrlRegex = new RegExp(siteUrlWithoutHttp, 'gi');
			const justShortlink = newText
				.replace(/https?\:\/\//g, '')
				.replace(siteUrlRegex, '')
				.replace(/\/+$/, '')
				.replace(/^\/+/, '');

			const foundLink = (betterlinksGutenStore?.getState()?.links?.links || []).find((item) => item.short_url === justShortlink);

			console.log({
				justShortlink,
				siteUrlWithoutHttp,
				siteUrlRegex,
				foundLink,
			});

			if (!foundLink) {
				setIsLinkInvalid(true);
				return false;
			}

			const withHttp = /^https?\:\/\//i.test(newText) ? newText : `http://${newText}`;
			const linkFormat = makeLinkFormat({ url: withHttp, linkNewTab, sponsored, noFollow });

			if (isCollapsed(value) && !isActive) {
				// Scenario: we don't have any actively selected text
				const toInsert = applyFormat(create({ text: withHttp }), linkFormat, 0, withHttp.length);
				onChange(insert(value, toInsert));
			} else {
				onChange(applyFormat(value, linkFormat));
			}
			reset();
			setSubmitDone(true);
			setIsChangeLink(false);
		};

		const editModalActiveBtlFormatLink = ({ value, inputUrl, linkNewTab, sponsored, noFollow }) => {
			const withHttp = /^https?\:\/\//i.test(inputUrl) ? inputUrl : `http://${inputUrl}`;
			const linkFormat = makeLinkFormat({ url: withHttp, linkNewTab, sponsored, noFollow });
			onChange(applyFormat(value, linkFormat));
			reset();
		};

		const handleMatchedLiClick = (shortUrl) => {
			setSearchedText(`${betterLinksGlobal.site_url}/${shortUrl}`);
			setMatchedLinks([]);
			const searchFieldDomRef = searchFieldRef?.current;
			if (!searchFieldDomRef?.focus) return false;
			searchFieldDomRef.focus();
		};

		const handleUrlInputChange = (e) => {
			const value = e?.target?.value;
			setSearchedText(value || '');
			const spacesRemoved = value.replace(/\s+/g, '');

			if (spacesRemoved.length < 2) {
				setMatchedLinks([]);
				setRegex(false);
				setIsLinkInvalid(false);
				return false;
			}
			const regex = new RegExp(`(${value})`, 'gi');
			const siteUrlRegex = new RegExp(siteUrlWithoutHttp, 'gi');
			const matchedLinks = betterlinksGutenStore?.getState()?.links?.links.filter((item) => regex.test(item.link_title));

			const bool1 = (spacesRemoved || '').replace(/\s+/g, '').length < 2;
			const bool2 = siteUrlRegex.test(spacesRemoved);
			const bool3 = (spacesRemoved || '').toLowerCase().includes(siteUrlWithoutHttp);
			const bool4 = matchedLinks.length > 0;

			console.log('---', {
				bool1,
				bool2,
				bool3,
				bool4,
				searchedText,
			});

			if (bool1 || bool2 || bool3 || bool4) {
				setIsLinkInvalid(false);
				console.log('---setIsLinkInvalid false passed');
			} else {
				setIsLinkInvalid(true);
				console.log('---setIsLinkInvalid true passed---');
			}

			setRegex(regex);
			setMatchedLinks(matchedLinks);
			console.log('-----sobar sesh line of onCHange------');
		};

		const anchorRect = useMemo(() => {
			const selection = window.getSelection();
			const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			if (!range) {
				return false;
			}

			if (isVisible || isActive) {
				return getRectangleFromRange(range);
			}
		}, [isVisible, value.start, value.end]);

		const handleOnKeyDown = (e) => {
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
						setSearchedText(url);
					}

					break;
				}
			}
		};

		//
		const siteUrlRegex = new RegExp(siteUrlWithoutHttp, 'gi');
		console.log(siteUrlRegex.test(searchedText), '---', searchedText.includes(siteUrlWithoutHttp), '---', {
			searchedText,
			activeAttributes,
			isActive,
			value,
			anchorRect,
			showLinkModal,
			isVisible,
			siteUrlRegex,
			siteUrlWithoutHttp,
			isChangeLink,
		});

		return (
			<>
				{isActive ? (
					<RichTextShortcut type="primaryShift" character="j" onUse={() => removeBtlFormat(value)} />
				) : (
					<>
						<RichTextShortcut type="primary" character="j" onUse={onClick} />
						<RichTextToolbarButton icon={betterlinksIcon} title={title} onClick={onClick} />
					</>
				)}

				{(isVisible || isActive) && (
					<div className="betterlinks-links-popover-wrapper">
						<URLPopover
							className="btl-url-popover-slot"
							anchorRect={anchorRect}
							onClose={() => {
								console.log('---URLPopover onClose runned');
								close();
							}}
							focusOnMount={!isActive && !submitDone ? true : false}
							renderSettings={
								!isActive && !submitDone
									? () => (
											<RenderSettings
												setLinkNewTab={setLinkNewTab}
												linkNewTab={linkNewTab}
												setSponsored={setSponsored}
												sponsored={sponsored}
												setNoFollow={setNoFollow}
												noFollow={noFollow}
											/>
									  )
									: undefined
							}
						>
							{((!isActive && !submitDone) || isChangeLink) && (
								<>
									<form className="btl-links-search-form" onSubmit={handleSubmit}>
										<input
											type="text"
											ref={searchFieldRef}
											placeholder="Paste URL or type to search"
											onChange={handleUrlInputChange}
											value={searchedText}
											className="btl-url-search-field"
											onKeyDown={handleOnKeyDown}
										/>

										{isLinkInvalid && (
											<Popover position="left" focusOnMount={false} className="betterlinks-invalid-link-popover">
												<div className="betterlinks_format_invalid_link_warning">
													Invalid Link
													<button
														onClick={() => {
															setShowLinkModal(true);
															setIsLinkInvalid(false);
														}}
													>
														create Link
													</button>
												</div>
											</Popover>
										)}

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

														return (
															<li
																key={item.ID}
																onClick={() => {
																	handleMatchedLiClick(item.short_url);
																}}
																className={`betterlinks-suggessted-link-li betterlinks-suggessted-link-li-${index}`}
															>
																{title}
															</li>
														);
													})}
												</ul>
											</Popover>
										)}

										<Button className="btl-submit-button" icon={keyboardReturn} label={__('Apply')} type="submit" />
									</form>
								</>
							)}

							{isActive && !isChangeLink && (
								<LinkPreview
									//
									setIsChangeLink={setIsChangeLink}
									removeBtlFormat={removeBtlFormat}
									value={value}
									editModalActiveBtlFormatLink={editModalActiveBtlFormatLink}
									activeAttributes={activeAttributes}
									reset={reset}
								/>
							)}

							{showLinkModal && (
								<Link
									betterlinksGutenStore={betterlinksGutenStore}
									isShowIcon={false}
									setShowLinkModal={setShowLinkModal}
									searchFieldRef={searchFieldRef}
									submitHandler={(values) => {
										add_new_link(
											values,
											true
										)(betterlinksGutenStore.dispatch)
											.then((res) => {
												setSearchedText(`${betterLinksGlobal.site_url}/${values.short_url}`);
												setShowLinkModal(false);

												const searchFieldDomRef = searchFieldRef?.current;
												if (!(searchFieldDomRef?.classList && searchFieldDomRef?.focus)) return false;
												searchFieldDomRef.classList.add('temporary-focus');
												setTimeout(() => {
													if (searchFieldDomRef?.classList) {
														searchFieldDomRef.classList.remove('temporary-focus');
													}
												}, 5000);
												searchFieldDomRef.focus();
											})
											.catch((error) => {
												console.log('error!! aading new link failed', error);
											});
									}}
								/>
							)}
						</URLPopover>
					</div>
				)}
			</>
		);
	},
};
