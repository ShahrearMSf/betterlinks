import React, { useState } from 'react';
import { deleteClicks } from 'utils/helper';
import Modal from 'react-modal';

const DeleteClicks = (props) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [successfulDeletedItemsCount, setSuccessfulDeletedItemsCount] = useState(0);
	const [deleteStatus, setDeleteStatus] = useState('idle');
	const [currentDaysOlderThan, setCurrentDaysOlderThan] = useState(false);

	const deleteClicksConfirm = (daysOlderThan = false) => {
		setModalIsOpen(true);
		setCurrentDaysOlderThan(daysOlderThan);
		// deleteClicks(daysOlderThan);
	};

	const handleConfirmDelete = () => {
		console.log({ currentDaysOlderThan });
		deleteClicks(currentDaysOlderThan)
			.then((res) => {
				setTimeout(() => {
					setModalIsOpen(false);
					setDeleteStatus('idle');
				}, 3000);
				setCurrentDaysOlderThan(false);
				if (res?.data?.success) {
					setSuccessfulDeletedItemsCount(res?.data?.data?.count);
					setDeleteStatus('success');
				} else {
					setDeleteStatus('failed');
				}
			})
			.catch((err) => {
				console.log('---caught error on DeleteClicks', { err });
				setTimeout(() => {
					setModalIsOpen(false);
					setDeleteStatus('idle');
				}, 3000);
			});
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

			`}</style>
			<div className="btl-analytic-reset-wrapeer">
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={() => {
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

				<h3>delete analytics</h3>
				<button onClick={() => deleteClicksConfirm(30)}>Delete Analytics Older than 30 days</button>
				<button onClick={() => deleteClicksConfirm(90)}>Delete Analytics Older than 90 days</button>
				<button onClick={() => deleteClicksConfirm()}>Delete All Analytics</button>
			</div>
		</>
	);
};

export default DeleteClicks;
