import { __ } from '@wordpress/i18n';
import { default as MigrationTool } from 'containers/Migration';
import { SetupContext } from 'pages/QuickSetup';
import { useContext } from 'react';
import { migratable_plugins } from 'utils/helper';

const Migration = () => {
	// const isMigrationExists = Object.values(migratable_plugins).some((plugin) => plugin);
	// if( !isMigrationExists ) {
	// 	return null;
	// }
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
	console.info(migrationSettings);
	return (
		<>
			<div className="migration">
				<div className="header">
					<h3>{__('Migration', 'betterlinks')}</h3>
					<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>
				</div>
				<div className="option">
					{migratable_plugins.simple301redirects && (
						<Plugin title={__('Simple 301 Redirects', 'betterlinks')} show={simple301redirects} onClick={() => handleShowHide('simple301redirects')} />
					)}
					{migratable_plugins.thirstyaffiliates && (
						<Plugin title={__('ThirstyAffiliates', 'betterlinks')} show={thirstyaffiliates} onClick={() => handleShowHide('thirstyaffiliates')} />
					)}
					{migratable_plugins.prettylinks && <Plugin title={__('Pretty Links', 'betterlinks')} show={prettylinks} onClick={() => handleShowHide('prettylinks')} />}
				</div>
			</div>
		</>
	);
};

export default Migration;

const Plugin = ({ title, show = false, onClick }) => {
	return (
		<div className="plugin-single" style={{ cursor: 'pointer', borderColor: show ? '#3f51b5' : 'transparent' }} onClick={onClick}>
			<p>{title}</p>
			<div className="plugin-check">
				{/* MuiStepIcon-completed */}
				<svg className={`MuiSvgIcon-root MuiStepIcon-root ${show ? 'MuiStepIcon-completed' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
					<path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" />
				</svg>
			</div>
		</div>
	);
};
