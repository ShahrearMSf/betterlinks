import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteClicks, formatDate, exists_clicks_json, betterlinks_nonce, delayStatusChanged, plugin_root_url } from 'utils/helper';
import { fetchCustomClicksData, fetch_clicks_data, get_chart_data, get_graph_data, get_medium_data } from 'redux/actions/clicks.actions';
import { dispatch_new_links_data } from 'redux/actions/links.actions';
import Modal from 'react-modal';
import { DateRangePicker, defaultStaticRanges } from 'react-date-range';
import { subDays } from 'date-fns';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useLocation } from 'react-router-dom';

// Create custom static ranges including default ones plus "Delete All"
const customStaticRanges = [
	...defaultStaticRanges,
	{
		label: 'Delete All',
		range: () => ({
			startDate: new Date('2000-01-01'), // Very early date to capture all data
			endDate: new Date() // Current date
		}),
		isSelected: (range) => {
			const deleteAllRange = new Date('2000-01-01');
			const today = new Date();
			return (
				range.startDate.toDateString() === deleteAllRange.toDateString() &&
				range.endDate.toDateString() === today.toDateString()
			);
		}
	}
];


const DeleteClicks = ({ fetchCustomClicksData, dispatch_new_links_data, fetch_clicks_data, get_chart_data, get_graph_data, get_medium_data, propsForAnalytics }) => {
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
	const [clickCountToDelete, setClickCountToDelete] = useState(0);

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
				}, 444000);
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
		// Fetch click count for the selected date range
		if (!resetDateFilter || !resetDateFilter[0]) return;
		const from = formatDate(resetDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(resetDateFilter[0].endDate, 'yyyy-mm-dd');

		// Make API call to get count
		const form_data = new FormData();
		form_data.append('action', 'betterlinks/admin/get_clicks_count');
		form_data.append('security', betterlinks_nonce);
		form_data.append('from', from);
		form_data.append('to', to);
		if (linkId !== null) {
			form_data.append('link_id', linkId);
		}

		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data && response.data.success) {
					setClickCountToDelete(response.data.data.count || 0);
				}
				setDeleteStatus('reset_modal_step_2');
				setConfirmationText(''); // Clear confirmation text when moving to step 2
			},
			(error) => {
				console.log(error);
				// Still proceed to step 2 even if count fetch fails
				setClickCountToDelete(0);
				setDeleteStatus('reset_modal_step_2');
				setConfirmationText('');
			}
		);
	};

	const handleConfirmationTextChange = (e) => {
		setConfirmationText(e.target.value);
	};

	const closeDatePicker = () => {
		close();
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
							to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd'),
							setLoading: () => { }
						};
						fetch_clicks_data(filterDate);
						get_chart_data(filterDate);
						get_graph_data(filterDate);
						get_medium_data(filterDate);
					} else {
						const defaultParams = { setLoading: () => { } };
						fetch_clicks_data(defaultParams);
						get_chart_data(defaultParams);
						get_graph_data(defaultParams);
						get_medium_data(defaultParams);
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
			<button className="button-secondary-gray btl-reset-analytics-initial-button" onClick={handleResetButtonClick1}>
				{linkId ? 'Reset Link Clicks' : 'Reset'}
			</button>
			<div className="status btl-refresh-btn">
				{!fastClicksStatus ? (
					<>
						<button type="button" onClick={writeClicksJSONHandler} className="btl-refresh-btn button button-primary">
							{fastClicksButtonText}
						</button>
					</>
				) : (
					<>
						<img width={18} height={18} src={plugin_root_url + '/assets/images/icons/refresh.svg'} alt="Refresh" />
						<button type="button" onClick={analyticClicksHandler} className="btl-refresh-btn button button-primary">
							{cacheButtonText}
						</button>
					</>
				)}
			</div>

			<Modal isOpen={modalIsOpen} onRequestClose={close} ariaHideApp={false}>
				<div className={`btl-reset-modal-popup-wrapper ${deleteStatus === 'reset_modal_step_1' ? 'step-1-active' : ''} ${deleteStatus === 'reset_modal_step_2' ? 'step-2-active' : ''}`}>
					<span className="btl-close-modal" onClick={close}>
						<i className="btl btl-cancel"></i>
					</span>
					{deleteStatus === 'reset_modal_step_1' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body">
							<div className="btl-compact-date-picker">
								<div className="btl-date-picker-title">{linkId ? 'Select Date Range for Link Clicks' : 'Pick the range of BetterLinks Analytics that you want to reset.'}</div>
								<button onClick={closeDatePicker} className="btn-date-range-close">
									<span className="dashicons dashicons-no-alt" />
								</button>
								<DateRangePicker
									onChange={handleDeleteOptionsChange}
									showSelectionPreview={true}
									moveRangeOnFirstSelection={false}
									months={2}
									ranges={resetDateFilter}
									direction="horizontal"
									showMonthAndYearPickers={true}
									showDateDisplay={true}
									rangeColors={['#007cba']}
									color="#007cba"
									staticRanges={customStaticRanges}
									inputRanges={[]}
								/>
								<div className="btl-date-picker-actions">
									<button
										className="button-primary btl-apply-date-range"
										onClick={handleApplyDateRange}
									>
										<img width={16} height={16} src={plugin_root_url + '/assets/images/icons/trash-red.svg'} />
										Reset Click
									</button>
									<button
										className="button-primary btl-cancel-date-range"
										onClick={closeDatePicker}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					)}
					{deleteStatus === 'reset_modal_step_2' && (
						<div className="btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body">
							<img width={48} height={48} src={plugin_root_url + '/assets/images/icons/warning.svg'} alt="Warning" className="btl-warning-icon" />
							<div className="btl-reset-modal-popup-title">This Action Cannot be Undone</div>
							<p className="btl-delete-description">
								You are about to permanently delete click analytics from
							</p>
							<div className="btl-analytics-dlt-date">
								<span className="btl-date-range">{resetDateFilter[0].startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} – {resetDateFilter[0].endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>.
							</div>
							<div className="btl-delete-count-box">
								A total of <strong className="btl-delete-count">{clickCountToDelete.toLocaleString()}</strong> click record{clickCountToDelete !== 1 ? 's' : ''} will be removed.
							</div>
							<div className="btl-confirmation-section">
								<div className="btl-confirmation-label">To confirm, type RESET CLICKS</div>
								<input
									type="text"
									required
									className="btl-modal-form-control btl-reset-confirmation-input"
									placeholder="type RESET CLICKS here..."
									value={confirmationText}
									onChange={handleConfirmationTextChange}
								/>
							</div>
							<div className="btl-btn-reset-popup-step-2-buttons">
								<button
									className="btl-button-cancel btl-btn-reset-cancel"
									onClick={() => setDeleteStatus('reset_modal_step_1')}
								>
									Cancel
								</button>
								<button
									className={`btl-button-danger btl-btn-reset-apply-2 ${!isResetButtonEnabled ? 'disabled' : ''}`}
									onClick={handleConfirmDelete}
									disabled={!isResetButtonEnabled}
								>
									<img width={14} height={14} src={plugin_root_url + '/assets/images/icons/delete.svg'} alt="Delete" />
									Delete
								</button>
							</div>
						</div>
					)}
					{deleteStatus === 'deleting' && <h2>Deleting...</h2>}
					{deleteStatus === 'success' && successfulDeletedItemsCount !== 0 && (
						// <h2>
						// 	Success!!! <span className="success_delete_count">{successfulDeletedItemsCount}</span> clicks record{successfulDeletedItemsCount !== 1 ? 's' : ''} {linkId ? 'for this link ' : ''}deleted!!!
						// </h2>
						<div className='btl-reset-finish-modal'>
							<img width={90} height={90} src={plugin_root_url + '/assets/images/icons/completed.svg'} />
							<span className='btl-reset-finish-modal-title'>{successfulDeletedItemsCount} Click data has been successfully deleted</span>
							<span className='btl-reset-finish-modal-description'>Click data has been successfully deleted for {resetDateFilter[0].startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })} to {resetDateFilter[0].endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}.</span>
							<button
								className="button-primary btl-cancel-finish-date-range"
								onClick={closeDatePicker}
							>
								Back to Analytics
							</button>
						</div>
					)}
					{deleteStatus === 'success' && successfulDeletedItemsCount === 0 && (
						<div className='btl-reset-not-found-wrapper'>
							<img width={90} height={90} src={plugin_root_url + '/assets/images/icons/not-found.svg'} />
							<h2 className='btl-reset-not-found-modal-title'>
								No clicks data found {linkId ? 'for this link ' : ''}in the selected date range {resetDateFilter[0].startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })} to {resetDateFilter[0].endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })}
							</h2>
						</div>
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
		get_chart_data: bindActionCreators(get_chart_data, dispatch),
		get_graph_data: bindActionCreators(get_graph_data, dispatch),
		get_medium_data: bindActionCreators(get_medium_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteClicks);
