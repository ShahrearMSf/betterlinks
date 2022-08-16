import axios from 'axios';
import { redirectType } from 'utils/data';
import { makeRequest, betterlinks_nonce, site_url, getJsonString, formatDate, is_pro_enabled } from 'utils/helper';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl, Button } = wp.components;
const { withDispatch, subscribe } = wp.data;

const permalinkToShortUrl = (permalink) => {
	if (!permalink) return permalink;
	const short_url = permalink.replace(site_url + '/', '');
	return short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
};

const CustomSidebarMetaComponent = (props) => {
	console.log('---CustomSidebarMetaComponent', { props });
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
		if (ID && confirm(__('Are you sure you want to delete your Instant Redirect Rule?', 'betterlinks'))) {
			makeRequest({
				action: 'betterlinks/admin/delete_link',
				ID,
				short_url: permalinkToShortUrl(wp.data.select('core/editor').getPermalink()),
			}).then((response) => {
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
		console.log('----betterlinks sidebar subscribe runned');
		if (wp.data.select('core/editor').isSavingPost() && wp.data.select('core/editor').getPermalink() && targetUrl && targetUrl.trim() != '') {
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
					if (response.data.data) {
						setID(response.data.data.ID);
					}
				});
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
	console.log('---CustomSidebarComponent rendered');
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

export default CustomSidebarComponent;
