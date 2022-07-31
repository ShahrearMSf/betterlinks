import axios from 'axios';
import { redirectType } from 'utils/data';
import { makeRequest, betterlinks_nonce, site_url, getJsonString, formatDate, is_pro_enabled } from 'utils/helper';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { withDispatch, subscribe } = wp.data;

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

var isSavingPost = true; // flag for multiple request break

const permalinkToShortUrl = (permalink) => {
	if (!permalink) return permalink;
	const short_url = permalink.replace(site_url + '/', '');
	return short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
};

const CustomSidebarMetaComponent = (props) => {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
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
		if (short_url) {
			makeRequest({
				action: 'betterlinks/admin/get_terms',
			}).then((response) => {
				if (response.data.data) {
					setTerms(response.data.data);
				}
			});
		}

		if (props.data) {
			BetterLinksID = props.data.ID;
			setID(props.data.ID);
			onSetTargetUrl(props.data.target_url);
			onSetRedirectType(props.data.redirect_type);
			onSetCatId(props.data.term_id);
			onSetNoFollow(!!props.data.nofollow);
			onSetSponsored(!!props.data.sponsored);
			onSetParamForwarding(!!props.data.param_forwarding);
			onSetTrackMe(!!props.data.track_me);

			if (is_pro_enabled) {
				const expire = getJsonString(props.data.expire);
				if (expire) {
					onSetLinkStatus(props.data.link_status);
					onSetExpire(expire.status);
					onSetExpireType(expire.type);
					onSetExpireDate(expire.date);
					onSetExpireClicks(expire.clicks);
					onSetExpireRedirect(expire.redirect_status);
					onSetExpireRedirectUrl(expire.redirect_url);
				}
			}
		} else {
			onSetNoFollow(!!props.settings.nofollow);
			onSetSponsored(!!props.settings.sponsored);
			onSetParamForwarding(!!props.settings.param_forwarding);
			onSetTrackMe(!!props.settings.track_me);
		}
	}, [ID, props.data]);

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
		if (ID && confirm(__('Are you sure you want to delete your Instant Redirect Rule?', 'betterlinks'))) {
			makeRequest({
				action: 'betterlinks/admin/delete_link',
				ID,
				short_url: permalinkToShortUrl(wp.data.select('core/editor').getPermalink()),
			}).then((response) => {
				BetterLinksID = '';
				setID('');
				onSetTargetUrl('');
				onSetRedirectType('');
				onSetCatId('');
				onSetNoFollow(false);
				onSetSponsored(false);
				onSetParamForwarding(false);
				onSetTrackMe(false);
				onSetLinkStatus('');
				onSetExpire(false);
				onSetExpireType('');
				onSetExpireDate('');
				onSetExpireClicks('');
				onSetExpireRedirect(false);
				onSetExpireRedirectUrl('');
			});
		}
	};
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	subscribe(() => {
		if (wp.data.select('core/editor').isSavingPost()) {
			isSavingPost = false;
		} else {
			if (!isSavingPost && wp.data.select('core/editor').getPermalink()) {
				if (target_url && target_url.trim() != '') {
					var permalink = wp.data.select('core/editor').getPermalink();
					var currentPost = wp.data.select('core/editor').getCurrentPost();
					const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
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
						link_modified: currentDate,
						link_modified_gmt: currentDate,
					};
					if (is_pro_enabled) {
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
						makeRequest({
							action: 'betterlinks/admin/update_link',
							ID: BetterLinksID,
							...params,
						}).then((response) => {
							if (response.data.data) {
								BetterLinksID = response.data.data.ID;
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
							if (response.data.data) {
								BetterLinksID = response.data.data.ID;
								setID(response.data.data.ID);
							}
						});
					}
				}
				isSavingPost = true;
			}
		}
	});

	return (
		<div className="betterlinks-instant-redirect">
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />

			{ID && (
				<Button
					isDestructive={true}
					onClick={() => {
						deleteInstantRedirect();
						props.showSaveButton();
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
											<DateTimePicker disablePast={true} label="" inputVariant="outlined" value={expireDate ? expireDate : new Date()} onChange={(date) => onSetExpireDate(date)} />
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
	);
};

const CustomSidebarMeta = withDispatch((dispatch) => ({
	showSaveButton: (value) => dispatch('core/editor').editPost({ meta: { betterlinks_show_saved_button: value } }),
}))(CustomSidebarMetaComponent);

const CustomSidebarComponent = () => {
	const [isAllowInstantRedirect, setIsAllowInstantRedirect] = useState(false);
	const [data, setData] = useState(false);
	const [settings, setSettings] = useState({});
	useEffect(() => {
		// Settings
		makeRequest({
			action: 'betterlinks/admin/get_settings',
		}).then((response) => {
			if (response.data.data) {
				const settings = getJsonString(response.data.data);
				setSettings(settings);
				setIsAllowInstantRedirect(!!settings.is_allow_gutenberg);
			}
		});
		// get links
		const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
		if (short_url) {
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/get_links_by_short_url');
			form_data.append('security', betterlinks_nonce);
			form_data.append('short_url', short_url);
			axios.post(ajaxurl, form_data).then(
				(response) => {
					if (response.data.data) {
						setIsAllowInstantRedirect(true);
						setData(response.data.data);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, []);
	return (
		<Fragment>
			{isAllowInstantRedirect && (
				<PluginDocumentSettingPanel name="betterlinks-redirect" title={__('BetterLinks Instant Redirect', 'betterlinks')} className="custom-panel" isOpen={false}>
					<CustomSidebarMeta settings={settings} data={data} />
				</PluginDocumentSettingPanel>
			)}
		</Fragment>
	);
};

registerPlugin('betterlinks-sidebar', {
	render: CustomSidebarComponent,
	icon: '',
});
