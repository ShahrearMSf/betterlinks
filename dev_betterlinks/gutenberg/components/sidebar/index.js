import axios from 'axios';
import { redirectType } from 'utils/data';
import { makeRequest, betterlinks_nonce, getJsonString, formatDate, is_pro_enabled, permalinkToShortUrl } from 'utils/helper';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { betterlinksGutenStore } from 'redux/gutenbergStore';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';
// import { delete_link } from 'redux/actions/links.actions';
import { fetch_link_for_permalink, edit_gutenberg_link, edit_link_expire_option } from 'redux/actions/gutenbergredirectlink.actions';

//
import { LoadingSpinner } from 'gutenberg/components';

const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { withDispatch, subscribe } = wp.data;

const CustomSidebarComponent = (props) => {
	console.log('=====**======CustomSidebarComponent', { props });
	const [isAllowInstantRedirect, setIsAllowInstantRedirect] = useState(false);
	const [linkData, setLinkData] = useState(false);
	const [isDeletingInstantGutenbergRedirect, setIsDeletingInstantGutenbergRedirect] = useState(false);

	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [ID, setID] = useState(null);
	const [terms, setTerms] = useState(false);
	const [targetUrl, setTargetUrl] = useState('');
	const [redirectMode, setRedirectMode] = useState(null);
	const [catId, setCatId] = useState(null);
	const [isNofollow, setIsNoFollow] = useState(null);
	const [isSponsored, setSponsored] = useState(null);
	const [isParamForwarding, setIsParamForwarding] = useState(null);
	const [isTrackMe, setIsTrackMe] = useState(null);

	const [linkStatus, setLinkStatus] = useState(null);
	const [isExpire, setIsExpire] = useState();
	const [expireType, setExpireType] = useState(null);
	const [expireDate, setExpireDate] = useState(new Date());
	const [expireClicks, setExpireClicks] = useState(null);
	const [expireRedirect, setExpireRedirect] = useState(null);
	const [expireRedirectUrl, setExpireRedirectUrl] = useState('');

	useEffect(() => {
		// terms
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		if (short_url) {
			const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
			console.log('-----betterlinksGutenStore?.getState()?.terms?.terms ', { storeTerms });
			if (storeTerms) {
				setTerms(storeTerms);
			} else {
				fetch_terms_data()(betterlinksGutenStore.dispatch)
					.then(() => {
						const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
						console.log('----- !storeTerms =-= betterlinksGutenStore?.getState()?.terms?.terms', { storeTerms });
						setTerms(storeTerms);
					})
					.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
			}
		}

		const setAllStatesForLinkData = (linkData) => {
			if (!linkData) return false;
			setLinkData(linkData);
			if (linkData.ID || linkData.ID === 0) {
				setIsAllowInstantRedirect(true);
			}
			setID(linkData.ID);
			setTargetUrl(linkData.target_url);
			setRedirectMode(linkData.redirect_type);
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
			setIsAllowInstantRedirect(!!settings.is_allow_gutenberg);
		} else {
			fetch_settings_data()(betterlinksGutenStore.dispatch)
				.then(() => {
					const settings = betterlinksGutenStore?.getState()?.settings?.settings;
					setIsAllowInstantRedirect(!!settings.is_allow_gutenberg);
				})
				.catch((err) => console.log('error!! failed in sidebar fetching betterlinks Settings data', err));
		}

		const linkData = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData;
		if (linkData) {
			console.log('----fetch_link_for_permalink inside useEffect[] found linkData in store', { linkData });
			setAllStatesForLinkData(linkData);
		} else {
			console.log("---wp.data.select('core/editor').getPermalink()---", wp.data.select('core/editor').getPermalink());

			fetch_link_for_permalink()
				.then(() => {
					let linkData = betterlinksGutenStore?.getState()?.gutenbergredirectlink?.linkData;
					if (typeof linkData?.expire === 'string') {
						linkData = {
							...linkData,
							expire: getJsonString(linkData.expire),
						};
					}
					console.log('----fetch_link_for_permalink inside useEffect[] had to be fetched', { linkData });
					setAllStatesForLinkData(linkData);
				})
				.catch((error) => console.log(error));
		}
	}, []);

	const onSetTargetUrl = (url) => {
		setTargetUrl(url);
		edit_gutenberg_link({ target_url: url });
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
		setExpireDate(value);
		edit_link_expire_option({ date: value });
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
		console.log('deleteInstantRedirect function runned');
		if (ID) {
			console.log('setIsDeletingInstantGutenbergRedirect runned & set to true');
			makeRequest({
				action: 'betterlinks/admin/delete_link',
				ID,
				short_url: permalinkToShortUrl(wp.data.select('core/editor').getPermalink()),
			}).then((response) => {
				console.log('betterlinks/admin/delete_link response returned');
				const settings = betterlinksGutenStore?.getState()?.settings?.settings;
				setID('');
				onSetTargetUrl('');
				onSetCatId('');
				onSetLinkStatus('');
				onSetExpireType('');
				onSetExpireDate('');
				onSetExpireClicks('');
				onSetExpire(false);
				onSetExpireRedirect(false);
				onSetExpireRedirectUrl('');
				onSetRedirectType(settings.redirect_type);
				onSetNoFollow(settings.nofollow);
				onSetSponsored(settings.sponsored);
				onSetParamForwarding(settings.param_forwarding);
				onSetTrackMe(settings.track_me);

				//
				setIsDeletingInstantGutenbergRedirect(false);
				// props.showSaveButton();
			});
		} else {
			setIsDeletingInstantGutenbergRedirect(false);
		}
	};

	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	useEffect(() => {
		console.log('---subscribe useEffect runned');
		const unsubscribe = subscribe(() => {
			if (
				wp.data.select('core/editor').isSavingPost() &&
				!wp.data.select('core/editor').isAutosavingPost() &&
				wp.data.select('core/editor').getPermalink() &&
				targetUrl &&
				targetUrl.trim() != ''
			) {
				console.log('----betterlinks subscribe passed the if check. actual code running started.');
				const permalink = wp.data.select('core/editor').getPermalink();
				const currentPost = wp.data.select('core/editor').getCurrentPost();
				const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
				const params = {
					ID: ID,
					cat_id: catId,
					link_title: currentPost.title,
					link_slug: currentPost.slug,
					nofollow: isNofollow,
					param_forwarding: isParamForwarding,
					redirect_type: redirectMode,
					short_url: permalinkToShortUrl(permalink),
					sponsored: isSponsored,
					target_url: targetUrl,
					track_me: isTrackMe,
					link_modified: currentDate,
					link_modified_gmt: currentDate,
				};
				if (is_pro_enabled) {
					params.link_status = linkStatus;
					params.expire = {
						status: isExpire,
						type: expireType,
						clicks: expireClicks,
						date: new Date(),
						redirect_status: expireRedirect,
						redirect_url: expireRedirectUrl,
					};
				}
				if (ID) {
					makeRequest({
						action: 'betterlinks/admin/update_link',
						ID: ID,
						...params,
					}).then((response) => {
						console.log('betterlinks/admin/update_link after then', { response });
						if (response.data.data) {
							setID(response.data.data.ID);
						}
					});
				} else {
					params.link_date = currentDate;
					params.link_date_gmt = currentDate;
					makeRequest({
						action: 'betterlinks/admin/create_link',
						...params,
					}).then((response) => {
						console.log('betterlinks/admin/create_link after then', { response });
						if (response.data.data) {
							setID(response.data.data.ID);
						}
					});
				}
			}
		});

		return () => {
			console.log('---subscribe cleanup runned');
			unsubscribe();
		};
	}, [
		ID,
		catId,
		isNofollow,
		isParamForwarding,
		redirectMode,
		isSponsored,
		targetUrl,
		isTrackMe,
		linkStatus,
		isExpire,
		expireType,
		expireClicks,
		expireRedirect,
		expireRedirectUrl,
		// isDeletingInstantGutenbergRedirect,
	]);

	console.log({
		linkData,
		isDeletingInstantGutenbergRedirect,
		ID,
		catId,
		isNofollow,
		isParamForwarding,
		redirectMode,
		isSponsored,
		targetUrl,
		isTrackMe,
		linkStatus,
		isExpire,
		expireType,
		expireClicks,
		expireRedirect,
		expireRedirectUrl,
	});

	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	return (
		<Fragment>
			{isAllowInstantRedirect && (
				<PluginDocumentSettingPanel name="betterlinks-redirect" title={__('BetterLinks Instant Redirect', 'betterlinks')} className="custom-panel" isOpen={false}>
					{/* CustomSidebarMeta start  */}

					{isDeletingInstantGutenbergRedirect && (
						<>
							<h3>heeeeeeeeeeeeeeeeeee!!!!</h3>
							<LoadingSpinner />
						</>
					)}

					<div className="betterlinks-instant-redirect">
						<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

						{ID && (
							<Button
								isDestructive={true}
								onClick={() => {
									setIsDeletingInstantGutenbergRedirect(true);
									if (
										// confirm(__('Are you sure you want to delete your Instant Redirect Rule?', 'betterlinks'))
										true
									) {
										deleteInstantRedirect();
									}
								}}
								style={{ marginBottom: '10px' }}
							>
								Delete Instant Redirect
							</Button>
						)}

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
															onChange={(date) => onSetExpireDate(date)}
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
		</Fragment>
	);
};

const CustomSidebarMeta = withDispatch((dispatch) => ({
	showSaveButton: (value) => dispatch('core/editor').editPost({ meta: { betterlinks_show_saved_button: value } }),
}))(CustomSidebarComponent);

const CustomBetterlinksSidebar = () => <CustomSidebarMeta />;

export default CustomBetterlinksSidebar;
