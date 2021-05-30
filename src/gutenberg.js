const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { PluginDocumentSettingPanel, PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
const { PanelBody, PanelRow, ToggleControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

const CustomSidebarMetaComponent = (props) => {
	return <ToggleControl label={__('Enable Instant Redirect', 'betterlinks')} checked={props.customPostMetaValue} onChange={props.setCustomPostMeta} />;
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

registerPlugin('awp-customsidebar', {
	render: CustomSidebarComponent,
});
