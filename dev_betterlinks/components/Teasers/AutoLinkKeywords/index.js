import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_option } from 'redux/actions/settings.actions';
import { useUpgradeProModal } from 'utils/customHooks';
import { pro_version_check, saveSettingsHandler } from 'utils/helper';
import UpgradeToPro from '../UpgradeToPro';

const AutoLinkKeywords = ({ settings, postdatas, update_option }) => {
	const isProUpdated = pro_version_check('1.9.5');

	if (!isProUpdated) {
		return <span>Pro version is not up to date</span>;
	}

	return <>{betterLinksHooks.applyFilters('BetterLinksAutoLinkKeywords', <Teaser />, { settings, postdatas, update_option, saveSettingsHandler })}</>;
};

const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
	};
};
export default connect(null, mapDispatchToProps)(AutoLinkKeywords);

const Teaser = () => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<span className="btl-form-group btl-form-group--teaser btl-form-group-autolink-keyword-icon">
				<label className="btl-form-label">
					{__('Auto-Linked Keywords Icon', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline"></span>
						<span className="btl-tooltiptext">{__('If enabled, this will show a affiliate link icon beside your auto-linked keywords', 'betterlinks-pro')}</span>
					</div>
				</label>
				<div className="link-options__body">
					<label className="btl-checkbox-field block" onClick={openUpgradeToProModal}>
						<input className="btl-check" name="is_autolink_icon" type="checkbox" disabled={true} />
						<span className="text" />
					</label>
				</div>
			</span>

			<span className="btl-form-group btl-form-group--teaser btl-form-group-autolink-keyword-icon">
				<label className="btl-form-label">
					{__('Auto-Link Keywords inside', 'betterlinks-pro')} {__('Headings', 'betterlinks-pro')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline"></span>
						<span className="btl-tooltiptext">{__('if enabled, keywords will be automatically linked in the heading tags as well.', 'betterlinks-pro')}</span>
					</div>
				</label>
				<div className="link-options__body">
					<label className="btl-checkbox-field block" onClick={openUpgradeToProModal}>
						<input className="btl-check" name="is_autolink_headings" type="checkbox" disabled={true} />
						<span className="text" />
					</label>
				</div>
			</span>
		</>
	);
};
