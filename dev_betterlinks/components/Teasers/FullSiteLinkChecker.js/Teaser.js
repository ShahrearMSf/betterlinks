import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';
import UpgradeToPro from '../UpgradeToPro';
import { useUpgradeProModal } from 'utils/customHooks';
import DataTable from 'react-data-table-component';
import { columns, teaserFLCLinks } from './teaser.data';
import { plugin_root_url, is_pro_enabled, pro_version_check } from 'utils/helper';

import { List, ListItem, ListItemText, Box, CardContent, Card, CircularProgress, Typography } from '@material-ui/core';
import { ReactComponent as Stepper } from '../../../../assets/images/teasers/stepper.svg';
import { ReactComponent as Link } from '../../../../assets/images/teasers/link.svg';
import { ReactComponent as Analytics } from '../../../../assets/images/teasers/analytics.svg';
import { ReactComponent as Eye } from '../../../../assets/images/teasers/eye.svg';
import { ReactComponent as Selector } from '../../../../assets/images/teasers/selector.svg';
import Note from 'components/CustomizeLinkPreview/Note';

const Teaser = () => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const is_pro_updated = pro_version_check('2.1.1');
	return (
		<>
			{!is_pro_updated && (
				<div className="btl-notes notice notice-warning" style={{ marginLeft: 0, marginBottom: '10px', padding: '10px', fontSize: '12px' }}>
					<Note note="To utilize the Full Site Link Scanner Feature, please update the BetterLinks Pro plugin to at least v2.1.1." />
				</div>
			)}
			<div style={{ position: 'relative' }}>
				<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
				<UpgradePopup />
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

								<div className="btl-flc-scanned-count">
									<ScannedCount type="active" />
									<ScannedCount type="broken" />
									<ScannedCount type="forbidden" />
								</div>
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

const ScannedCount = ({ type = 'active' }) => {
	// @-collapse
	const types = {
		active: {
			icon: plugin_root_url + 'assets/images/all-right.svg',
			title: __('Total Active Links', 'betterlinks'),
			count: '3',
		},
		broken: {
			icon: plugin_root_url + 'assets/images/broken-links.svg',
			title: __('Broken Links', 'betterlinks'),
			count: '1',
		},
		forbidden: {
			icon: plugin_root_url + 'assets/images/stop.svg',
			title: __('403 Forbidden', 'betterlinks'),
			count: '1',
		},
	};
	return (
		<div className={`btl-flc-scanned-count--${type}`} title={`${types[type].title} count: ${types[type].count}`}>
			<span>
				<img src={types[type].icon} alt={`${type}-links-count`} />
				{types[type].title}
			</span>
			<p>{types[type].count}</p>
		</div>
	);
};

const CircularProgressWithLabel = ({ value = null }) => {
	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" className="btl-flc-circle-progressbar" value={50} size={180} />
			<CircularProgress variant="determinate" className="flc-background-circle" value={100} size={180} />
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

const UpgradePopup = () => {
	if (is_pro_enabled) return null;
	return (
		<div className="btl-analytics-chart-overlay" style={{ zIndex: '10' }}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant="h5" color="text.secondary" gutterBottom>
						{__('Get BetterLinks PRO & Reveal In-Depth Analytics 🔒', 'betterlinks')}
					</Typography>
					<Typography variant="p" color="text.secondary" gutterBottom>
						{__('Track your links with detailed analytics, dynamic infographics, insights on OS,', 'betterlinks')}
						<br />
						{__(' browser,top medium - social, search platforms and more.', 'betterlinks')}
					</Typography>
					<List>
						{[
							<div className="btl-graphteaser-icon">
								<Stepper />
								<p>{__('Track your top-performing link Click Sources', 'betterlinks')}</p>
							</div>,
							<div className="btl-graphteaser-icon">
								<Link />
								<p>{__('Access exclusive click data for Better Insights', 'betterlinks')}</p>
							</div>,
							<div className="btl-graphteaser-icon">
								<Analytics />
								<p>{__('Measure the performance of your shortened links', 'betterlinks')}</p>
							</div>,
							<div className="btl-graphteaser-icon">
								<Eye />
								<p>{__('Identify your most-clicked links for optimal strategy', 'betterlinks')}</p>
							</div>,
							<div className="btl-graphteaser-icon">
								<Selector />
								<p>{__('Get detailed individual click stats at your fingertips', 'betterlinks')}</p>
							</div>,
						].map((item) => (
							<ListItem disableGutters>
								<ListItemText primary={item} />
							</ListItem>
						))}
					</List>
					<div className="analytics-upgrade-btn">
						<a href="https://wpdeveloper.com/in/upgrade-betterlinks" target="_blank">
							{__('Upgrade To BetterLinks PRO', 'betterlinks')}
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
