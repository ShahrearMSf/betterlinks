import axios from 'axios';
import { redirectType } from 'utils/data';
import { makeRequest, betterlinks_nonce, getJsonString, formatDate, is_pro_enabled, permalinkToShortUrl } from 'utils/helper';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { betterlinksGutenStore } from 'redux/store';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { fetch_settings_data } from 'redux/actions/settings.actions';

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

	//
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

		// get links
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		if (short_url) {
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/get_links_by_short_url');
			form_data.append('security', betterlinks_nonce);
			form_data.append('short_url', short_url);
			axios.post(ajaxurl, form_data).then(
				(response) => {
					console.log('betterlinks/admin/get_links_by_short_url', { response });
					const linkData = response.data.data;
					if (linkData) {
						setIsAllowInstantRedirect(true);
						setLinkData(linkData);

						//
						setID(linkData.ID);
						onSetTargetUrl(linkData.target_url);
						onSetRedirectType(linkData.redirect_type);
						onSetCatId(linkData.term_id);
						onSetNoFollow(!!linkData.nofollow);
						onSetSponsored(!!linkData.sponsored);
						onSetParamForwarding(!!linkData.param_forwarding);
						onSetTrackMe(!!linkData.track_me);

						if (is_pro_enabled) {
							const expire = getJsonString(linkData.expire);
							if (expire) {
								onSetLinkStatus(linkData.link_status);
								onSetExpire(expire.status);
								onSetExpireType(expire.type);
								onSetExpireDate(expire.date);
								onSetExpireClicks(expire.clicks);
								onSetExpireRedirect(expire.redirect_status);
								onSetExpireRedirectUrl(expire.redirect_url);
							}
						}
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, []);

	useEffect(() => {
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		if (short_url) {
			makeRequest({
				action: 'betterlinks/admin/get_terms',
			}).then((response) => {
				if (response.data.data) {
					console.log('-----betterlinks/admin/get_terms response.data.data', response.data.data);
					setTerms(response.data.data);
				}
			});

			const storeTerms = betterlinksGutenStore?.getState()?.terms?.terms;
			console.log('-----betterlinksGutenStore?.getState()?.terms?.terms ', { storeTerms });
			if (!storeTerms) {
				fetch_terms_data()(betterlinksGutenStore.dispatch)
					.then(() => {
						console.log('----- !storeTerms =-= betterlinksGutenStore?.getState()?.terms?.terms', betterlinksGutenStore?.getState()?.terms?.terms);
					})
					.catch((err) => console.log('error!! failed fetching betterlinks terms data', err));
			}
		}

		if (linkData) {
			setID(linkData.ID);
			onSetTargetUrl(linkData.target_url);
			onSetRedirectType(linkData.redirect_type);
			onSetCatId(linkData.term_id);
			onSetNoFollow(!!linkData.nofollow);
			onSetSponsored(!!linkData.sponsored);
			onSetParamForwarding(!!linkData.param_forwarding);
			onSetTrackMe(!!linkData.track_me);

			if (is_pro_enabled) {
				const expire = getJsonString(linkData.expire);
				if (expire) {
					onSetLinkStatus(linkData.link_status);
					onSetExpire(expire.status);
					onSetExpireType(expire.type);
					onSetExpireDate(expire.date);
					onSetExpireClicks(expire.clicks);
					onSetExpireRedirect(expire.redirect_status);
					onSetExpireRedirectUrl(expire.redirect_url);
				}
			}
		} else {
			const settings = betterlinksGutenStore?.getState()?.settings?.settings;
			onSetNoFollow(!!settings.nofollow);
			onSetSponsored(!!settings.sponsored);
			onSetParamForwarding(!!settings.param_forwarding);
			onSetTrackMe(!!settings.track_me);
		}
	}, [ID]);

	const onSetTargetUrl = (url) => {
		setTargetUrl(url);
	};

	const onSetRedirectType = (type) => {
		setRedirectMode(type);
	};

	const onSetCatId = (catid) => {
		setCatId(catid);
	};

	const onSetNoFollow = (isnofollow) => {
		setIsNoFollow(isnofollow);
	};

	const onSetSponsored = (issponsored) => {
		setSponsored(issponsored);
	};

	const onSetParamForwarding = (isparamforwarding) => {
		setIsParamForwarding(isparamforwarding);
	};

	const onSetTrackMe = (istrackme) => {
		setIsTrackMe(istrackme);
	};

	const onSetLinkStatus = (status) => {
		setLinkStatus(status);
	};

	const onSetExpire = (value) => {
		setIsExpire(value);
	};

	const onSetExpireType = (value) => {
		setExpireType(value);
	};

	const onSetExpireDate = (value) => {
		setExpireDate(value);
	};

	const onSetExpireClicks = (value) => {
		setExpireClicks(value);
	};

	const onSetExpireRedirect = (value) => {
		setExpireRedirect(value);
	};

	const onSetExpireRedirectUrl = (value) => {
		setExpireRedirectUrl(value);
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
			console.log(
				'----betterlinks sidebar subscribe runned',

				"---wp.data.select('core/editor').isSavingPost(),---",
				wp.data.select('core/editor').isSavingPost(),
				"---!wp.data.select('core/editor').isAutosavingPost(),---",
				!wp.data.select('core/editor').isAutosavingPost(),
				"---wp.data.select('core/editor').getPermalink(),---",
				wp.data.select('core/editor').getPermalink(),
				'---targetUrl,---',
				targetUrl,
				"---targetUrl.trim() != ''---",
				targetUrl.trim() != ''
			);
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
