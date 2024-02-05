import { __ } from '@wordpress/i18n';
import Select from 'react-select';

const SelectTeaser = ({ title = '', ...props }) => {
	return (
		<div className="btl-role-item btl-form-group" {...props}>
			<label className="btl-form-label">
				{title}
				<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
			</label>
			<div className="link-options__body">
				<Select className="btl-modal-select" isDisabled={true} />
			</div>
		</div>
	);
};

export default SelectTeaser;
