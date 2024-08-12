import { __ } from '@wordpress/i18n';
import { pro_version_check } from 'utils/helper';

const CompatibilityNotice = ({ compatibleProVersion, notice }) => {
	const isProUpdated = pro_version_check(compatibleProVersion);
	if (isProUpdated) return '';
	return (
		<div className="btl-form-group">
			<div className="short-description">
				<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
				{notice}
			</div>
		</div>
	);
};

export default CompatibilityNotice;
