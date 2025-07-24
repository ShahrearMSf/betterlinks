import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteClicks, formatDate, exists_clicks_json, betterlinks_nonce, delayStatusChanged } from 'utils/helper';
import { fetchCustomClicksData, fetch_clicks_data } from 'redux/actions/clicks.actions';
import { dispatch_new_links_data } from 'redux/actions/links.actions';
import Modal from 'react-modal';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useLocation } from 'react-router-dom';


const DeleteClicks = ({ fetchCustomClicksData, dispatch_new_links_data, fetch_clicks_data, propsForAnalytics }) => {
	const { customDateFilter } = propsForAnalytics || {};
	const [timeOutIdToClear, setTimeOutIdToClear] = useState(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [successfulDeletedItemsCount, setSuccessfulDeletedItemsCount] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState('reset_modal_step_1');
	const [resetDateFilter, setResetDateFilter] = useState([
		{
			startDate: subDays(new Date(), 30),
			endDate: new Date(),
			key: 'selection',
		},
	]);
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
		setResetDateFilter([
			{
				startDate: subDays(new Date(), 30),
				endDate: new Date(),
				key: 'selection',
			},
		]);
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

		if (!resetDateFilter || !resetDateFilter[0]) return;
		const from = formatDate(resetDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(resetDateFilter[0].endDate, 'yyyy-mm-dd');
		setDeleteStatus('deleting');

		// Use the selected date range instead of days older than
		deleteClicks(false, from, to, linkId)
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
		setResetDateFilter([value.selection]);
	};

	const handleApplyDateRange = () => {
		setDeleteStatus('reset_modal_step_2');
		setConfirmationText(''); // Clear confirmation text when moving to step 2
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

	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const linkId = params.get('id');

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
				{linkId ? 'Reset Link Clicks' : 'Reset'}
			</button>
			<Modal isOpen={modalIsOpen} onRequestClose={close} ariaHideApp={false}>
				<div className="btl-reset-modal-popup-wrapper ">
					<span className="btl-close-modal" onClick={close}>
						<i className="btl btl-cancel"></i>
					</span>
					{deleteStatus === 'reset_modal_step_1' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body">
							<div className="btl-compact-date-picker">
								<div className="btl-date-picker-title">{linkId ? 'Select Date Range for Link Clicks' : 'Select Date Range'}</div>
								<DateRangePicker
									onChange={handleDeleteOptionsChange}
									showSelectionPreview={true}
									moveRangeOnFirstSelection={false}
									months={2}
									ranges={resetDateFilter}
									direction="horizontal"
									showMonthAndYearPickers={true}
									showDateDisplay={false}
									rangeColors={['#007cba']}
									color="#007cba"
									staticRanges={[]}
									inputRanges={[]}
								/>
								<div className="btl-date-picker-actions">
									<button
										className="button-primary btl-apply-date-range"
										onClick={handleApplyDateRange}
									>
										Apply Date Range
									</button>
								</div>
							</div>
						</div>
					)}
					{deleteStatus === 'reset_modal_step_2' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body">
							<h2>This Action Cannot be undone. Are you sure you want to continue?</h2>
							<h4>
								Clicking <span style={{ fontWeight: 700 }}>Reset Clicks</span> will permanently delete clicks data {linkId ? `for this specific link ` : ''}from <strong>{resetDateFilter[0].startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</strong> to <strong>{resetDateFilter[0].endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</strong> from the database and it cannot be restored again.
								<span style={{ display: 'Block' }}>Click 'Go Back' to change the date range.</span>
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
									Go Back
								</button>
							</div>
						</div>
					)}
					{deleteStatus === 'deleting' && <h2>Deleting...</h2>}
					{deleteStatus === 'success' && successfulDeletedItemsCount !== 0 && (
						<h2>
							Success!!! <span className="success_delete_count">{successfulDeletedItemsCount}</span> clicks record{successfulDeletedItemsCount !== 1 ? 's' : ''} {linkId ? 'for this link ' : ''}deleted!!!
						</h2>
					)}
					{deleteStatus === 'success' && successfulDeletedItemsCount === 0 && (
						<h2>
							No clicks data found {linkId ? 'for this link ' : ''}in the selected date range ({resetDateFilter[0].startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })} - {resetDateFilter[0].endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })})
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
