import React from 'react';

const TabsTools = ({ query }) => {
	return (
		<React.Fragment>
			<div>
				<h3>Choose what to export</h3>
				<form action={'admin.php?page=' + query.get('page') + '&export=true'} method="POST">
					<div role="group" aria-labelledby="my-radio-group">
						<div>
							<label>
								<input type="radio" name="content" value="all" />
								All content
							</label>
							<span>This will contain all of your links, analytic and settings.</span>
						</div>
						<div>
							<label>
								<input type="radio" name="content" value="links" />
								Manage Links
							</label>
						</div>
						<div>
							<label>
								<input type="radio" name="content" value="clicks" />
								Analytic
							</label>
						</div>
						<div>
							<label>
								<input type="radio" name="content" value="settings" />
								Settings
							</label>
						</div>
					</div>
					<button type="submit">Download Export File</button>
				</form>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
