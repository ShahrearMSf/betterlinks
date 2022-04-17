export const useBtlExpireStatusDot = ({ data = {}, view = 'dnd' }) => {
	const parsedExpireData = typeof data.expire === 'string' && !!data.expire.trim() && JSON.parse(data.expire);
	const expiredStatus = !!(parsedExpireData && parsedExpireData.status);

	return <span class={`btl-expire-status-dot ${view == 'dnd' ? 'dnd-view-expire-dot-layout' : 'list-view-expire-dot-layout'} ${expiredStatus ? 'expired' : 'active'}`}></span>;
};
