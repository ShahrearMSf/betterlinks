import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteClicks, formatDate } from 'utils/helper';
import { fetchCustomClicksData } from 'redux/actions/clicks.actions';
import { dispatch_new_links_data } from 'redux/actions/links.actions';
import Modal from 'react-modal';

const DeleteClicks = ({ fetchCustomClicksData, dispatch_new_links_data, propsForAnalytics }) => {
	const { customDateFilter } = propsForAnalytics || {};
	const [timeOutIdToClear, setTimeOutIdToClear] = useState(0);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [successfulDeletedItemsCount, setSuccessfulDeletedItemsCount] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState('idle');
	const [currentDaysOlderThan, setCurrentDaysOlderThan] = useState(false);

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

	const handleInitialResetButtonClick = () => {
		console.log('----clicked reset button');
	};

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
			`}</style>
			<div className="btl-analytic-reset-wrapeer">
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => {
						clearTimeout(timeOutIdToClear);
						setDeleteStatus('idle');
						setModalIsOpen(false);
						setCurrentDaysOlderThan(false);
					}}
					// style={modalCustomStyles}
					ariaHideApp={false}
				>
					{deleteStatus == 'deleting' && <h2>Deleting...</h2>}
					{deleteStatus == 'idle' && (
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
							<button
								onClick={() => {
									setDeleteStatus('idle');
									setCurrentDaysOlderThan(false);
									setModalIsOpen(false);
								}}
							>
								No
							</button>
						</>
					)}
					{deleteStatus == 'success' && (
						<h2>
							Success!!! <span class="success_delete_count">{successfulDeletedItemsCount}</span> clicks record Deleted!!!
						</h2>
					)}
					{deleteStatus == 'failed' && <h2>Failed!!</h2>}
				</Modal>

				<button className="button-primary btl-reset-analytics" onClick={handleInitialResetButtonClick}>
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
