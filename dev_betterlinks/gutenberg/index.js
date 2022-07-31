const { registerPlugin } = wp.plugins;
import { CustomSidebar } from 'gutenberg/components';

registerPlugin('betterlinks-sidebar', {
	render: CustomSidebar,
	icon: '',
});
