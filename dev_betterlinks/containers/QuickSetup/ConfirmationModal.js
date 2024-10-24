import { Checkbox } from '@material-ui/core';
import { __ } from '@wordpress/i18n';
import { SetupContext } from 'pages/QuickSetup';
import { useContext } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { modalCustomSmallStyles } from 'utils/helper';
const ConfirmationModal = ({ quickSetup }) => {
	const { modalIsOpen, setModalIsOpen, modalConfirm, setModalConfirm, migrationSettings, migrationStatus, setActiveStep } = useContext(SetupContext);
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const confirmModal = () => {
		setModalConfirm(true);
		// closeModal();
	};
	// const { thirstyaffiliates, prettylinks, simple301redirects } = migrationSettings;
	const { results } = quickSetup;
	const { pl, ta, s3r } = results;
	const isMigrationCompleted = Object.values(migrationStatus).every(Boolean);
	console.info(isMigrationCompleted);
	return (
		<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalCustomSmallStyles} ariaHideApp={false} parentSelector={() => document.querySelector('.migration')}>
			<div className="btl-manage-tags-form">
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel" />
				</span>
				<div className="btl-confirmation-alert">
					<h3 className="btl-modal-utm-builder__title" style={{ textAlign: 'center', fontSize: '22px' }}>
						{__('Migration Logs', 'betterlinks')}
					</h3>
					<p style={{ textAlign: 'center', fontSize: '16px' }}>
						{__('Scan your entire website’s Links in posts and pages to get real-time link status-active links, Broken Links', 'betterlinks')}
					</p>
					{(results.pl || results.ta || results.s3r) && (
						<div className="btl-migration-logs">
							{ta && (
								<div className="btl-migration-logs__item">
									<span>
										<strong>{__('Thirsty Affiliates:', 'betterlinks')}</strong>
									</span>
									{ta?.links?.map((item) => (
										<span>{item}</span>
									))}
								</div>
							)}
							{pl && (
								<div className="btl-migration-logs__item">
									<span>
										<strong>{__('Pretty Links:', 'betterlinks')}</strong>
									</span>
									{pl?.links?.map((item) => (
										<span>{item}</span>
									))}
									{pl?.duplicate_migration_detected__so_prevented_it_here && <span>{__('Pretty Links:Duplicate migration detected. So prevented it here.', 'betterlinks')}</span>}
									{pl?.btl_prettylinks_migration_running_in_background && <span>{__('Pretty Links migration running in background.', 'betterlinks')}</span>}
								</div>
							)}
							{(s3r?.links || s3r?.wildcard) && (
								<div className="btl-migration-logs__item">
									<span>
										<strong>{__('Simple 301 Redirects:', 'betterlinks')}</strong>
									</span>
									{s3r?.links?.map((item) => (
										<span>{item}</span>
									))}
									{s3r?.wildcard?.map((item) => (
										<span>{item}</span>
									))}
								</div>
							)}
						</div>
					)}
					<div className="next-tab-confirmation">
						<button className="button" onClick={closeModal}>
							{__('Cancel', 'betterlinks')}
						</button>
						<button
							className="button button-primary"
							disabled={!isMigrationCompleted}
							onClick={() => {
								setActiveStep(3);
								setModalIsOpen(false);
							}}
						>
							{__('Continue', 'betterlinks')}
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
const mapStateToProps = (state) => ({
	quickSetup: state.quickSetup,
});
const mapDispatchToProps = (dispatch) => ({
	update_quick_setup: bindActionCreators(update_quick_setup, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationModal);
