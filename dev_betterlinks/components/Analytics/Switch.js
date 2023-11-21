import { is_extra_data_tracking_compatible } from 'utils/helper';

const Switch = ({ analyticsTab, update_activity, id }) => {
	return (
		<ul className="btl-tabs btl-tabs-with-indicator">
			<li
				className={`btl-tab ${0 === analyticsTab ? 'active' : ''}`}
				onClick={() => {
					if (1 === analyticsTab && '' !== id) {
						update_activity({
							analyticsTab: 0,
						});
					}
				}}
			>
				Overview
			</li>
			<li
				className={`btl-tab ${1 === analyticsTab ? 'active' : ''}`}
				onClick={() => {
					if (0 === analyticsTab && '' !== id) {
						update_activity({
							analyticsTab: 1,
						});
					}
				}}
			>
				Performance {!is_extra_data_tracking_compatible && <span className="pro-badge">Pro</span>}
			</li>
		</ul>
	);
};

export default Switch;
