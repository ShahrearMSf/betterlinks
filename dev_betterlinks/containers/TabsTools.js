import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { nonce, betterlinks_nonce, migratable_plugins } from 'utils/helper';

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
			console.log('import called')
		}
	}, []);

	const onSubmitHandler = (mode, type = 'links') => {
		let form_data = new FormData();
		if (mode === 'prettylinks') {
			form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
			form_data.append('re_run', true);
		} else if (mode === 'simple301redirects') {
			form_data.append('action', 'betterlinks/admin/run_simple301redirects_migration');
		} else if (mode === 'thirstyaffiliates') {
			form_data.append('action', 'betterlinks/admin/run_thirstyaffiliates_migration');
		}
		form_data.append('security', betterlinks_nonce);
		form_data.append('type', type);
		return axios.post(ajaxurl, form_data).then(
			(response) => {
				return response;
			},
			(error) => {
				return error;
			}
		);
	};

	const handleMigration = async (e) => {
		e.preventDefault();
		if ('default' !== importerMode) {
			const res = await onSubmitHandler(importerMode, 'links');
			const data = res.data?.data;
			if (data?.['btl_prettylinks_migration_running_in_background']) {
				setImportResponse({ btl_prettylinks_migration_running_in_background: 'PrettyLinks migration running in background' });
				return;
			}
			setImportResponse(data);
		}
	};

	return (
		<React.Fragment>
			<div className="btl-tab-inner-divider">
				<div className="btl-tab-panel-inner">
					<h3 className="btl-tab-panel-header">{__('Choose an Option You want to Export', 'betterlinks')}</h3>
					<form action={'admin.php?page=' + query.get('page') + '&export=true&nonce=' + betterlinks_nonce} method="POST">
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
					<form action={'admin.php?page=' + query.get('page') + '&import=true&nonce=' + betterlinks_nonce} method="POST" encType="multipart/form-data">
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
								<input type="file" id="upload_file" name="upload_file" size="25" required />
							</p>
							<p className="submit" style={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
								<input type="submit" name="submit" id="submit" className="button button-primary" value={__('Import File', 'betterlinks')} disabled="" />
								{'default' !== importerMode && migratable_plugins?.[importerMode] && (
									<>
										{__('Or', 'betterlinks')}
										<input type="button" className="button button-primary" value={__('Migrate from Database', 'betterlinks')} onClick={handleMigration} />
									</>
								)}
							</p>
						</div>
					</form>
					<div id="response">
						{Object.keys(importResponse || {}).length > 0 && (
							<div className="btl-migration-logs">
								<div className="btl-migration-logs__item">
									{Object.entries(importResponse || {}).map(([index, item]) => {
										if (Array.isArray(item)) {
											return item?.map((childItem, chiildIndex) => <span key={chiildIndex}>{childItem}</span>);
										}
										return <span key={index}>{item}</span>;
									})}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default TabsTools;
