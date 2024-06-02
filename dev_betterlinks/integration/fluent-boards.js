import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
const { plugin_root_url, TASKS, betterlinks_nonce, site_url } = window?.betterLinksFlbIntegration;
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { copyToClipboard, formatFormData } from './utils/helper';

const App = () => {
	const [task, setTask] = useState({
		boardUrl: '',
		taskName: '',
		taskId: '',
	});
	const [openModal, setOpenModal] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
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
	}, []);

	const checkFbsLink = async (task) => {
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
		// setLoading(true);
		const response = await axios
			.post(ajaxurl, form_data)
			.then((res) => res)
			.catch((err) => err);
		const { result, message } = response.data?.data;
		// setLoading(false);

		setTask((prev) => ({
			...prev,
			short_url: result?.short_url || prev?.short_url,
			old_short_url: result?.short_url || prev?.old_short_url,
			updateMessage: message,
		}));

		let timer = setTimeout(() => {
			setTask((prev) => ({
				...prev,
				updateMessage: null,
			}));
			clearTimeout(timer);
		}, 2000);
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
		if ('created' === status) {
			setTask((prev) => ({
				...prev,
				short_url: result?.short_url,
				old_short_url: result?.short_url,
				id: result?.ID,
				updateMessage: __('Short Link created successfully.', 'betterlinks'),
			}));
			return;
		}
		if ('failed' === status) {
			setTask((prev) => ({
				...prev,
				short_url: result?.short_url,
				status,
				updateMessage: __('Something went wrong, please try again', 'betterlinks'),
			}));
		}
	};

	return (
		<>
			<button className="el-button" onClick={__handleClickShareButton}>
				<i className="el-icon">
					<img width="16" src={plugin_root_url + 'assets/images/logo-large.svg'} alt={__('BetterLinks Colorfull Logo', 'betterlinks')} />
				</i>
				<span>{__('Share BetterLinks', 'betterlinks')}</span>
				{loading && <ClipLoader className="btl-fbs-loader" color="#2961ff" size={18} />}
			</button>
			{openModal && <PopUp task={task} setTask={setTask} __updateBetterLinks={__updateBetterLinks} __createBetterLinks={__createBetterLinks} />}
		</>
	);
};

export default App;

const PopUp = ({ task, setTask, __updateBetterLinks, __createBetterLinks }) => {
	const [editShortUrl, setEditShortUrlStatus] = useState(false);
	const [copy, setCopy] = useState(false);

	return (
		<div
			className="el-popper is-light el-popover fbs-task-add-popover-box"
			tabIndex={-1}
			aria-hidden="false"
			role="tooltip"
			data-popper-reference-hidden="false"
			data-popper-escaped="false"
			data-popper-placement="bottom"
		>
			<div className="btl-fbs-top-bar">
				<div />
				<span>Share and more...</span>
				<span className="dashicons dashicons-no-alt" />
			</div>
			<div className="btl-fbs-link-data">
				<div className="btl-form-group">
					<label htmlFor="short_url">Link for this task</label>
					<div>
						<p className="btl-fbs-link-text">
							<span
								className="btl-site-url"
								style={{
									maxWidth: '50%',
									overflowX: 'auto',
									whiteSpace: 'nowrap',
									cursor: 'ew-resize',
								}}
							>
								{site_url}/
							</span>
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
							{copy ? (
								<span className="dashicons dashicons-yes" />
							) : (
								<img
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
						</p>
					</div>
				</div>
				{'' !== task?.short_url && (
					<div
						className="btl-form-group fbs_task_mover_actions"
						style={{
							display: 'flex',
							alignItems: 'center',
							columnGap: '5px',
							// fontSize: '12px',
						}}
					>
						<button
							className={`el-button el-button--primary ${!editShortUrl ? 'btl-btn-disable' : ''}`}
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
							disabled={!editShortUrl}
						>
							{task?.id ? __('Update', 'betterlinks') : __('Create', 'betterlinks')}
						</button>
						{task?.updateMessage && <span style={{ fontSize: '12px', color: 'failed' === task?.status ? 'red' : 'green' }}>{task?.updateMessage}</span>}
					</div>
				)}
			</div>
			<span className="el-popper__arrow" data-popper-arrow />
		</div>
	);
};
