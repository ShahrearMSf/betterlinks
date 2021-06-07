import axios from 'axios';
import { redirectType } from './utils/data';
import { API, namespace, nonce, site_url, getJsonString } from './utils/helper';
import UpgradeToPro from './components/Teasers/UpgradeToPro';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
import { createHooks } from '@wordpress/hooks';
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl, DateTimePicker, Button } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect, subscribe } = wp.data;

window.betterLinksHooks = createHooks();

var BetterLinksID;
var target_url;
var redirect_type;
var cat_id;
var nofollow;
var sponsored;
var param_forwarding;
var track_me;

var link_status;
var expire;
var expire_type;
var currentDate = new Date();
var expire_date = currentDate;
var expire_clicks;
var expire_redirect;
var expire_redirect_url;

const CustomSidebarMetaComponent = (props) => {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [isFetchData, setIsFetchData] = useState(false);
	const [isOpenInstantRedirect, setIsOpenInstantRedirect] = useState(false);
	const [ID, setID] = useState(BetterLinksID);
	const [terms, setTerms] = useState(false);
	const [targetUrl, setTargetUrl] = useState(target_url);
	const [redirectMode, setRedirectMode] = useState(redirect_type);
	const [catId, setCatId] = useState(cat_id);
	const [isNofollow, setIsNoFollow] = useState(nofollow);
	const [isSponsored, setSponsored] = useState(sponsored);
	const [isParamForwarding, setIsParamForwarding] = useState(param_forwarding);
	const [isTrackMe, setIsTrackMe] = useState(track_me);

	const [linkStatus, setLinkStatus] = useState(link_status);
	const [isExpire, setIsExpire] = useState(expire);
	const [expireType, setExpireType] = useState(expire_type);
	const [expireDate, setExpireDate] = useState(expire_date);
	const [expireClicks, setExpireClicks] = useState(expire_clicks);
	const [expireRedirect, setExpireRedirect] = useState(expire_redirect);
	const [expireRedirectUrl, setExpireRedirectUrl] = useState(expire_redirect_url);

	useEffect(() => {
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		if (short_url && !isFetchData) {
			API.get(namespace + 'terms').then((res) => {
				if (res.data) {
					setTerms(res.data.data);
				}
			});
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/get_links_by_short_url');
			form_data.append('security', nonce);
			form_data.append('short_url', short_url);
			axios.post(ajaxurl, form_data).then(
				(response) => {
					if (response.data.data) {
						BetterLinksID = response.data.data.ID;
						setID(response.data.data.ID);
						onSetTargetUrl(response.data.data.target_url);
						onSetRedirectType(response.data.data.redirect_type);
						onSetCatId(response.data.data.term_id);
						onSetNoFollow(!!response.data.data.nofollow);
						onSetSponsored(!!response.data.data.sponsored);
						onSetParamForwarding(!!response.data.data.param_forwarding);
						onSetTrackMe(!!response.data.data.track_me);
						if (betterLinksHooks.applyFilters('isActivePro', false)) {
							const expire = getJsonString(response.data.data.expire);
							onSetLinkStatus(response.data.data.link_status);
							onSetExpire(expire.status);
							onSetExpireType(expire.type);
							onSetExpireDate(expire.date);
							onSetExpireClicks(expire.clicks);
							onSetExpireRedirect(expire.redirect_status);
							onSetExpireRedirectUrl(expire.redirect_url);
						}
						setIsOpenInstantRedirect(true);
						setIsFetchData(true);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, [ID]);

	const onSetTargetUrl = (url) => {
		setTargetUrl(url);
		target_url = url;
	};
	const onSetRedirectType = (type) => {
		setRedirectMode(type);
		redirect_type = type;
	};

	const onSetCatId = (catid) => {
		setCatId(catid);
		cat_id = catid;
	};

	const onSetNoFollow = (isnofollow) => {
		setIsNoFollow(isnofollow);
		nofollow = isnofollow;
	};

	const onSetSponsored = (issponsored) => {
		setSponsored(issponsored);
		sponsored = issponsored;
	};

	const onSetParamForwarding = (isparamforwarding) => {
		setIsParamForwarding(isparamforwarding);
		param_forwarding = isparamforwarding;
	};

	const onSetTrackMe = (istrackme) => {
		setIsTrackMe(istrackme);
		track_me = istrackme;
	};

	const onSetLinkStatus = (status) => {
		setLinkStatus(status);
		link_status = status;
	};

	const onSetExpire = (value) => {
		setIsExpire(value);
		expire = value;
	};

	const onSetExpireType = (value) => {
		setExpireType(value);
		expire_type = value;
	};

	const onSetExpireDate = (value) => {
		setExpireDate(value);
		expire_date = value;
	};

	const onSetExpireClicks = (value) => {
		setExpireClicks(value);
		expire_clicks = value;
	};

	const onSetExpireRedirect = (value) => {
		setExpireRedirect(value);
		expire_redirect = value;
	};

	const onSetExpireRedirectUrl = (value) => {
		setExpireRedirectUrl(value);
		expire_redirect_url = value;
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
		if (ID && confirm('Are You Sure?')) {
			API.delete(namespace + 'links/' + ID).then((res) => {
				BetterLinksID = '';
				setID('');
				setIsOpenInstantRedirect(false);
				onSetTargetUrl('');
				setRedirectMode('');
				setCatId('');
				setIsNoFollow(false);
				setSponsored(false);
				setIsParamForwarding(false);
				setIsTrackMe(false);
				setLinkStatus('');
				setIsExpire(false);
				setExpireType('');
				setExpireDate('');
				setExpireClicks('');
				setExpireRedirect(false);
				setExpireRedirectUrl('');
			});
		}
	};
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	var checked = true; // Start in a checked state.
	subscribe(() => {
		if (wp.data.select('core/editor').isSavingPost()) {
			checked = false;
		} else {
			if (!checked && wp.data.select('core/editor').getPermalink()) {
				if (target_url && target_url.trim() != '') {
					var permalink = wp.data.select('core/editor').getPermalink();
					var currentPost = wp.data.select('core/editor').getCurrentPost();
					var params = {
						ID: BetterLinksID,
						cat_id: cat_id,
						link_title: currentPost.title,
						link_slug: currentPost.slug,
						nofollow: nofollow,
						param_forwarding: param_forwarding,
						redirect_type: redirect_type,
						short_url: permalinkToShortUrl(permalink),
						sponsored: sponsored,
						target_url: target_url,
						track_me: track_me,
					};
					if (betterLinksHooks.applyFilters('isActivePro', false)) {
						params.link_status = link_status;
						params.expire = {
							status: expire,
							type: expire_type,
							clicks: expire_clicks,
							date: expire_date,
							redirect_status: expire_redirect,
							redirect_url: expire_redirect_url,
						};
					}
					if (BetterLinksID) {
						API.put(namespace + 'links/' + BetterLinksID, {
							params: params,
						}).then((res) => {
							if (res.data.data) {
								BetterLinksID = res.data.data.ID;
								setID(es.data.data.ID);
							}
						});
					} else {
						API.post(namespace + 'links', {
							params: params,
						}).then((res) => {
							if (res.data.data) {
								BetterLinksID = res.data.data.ID;
								setID(res.data.data.ID);
							}
						});
					}
				}
				checked = true;
			}
		}
	});

	return (
		<div className="betterlinks-instant-redirect">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			{!isOpenInstantRedirect && (
				<Button
					isPrimary={true}
					onClick={() => {
						setIsOpenInstantRedirect(true);
						props.showSaveButton();
					}}
				>
					Create Instant Redirect
				</Button>
			)}

			{ID && (
				<Button
					isDestructive={true}
					onClick={() => {
						deleteInstantRedirect();
						props.showSaveButton();
					}}
				>
					Delete Instant Redirect
				</Button>
			)}
			{isOpenInstantRedirect && (
				<>
					<TextControl
						label="Target URL"
						value={targetUrl}
						onChange={(value) => {
							onSetTargetUrl(value);
							props.showSaveButton();
						}}
					/>
					<SelectControl
						label="Redirect Type"
						options={redirectType}
						value={getDefaultRedirectType(redirectMode)}
						onChange={(mode) => {
							onSetRedirectType(mode);
							props.showSaveButton();
						}}
					/>
					{terms && (
						<SelectControl
							label="Choose Category"
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
					<h3 className="btl-link-generator">Link Options</h3>
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
							<h4 className="betterlinks-instant-redirect__head--title">{__('Advanced', 'betterlinks')}</h4>
						</div>
						{!betterLinksHooks.applyFilters('isActivePro', false) ? (
							<>
								<div className="betterlinks-instant-redirect-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="betterlinks-instant-redirect-form-label" htmlFor="status">
										Status <span className="pro-badge">Pro</span>
									</label>
									<select id="status" disabled>
										<option value="publish">Active</option>
										<option value="expired">Expired</option>
										<option value="draft">Draft</option>
									</select>
								</div>
								<div className="betterlinks-instant-redirect-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="betterlinks-instant-redirect-form-label" htmlFor="expire">
										Expire <span className="pro-badge">Pro</span>
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
											label="Expire After"
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
											<>
												<DateTimePicker
													currentDate={expireDate}
													onChange={(date) => {
														if (currentDate.getTime() < new Date(date).getTime()) {
															onSetExpireDate(date);
														}
													}}
													is12Hour={true}
												/>
											</>
										)}
										{expireType == 'clicks' && (
											<TextControl
												label="Clicks"
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
												label="Redirect URL"
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
				</>
			)}
		</div>
	);
};

const CustomSidebarMeta = compose([
	withDispatch((dispatch) => {
		return {
			showSaveButton: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_show_saved_button: value } });
			},
		};
	}),
])(CustomSidebarMetaComponent);

const CustomSidebarComponent = () => {
	return (
		<Fragment>
			<PluginDocumentSettingPanel name="betterlinks-redirect" title="BetterLinks Instant Redirect" className="custom-panel">
				<CustomSidebarMeta />
			</PluginDocumentSettingPanel>
		</Fragment>
	);
};

const permalinkToShortUrl = (permalink) => {
	var short_url = permalink.replace(site_url + '/', '');
	return short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
};

registerPlugin('betterlinks-sidebar', {
	render: CustomSidebarComponent,
	icon: '',
});
