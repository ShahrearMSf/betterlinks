import UpgradeToPro from '../UpgradeToPro';
import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';

const AffiliateLinkDisclosure = () => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<span className="btl-form-group btl-form-group--teaser btl-form-group-affiliate-link-disclosure">
				<label className="btl-form-label">
					{__('Affiliate Link Disclosure', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
				</label>
				<div className="link-options__body">
					<label className="btl-checkbox-field block" onClick={openUpgradeToProModal}>
						<input className="btl-check" name="is_autolink_headings" type="checkbox" disabled={true} />
						<span className="text">
							{__('Enable affiliate link disclosure', 'betterlinks')}
							<div className="btl-tooltip">
								<span className="dashicons dashicons-info-outline"></span>
								<span className="btl-tooltiptext" style={{ width: '255px', 'text-align': 'left', 'line-height': '1.2em' }}>
									{__('When enabled, this will allow you to add an Affiliate Link Disclosure to your desired page & post. For more info, ', 'betterlinks-pro')}
									<a target="_blank" style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}>
										Click Here
									</a>
								</span>
							</div>
						</span>
					</label>
				</div>
			</span>
		</>
	);
};

export default AffiliateLinkDisclosure;
