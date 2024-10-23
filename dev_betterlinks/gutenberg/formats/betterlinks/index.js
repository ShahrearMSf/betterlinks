// wordpress imports
const { __ } = wp.i18n;
const { applyFormat, removeFormat, create, insert, isCollapsed } = wp.richText;
const { useState, useEffect, useRef, useMemo } = wp.element;
const { Popover, ToggleControl } = wp.components;
const { RichTextToolbarButton, URLPopover, RichTextShortcut } = wp.blockEditor;
const { UP, DOWN, ENTER } = wp.keycodes;
const { getRectangleFromRange } = wp.dom;

// external library imports
import reactStringReplace from 'react-string-replace';

// redux imports
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { fetch_links_data, add_new_link, edit_link } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { LoadingSpinner } from 'gutenberg/components';
import { betterlinksIcon } from './icon';
import { is_pro_enabled, makeLinkFormat, site_url as site_link } from 'utils/helper';
import { LinkPreview } from './linkPreview';
import { Link } from 'containers/Link';

const name = 'betterlinks/link-format';
const title = __('BetterLinks');

const site_url = is_pro_enabled && localStorage.getItem('btl_custom_domain') ? localStorage.getItem('btl_custom_domain') : site_link;
export const betterlinksFormat = {
	name,
	title,
	tagName: 'a',
	className: 'betterlinks-linked-text',
	attributes: {
		url: 'href',
		target: 'target',
		rel: 'rel',
		dataLinkId: 'data-link-id',
	},
	edit: (props) => {
		const { isActive, value, onChange, activeAttributes } = props;
		const [isVisible, setIsVisible] = useState(false);
		const [searchedText, setSearchedText] = useState('');
		const [matchedLinks, setMatchedLinks] = useState([]);
		const [selectedIndex, setSelectedIndex] = useState(null);
		const [regex, setRegex] = useState(false);
		const [linkNewTab, setLinkNewTab] = useState(false);
		const [submitDone, setSubmitDone] = useState(false);
		const [isLinkInvalid, setIsLinkInvalid] = useState(false);
		const [showLinkModal, setShowLinkModal] = useState(false);
		const [isChangeLink, setIsChangeLink] = useState(false);
		const [linkData, setLinkData] = useState(null);
		//👇 this state is only for the '<Link />' component's gutenberg implementation
		const [isSubmittingForGutenberg, setIsSubmittingForGutenberg] = useState(false);
		const [insertedLinkData, setInsertedLinkData] = useState(null);

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
			if ((isVisible && !isActive) || isChangeLink) {
				searchFieldRef?.current?.focus({ preventScroll: true });
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
				close();
			};
		}, [value.start, value.end]);

		useEffect(() => {
			const { dataLinkId, url = '' } = activeAttributes;
			let foundLink = (betterlinksGutenStore?.getState()?.links?.links || []).find((item) => item.ID === dataLinkId);

			if (!foundLink && !url.startsWith(site_url)) {
				foundLink = (betterlinksGutenStore?.getState()?.links?.links || []).find((item) => item.target_url === url);
			}
			setInsertedLinkData(foundLink);

			return () => {
				setInsertedLinkData(null);
			};
		}, [activeAttributes]);

		const onClick = () => {
			setIsVisible(true);
			if (!betterlinksGutenStore?.getState()?.links?.links) {
				fetch_links_data(true)(betterlinksGutenStore.dispatch)
					.then(() => {})
					.catch((err) => console.log('error!! failed fetching links', err));
			}
			const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			if (!settings) {
				fetch_settings_data()(betterlinksGutenStore.dispatch)
					.then(() => {})
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
			setSearchedText('');
			setMatchedLinks([]);
			setSelectedIndex(null);
			setIsLinkInvalid(false);
		};

		const close = () => {
			reset();
			setIsVisible(false);
			setSubmitDone(false);
			setIsChangeLink(false);
			setLinkNewTab(false);
			setIsSubmittingForGutenberg(false);
			setLinkData(null);
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			const newText = searchedText.trim();
			//👇 if statement scenario: the search filed is empty then return
			if (!newText) {
				return false;
			}
			const siteUrlWithoutHttp = site_url.replace(/https?\:\/\//, '').toLowerCase();
			const siteUrlRegex = new RegExp(siteUrlWithoutHttp, 'gi');
			const justShortlink = newText
				.replace(/https?\:\/\//g, '')
				.replace(siteUrlRegex, '')
				.replace(/\/+$/, '')
				.replace(/^\/+/, '');
			const foundLink = (betterlinksGutenStore?.getState()?.links?.links || []).find((item) => item.short_url === justShortlink);
			if (!foundLink) {
				setIsLinkInvalid(true);
				return false;
			}
			setInsertedLinkData(foundLink);
			const link = '1' === foundLink?.uncloaked ? foundLink.target_url : newText;
			const withHttp = /^https?\:\/\//i.test(link) ? link : `http://${link}`;
			const linkFormat = makeLinkFormat({ url: withHttp, linkNewTab, sponsored: !!foundLink?.sponsored, noFollow: !!foundLink?.nofollow, linkId: foundLink?.ID });
			if (isCollapsed(value) && !isActive) {
				// Scenario: we don't have any selected text && even the cursor isn't on
				const toInsert = applyFormat(create({ text: withHttp }), linkFormat, 0, withHttp.length);
				onChange(insert(value, toInsert));
			} else {
				onChange(applyFormat(value, linkFormat));
			}
			reset();
			setSubmitDone(true);
			setIsChangeLink(false);
		};

		const handleMatchedLiClick = (shortUrl) => {
			setSearchedText(`${site_url}/${shortUrl}`);
			setMatchedLinks([]);
			const searchFieldDomRef = searchFieldRef?.current;
			if (!searchFieldDomRef?.focus) return false;
			searchFieldDomRef.focus({ preventScroll: true });
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

			const siteUrlWithoutHttp = site_url.replace(/https?\:\/\//, '').toLowerCase();
			const siteUrlRegex = new RegExp(siteUrlWithoutHttp, 'gi');
			const matchedLinks = betterlinksGutenStore?.getState()?.links?.links.filter((item) => regex.test(item.link_title));

			const bool1 = (spacesRemoved || '').replace(/\s+/g, '').length < 2;
			const bool2 = siteUrlRegex.test(spacesRemoved);
			const bool3 = (spacesRemoved || '').toLowerCase().includes(siteUrlWithoutHttp);
			const bool4 = matchedLinks.length > 0;

			if (bool1 || bool2 || bool3 || bool4) {
				setIsLinkInvalid(false);
			} else {
				setIsLinkInvalid(true);
			}

			setRegex(regex);
			setMatchedLinks(matchedLinks);
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
						const url = `${site_url}/${shortUrl}`;
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
							onClose={close}
							focusOnMount={!isActive && !submitDone ? true : false}
							renderSettings={
								!isActive && !submitDone && !isSubmittingForGutenberg
									? () => (
											<div className="betterlinks-expanded-format-options">
												<ToggleControl label={__(`Open in new tab`)} checked={linkNewTab} onChange={() => setLinkNewTab(!linkNewTab)} />
											</div>
									  )
									: undefined
							}
						>
							{isSubmittingForGutenberg ? (
								<LoadingSpinner />
							) : (
								<>
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
															No Links Found
															<button
																onClick={() => {
																	setShowLinkModal(true);
																	setIsLinkInvalid(false);
																}}
															>
																Create a New Link
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

												<button type="submit" className="components-button btl-submit-button">
													<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" aria-hidden="true" focusable="false">
														<path d="M6.734 16.106l2.176-2.38-1.093-1.028-3.846 4.158 3.846 4.157 1.093-1.027-2.176-2.38h2.811c1.125 0 2.25.03 3.374 0 1.428-.001 3.362-.25 4.963-1.277 1.66-1.065 2.868-2.906 2.868-5.859 0-2.479-1.327-4.896-3.65-5.93-1.82-.813-3.044-.8-4.806-.788l-.567.002v1.5c.184 0 .368 0 .553-.002 1.82-.007 2.704-.014 4.21.657 1.854.827 2.76 2.657 2.76 4.561 0 2.472-.973 3.824-2.178 4.596-1.258.807-2.864 1.04-4.163 1.04h-.02c-1.115.03-2.229 0-3.344 0H6.734z"></path>
													</svg>
												</button>
											</form>
										</>
									)}

									{isActive && !isChangeLink && (
										<LinkPreview
											reset={reset}
											activeAttributes={activeAttributes}
											value={value}
											removeBtlFormat={removeBtlFormat}
											setIsChangeLink={setIsChangeLink}
											setShowLinkModal={setShowLinkModal}
											setLinkData={setLinkData}
											close={close}
											insertedLinkData={insertedLinkData}
										/>
									)}
								</>
							)}

							{showLinkModal && (
								<Link
									searchFieldRef={linkData ? null : searchFieldRef}
									linkNewTab={linkData ? activeAttributes.target == '_blank' : linkNewTab || activeAttributes.target == '_blank'}
									betterlinksGutenStore={betterlinksGutenStore}
									isShowIcon={false}
									setShowLinkModal={setShowLinkModal}
									isSubmittingForGutenberg={isSubmittingForGutenberg}
									setIsSubmittingForGutenberg={setIsSubmittingForGutenberg}
									data={linkData || undefined}
									catId={linkData ? linkData.cat_id : undefined}
									submitHandler={async (values) => {
										const linkNewTab = !!values.openInNewTab;
										delete values.openInNewTab;

										if (linkData) {
											return edit_link(
												values,
												true
											)(betterlinksGutenStore.dispatch)
												.then((res) => {
													const inputUrl = '1' === insertedLinkData?.uncloaked ? insertedLinkData.target_url : `${site_url}/${values.short_url}`;
													setLinkNewTab(linkNewTab);
													const withHttp = /^https?\:\/\//i.test(inputUrl) ? inputUrl : `http://${inputUrl}`;
													setInsertedLinkData(values);
													const linkFormat = makeLinkFormat({ url: withHttp, linkNewTab, sponsored: !!values.sponsored, noFollow: !!values.nofollow, linkId: values?.ID });
													onChange(applyFormat(value, linkFormat));
													reset();
													setIsSubmittingForGutenberg(false);
													setShowLinkModal(false);
													return res;
												})
												.catch((error) => {
													console.log('error!! editing link failed', error);
												});
										} else {
											return add_new_link(
												values,
												true
											)(betterlinksGutenStore.dispatch)
												.then((res) => {
													setLinkNewTab(linkNewTab);
													setSearchedText(`${site_url}/${values.short_url}`);
													setShowLinkModal(false);
													setIsSubmittingForGutenberg(false);

													const searchFieldDomRef = searchFieldRef?.current;
													if (!(searchFieldDomRef?.classList && searchFieldDomRef?.focus)) return false;
													searchFieldDomRef.classList.add('temporary-focus');
													setTimeout(() => {
														if (searchFieldDomRef?.classList) {
															searchFieldDomRef.classList.remove('temporary-focus');
														}
													}, 5000);
													searchFieldDomRef.focus({ preventScroll: true });
													return res;
												})
												.catch((error) => {
													console.log('error!! aading new link failed', error);
												});
										}
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
