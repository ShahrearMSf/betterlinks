import axios from 'axios';
import React from 'react';
import { Formik, Field, Form } from 'formik';
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

				<h3>Choose what to import</h3>
				<form action={'admin.php?page=' + query.get('page') + '&import=true'} method="POST" enctype="multipart/form-data">
					<div role="group" aria-labelledby="my-radio-group">
						<p>
							<label htmlFor="upload">Choose a file from your computer:</label> (Maximum size: 512 MB)
							<input type="file" id="upload_file" name="upload_file" size="25" />
						</p>
						<p className="submit">
							<input type="submit" name="submit" id="submit" className="button button-primary" value="Upload file and import" disabled="" />
						</p>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
