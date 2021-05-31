import axios from 'axios';
import { redirectType } from './utils/data';
import { API, namespace } from './utils/helper';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment, useState, useEffect } = wp.element;
const { PluginDocumentSettingPanel, PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
const { PanelBody, PanelRow, ToggleControl, TextControl, SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect, subscribe } = wp.data;

const CustomSidebarMetaComponent = (props) => {
	const [alreadySendRequest, setAlreadySendRequest] = useState(false);
	const [terms, setTerms] = useState(false);

	// const [targetURL, setTargetURL] = useState('');
	// const [redirectMode, setRedirectMode] = useState('');
	// const [catID, setCatID] = useState('');
	// const [isNoFollow, setIsNoFollow] = useState(false);
	// const [isSponsored, setIsSponsored] = useState(false);
	// const [isParameterForward, setIsParameterForward] = useState(false);
	// const [isTracking, setIsTracking] = useState(true);

	useEffect(() => {
		console.log(props);
		if (props.customPostMetaValue) {
			API.get(namespace + 'terms').then((res) => {
				if (res.data) {
					setTerms(res.data.data);
				}
			});
		}
	}, [props.customPostMetaValue]);

	subscribe(function () {
		if (!alreadySendRequest) {
			setAlreadySendRequest(true);
			var isSavingPost = wp.data.select('core/editor').isSavingPost();
			var isAutosavingPost = wp.data.select('core/editor').isAutosavingPost();
			var permalink = wp.data.select('core/editor').getPermalink();
			var currentPost = wp.data.select('core/editor').getCurrentPost();

			if (isSavingPost && !isAutosavingPost) {
				console.log(props);
				// API.post(namespace + 'links', {
				// 	params: {
				// 		cat_id: categroy,
				// 		link_title: currentPost.title,
				// 		link_slug: currentPost.slug,
				// 		nofollow: isNoFollow,
				// 		param_forwarding: isParameterForward,
				// 		redirect_type: redirectMode,
				// 		short_url: permalink,
				// 		sponsored: isSponsored,
				// 		target_url: targetURL,
				// 		track_me: isTracking,
				// 	},
				// }).then((res) => {
				// 	console.log(res);
				// });
			}
		}
	});

	return (
		<>
			{console.log(props)}
			<ToggleControl label={__('Enable Instant Redirect', 'betterlinks')} checked={props.customPostMetaValue} onChange={props.setCustomPostMeta} />
			{props.customPostMetaValue && (
				<>
					<TextControl label="Target URL" value={props.betterlinksQuicklinks.target_url} onChange={(value) => props.setQuickLinks('target_url', value)} />
					<SelectControl label="Redirect Type" options={redirectType} onChange={(mode) => setRedirectMode(mode)} />
					{terms && (
						<SelectControl
							label="Choose Category"
							options={terms
								.filter((item) => item.term_type == 'category')
								.map((item) => ({
									value: item.ID,
									label: item.term_name,
								}))}
							onChange={(catID) => setCatID(catID)}
						/>
					)}

					<h3>Link Options</h3>
					<ToggleControl label={__('No Follow', 'betterlinks')} />
					<ToggleControl label={__('Sponsored', 'betterlinks')} />
					<ToggleControl label={__('Parameter Forwarding', 'betterlinks')} />
					<ToggleControl label={__('Tracking', 'betterlinks')} />
					<h3>Advanced</h3>
				</>
			)}
		</>
	);
};

const CustomSidebarMeta = compose([
	withSelect((select) => {
		return {
			customPostMetaValue: select('core/editor').getEditedPostAttribute('meta')['betterlinks_is_enable_quicklinks'],
			betterlinksQuicklinks: select('core/editor').getEditedPostAttribute('meta')['betterlinks_quicklinks'],
		};
	}),
	withDispatch((dispatch) => {
		return {
			setCustomPostMeta: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_is_enable_quicklinks: value } });
			},
			setQuickLinks: function (name, value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_quicklinks: { target_url: 'ssss' } } });
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

registerPlugin('betterlinks-sidebar', {
	render: CustomSidebarComponent,
	icon: '',
});
