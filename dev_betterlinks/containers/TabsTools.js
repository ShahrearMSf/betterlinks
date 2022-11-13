import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { nonce } from 'utils/helper';
const TabsTools = ({ query }) => {
	const [importerMode, setImporterMode] = useState('default');
	const [taPrefix, setTaPrefix] = useState('');
	const [exportMode, setExportMode] = useState('links');
	const [importResponse, setImportResponse] = useState({});
	const importerModeHandler = (changeEvent) => {
		setImporterMode(changeEvent.target.value);
	};
	const exportModeHandler = (changeEvent) => {
		setExportMode(changeEvent.target.value);
	};

	useEffect(() => {
		if (query.get('import')) {
			axios.post(`${ajaxurl}?action=betterlinks/tools/get_import_info&security=${nonce}`).then(
				(response) => {
					setImportResponse(JSON.parse(response.data.data));
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, []);

	const result = 'admin.php?page=' + query.get('page') + '&import=true';
	console.log({ result });

	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<h3 className="btl-tab-panel-header">{__('Choose an Option You want to Export', 'betterlinks')}</h3>
					<form action={'admin.php?page=' + query.get('page') + '&export=true'} method="POST">
						<div role="group" className="btl-radio-group" aria-labelledby="my-radio-group">
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="links" checked={exportMode === 'links'} onChange={exportModeHandler} />
									<span>{__('Links', 'betterlinks')}</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="clicks" checked={exportMode === 'clicks'} onChange={exportModeHandler} />
									<span>{__('Analytics', 'betterlinks')}</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="content" value="simplecsvfile" checked={exportMode === 'simplecsvfile'} onChange={exportModeHandler} />
									<span>{__('Sample CSV File', 'betterlinks')}</span>
								</label>
							</div>
						</div>
						<button type="submit" className="btl-export-download-button">
							{__('Export File', 'betterlinks')}
						</button>
					</form>
				</div>
				<div className="btl-tab-panel-inner">
					<h3 className="btl-tab-panel-header">{__('Choose the Plugin You Want to Import from', 'betterlinks')}</h3>
					<form action={'admin.php?page=' + query.get('page') + '&import=true'} method="POST" encType="multipart/form-data">
						<div role="group" className="btl-radio-group" aria-labelledby="my-radio-group">
							<div>
								<label className="btl-radio">
									<input type="radio" name="mode" value="default" checked={importerMode === 'default'} onChange={importerModeHandler}></input>
									<span>{__('BetterLinks', 'betterlinks')}</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="mode" value="prettylinks" checked={importerMode === 'prettylinks'} onChange={importerModeHandler}></input>
									<span>{__('Pretty Links', 'betterlinks')}</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="mode" value="simple301redirects" checked={importerMode === 'simple301redirects'} onChange={importerModeHandler}></input>
									<span>{__('Simple 301 Redirects', 'betterlinks')}</span>
								</label>
							</div>
							<div>
								<label className="btl-radio">
									<input type="radio" name="mode" value="thirstyaffiliates" checked={importerMode === 'thirstyaffiliates'} onChange={importerModeHandler}></input>
									<span>{__('ThirstyAffiliates', 'betterlinks')}</span>
								</label>
							</div>
							{importerMode === 'thirstyaffiliates' && (
								<>
									<input name="ta_prefix" id="ta_prefix" type="text" placeholder="Link Prefix" value={taPrefix} onChange={(e) => setTaPrefix(e.target.value)} />
								</>
							)}
							<p className="btl-file-chooser">
								<label htmlFor="upload">{__('Choose the File You Want to Import', 'betterlinks')}</label>
								<input type="file" id="upload_file" name="upload_file" size="25" />
							</p>
							<p className="submit">
								<input type="submit" name="submit" id="submit" className="button button-primary" value={__('Import File', 'betterlinks')} disabled="" />
							</p>
						</div>
					</form>
					<div id="response">{Object.entries(importResponse).map(([index, item]) => item.map((childItem, chiildIndex) => <div key={chiildIndex}>{childItem}</div>))}</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
