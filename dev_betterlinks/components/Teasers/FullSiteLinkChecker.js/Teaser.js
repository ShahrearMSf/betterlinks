import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';
import UpgradeToPro from '../UpgradeToPro';
import { useUpgradeProModal } from 'utils/customHooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DataTable from 'react-data-table-component';
import { columns, teaserFLCLinks } from './teaser.data';
import { plugin_root_url } from 'utils/helper';
import { useState } from 'react';

const Teaser = () => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-tab-panel-inner btl-broken-links-panel btl-broken-links-panel-disabled">
				<div className="btl-broken-link-checker-wrapper btl-fullsite">
					<div className="btl-broken-link-checker btl-broken-link-checker-wrapper-left" style={{ width: '55%' }}>
						<div>
							<h4>{__('Select Post Type and Scan Url', 'betterlinks')}</h4>
							<Settings />
							<div className="btl-link-scan-btn-group">
								<button onClick={openUpgradeToProModal} className="btl-link-scan-btn btl-filled-button" style={{ cursor: 'pointer' }}>
									{__('Start New Scan', 'betterlinks')}
								</button>

								<button className="btl-resume-link-scan-btn" disabled>
									{__('Resume Scan', 'betterlinks')}
								</button>
							</div>
						</div>
					</div>

					<div className="btl-broken-link-checker-wrapper-right">
						<CircularProgressWithLabel value={__('50%', 'betterlinks-pro')} />
						<div className="btl-flc-scan-details">
							<ScanDetail color="blue" title={__('Total Posts, Pages & Custom Posts:', 'betterlinks')} value="10" />
							<ScanDetail color="green" title={__('Total Scaned Posts:', 'betterlinks')} value="5" />
							<ScanDetail color="yellow" title={__('Total Scaned Links:', 'betterlinks')} value="5" />
						</div>
					</div>
				</div>
			</div>
			<div className="btl-tab-panel-inner btl-broken-links-panel btl-broken-links-table-wrapper btl-broken-links-table-wrapper--fullsite">
				<DataTable
					className="btl-broken-links-table"
					title={__('Broken Link Reports', 'betterlinks')}
					columns={columns}
					data={teaserFLCLinks}
					pagination
					subHeader
					highlightOnHover={false}
					subHeaderComponent={<SubHeaderComponent />}
					persistTableHead={true}
				/>
			</div>
		</>
	);
};

export default Teaser;

const SubHeaderComponent = () => {
	return (
		<form onSubmit={() => {}} className="btl-subheader-form">
			<div className="btl-subheader-form-input">
				<input id="search" type="text" placeholder={__('Search...', 'betterlinks')} value="" onChange={() => {}} />
			</div>
			<button className="button" disabled>
				{__('Clear Logs', 'betterlinks-pro')}
			</button>
		</form>
	);
};

const ScanDetail = ({ color, title, value = null }) => {
	return (
		<div>
			<p>
				<span className={`btl-flc-round-pointer ${color}`} /> {title}
			</p>
			<span> {value || __('N/A', 'betterlinks')} </span>
		</div>
	);
};

const CircularProgressWithLabel = ({ value = null }) => {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" className="btl-flc-circle-progressbar" value={50} size={200} />
			<CircularProgress variant="determinate" className="flc-background-circle" value={100} size={200} />
			<Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
				<Typography variant="caption" component="div" color="textSecondary">
					{value || __('No Data Found', 'betterlinks-pro')}
				</Typography>
			</Box>
		</Box>
	);
};

const Settings = () => {
	return (
		<div
			style={{
				padding: '0 0 20px 0',
			}}
		>
			<form>
				<span className="btl-form-group btl-general-tab-settings-react-select">
					<label className="btl-form-label">
						{__('Post Types', 'betterlinks-pro')}
						<div className="btl-tooltip">
							<span className="dashicons dashicons-info-outline" style={{ display: 'inline', fontSize: '16px' }} />
							<span className="btl-tooltiptext">
								{__("Select those post types where you don't want betterlinks' autolink keywords feature to take effect.", 'betterlinks-pro')}
							</span>
						</div>
					</label>
					<div className="btl-form-field">
						<label className="btl-checkbox-field">
							<Select2
								isMulti
								name="fullsite_scanner_post_types"
								className="btl-modal-select--full"
								classNamePrefix="btl-react-select"
								value={[
									{ label: 'post', value: '' },
									{ label: 'page', value: '' },
									{ label: 'product', value: '' },
								]}
								isDisabled={true}
							/>
						</label>
					</div>
				</span>
			</form>
		</div>
	);
};
