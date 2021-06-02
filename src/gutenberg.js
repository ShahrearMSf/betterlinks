import axios from 'axios';
import { redirectType } from './utils/data';
import { API, namespace, nonce, site_url } from './utils/helper';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel } = wp.editPost;
const { ToggleControl, TextControl, SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect, subscribe } = wp.data;

var BetterLinksID;
var target_url;
var redirect_type;
var cat_id;
var nofollow;
var sponsored;
var param_forwarding;
var track_me;

const CustomSidebarMetaComponent = (props) => {
	const [terms, setTerms] = useState(false);
	const [targetUrl, setTargetUrl] = useState(target_url);
	const [redirectMode, setRedirectMode] = useState(redirect_type);
	const [catId, setCatId] = useState(cat_id);
	const [isNofollow, setIsNoFollow] = useState(nofollow);
	const [isSponsored, setSponsored] = useState(sponsored);
	const [isParamForwarding, setIsParamForwarding] = useState(param_forwarding);
	const [isTrackMe, setIsTrackMe] = useState(track_me);
	useEffect(() => {
		if (props.instantRedirectStatus) {
			API.get(namespace + 'terms').then((res) => {
				if (res.data) {
					setTerms(res.data.data);
				}
			});
			const short_url = permalinkToShortUrl(wp.data.select('core/editor').getPermalink());
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/get_links_by_short_url');
			form_data.append('security', nonce);
			form_data.append('short_url', short_url);
			return axios.post(ajaxurl, form_data).then(
				(response) => {
					if (response.data.data) {
						BetterLinksID = response.data.data.ID;
						onSetTargetUrl(response.data.data.target_url);
						onSetRedirectType(response.data.data.redirect_type);
						onSetCatId(response.data.data.term_id);
						onSetNoFollow(!!response.data.data.nofollow);
						onSetSponsored(!!response.data.data.sponsored);
						onSetParamForwarding(!!response.data.data.param_forwarding);
						onSetTrackMe(!!response.data.data.track_me);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, [props.instantRedirectStatus]);

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

	return (
		<>
			<ToggleControl label={__('Enable Instant Redirect', 'betterlinks')} checked={props.instantRedirectStatus} onChange={props.setInstantRedirectStatus} />
			{props.instantRedirectStatus && (
				<>
					<TextControl
						label="Target URL"
						value={target_url}
						onChange={(value) => {
							onSetTargetUrl(value);
							props.showSaveButton();
						}}
					/>
					<SelectControl
						label="Redirect Type"
						options={redirectType}
						value={getDefaultRedirectType(redirect_type)}
						onChange={(mode) => {
							onSetRedirectType(mode);
							props.showSaveButton();
						}}
					/>
					{terms && (
						<SelectControl
							label="Choose Category"
							value={getDefaultCatID(cat_id, terms)}
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

					<h3>Link Options</h3>
					<ToggleControl
						label={__('No Follow', 'betterlinks')}
						checked={nofollow}
						onChange={(value) => {
							onSetNoFollow(value);
							props.showSaveButton();
						}}
					/>
					<ToggleControl
						label={__('Sponsored', 'betterlinks')}
						checked={sponsored}
						onChange={(value) => {
							onSetSponsored(value);
							props.showSaveButton();
						}}
					/>
					<ToggleControl
						label={__('Parameter Forwarding', 'betterlinks')}
						checked={param_forwarding}
						onChange={(value) => {
							onSetParamForwarding(value);
							props.showSaveButton();
						}}
					/>
					<ToggleControl
						label={__('Tracking', 'betterlinks')}
						checked={track_me}
						onChange={(value) => {
							onSetTrackMe(value);
							props.showSaveButton();
						}}
					/>
				</>
			)}
		</>
	);
};

const CustomSidebarMeta = compose([
	withSelect((select) => {
		return {
			instantRedirectStatus: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_status'],
		};
	}),
	withDispatch((dispatch) => {
		return {
			setInstantRedirectStatus: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_status: value } });
			},
			showSaveButton: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_show_saved_button: value } });
			},
		};
	}),
])(CustomSidebarMetaComponent);

const CustomSidebarComponent = () => {
	return (
		<Fragment>
			<PluginDocumentSettingPanel name="betterlinks-redirect" title="BetterLinks Quick Links" className="custom-panel">
				<CustomSidebarMeta />
			</PluginDocumentSettingPanel>
		</Fragment>
	);
};

var checked = true; // Start in a checked state.
subscribe(() => {
	if (wp.data.select('core/editor').isSavingPost()) {
		checked = false;
	} else {
		if (!checked && wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_status']) {
			// const target_url = wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_target_url'];
			if (target_url.trim() != '') {
				if (BetterLinksID) {
					updateBetterLinks(target_url);
				} else {
					insertBetterLinks(target_url);
				}
			}
			checked = true;
		}
	}
});

const insertBetterLinks = (target_url) => {
	var permalink = wp.data.select('core/editor').getPermalink();
	var currentPost = wp.data.select('core/editor').getCurrentPost();
	API.post(namespace + 'links', {
		params: {
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
		},
	});
};

const updateBetterLinks = (target_url) => {
	var permalink = wp.data.select('core/editor').getPermalink();
	var currentPost = wp.data.select('core/editor').getCurrentPost();
	API.put(namespace + 'links/' + BetterLinksID, {
		params: {
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
		},
	});
};

const permalinkToShortUrl = (permalink) => {
	var short_url = permalink.replace(site_url + '/', '');
	return short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
};

registerPlugin('betterlinks-sidebar', {
	render: CustomSidebarComponent,
	icon: '',
});
