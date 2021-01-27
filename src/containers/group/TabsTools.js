import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Formik, Field, Form } from 'formik';
const TabsTools = ({ query }) => {
	const [importerMode, setImporterMode] = useState('default');
	const [importResponse, setImportResponse] = useState({});
	const importerModeHandler = (changeEvent) => {
		setImporterMode(changeEvent.target.value);
	};

	useEffect(() => {
		if (query.get('import')) {
			axios.get(ajaxurl + '?action=betterlinks/tools/get_import_info').then(
				(response) => {
					setImportResponse(JSON.parse(response.data.data));
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, []);

	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<h3 className="btl-tab-panel-header">Choose what to export</h3>
					<form action={'admin.php?page=' + query.get('page') + '&export=true'} method="POST">
						<div role="group" className="btl-radio-group" aria-labelledby="my-radio-group">
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="all" />
									<span>All Content (This will contain all of your links, analytic and settings.)</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="links" />
									<span>Manage Links</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="clicks" />
									<span>Analytic</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="settings" />
									<span>Settings</span>
								</label>
							</div>
						</div>
						<button type="submit" className="btl-export-download-button">
							Download Export File
						</button>
					</form>
				</div>
				<div className="btl-tab-panel-inner">
					<h3 className="btl-tab-panel-header">Choose what to import</h3>
					<form action={'admin.php?page=' + query.get('page') + '&import=true'} method="POST" encType="multipart/form-data">
						<div role="group" className="btl-radio-group" aria-labelledby="my-radio-group">
							<div>
								<label className="btl-radio">
									<input type="radio" name="mode" value="default" checked={importerMode === 'default'} onChange={importerModeHandler}></input>
									<span>BetterLinks</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" id="female" name="mode" value="prettylinks" checked={importerMode === 'prettylinks'} onChange={importerModeHandler}></input>
									<span>PrettyLinks</span>
								</label>
							</div>
							<p className="btl-file-chooser">
								<label htmlFor="upload">Choose a file from your computer: (Maximum size: 512 MB)</label>
								<input type="file" id="upload_file" name="upload_file" size="25" />
							</p>
							<p className="submit">
								<input type="submit" name="submit" id="submit" className="button button-primary" value="Upload file and import" disabled="" />
							</p>
						</div>
					</form>
					<div id="response">{Object.entries(importResponse).map(([index, item]) => item.map((childItem) => <div>{childItem}</div>))}</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
