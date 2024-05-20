import { __ } from '@wordpress/i18n';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { is_pro_enabled } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import { bindActionCreators } from 'redux';
import { update_tracking_settings } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';

const ExternalAnalytics = ({ trackingSettings, update_tracking_settings }) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	if (is_pro_enabled) {
		return betterLinksHooks.applyFilters('BetterLinksTrackingPro', null, { ...trackingSettings, update_tracking_settings });
	}
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-tab-inner-divider">
				<div>
					<div className="btl-external-analytics-container btl-googleanalytics-container teaser">
						<form
							className="form"
							id="googleAnalytics"
							onSubmit={(e) => {
								e.preventDefault();
								openUpgradeToProModal();
							}}
							action="#"
						>
							<div className="btl-role-item btl-form-group" onClick={() => openUpgradeToProModal()}>
								<label className="btl-form-label">{__('Enable Google Analytics', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field">
										<input type="checkbox" className="btl-check" name="is_enable_ga" disabled />
										<span className="text" />
									</label>
								</div>
							</div>
						</form>
					</div>

					<div className="btl-external-analytics-container btl-fb-pixel-container teaser">
						<form
							className="form"
							id="fbPixel"
							onSubmit={(e) => {
								e.preventDefault();
								openUpgradeToProModal();
							}}
							action="#"
						>
							<div className="btl-role-item btl-form-group" onClick={() => openUpgradeToProModal()}>
								<label className="btl-form-label">{__('Enable Facebook Pixel Tracking', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field">
										<input type="checkbox" className="btl-check" name="is_enable_pixel" disabled />
										<span className="text" />
									</label>
								</div>
							</div>
						</form>
					</div>
					<div className="btl-role-item btl-form-group" onClick={() => openUpgradeToProModal()}>
						<label className="btl-form-label">{__('Custom Scripts', 'betterlinks')}</label>
						<div className="link-options__body link-options__body_tracking">
							<input className="btl-text-field" disabled onClick={() => openUpgradeToProModal()} />

							<span className="text" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		update_tracking_settings: bindActionCreators(update_tracking_settings, dispatch),
	};
};

export default connect(null, mapDispatchToProps)(ExternalAnalytics);
