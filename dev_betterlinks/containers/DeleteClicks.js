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
	const [deleteStatus, setDeleteStatus] = useState('idle');
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

	const deleteClicksConfirm = (daysOlderThan = false) => {
		setModalIsOpen(true);
		setCurrentDaysOlderThan(daysOlderThan);
	};

	const handleConfirmDelete = () => {
		if (!customDateFilter) return;
		const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
		const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
		deleteClicks(currentDaysOlderThan, from, to)
			.then((res) => {
				const timeoutId = setTimeout(() => {
					setModalIsOpen(false);
					setDeleteStatus('idle');
				}, 3000);
				setTimeOutIdToClear(timeoutId);
				setCurrentDaysOlderThan(false);
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
					setModalIsOpen(false);
					setDeleteStatus('idle');
				}, 3000);
				setTimeOutIdToClear(timeoutId);
			});
	};

	const close = () => {
		clearTimeout(timeOutIdToClear);
		setDeleteStatus('reset_modal_step_1');
		setModalIsOpen(false);
		setCurrentDaysOlderThan(false);
	};

	const handleResetButtonClick1 = () => {
		setModalIsOpen(true);
		setDeleteStatus('reset_modal_step_1');
	};

	const handleResetButtonClick2 = () => {
		setDeleteStatus('reset_modal_step_2');
	};

	const handleResetButtonClick3 = () => {
		console.log('----handleResetButtonClick3 clicked');
	};

	const handleDeleteOptionsChange = (value) => {
		console.log({ value });
		setCurrentDaysOlderThan(value);
	};

	const handleCancelReset = () => {
		console.log('----handleCancelReset clicked');
	};

	console.log({ deleteStatus });

	return (
		<>
			<style>{`
				.btl-analytic-reset-wrapeer button{
					display:block;
					border: 1px solid #0afa;
					background: #0af;
					color: #fff;
					padding: 10px;
					cursor: pointer;
					margin: 10px 0;
					border-radius: 5px;
				}

				.btl-analytic-reset-wrapeer button:hover{
					background: #09e;
				}

				h2 span.success_delete_count{
					color: red;
					font-size: 90px;
				}

				button.btl-reset-analytics{
					margin-right: 20px !important;
    				padding: 5px 30px !important;
				}

				body.betterlinks-delete-clicks-modal-popup-opened button.btl-btn-reset-apply-1{
					margin: 0 !important;
					width: 100px;
				}

				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-wrapper {
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup{
					margin: 0;
					padding: 0;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-1{
					display: flex;				
					gap: 20px;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2{
					text-align: center;
					padding-bottom: 50px;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 h2,
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 h4,
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 p
				{
					line-height: 1.4;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 h2{
					font-size: 24px;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 h4{
					font-size: 18px;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 .btl-btn-reset-popup-step-2-buttons{
					
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 .btl-btn-reset-popup-step-2-buttons button{
					padding: 5px 30px;
					margin: 0 10px;
					font-size: 24px;
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 .btl-btn-reset-popup-step-2-buttons button.btl-btn-reset-apply-2{
					
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-reset-modal-popup-step-2 .btl-btn-reset-popup-step-2-buttons button.btl-btn-reset-cancel{
					
				}
				body.betterlinks-delete-clicks-modal-popup-opened .btl-modal-select--full{
					width: 350px !important;
				}

				body.betterlinks-delete-clicks-modal-popup-opened .ReactModal__Content{
					width: 500px;
					height: 300px;
					margin: auto;
					overflow: visible !important;
    				padding: 60px !important;
				}

				body.betterlinks-delete-clicks-modal-popup-opened .ReactModal__Overlay {
					background-color: rgba(0,0,0, 0.5) !important;
				}
			`}</style>
			<div className="btl-analytic-reset-wrapeer betterlinks">
				<Modal isOpen={modalIsOpen} onRequestClose={close} ariaHideApp={false}>
					<div className="btl-reset-modal-popup-wrapper ">
						{deleteStatus === 'reset_modal_step_1' && (
							<div className="btl-reset-modal-popup btl-reset-modal-popup-step-1 betterlinks-body">
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
						)}
						{deleteStatus === 'reset_modal_step_2' && (
							<div className="btl-reset-modal-popup btl-reset-modal-popup-step-2 betterlinks-body">
								<h2>This Action Cannot be undone. Are you sure you want to continue?</h2>
								<h4>
									Clicking <span style={{ fontWeight: 700 }}>Reset Clicks</span> will permanently delete the clicks data from database and it cannot be restored again.
									<span style={{ display: 'Block' }}>Click 'cancel' to abort.</span>
								</h4>
								<div className="btl-btn-reset-popup-step-2-buttons">
									<button className="button-primary btl-btn-reset-apply-2" onClick={handleResetButtonClick3}>
										Reset Clicks
									</button>
									<button className="button-primary btl-btn-reset-cancel" onClick={handleCancelReset}>
										Cancel
									</button>
								</div>
							</div>
						)}
						{deleteStatus === 'deleting' && <h2>Deleting...</h2>}
						{deleteStatus === 'idle' && (
							<>
								<h4>Are You Sure?</h4>
								<button
									onClick={() => {
										handleConfirmDelete();
										setDeleteStatus('deleting');
									}}
								>
									Yes
								</button>
								<button onClick={close}>No</button>
							</>
						)}
						{deleteStatus === 'success' && (
							<h2>
								Success!!! <span class="success_delete_count">{successfulDeletedItemsCount}</span> clicks record Deleted!!!
							</h2>
						)}
						{deleteStatus === 'failed' && <h2>Failed!!</h2>}
					</div>
				</Modal>

				<button className="button-primary btl-reset-analytics" onClick={handleResetButtonClick1}>
					Reset
				</button>

				{/* <h3>delete analytics</h3>
				<button onClick={() => deleteClicksConfirm(30)}>Delete Analytics Older than 30 days</button>
				<button onClick={() => deleteClicksConfirm(90)}>Delete Analytics Older than 90 days</button>
				<button onClick={() => deleteClicksConfirm()}>Delete All Analytics</button> */}
			</div>
		</>
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
