import { __ } from '@wordpress/i18n';

export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	return (
		<>
			{!!betterLinksHooks.applyFilters('isActivePro', false) && (
				<>
					<div className="dnd-link-button btl-tooltip btl-expire-status-dot-parent">
						<span className={`btl-expire-status-dot ${data.link_status || 'publish'} ${view == 'dnd' ? 'dnd-view-expire-dot-layout' : 'list-view-expire-dot-layout'} `}></span>
						<span className="btl-tooltiptext">{__(`${data.link_status == 'publish' ? 'active' : data.link_status}`, 'betterlinks')}</span>
					</div>
				</>
			)}
		</>
	);
};
