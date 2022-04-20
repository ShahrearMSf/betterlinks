export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	const parsedExpireData = typeof data.expire === 'string' && !!data.expire.trim() && JSON.parse(data.expire);
	const isExpired = !!(parsedExpireData && parsedExpireData.status);

	return (
		<span
			className={`btl-expire-status-dot ${view == 'dnd' ? 'dnd-view-expire-dot-layout' : 'list-view-expire-dot-layout'} ${
				data.link_status == 'expired' || isExpired ? 'expired' : 'active'
			}`}
		></span>
	);
};
