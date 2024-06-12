import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { admin_url, copyToClipboard, delayStatusChanged, formatFormData, plugin_root_url, TASKS, betterlinks_nonce, site_url } from './utils/helper';
import QRScanner from './components/QRScanner';

const App = () => {
	const [task, setTask] = useState({
		boardUrl: '',
		taskName: '',
		taskId: '',
	});
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [updateText, setUpdateText] = useState(__('Update', 'betterlinks'));

	useEffect(() => {
		let timer = setTimeout(() => {
			const taskUrl = window.location.href;
			const urlParts = taskUrl.split(TASKS);
			const boardUrl = urlParts?.[0] || '';

			const taskName = urlParts?.[1] || '';
			const taskId = taskName.split('-')?.[0] || '';

			if (taskId) {
				checkFbsLink({
					boardUrl,
					taskName,
					taskId,
				});
			}
		}, 1000);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	const checkFbsLink = async (task) => {
		setLoading(true);
		const { taskId, taskName, boardUrl } = task;
		let form_data = new FormData();
		form_data.append('security', betterlinks_nonce);
		form_data = formatFormData(form_data, {
			action: 'betterlinks__check_fbs_link',
			taskId,
			boardUrl,
		});
		const result = await axios
			.post(ajaxurl, form_data)
			.then((res) => res)
			.catch((err) => err);

		const { result: data, is_exists } = result.data?.data;

		setLoading(false);
		if (is_exists) {
			if (data?.task_slug) {
				location.href = `${boardUrl}${TASKS}${taskId}-${data.task_slug}`;
			}
			setTask((prev) => ({
				...prev,
				...data,
				old_short_url: data?.short_url,
			}));
			return;
		}

		if (data) {
			setTask((prev) => ({
				...prev,
				...data,
				old_short_url: data?.short_url,
				taskId,
				taskName,
				boardUrl,
			}));
			return;
		}
	};

	const __handleClickShareButton = () => {
		if (loading) return;
		if (task?.short_url) {
			setOpenModal(!openModal);
			return;
		}
		__createBetterLinks();
	};

	const __updateBetterLinks = async (task) => {
		let form_data = new FormData();
		form_data.append('security', betterlinks_nonce);
		form_data = formatFormData(form_data, {
			action: 'betterlinks__update_fbs_link',
			...task,
		});
		const response = await axios
			.post(ajaxurl, form_data)
			.then((res) => res)
			.catch((err) => err);
		const { result, message } = response.data?.data;

		setTask((prev) => ({
			...prev,
			short_url: result?.short_url || prev?.short_url,
			old_short_url: result?.short_url || prev?.old_short_url,
			updateMessage: !result && message,
			status: !!result,
		}));

		if (!!result) {
			delayStatusChanged(__('Updating...', 'betterlinks'), __('Updated!', 'betterlinks'), __('Update', 'betterlinks'), setUpdateText);
		}

		let timer = setTimeout(() => {
			setTask((prev) => ({
				...prev,
				updateMessage: null,
			}));
			clearTimeout(timer);
		}, 5000);
	};

	const __createBetterLinks = async () => {
		let form_data = new FormData();
		form_data.append('security', betterlinks_nonce);

		form_data = formatFormData(form_data, {
			action: 'betterlinks__create_fbs_link',
			...task,
		});
		setLoading(true);
		const response = await axios
			.post(ajaxurl, form_data)
			.then((res) => res)
			.catch((err) => err);

		const { result, status } = response.data?.data;

		setLoading(false);
		setOpenModal(true);
		if (!!status) {
			setTask((prev) => ({
				...prev,
				short_url: result?.short_url,
				old_short_url: result?.short_url,
				id: result?.ID,
				status,
				updateMessage: __('Short Link created successfully.', 'betterlinks'),
			}));
			resetMessage();
			return;
		}
		if (!status) {
			setTask((prev) => ({
				...prev,
				short_url: result?.short_url,
				status,
				updateMessage: __('Link already exists', 'betterlinks'),
			}));
		}
	};

	const resetMessage = () => {
		let timer = setTimeout(() => {
			setTask((prev) => ({
				...prev,
				updateMessage: null,
			}));
			clearTimeout(timer);
		}, 5000);
	};

	return (
		<>
			<button className="el-button" onClick={__handleClickShareButton}>
				<i className="el-icon">
					<img width="16" src={plugin_root_url + 'assets/images/logo-black&white.svg'} alt={__('BetterLinks Colorful Logo', 'betterlinks')} />
				</i>
				<span>{__('Share Task', 'betterlinks')}</span>
				{loading && <ClipLoader className="btl-fbs-loader" color="#2961ff" size={18} />}
			</button>
			{openModal && (
				<PopUp
					task={task}
					setTask={setTask}
					__updateBetterLinks={__updateBetterLinks}
					__createBetterLinks={__createBetterLinks}
					closeModal={() => setOpenModal(false)}
					updateText={updateText}
				/>
			)}
		</>
	);
};

export default App;

const PopUp = ({ task, setTask, __updateBetterLinks, __createBetterLinks, closeModal, updateText }) => {
	const [editShortUrl, setEditShortUrlStatus] = useState(false);
	const [copy, setCopy] = useState(false);

	return (
		<div className="el-popper is-light el-popover fbs-task-add-popover-box" tabIndex={-1} aria-hidden="false" role="tooltip" data-popper-placement="bottom">
			<div className="btl-fbs-top-bar">
				<span className="btl-title">{__('Share and more...', 'betterlinks')}</span>
				<span className="dashicons dashicons-no-alt close-button el-button" onClick={closeModal} />
			</div>
			<div className="btl-fbs-link-data">
				<div className="btl-form-group">
					<label htmlFor="short_url">{__('Link for this task', 'betterlinks')}</label>
					<div>
						<p className="btl-fbs-link-text">
							<div>
								<span className="btl-site-url">{site_url}/</span>
								<input
									type="text"
									value={`${task?.short_url}`}
									onChange={(e) => {
										!editShortUrl && setEditShortUrlStatus(true);
										setTask((prev) => ({
											...prev,
											short_url: e.target.value,
										}));
									}}
								/>
							</div>
							<div className="btl-fbs-icon">
								{copy ? (
									<span className="dashicons dashicons-yes" />
								) : (
									<img
										width={20}
										className="btl-copy-icon"
										onClick={() => {
											const short_link = `${site_url}/${task?.short_url}`;
											if (copyToClipboard(short_link)) {
												setCopy(true);

												let timer = setTimeout(() => {
													setCopy(false);
													clearTimeout(timer);
												}, 3000);
											}
										}}
										src={plugin_root_url + 'assets/images/copy-icon-1.svg'}
									/>
								)}
							</div>
						</p>
					</div>
					{task?.updateMessage && <span className={`btl-fbs-message ${!!task?.status ? 'success' : 'error'}`}>{task.updateMessage}</span>}
				</div>
				{'' !== task?.short_url && (
					<>
						{task?.old_short_url && <QRScanner short_url={task.old_short_url} />}
						<div className="btl-form-group fbs_task_mover_actions">
							<a href={`${admin_url}?page=betterlinks`} target="_blank" title={__('Manage All Your Links with BetterLinks', 'betterlinks')}>
								{__('Manage All Your Links with BetterLinks', 'betterlinks')}
							</a>
							<button
								onClick={() => {
									setEditShortUrlStatus(false);
									if (task?.id) {
										if (task?.short_url === task?.old_short_url) return;
										__updateBetterLinks({
											id: task?.id,
											short_url: task?.short_url,
											old_short_url: task?.old_short_url,
										});
										return;
									}
									__createBetterLinks();
								}}
							>
								{task?.id ? updateText : __('Create', 'betterlinks')}
							</button>
						</div>
					</>
				)}
			</div>
			<span className="el-popper__arrow" data-popper-arrow />
		</div>
	);
};
