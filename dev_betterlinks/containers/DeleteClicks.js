import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteClicks, formatDate, exists_clicks_json, betterlinks_nonce, delayStatusChanged } from 'utils/helper';
import { fetchCustomClicksData, fetch_clicks_data } from 'redux/actions/clicks.actions';
import { dispatch_new_links_data } from 'redux/actions/links.actions';
import Modal from 'react-modal';
import Select2 from 'react-select';
import axios from 'axios';

const deleteClicksOptions = [
	{
		label: __('Delete All', 'betterlinks'),
		value: false,
	},
	{
		label: __('Delete clicks older than 5 days', 'betterlinks'),
		value: 5,
	},
	{
		label: __('Delete clicks older than 10 days', 'betterlinks'),
		value: 10,
	},
	{
		label: __('Delete clicks older than 20 days', 'betterlinks'),
		value: 20,
	},
	{
		label: __('Delete clicks older than 30 days', 'betterlinks'),
		value: 30,
	},
	{
		label: __('Delete clicks older than 90 days', 'betterlinks'),
		value: 90,
	},
];

const DeleteClicks = ({ fetchCustomClicksData, dispatch_new_links_data, fetch_clicks_data, propsForAnalytics }) => {
	const { customDateFilter } = propsForAnalytics || {};
	const [timeOutIdToClear, setTimeOutIdToClear] = useState(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [successfulDeletedItemsCount, setSuccessfulDeletedItemsCount] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState('reset_modal_step_1');
	const [currentDaysOlderThan, setCurrentDaysOlderThan] = useState(deleteClicksOptions[0]);
	const [confirmationText, setConfirmationText] = useState('');

	// Refresh Stats button states
	const [cacheButtonText, setCacheButtonText] = useState(__('Refresh Stats', 'betterlinks'));
	const [fastClicksButtonText, setFastClicksButtonText] = useState(__('Active Now', 'betterlinks'));
	const [fastClicksStatus, setFastClicksStatus] = useState(exists_clicks_json);

	useEffect(() => {
		if (modalIsOpen) {
			document?.body?.classList?.add('betterlinks-delete-clicks-modal-popup-opened');
		} else {
			document?.body?.classList?.remove('betterlinks-delete-clicks-modal-popup-opened');
		}
		return () => {
			document?.body?.classList?.remove('betterlinks-delete-clicks-modal-popup-opened');
		};
	}, [modalIsOpen]);

	const close = () => {
		clearTimeout(timeOutIdToClear);
		setDeleteStatus('reset_modal_step_1');
		setModalIsOpen(false);
		setCurrentDaysOlderThan(deleteClicksOptions[0]);
		setConfirmationText('');
	};

	const handleConfirmDelete = () => {
		// Check if confirmation text matches "Reset Clicks" exactly (case-sensitive)
		if (confirmationText.trim() !== 'RESET CLICKS') {
			// Focus the input field if text doesn't match
			const inputElement = document.querySelector('.btl-confirmation-input');
			if (inputElement) {
				inputElement.focus();
			}
			return;
		}

		if (!customDateFilter) return;
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		setDeleteStatus('deleting');
		const daysOlderThan = currentDaysOlderThan.value === false ? false : currentDaysOlderThan.value;
		deleteClicks(daysOlderThan, from, to)
			.then((res) => {
				const timeoutId = setTimeout(() => {
					close();
				}, 3000);
				setTimeOutIdToClear(timeoutId);
				if (res?.data?.success) {
					setSuccessfulDeletedItemsCount(res?.data?.data?.count);
					fetchCustomClicksData({ data: res?.data?.data?.new_clicks_data });
					dispatch_new_links_data({ data: res?.data?.data?.new_links_data });
					setDeleteStatus('success');
				} else {
					setDeleteStatus('failed');
				}
			})
			.catch((err) => {
				console.log('---caught error on DeleteClicks', { err });
				const timeoutId = setTimeout(() => {
					close();
				}, 3000);
				setTimeOutIdToClear(timeoutId);
			});
	};

	const handleResetButtonClick1 = () => {
		setModalIsOpen(true);
		setDeleteStatus('reset_modal_step_1');
	};

	const handleResetButtonClick2 = () => {
		setDeleteStatus('reset_modal_step_2');
		setConfirmationText(''); // Clear confirmation text when moving to step 2
	};

	const handleDeleteOptionsChange = (value) => {
		setCurrentDaysOlderThan(value);
	};

	const handleConfirmationTextChange = (e) => {
		setConfirmationText(e.target.value);
	};

	// Refresh Stats functionality
	const writeClicksJSONHandler = () => {
		setFastClicksButtonText(__('Activating...', 'betterlinks'));
		axios.post(`${ajaxurl}?action=betterlinks/admin/write_json_clicks&security=${betterlinks_nonce}`).then(
			(response) => {
				if (response.data) {
					delayStatusChanged(null, __('Activated!', 'betterlinks'), __('Active Now', 'betterlinks'), setFastClicksButtonText);
					setTimeout(() => {
						setFastClicksStatus(true);
					}, 1500);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const analyticClicksHandler = () => {
		setCacheButtonText(__('Refreshing...', 'betterlinks'));
		axios.post(`${ajaxurl}?action=betterlinks/admin/analytics&security=${betterlinks_nonce}`).then(
			(response) => {
				if (response.data) {
					delayStatusChanged(null, __('Done!', 'betterlinks'), __('Refresh Stats', 'betterlinks'), setCacheButtonText);
					// update analytic data with current date filter
					if (customDateFilter && customDateFilter[0]) {
						const filterDate = {
							from: formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'),
							to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd')
						};
						fetch_clicks_data(filterDate);
					} else {
						fetch_clicks_data({});
					}
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	const isResetButtonEnabled = confirmationText.trim() === 'RESET CLICKS';
	return (
		<div className="btl-analytic-reset-wrapeer btl-btn-groups betterlinks">
			<div className="status">
				{!fastClicksStatus ? (
					<button type="button" onClick={writeClicksJSONHandler} className="btl-refresh-btn button button-primary">
						{fastClicksButtonText}
					</button>
				) : (
					<button type="button" onClick={analyticClicksHandler} className="btl-refresh-btn button button-primary">
						{cacheButtonText}
					</button>
				)}
			</div>
			<button className="button-secondary-gray btl-reset-analytics-initial-button" onClick={handleResetButtonClick1}>
				Reset
			</button>
			<Modal isOpen={modalIsOpen} onRequestClose={close} ariaHideApp={false}>
				<div className="btl-reset-modal-popup-wrapper ">
					<span className="btl-close-modal" onClick={close}>
						<i className="btl btl-cancel"></i>
					</span>
					{deleteStatus === 'reset_modal_step_1' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body">
							<h2>Pick the range of BetterLinks Analytics that you want to reset.</h2>
							<div className="select_apply">
								<Select2
									className={`btl-modal-select--full `}
									classNamePrefix="btl-react-select"
									onChange={handleDeleteOptionsChange}
									options={deleteClicksOptions}
									value={currentDaysOlderThan}
									isMulti={false}
								/>
								<button className="button-primary btl-btn-reset-analytics btl-btn-reset-apply-1" onClick={handleResetButtonClick2}>
									Apply
								</button>
							</div>
						</div>
					)}
					{deleteStatus === 'reset_modal_step_2' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body">
							<h2>This Action Cannot be undone. Are you sure you want to continue?</h2>
							<h4>
								Clicking <span style={{ fontWeight: 700 }}>Reset Clicks</span> will permanently delete the clicks data from database and it cannot be restored again.
								<span style={{ display: 'Block' }}>Click 'cancel' to abort.</span>
							</h4>
							<input
								type="text"
								placeholder="Type 'RESET CLICKS'"
								required
								className="btl-modal-form-control btl-confirmation-input"
								style={{ marginBottom: '20px', textAlign: 'center', width: 'auto' }}
								value={confirmationText}
								onChange={handleConfirmationTextChange}
							/>
							<div className="btl-btn-reset-popup-step-2-buttons">
								<button
									className={`button-danger btl-btn-reset-apply-2 ${!isResetButtonEnabled ? 'disabled' : ''}`}
									onClick={handleConfirmDelete}
									disabled={!isResetButtonEnabled}
									style={{
										opacity: isResetButtonEnabled ? 1 : 0.6,
										cursor: isResetButtonEnabled ? 'pointer' : 'not-allowed'
									}}
								>
									Reset Clicks
								</button>
								<button className="button-primary btl-btn-reset-cancel" onClick={() => setDeleteStatus('reset_modal_step_1')}>
									Cancel
								</button>
							</div>
						</div>
					)}
					{deleteStatus === 'deleting' && <h2>Deleting...</h2>}
					{deleteStatus === 'success' && successfulDeletedItemsCount !== 0 && (
						<h2>
							Success!!! <span className="success_delete_count">{successfulDeletedItemsCount}</span> clicks record Deleted!!!
						</h2>
					)}
					{deleteStatus === 'success' && successfulDeletedItemsCount === 0 && (
						<h2>
							{currentDaysOlderThan?.value === false && "You don't have any clicks data"}
							{currentDaysOlderThan?.value === 5 && "You don't have clicks data older than 5 days"}
							{currentDaysOlderThan?.value === 10 && "You don't have clicks data older than 10 days"}
							{currentDaysOlderThan?.value === 20 && "You don't have clicks data older than 20 days"}
							{currentDaysOlderThan?.value === 30 && "You don't have clicks data older than 30 days"}
							{currentDaysOlderThan?.value === 90 && "You don't have clicks data older than 90 days"}
						</h2>
					)}
					{deleteStatus === 'failed' && <h2>Failed!!</h2>}
				</div>
			</Modal>
		</div>
	);
};

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => {
	return {
		fetchCustomClicksData: bindActionCreators(fetchCustomClicksData, dispatch),
		dispatch_new_links_data: bindActionCreators(dispatch_new_links_data, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteClicks);
