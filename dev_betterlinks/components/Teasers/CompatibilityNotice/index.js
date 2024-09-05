import { __ } from '@wordpress/i18n';
import { pro_version_check } from 'utils/helper';

const CompatibilityNotice = ({ mode = '#f2f2f2', noticeType = 'warning', compatibleProVersion, notice }) => {
	const isProUpdated = pro_version_check(compatibleProVersion);
	if (isProUpdated) return '';
	const style = {
		group: {
			marginLeft: 0,
			padding: 0,
		},
		notice: {
			padding: '15px',
			background: mode,
		},
	};
	return (
		<div className={`btl-form-group ${'' !== noticeType ? 'notice notice-' + noticeType : ''}`} style={style.group}>
			<div style={style.notice}>
				<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
				{notice}
			</div>
		</div>
	);
};

export default CompatibilityNotice;
