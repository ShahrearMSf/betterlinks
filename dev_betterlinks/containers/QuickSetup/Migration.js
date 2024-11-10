import { __ } from '@wordpress/i18n';
import { SetupContext } from 'index';
import { useContext, useEffect } from 'react';
import { migratable_plugins } from 'utils/helper';
import Checkbox from '@material-ui/core/Checkbox';
import { MigrationStatusIcon } from './icons';
import ConfirmationModal from './ConfirmationModal';

const Migration = () => {
	const { migrationSettings, setMigrationSettings, migrationStatus } = useContext(SetupContext);
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
				<ConfirmationModal />
				<div className="header">
					<h3>{__('Migration', 'betterlinks')}</h3>
					<p>{__('Already using another link management tool? Let’s import existing links and data to BetterLinks without facing any hassle.', 'betterlinks')}</p>
				</div>
				<div className="option">
					{migratable_plugins.simple301redirects && (
						<Plugin
							title={__('Simple 301 Redirects', 'betterlinks')}
							show={simple301redirects}
							onClick={() => handleShowHide('simple301redirects')}
							status={migrationStatus.simple301redirects}
						/>
					)}
					{migratable_plugins.thirstyaffiliates && (
						<Plugin
							title={__('ThirstyAffiliates', 'betterlinks')}
							show={thirstyaffiliates}
							onClick={() => handleShowHide('thirstyaffiliates')}
							status={migrationStatus.thirstyaffiliates}
						/>
					)}
					{migratable_plugins.prettylinks && (
						<Plugin title={__('Pretty Links', 'betterlinks')} show={prettylinks} onClick={() => handleShowHide('prettylinks')} status={migrationStatus.prettylinks} />
					)}
				</div>
			</div>
		</>
	);
};

export default Migration;

const Plugin = ({ title, show = false, onClick, status = '' }) => {
	const buttonText = {
		complete: __('Complete', 'betterlinks'),
		'in-progress': __('In Progress', 'betterlinks'),
		failed: __('Failed', 'betterlinks'),
	};
	return (
		<div className="plugin-single" style={{ cursor: 'pointer', borderColor: show ? '#3f51b5' : 'transparent' }}>
			<div className="left-side">
				<Checkbox color="primary" checked={show} onClick={onClick} />
				<span>{title}</span>
				{'' !== status && (
					<div className={`badge ${status}`}>
						<MigrationStatusIcon status={status} />
						<span>{buttonText[status]}</span>
					</div>
				)}
			</div>
			{'failed' === status && (
				<div className="right-side failed">
					<button className="button button-failed">
						<MigrationStatusIcon status="in-progress" />
						<span>{__('Retry', 'betterlinks')}</span>
					</button>
				</div>
			)}
		</div>
	);
};
