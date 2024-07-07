import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';

const DynamicRedirectsTeaser = ({ openUpgradeToProModal }) => {
	if (is_pro_enabled) return;
	return (
		<div className="link-options--teasers" onClick={() => openUpgradeToProModal()}>
			<div className="link-options-info">
				<ul>
					<li>
						<label>{__('Redirection Type:', 'betterlinks')}</label>
					</li>
					<li>
						<label>{__('Target URL 1:', 'betterlinks')}</label>
						<input type="text" value="example-1.com" disabled />
					</li>
					<li>
						<label>{__('Target URL 2:', 'betterlinks')}</label>
						<input type="text" value="example-2.com" disabled />
					</li>
					<li>
						<label>{__('Split Test:', 'betterlinks')}</label>
						<input id="splittest" type="checkbox" disabled />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default DynamicRedirectsTeaser;
