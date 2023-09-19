import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteClicks, formatDate } from 'utils/helper';
import { fetchCustomClicksData } from 'redux/actions/clicks.actions';
import { dispatch_new_links_data } from 'redux/actions/links.actions';
import Modal from 'react-modal';
import Select2 from 'react-select';

const deleteClicksOptions = [
	{
		label: __('Delete All', 'betterlinks'),
		value: false,
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

const DeleteClicks = ({ fetchCustomClicksData, dispatch_new_links_data, propsForAnalytics }) => {
	const { customDateFilter } = propsForAnalytics || {};
	const [timeOutIdToClear, setTimeOutIdToClear] = useState(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [successfulDeletedItemsCount, setSuccessfulDeletedItemsCount] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState('reset_modal_step_1');
	const [currentDaysOlderThan, setCurrentDaysOlderThan] = useState(deleteClicksOptions[0]);

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
	};

	const handleConfirmDelete = () => {
		if (!customDateFilter) return;
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		setDeleteStatus('deleting');
		const daysOlderThan = currentDaysOlderThan?.value || false;
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
	};

	const handleDeleteOptionsChange = (value) => {
		setCurrentDaysOlderThan(value);
	};
	return (
		<div className="btl-analytic-reset-wrapeer betterlinks">
			<button className="button-primary btl-reset-analytics-initial-button" onClick={handleResetButtonClick1}>
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
							<div className="btl-btn-reset-popup-step-2-buttons">
								<button className="button-primary btl-btn-reset-apply-2" onClick={handleConfirmDelete}>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteClicks);
