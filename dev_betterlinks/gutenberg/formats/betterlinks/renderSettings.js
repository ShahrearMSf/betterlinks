// wordpress imports
const { __ } = wp.i18n;
const { ToggleControl, Spinner } = wp.components;

export const RenderSettings = ({ setLinkNewTab, linkNewTab }) => {
	return (
		<div className="betterlinks-expanded-format-options">
			<ToggleControl label={__(`Open in new tab`)} checked={linkNewTab} onChange={() => setLinkNewTab(!linkNewTab)} />
		</div>
	);
};
