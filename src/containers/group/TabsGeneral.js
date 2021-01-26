import React from 'react';
const TabsGeneral = () => {
	return (
		<React.Fragment>
			<div className="btl-tab-panel-inner">
				<span className='btl-form-group'>
					<label className="btl-form-label">Hello world</label>
					<input type="text" className="btl-form-control" />
				</span>
				<span className='btl-form-group'>
					<label className="btl-form-label">Hello another world</label>
					<input type="text" className="btl-form-control" placeholder="hello world" />
				</span>
				<span className='btl-form-group'>
					<label className="btl-form-label">Hello world</label>
					<input type="text" className="btl-form-control" placeholder="Hello another world"/>
				</span>
				<span className='btl-form-group'>
					<label className="btl-form-label">Hello world</label>
					<textarea type="text" className="btl-form-control" placeholder="message"></textarea>
				</span>
				<span className='btl-form-group'>
					<label className="btl-form-label">Hello world</label>
					<label className="btl-checkbox-field">
						<input name="nofollow" className="btl-check" type="checkbox" value="false" />
							<span className="text">No Follow</span>
					</label>
				</span>
			</div>
		</React.Fragment>
	);
};
export default TabsGeneral;
