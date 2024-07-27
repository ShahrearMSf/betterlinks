import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';

const AdvanceOptionTeaser = ({ openUpgradeToProModal = () => {} }) => {
	if (is_pro_enabled) return;
	return (
		<div className="link-options__body">
			<div className="link-options--teasers">
				<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
					<label className="btl-modal-form-label" htmlFor="status">
						{__('Status', 'betterlinks')}
					</label>
					<select id="status" disabled>
						<option value="publish">{__('Active', 'betterlinks')}</option>
					</select>
				</div>
				<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
					<label className="btl-modal-form-label" htmlFor="expire">
						{__('Expire', 'betterlinks')}
					</label>
					<input id="expire" type="checkbox" disabled />
				</div>
				<div className="btl-modal-form-group" onClick={() => openUpgradeToProModal()}>
					<label className="btl-modal-form-label">{__('Password Protection', 'betterlinks')}</label>
					<input id="enable_password" type="checkbox" disabled />
				</div>
			</div>
		</div>
	);
};

export default AdvanceOptionTeaser;
