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
				Performance
			</li>
		</ul>
	);
};

export default Switch;
