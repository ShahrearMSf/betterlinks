import { redirectType } from './utils/data';
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment, useEffect } = wp.element;
const { PluginDocumentSettingPanel, PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
const { PanelBody, PanelRow, ToggleControl, TextControl, SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

const CustomSidebarMetaComponent = (props) => {
	useEffect(() => {
		console.log('init');
	}, []);

	return (
		<>
			<ToggleControl label={__('Enable Instant Redirect', 'betterlinks')} checked={props.customPostMetaValue} onChange={props.setCustomPostMeta} />
			{props.customPostMetaValue && (
				<>
					<TextControl label="Target URL" value="" onChange={(e) => console.log(e)} />
					<SelectControl
						label="Redirect Type"
						options={redirectType}
						onChange={(e) => {
							console.log(e);
						}}
					/>
					<SelectControl
						label="Choose Category"
						options={[
							{
								value: '',
								label: __('No Category Selected', 'betterlinks'),
							},
						]}
						onChange={(e) => {
							console.log(e);
						}}
					/>
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
		return { customPostMetaValue: select('core/editor').getEditedPostAttribute('meta')['betterlinks_is_enable_quicklinks'] };
	}),
	withDispatch((dispatch) => {
		return {
			setCustomPostMeta: function (value) {
				dispatch('core/editor').editPost({ meta: { betterlinks_is_enable_quicklinks: value } });
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
