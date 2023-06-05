import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { redirectType } from 'utils/data';
import { formatDate, generateSlug, getJsonString, is_pro_enabled, makeRequest, permalinkToShortUrl } from 'utils/helper';

import { edit_gutenberg_link, edit_link_expire_option, fetch_link_for_permalink } from 'redux/actions/gutenbergredirectlink.actions';
import { add_new_link, edit_link } from 'redux/actions/links.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { RESET_GUTENBERG_INSTANT_REDIRECT, DELETE_GUTENBERG_LINK } from 'redux/actions/actionstrings';

const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { withDispatch, subscribe } = wp.data;
const { PluginDocumentSettingPanel } = wp.editPost;

import AutoLinkCreateSidebar from './AutoCreateLink';

const CustomSidebarComponent = (props) => {
	const [isAllowInstantRedirect, setIsAllowInstantRedirect] = useState(false);
	const [isShowInstantRedirect, setIsShowInstantRedirect] = useState(true);
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [terms, setTerms] = useState(false);
	const [targetUrl, setTargetUrl] = useState('');
	const [redirectMode, setRedirectMode] = useState(null);
	const [catId, setCatId] = useState(null);
	const [isNofollow, setIsNoFollow] = useState(null);
	const [isSponsored, setSponsored] = useState(null);
	const [isParamForwarding, setIsParamForwarding] = useState(null);
	const [isTrackMe, setIsTrackMe] = useState(null);
	const [shortUrl, setShortUrl] = useState('');

	const [autoLinkCreateEnabled, setAutoLinkCreateEnabled] = useState(false);

	const [linkStatus, setLinkStatus] = useState(null);
	const [isExpire, setIsExpire] = useState();
	const [expireType, setExpireType] = useState(null);
	const [expireDate, setExpireDate] = useState(new Date());
	const [expireClicks, setExpireClicks] = useState(null);
	const [expireRedirect, setExpireRedirect] = useState(null);
	const [expireRedirectUrl, setExpireRedirectUrl] = useState('');

	useEffect(() => {
		document?.body?.classList?.add('betterlinks-guten-link-data-not-rendered-in-sidebar');
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		console.log(wp.data.select('core/editor'));
		if (short_url) {
			const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
			if (storeTerms) {
				setTerms(storeTerms);
			} else {
				fetch_terms_data()(betterlinksGutenStore.dispatch)
					.then(() => {
						const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
						setTerms(storeTerms);
					})
					.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
			}
		}

		const setAllStatesForLinkData = (linkData) => {
			setTimeout(() => {
				document?.body?.classList?.remove('betterlinks-guten-link-data-not-rendered-in-sidebar');
			}, 500);
			if (!linkData) {
				setIsShowInstantRedirect(false);
				return false;
			}
			if (linkData.ID || linkData.ID === 0) {
				setIsAllowInstantRedirect(true);
			} else {
				return false;
			}
			setTargetUrl(linkData.target_url);
			setShortUrl(linkData.short_url);
			if (!is_pro_enabled && linkData.redirect_type === 'cloak') {
				edit_gutenberg_link({ redirect_type: '307' });
				setRedirectMode('307');
			} else {
				setRedirectMode(linkData.redirect_type);
			}
			setCatId(linkData.cat_id);
			setIsNoFollow(linkData.nofollow);
			setSponsored(linkData.sponsored);
			setIsParamForwarding(linkData.param_forwarding);
			setIsTrackMe(linkData.track_me);
			setLinkStatus(linkData.link_status);

			setIsExpire(linkData.expire?.status);
			setExpireType(linkData.expire?.type);
			setExpireDate(linkData.expire?.date);
			setExpireClicks(linkData.expire?.clicks);
			setExpireRedirect(linkData.expire?.redirect_status);
			setExpireRedirectUrl(linkData.expire?.redirect_url);
		};

		// Settings
		const settings = betterlinksGutenStore?.getState()?.settings?.settings;
		if (settings) {
			setIsAllowInstantRedirect(!!settings?.is_allow_gutenberg);
		} else {
			fetch_settings_data()(betterlinksGutenStore.dispatch)
				.then(() => {
					const settings = betterlinksGutenStore?.getState()?.settings?.settings;
					setIsAllowInstantRedirect(!!settings?.is_allow_gutenberg);
				})
				.catch((err) => console.log('error!! failed in sidebar fetching betterlinks Settings data', err));
		}

		const resultOfFetchPermalink = fetch_link_for_permalink();
		if (!resultOfFetchPermalink) {
			setTimeout(() => {
				document?.body?.classList?.remove('betterlinks-guten-link-data-not-rendered-in-sidebar');
			}, 500);
			return () => {};
		}
		resultOfFetchPermalink
			.then(() => {
				let x = 0;
				const intervalId = setInterval(() => {
					x++;
					let linkData = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData;
					if (!linkData?.dispatched_successfully && x < 600) {
						return false;
					}
					if (typeof linkData?.expire === 'string') {
						linkData = {
							...linkData,
							expire: getJsonString(linkData.expire),
						};
					}
					setAllStatesForLinkData(linkData);
					clearInterval(intervalId);
				}, 500);
			})
			.catch((error) => console.log(error));
	}, []);

	const onSetTargetUrl = (url) => {
		setTargetUrl(url);
		edit_gutenberg_link({ target_url: url });
	};

	const onSetShortUrl = (url) => {
		setShortUrl(url);
		edit_gutenberg_link({ short_url: url });
	};

	const onSetRedirectType = (type) => {
		setRedirectMode(type);
		edit_gutenberg_link({ redirect_type: type });
	};

	const onSetCatId = (catid) => {
		setCatId(catid);
		edit_gutenberg_link({ cat_id: catid });
	};

	const onSetNoFollow = (isnofollow) => {
		setIsNoFollow(isnofollow);
		edit_gutenberg_link({ nofollow: isnofollow });
	};

	const onSetSponsored = (issponsored) => {
		setSponsored(issponsored);
		edit_gutenberg_link({ sponsored: issponsored });
	};

	const onSetParamForwarding = (isparamforwarding) => {
		setIsParamForwarding(isparamforwarding);
		edit_gutenberg_link({ param_forwarding: isparamforwarding });
	};

	const onSetTrackMe = (istrackme) => {
		setIsTrackMe(istrackme);
		edit_gutenberg_link({ track_me: istrackme });
	};

	const onSetLinkStatus = (status) => {
		setLinkStatus(status);
		edit_gutenberg_link({ link_status: status });
	};

	const onSetExpire = (value) => {
		setIsExpire(value);
		edit_link_expire_option({ status: value });
	};

	const onSetExpireType = (value) => {
		setExpireType(value);
		edit_link_expire_option({ type: value });
	};

	const onSetExpireDate = (value) => {
		const newDateValue = formatDate(value, 'yyyy-mm-dd h:m:s');
		setExpireDate(newDateValue);
		edit_link_expire_option({ date: newDateValue });
	};

	const onSetExpireClicks = (value) => {
		setExpireClicks(value);
		edit_link_expire_option({ clicks: value });
	};

	const onSetExpireRedirect = (value) => {
		setExpireRedirect(value);
		edit_link_expire_option({ redirect_status: value });
	};

	const onSetExpireRedirectUrl = (value) => {
		setExpireRedirectUrl(value);
		edit_link_expire_option({ redirect_url: value });
	};

	const getDefaultCatID = (savedCatID, terms) => {
		if (savedCatID && savedCatID != '') {
			return savedCatID;
		}
		if (terms.length > 0) {
			onSetCatId(terms[0].ID);
			return terms[0].ID;
		}
		return null;
	};

	const getDefaultRedirectType = (savedRedirectType) => {
		if (savedRedirectType && savedRedirectType != '') {
			return savedRedirectType;
		}
		onSetRedirectType('307');
		return '307';
	};

	const getDefaultLinkStatus = (status) => {
		if (status && status != '') {
			return status;
		}
		onSetLinkStatus('publish');
		return 'publish';
	};

	const getDefaultExpireType = (type) => {
		if (type && type != '') {
			return type;
		}
		onSetExpireType('date');
		return 'date';
	};

	const deleteInstantRedirect = () => {
		const ID = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.ID;
		const short_url = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.short_url;
		const target_url = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.target_url;
		const cat_id = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.cat_id;

		console.log({ ID, short_url, target_url, cat_id });
		if (!ID) return false;

		document?.body?.classList?.add('betterlinks-guten-store-initial-data-still-fetching');
		makeRequest({
			action: 'betterlinks/admin/update_link',
			ID,
			short_url,
			cat_id,
		})
			.then((response) => {
				const settings = betterlinksGutenStore?.getState()?.settings?.settings;
				const linkData = {
					ID: '',
					cat_id: '',
					target_url: '',
					link_title: '',
					link_slug: '',
					expire: {
						status: false,
					},
					link_status: 'publish',
					redirect_type: settings?.redirect_type,
					nofollow: settings?.nofollow,
					sponsored: settings?.sponsored,
					param_forwarding: settings?.param_forwarding,
					track_me: settings?.track_me,
				};

				betterlinksGutenStore.dispatch({
					type: DELETE_GUTENBERG_LINK,
					payload: {
						...response?.data?.data,
						cat_id,
					},
				});

				betterlinksGutenStore.dispatch({
					type: RESET_GUTENBERG_INSTANT_REDIRECT,
					payload: linkData,
				});

				onSetTargetUrl('');
				onSetCatId('');
				onSetLinkStatus('');
				onSetExpireType('');
				onSetExpireClicks('');
				onSetExpire(false);
				onSetExpireRedirect(false);
				onSetExpireRedirectUrl('');
				onSetRedirectType(settings?.redirect_type);
				onSetNoFollow(settings?.nofollow);
				onSetSponsored(settings?.sponsored);
				onSetParamForwarding(settings?.param_forwarding);
				onSetTrackMe(settings?.track_me);

				document?.body?.classList?.remove('betterlinks-guten-store-initial-data-still-fetching');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	return (
		<Fragment>
			{isAllowInstantRedirect && isShowInstantRedirect && (
				<PluginDocumentSettingPanel name="betterlinks-redirect" title={__('BetterLinks Instant Redirect', 'betterlinks')} className="custom-panel" isOpen={false}>
					{/* CustomSidebarMeta start  */}

					<div className="betterlinks-loader-sidebar-wrapper">
						<div className="betterlinks-loader-for-sidebar">
							<div className="betterlinks-round-loader"></div>
						</div>
					</div>

					<div className="betterlinks-instant-redirect">
						<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

						<div className="betterlinks-instant-gutenberg-redirect-delete-button-wrapper">
							<Button
								isDestructive={true}
								onClick={() => {
									if (confirm(__('Are you sure you want to delete your Instant Redirect Rule?', 'betterlinks'))) {
										deleteInstantRedirect();
									}
								}}
								style={{ marginBottom: '10px' }}
							>
								Delete Instant Redirect
							</Button>
						</div>

						<TextControl
							label={__('Target URL', 'betterlinks')}
							value={targetUrl}
							onChange={(value) => {
								onSetTargetUrl(value);
								props.showSaveButton();
							}}
						/>
						<SelectControl
							label={__('Redirect Type', 'betterlinks')}
							options={
								is_pro_enabled
									? [
											...redirectType,
											{
												value: 'cloak',
												label: __('Cloaked', 'betterlinks'),
											},
									  ]
									: redirectType
							}
							value={getDefaultRedirectType(redirectMode)}
							onChange={(mode) => {
								onSetRedirectType(mode);
								props.showSaveButton();
							}}
						/>
						{terms && (
							<SelectControl
								label={__('Choose Category', 'betterlinks')}
								value={getDefaultCatID(catId, terms)}
								options={terms
									.filter((item) => item.term_type == 'category')
									.map((item) => ({
										value: item.ID,
										label: item.term_name,
									}))}
								onChange={(catID) => {
									onSetCatId(catID);
									props.showSaveButton();
								}}
							/>
						)}
						<h3 className="btl-link-generator">
							<strong>{__('Link Options', 'betterlinks')}</strong>
						</h3>
						<ToggleControl
							label={__('No Follow', 'betterlinks')}
							checked={isNofollow}
							onChange={(value) => {
								onSetNoFollow(value);
								props.showSaveButton();
							}}
						/>
						<ToggleControl
							label={__('Sponsored', 'betterlinks')}
							checked={isSponsored}
							onChange={(value) => {
								onSetSponsored(value);
								props.showSaveButton();
							}}
						/>
						<ToggleControl
							label={__('Parameter Forwarding', 'betterlinks')}
							checked={isParamForwarding}
							onChange={(value) => {
								onSetParamForwarding(value);
								props.showSaveButton();
							}}
						/>
						<ToggleControl
							label={__('Tracking', 'betterlinks')}
							checked={isTrackMe}
							onChange={(value) => {
								onSetTrackMe(value);
								props.showSaveButton();
							}}
						/>
						<div className="betterlinks-instant-redirect betterlinks-instant-redirect--teasers">
							<div className="betterlinks-instant-redirect__head">
								<h4 className="betterlinks-instant-redirect__head--title">
									<strong>{__('Advanced', 'betterlinks')}</strong>
								</h4>
							</div>
							{!is_pro_enabled ? (
								<>
									<div className="betterlinks-instant-redirect-form-group" onClick={() => openUpgradeToProModal()}>
										<label className="betterlinks-instant-redirect-form-label" htmlFor="status">
											{__('Status', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
										</label>
										<select id="status" disabled>
											<option value="publish">{__('Active', 'betterlinks')}</option>
											<option value="expired">{__('Expired', 'betterlinks')}</option>
											<option value="draft">{__('Draft', 'betterlinks')}</option>
										</select>
									</div>
									<div className="betterlinks-instant-redirect-form-group" onClick={() => openUpgradeToProModal()}>
										<label className="betterlinks-instant-redirect-form-label" htmlFor="expire">
											{__('Expire', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
										</label>
										<input id="expire" type="checkbox" disabled />
									</div>
								</>
							) : (
								<>
									<SelectControl
										label="Link Status"
										options={[
											{
												value: 'publish',
												label: __('Active', 'betterlinks'),
											},
											{
												value: 'expired',
												label: __('Expired', 'betterlinks'),
											},
											{
												value: 'draft',
												label: __('Draft', 'betterlinks'),
											},
										]}
										value={getDefaultLinkStatus(linkStatus)}
										onChange={(status) => {
											onSetLinkStatus(status);
											props.showSaveButton();
										}}
									/>

									<ToggleControl
										label={__('Expire', 'betterlinks')}
										checked={isExpire}
										onChange={(value) => {
											onSetExpire(value);
											props.showSaveButton();
										}}
									/>
									{isExpire && (
										<>
											<SelectControl
												label={__('Expire After', 'betterlinks')}
												options={[
													{
														value: 'date',
														label: __('Date', 'betterlinks'),
													},
													{
														value: 'clicks',
														label: __('Clicks', 'betterlinks'),
													},
												]}
												value={getDefaultExpireType(expireType)}
												onChange={(value) => {
													onSetExpireType(value);
													props.showSaveButton();
												}}
											/>
											{expireType == 'date' && (
												<p>
													<MuiPickersUtilsProvider utils={DateFnsUtils}>
														<DateTimePicker
															disablePast={true}
															label=""
															inputVariant="outlined"
															value={expireDate ? expireDate : new Date()}
															onChange={(date) => {
																onSetExpireDate(date);
																props.showSaveButton();
															}}
														/>
													</MuiPickersUtilsProvider>
												</p>
											)}
											{expireType == 'clicks' && (
												<TextControl
													label={__('Clicks', 'betterlinks')}
													value={expireClicks}
													onChange={(value) => {
														onSetExpireClicks(value);
														props.showSaveButton();
													}}
												/>
											)}
											<ToggleControl
												label={__('Redirect URL after Expiration', 'betterlinks')}
												checked={expireRedirect}
												onChange={(value) => {
													onSetExpireRedirect(value);
													props.showSaveButton();
												}}
											/>
											{expireRedirect && (
												<TextControl
													label={__('Redirect URL', 'betterlinks')}
													value={expireRedirectUrl}
													onChange={(value) => {
														onSetExpireRedirectUrl(value);
														props.showSaveButton();
													}}
												/>
											)}
										</>
									)}
								</>
							)}
						</div>
					</div>

					{/* CustomSidebarMeta end  */}
				</PluginDocumentSettingPanel>
			)}
			<AutoLinkCreateSidebar shortUrl={shortUrl} onSetShortUrl={onSetShortUrl} />
		</Fragment>
	);
};

(() => {
	//👇 this is used to stop unnecessary request for betterlinks instant gutenberg link
	let lastChangedTimeStamp = window.betterlinksInstantGutenbergChangeTimeStamp;

	subscribe(() => {
		if (
			wp.data.select('core/editor')?.isSavingPost() &&
			!wp.data.select('core/editor')?.isAutosavingPost() &&
			wp.data.select('core/editor')?.isCurrentPostPublished() &&
			wp.data.select('core/editor')?.getPermalink() &&
			betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.target_url &&
			betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData?.target_url.trim() != ''
		) {
			//👇 this is used to stop unnecessary request for betterlinks instant gutenberg link
			const isSameInstantGutenbergData = lastChangedTimeStamp === window.betterlinksInstantGutenbergChangeTimeStamp;
			lastChangedTimeStamp = window.betterlinksInstantGutenbergChangeTimeStamp;
			if (isSameInstantGutenbergData) return false;
			const permalink = wp.data.select('core/editor').getPermalink();
			const currentPost = wp.data.select('core/editor').getCurrentPost();
			const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');

			// console.log(betterlinksGutenStore?.getState());
			const terms = betterlinksGutenStore?.getState()?.terms?.terms || [];
			const values = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData || {};
			const freeParams = { ...(betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData || {}) };
			console.log({ freeParams });
			delete freeParams.expire;
			delete freeParams.link_status;
			delete freeParams.dynamic_redirect;

			// remove unnecessary param/property
			delete freeParams.dispatched_successfully;

			const short_url = permalinkToShortUrl(permalink);
			const link_title = currentPost.title;
			const link_slug = currentPost.slug;

			const params = {
				...freeParams,
				short_url,
				link_title,
				link_slug,
				link_modified: currentDate,
				link_modified_gmt: currentDate,
			};

			if (is_pro_enabled) {
				params.link_status = values?.link_status;
				params.dynamic_redirect = {
					type: '',
					value: [],
					...(values?.dynamic_redirect || {}),
					extra: {
						rotation_mode: 'weighted',
						split_test: false,
						goal_link: '',
						...(values?.dynamic_redirect?.extra || {}),
					},
				};
				params.expire = {
					status: false,
					type: 'date',
					clicks: '',
					date: '',
					redirect_status: false,
					redirect_url: '',
					...(values?.expire || {}),
				};
			}

			if (!params.cat_id) {
				const { ID } = terms.filter((item) => item.term_slug == 'uncategorized')[0];
				params.cat_id = ID;
			}
			if (!params.link_slug) {
				params.link_slug = generateSlug(params.link_title);
			}
			params.wildcards = Number(params.short_url.includes('*'));
			if (params.cat_id) {
				const link_title = params.link_title.trim();
				if (link_title) {
					params.link_title = link_title;

					if (params.ID) {
						edit_link(
							params,
							true
						)(betterlinksGutenStore.dispatch)
							.then((response) => {})
							.catch((error) => console.error(error));
					} else {
						add_new_link(
							params,
							true,
							true
						)(betterlinksGutenStore.dispatch)
							.then((response) => {})
							.catch((error) => console.error(error));
					}
				}
			}
		}
	});
})();
const CustomSidebarMeta = withDispatch((dispatch) => ({
	showSaveButton: (value) => {
		window.betterlinksInstantGutenbergChangeTimeStamp = Date.now();
		return dispatch('core/editor').editPost({ meta: { betterlinks_show_saved_button: value } });
	},
}))(CustomSidebarComponent);

const CustomBetterlinksSidebar = () => <CustomSidebarMeta />;

export default CustomBetterlinksSidebar;
