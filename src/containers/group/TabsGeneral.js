import React from 'react';
const TabsGeneral = () => {
	return (
		<React.Fragment>
			<span className="btl-form-group">
				<label className="btl-form-label">Fast Redirect Status</label>
				<button className="button button-primary">Active</button>
			</span>
			<span className="btl-form-group">
				<label className="btl-form-label">Analytic Cache Clear</label>
				<button className="button button-primary">Clear Cache</button>
			</span>
		</React.Fragment>
	);
};
export default TabsGeneral;
