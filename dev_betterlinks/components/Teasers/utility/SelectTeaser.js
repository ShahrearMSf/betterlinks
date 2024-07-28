import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';

const defaultValues = { value: '', label: __('Select...', 'betterlinks') };
const SelectTeaser = ({ title = '', is_pro = false, isMulti = false, defaultValue = defaultValues, ...props }) => {
	return (
		<div className="btl-role-item btl-form-group" {...props}>
			<label className="btl-form-label">
				{title}
				{is_pro && <span class="pro-badge">Pro</span>}
			</label>
			<div className="link-options__body">
				<Select2 isMulti={isMulti} className="btl-modal-select" isDisabled={true} defaultValue={defaultValue} />
			</div>
		</div>
	);
};

export default SelectTeaser;
