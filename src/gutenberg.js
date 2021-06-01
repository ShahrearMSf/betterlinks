import axios from 'axios';
import { redirectType } from './utils/data';
import { API, namespace, nonce, site_url } from './utils/helper';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel, PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
const { PanelBody, PanelRow, ToggleControl, TextControl, SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect, subscribe } = wp.data;

const CustomSidebarMetaComponent = (props) => {
	const [terms, setTerms] = useState(false);
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
					console.log(response);
					if (response.data.data) {
						props.targetUrl = response.data.data.target_url;
						props.redirectType = response.data.data.redirect_type;
						props.noFollow = response.data.data.nofollow;
						props.sponsored = response.data.data.sponsored;
						props.parameterForwarding = response.data.data.param_forwarding;
						props.tracking = response.data.data.track_me;
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, [props.instantRedirectStatus]);

	return (
		<>
			<ToggleControl label={__('Enable Instant Redirect', 'betterlinks')} checked={props.instantRedirectStatus} onChange={props.setInstantRedirectStatus} />
			{props.instantRedirectStatus && (
				<>
					<TextControl label="Target URL" value={props.targetUrl} onChange={(value) => props.setTargetUrl(value)} />
					<SelectControl label="Redirect Type" options={redirectType} value={props.redirectType} onChange={(mode) => props.setRedirectType(mode)} />
					{terms && (
						<SelectControl
							label="Choose Category"
							value={props.catId}
							options={terms
								.filter((item) => item.term_type == 'category')
								.map((item) => ({
									value: item.ID,
									label: item.term_name,
								}))}
							onChange={(catID) => props.setCatId(catID)}
						/>
					)}

					<h3>Link Options</h3>
					<ToggleControl label={__('No Follow', 'betterlinks')} checked={props.noFollow} onChange={props.setNoFollow} />
					<ToggleControl label={__('Sponsored', 'betterlinks')} checked={props.sponsored} onChange={props.setSponsored} />
					<ToggleControl label={__('Parameter Forwarding', 'betterlinks')} checked={props.parameterForwarding} onChange={props.setParameterForwarding} />
					<ToggleControl label={__('Tracking', 'betterlinks')} checked={props.tracking} onChange={props.setTracking} />
				</>
			)}
		</>
	);
};

const CustomSidebarMeta = compose([
	withSelect((select) => {
		return {
			instantRedirectStatus: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_status'],
			targetUrl: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_target_url'],
			redirectType: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_redirect_type'],
			catId: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_cat_id'],
			noFollow: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_no_follow'],
			sponsored: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_sponsored'],
			parameterForwarding: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_parameterforwarding'],
			tracking: select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_tracking'],
		};
	}),
	withDispatch((dispatch) => {
		return {
			setInstantRedirectStatus: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_status: value } });
			},
			setTargetUrl: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_target_url: value } });
			},
			setRedirectType: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_redirect_type: value } });
			},
			setCatId: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_cat_id: value } });
			},
			setNoFollow: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_no_follow: value } });
			},
			setSponsored: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_sponsored: value } });
			},
			setParameterForwarding: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_parameterforwarding: value } });
			},
			setTracking: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_ir_tracking: value } });
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
			var permalink = wp.data.select('core/editor').getPermalink();
			var currentPost = wp.data.select('core/editor').getCurrentPost();
			const target_url = wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_target_url'];
			if (target_url.trim() != '') {
				API.post(namespace + 'links', {
					params: {
						cat_id: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_cat_id'],
						link_title: currentPost.title,
						link_slug: currentPost.slug,
						nofollow: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_no_follow'],
						param_forwarding: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_parameterforwarding'],
						redirect_type: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_redirect_type'],
						short_url: permalinkToShortUrl(permalink),
						sponsored: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_sponsored'],
						target_url: target_url,
						track_me: wp.data.select('core/editor').getEditedPostAttribute('meta')['betterlinks_ir_tracking'],
					},
				}).then((res) => {
					if (res.data.success) {
						console.log(res.data);
						deleteTempMetaData();
					}
				});
			}

			checked = true;
		}
	}
});

const deleteTempMetaData = () => {
	let form_data = new FormData();
	form_data.append('action', 'betterlinks/admin/instant_redirect_temp_meta_delete');
	form_data.append('security', nonce);
	form_data.append('ID', wp.data.select('core/editor').getCurrentPostId());
	form_data.append('meta_lists', [
		'betterlinks_ir_target_url',
		'betterlinks_ir_redirect_type',
		'betterlinks_ir_cat_id',
		'betterlinks_ir_no_follow',
		'betterlinks_ir_sponsored',
		'betterlinks_ir_parameterforwarding',
		'betterlinks_ir_tracking',
	]);
	return axios.post(ajaxurl, form_data).then(
		(response) => {
			console.log(response);
		},
		(error) => {
			console.log(error);
		}
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
