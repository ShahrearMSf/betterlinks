import { __ } from '@wordpress/i18n';
import { default as MigrationTool } from 'containers/Migration';
import { SetupContext } from 'pages/QuickSetup';
import { useContext } from 'react';
const Migration = () => {
	const { migrationSettings, setMigrationSettings } = useContext(SetupContext);
	const { simple301redirects, thirstyaffiliates, prettylinks } = migrationSettings;
	const handleShowHide = (type) => {
		setMigrationSettings((prev) => {
			return {
				...prev,
				[type]: !prev[type],
			};
		});
	};
	return (
		<>
			<div className="migration">
				<div className="header">
					<h3>{__('Migration', 'betterlinks')}</h3>
					<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>
				</div>
				<div className="option">
					<Plugin title={__('Simple 301 Redirects', 'betterlinks')} show={simple301redirects} onClick={() => handleShowHide('simple301redirects')} />
					<Plugin title={__('ThirstyAffiliates', 'betterlinks')} show={thirstyaffiliates} onClick={() => handleShowHide('thirstyaffiliates')} />
					<Plugin title={__('Pretty Links', 'betterlinks')} show={prettylinks} onClick={() => handleShowHide('prettylinks')} />
				</div>
			</div>
		</>
	);
};

export default Migration;

const Plugin = ({ title, show = false, onClick }) => {
	return (
		<div className="plugin-single">
			<p>{title}</p>
			<div className="plugin-check" onClick={onClick}>
				{/* MuiStepIcon-completed */}
				<svg className={`MuiSvgIcon-root MuiStepIcon-root ${show ? 'MuiStepIcon-completed' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
				</svg>
			</div>
		</div>
	);
};
