import { __ } from '@wordpress/i18n';
import { useState } from 'react';

export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	return (
		<>
			{!!betterLinksHooks.applyFilters('isActivePro', false) && (
				<>
					<div className="dnd-link-button btl-tooltip btl-expire-status-dot-parent c-default">
						{data.link_status == 'broken' ? (
							<span className="icon error">
								<i className="btl btl-unlink" />
							</span>
						) : (
							<span className={`btl-expire-status-dot ${data.link_status || 'publish'} ${view == 'dnd' ? 'dnd-view-expire-dot-layout' : 'list-view-expire-dot-layout'} `} />
						)}
						<span className="btl-tooltiptext">{__(`${!data.link_status || data.link_status == 'publish' ? 'active' : data.link_status}`, 'betterlinks')}</span>
					</div>
				</>
			)}
		</>
	);
};

export const useUpgradeProModal = (value = false) => {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(value);
	const openUpgradeToProModal = () => setUpgradeToProModal(true);
	const closeUpgradeToProModal = () => setUpgradeToProModal(false);

	return [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal];
};
// usage
// const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
