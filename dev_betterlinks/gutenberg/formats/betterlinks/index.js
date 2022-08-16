// wordpress imports
const { __ } = wp.i18n;
const { applyFormat, create, insert, isCollapsed } = wp.richText;
const { useState, useEffect, useRef, useMemo } = wp.element;
const { Popover, Button, ToggleControl, Spinner } = wp.components;
const { RichTextToolbarButton, URLPopover, RichTextShortcut } = wp.blockEditor;
const { UP, DOWN, ENTER } = wp.keycodes;
const { getRectangleFromRange } = wp.dom;
import { keyboardReturn } from '@wordpress/icons';

// external library imports
import axios from 'axios';
import reactStringReplace from 'react-string-replace';

// redux imports
import { gutenStore } from 'redux/store';
import { fetch_links_data, add_new_link } from 'redux/actions/links.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

// local imports
import { betterlinksIcon } from './icon';
import { makeLinkFormat, generateShortURL, generateSlug, formatDate, betterlinks_nonce } from 'utils/helper';

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
	edit: ({ isActive, value, onChange }) => {
		const [isVisible, setIsVisible] = useState(false);
		const [searchedText, setSearchedText] = useState('');
		const [matchedLinks, setMatchedLinks] = useState([]);
		const [selectedIndex, setSelectedIndex] = useState(null);
		const [regex, setRegex] = useState(false);

		const [linkNewTab, setLinkNewTab] = useState(false);
		const [sponsored, setSponsored] = useState(false);
		const [noFollow, setNoFollow] = useState(false);

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

		const handleNewLinkSubmit = (e) => {
			e.preventDefault();

			if (!(newLinkTitle.trim() && newLinkTargetUrl.trim() && newLinkShortUrl.trim())) {
				setIsNewLinkSubmissionFailed(true);
				setIsSubmittedNewLink(false);
				setIsSubmittingNewLink(false);
				return false;
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
				cat_id: (gutenStore?.getState()?.terms?.terms || []).find((item) => item.term_slug == 'uncategorized')?.ID,
				...gutenStore?.getState()?.settings?.settings,
				nofollow: !!noFollow,
				sponsored: !!sponsored,
			};

			const form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/short_url_unique_checker');
			form_data.append('security', betterlinks_nonce);
			form_data.append('ID', undefined);
			form_data.append('slug', newLinkShortUrl);

			setIsSubmittingNewLink(true);
			setIsSubmittedNewLink(false);
			setIsNewLinkSubmissionFailed(false);

			// shortlink uniqueness check
			axios
				.post(ajaxurl, form_data)
				.then((response) => {
					const resData = response?.data?.data;
					if (!resData) {
						// scenario: shortlink slug is unique
						values.link_slug = generateSlug(values.link_title);
						values.wildcards = Number(values.short_url.includes('*'));
						if (values.cat_id) {
							values.link_title = values.link_title.trim();
							add_new_link(
								values,
								true
							)(gutenStore.dispatch)
								.then((res) => {
									setSearchedText(`${betterLinksGlobal.site_url}/${values.short_url}`);
									setIsNewLinkSubmissionFailed(false);
									setIsSubmittingNewLink(false);
									setIsSubmittedNewLink(true);
									setNewLinkTitle('');
									setNewLinkTargetUrl('');
									setNewLinkShortUrl('');
									const searchFieldDomRef = searchFieldRef?.current;
									if (!searchFieldDomRef) return false;
									searchFieldDomRef.classList.add('temporary-focus');
									setTimeout(() => {
										if (searchFieldDomRef) {
											searchFieldDomRef.classList.remove('temporary-focus');
										}
									}, 5000);
									searchFieldDomRef.focus();
								})
								.catch((error) => {
									console.log('error!! aading new link failed', error);
								});
						}
					} else {
						// scenario: duplicate shortlink slug, shortlink already exist
						setIsNewLinkSubmissionFailed(true);
						setIsSubmittingNewLink(false);
					}
				})
				.catch((error) => {
					console.log('error!! shortlink url check cannot be performed', error);
				});
		};

		const handleTitleChange = (e) => {
			setNewLinkTitle(e.target.value);
			setNewLinkShortUrl(generateShortURL(gutenStore?.getState()?.settings?.settings, e.target.value));
		};

		const handleTargetUrlChange = (e) => {
			setNewLinkTargetUrl(e.target.value.replace(/\s+/g, ''));
		};

		const handleShortUrlChange = (e) => {
			setNewLinkShortUrl(e.target.value.replace(/\s/g, '-'));
		};

		const onClick = () => {
			setIsVisible(true);

			if (!gutenStore?.getState()?.links?.links) {
				fetch_links_data(true)(gutenStore.dispatch)
					.then(() => {})
					.catch((err) => console.log('error!! failed fetching links', err));
			}

			const settings = gutenStore?.getState()?.settings?.settings;
			if (settings) {
				setSponsored(!!settings?.sponsored);
				setNoFollow(!!settings?.nofollow);
				if (settings.is_random_string) {
					setNewLinkShortUrl(generateShortURL(settings, null));
				}
			} else {
				fetch_settings_data()(gutenStore.dispatch)
					.then(() => {
						const settings = gutenStore?.getState()?.settings?.settings;
						setSponsored(!!settings?.sponsored);
						setNoFollow(!!settings?.nofollow);
						if (settings.is_random_string) {
							setNewLinkShortUrl(generateShortURL(settings, null));
						}
					})
					.catch((err) => console.log('error!! failed fetching betterlinks Settings data', err));
			}

			if (!gutenStore?.getState()?.terms?.terms) {
				fetch_terms_data()(gutenStore.dispatch)
					.then(() => {})
					.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
			}
		};

		const close = () => {
			setIsVisible(false);
			setSearchedText('');
			setMatchedLinks([]);
			setSelectedIndex(null);
			setIsSubmittingNewLink(false);
			setIsSubmittedNewLink(false);
			setIsNewLinkSubmissionFailed(false);
		};

		const handleSubmit = (e) => {
			e.preventDefault();
			const newText = searchedText.trim();
			if (!newText) return false;
			// scenario: the search filed is empty

			const withHttp = /^https?\:\/\//i.test(newText) ? newText : `http://${newText}`;
			const linkFormat = makeLinkFormat({ url: withHttp, linkNewTab, sponsored, noFollow });

			if (isCollapsed(value)) {
				// Scenario: we don't have any actively selected text
				const toInsert = applyFormat(create({ text: withHttp }), linkFormat, 0, withHttp.length);
				onChange(insert(value, toInsert));
			} else {
				onChange(applyFormat(value, linkFormat));
			}
			close();
		};

		const handleMatchedLiClick = (shortUrl) => {
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

			if (spacesRemoved.length < 2) {
				setMatchedLinks([]);
				setRegex(false);
				return false;
			}
			const regex = new RegExp(`(${value})`, 'gi');
			const matchedLinks = gutenStore?.getState()?.links?.links.filter((item) => regex.test(item.link_title));
			setRegex(regex);
			setMatchedLinks(matchedLinks);
		};

		const anchorRect = useMemo(() => {
			const selection = window.getSelection();
			const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
			if (!range) {
				return false;
			}

			if (isVisible) {
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

		return (
			<>
				{!isVisible && <RichTextShortcut type="primary" character="j" onUse={onClick} />}
				<RichTextToolbarButton icon={betterlinksIcon} title={title} onClick={onClick} isActive={isActive} />

				{isVisible && (
					<div className="betterlinks-links-popover-wrapper">
						<URLPopover
							className="btl-url-popover-slot"
							anchorRect={anchorRect}
							onClose={close}
							renderSettings={() => (
								<div className="betterlinks-expanded-format-options">
									<ToggleControl label={__(`Open in new tab`)} checked={linkNewTab} onChange={() => setLinkNewTab(!linkNewTab)} />
									<ToggleControl label={__(`Sponsored`)} checked={sponsored} onChange={() => setSponsored(!sponsored)} />
									<ToggleControl label={__(`Nofollow`)} checked={noFollow} onChange={() => setNoFollow(!noFollow)} />
									<hr />
									{isSubmittedNewLink && (
										<>
											<p className="betterlinks-format-new-link-created-success">
												Success!! <br />
												Link SuccessFully Created!!!
											</p>
										</>
									)}
									{isNewLinkSubmissionFailed && (
										<>
											<p className="betterlinks-format-new-link-creating-failed">
												Link creation failed!!! <br />
												Please make sure to use a unique short link that doesn't already exist. <br />
												Also make sure no fields are empty
											</p>
										</>
									)}
									<form className="betterlinks-format-new-link-form" onSubmit={handleNewLinkSubmit}>
										<h4>Create New Betterlink</h4>
										<input type="text" onChange={handleTitleChange} placeholder={__('Link Title')} value={newLinkTitle} />
										<input type="text" onChange={handleTargetUrlChange} placeholder={__('Target Url')} value={newLinkTargetUrl} />
										<input type="text" onChange={handleShortUrlChange} placeholder={__('Betterlink Shortened Url Slug')} value={newLinkShortUrl} />
										<button type="submit">Create Link</button>
										{isSubmittingNewLink && <Spinner />}
									</form>
								</div>
							)}
						>
							<form className="btl-links-search-form" onSubmit={handleSubmit}>
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
						</URLPopover>
					</div>
				)}
			</>
		);
	},
};
