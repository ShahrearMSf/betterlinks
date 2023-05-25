import { __ } from '@wordpress/i18n';

export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	return (
		<>
			{!!betterLinksHooks.applyFilters('isActivePro', false) && (
				<>
					<div className="dnd-link-button btl-tooltip btl-expire-status-dot-parent c-default">
						<span className={`btl-expire-status-dot ${data.link_status || 'publish'} ${view}-view-expire-dot-layout`} />
						<span className="btl-tooltiptext">{__(`${data.link_status === 'publish' ? 'active' : data.link_status}`, 'betterlinks')}</span>
					</div>
				</>
			)}
		</>
	);
};
