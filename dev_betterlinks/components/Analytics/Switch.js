import { is_extra_data_tracking_compatible, is_pro_enabled } from 'utils/helper';

const Switch = ({ analyticsTab, update_activity }) => {
	return (
		<ul className="btl-tabs btl-tabs-with-indicator">
			<li
				className={`btl-tab ${0 === analyticsTab ? 'active' : ''}`}
				onClick={() =>
					update_activity({
						analyticsTab: 0,
					})
				}
			>
				Overview
			</li>
			<li
				className={`btl-tab ${1 === analyticsTab ? 'active' : ''}`}
				onClick={() =>
					update_activity({
						analyticsTab: 1,
					})
				}
			>
				Performance {!is_extra_data_tracking_compatible && <span className="pro-badge">Pro</span>}
			</li>
		</ul>
	);
};

export default Switch;
