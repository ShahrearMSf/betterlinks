export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	return (
		<>
			{!!betterLinksHooks.applyFilters('isActivePro', false) && (
				<span className={`btl-expire-status-dot ${data.link_status || 'publish'} ${view == 'dnd' ? 'dnd-view-expire-dot-layout' : 'list-view-expire-dot-layout'} `}></span>
			)}
		</>
	);
};
