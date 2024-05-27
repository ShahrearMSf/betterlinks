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
	const [copy, setCopy] = useState(false);

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
				location.href += `-${data.task_slug}`;
			}
			setTask((prev) => ({
				...prev,
				short_url: data?.short_url || '',
			}));
			return;
		}

		if (data) {
			setTask((prev) => ({
				...prev,
				...data,
				taskId,
				taskName,
				boardUrl,
			}));
			return;
		}
	};

	const __createBetterLinks = async () => {
		if (task?.short_url) {
			setOpenModal(!openModal);
			return;
		}
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
		if ('created' === status) {
			setTask((prev) => ({
				...prev,
				short_url: result?.short_url,
			}));
			const short_link = `${site_url}/${result?.short_url}`;
			if (copyToClipboard(short_link)) {
				setCopy(true);
				setOpenModal(true);

				let timer = setTimeout(() => {
					setCopy(false);
					clearTimeout(timer);
				}, 3000);
			}
		}
	};
	// console.info(loading);
	return (
		<>
			<button className="el-button" onClick={__createBetterLinks}>
				<i className="el-icon">
					<img width="16" src={plugin_root_url + 'assets/images/logo-large.svg'} alt={__('BetterLinks Colorfull Logo', 'betterlinks')} />
				</i>
				<span>{__('Create BetterLinks', 'betterlinks')}</span>
				{loading && <ClipLoader className="btl-fbs-loader" color="#2961ff" size={18} />}
			</button>
			{openModal && <PopUp task={task} setTask={setTask} />}
			{copy && (
				<span
					style={{
						textAlign: 'center',
						display: 'block',
						zIndex: '9999',
						position: 'relative',
					}}
				>
					Copied into clipboard
				</span>
			)}
		</>
	);
};

export default App;

const PopUp = ({ task, setTask }) => {
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
			<div className="btl-fbs-link-data">
				{/* {JSON.stringify(task)} */}
				<div className="btl-form-group">
					<label htmlFor="short_url">Link for this task</label>
					<div>
						<p className="btl-fbs-link-text">
							<span style={{
								maxWidth: '50%',
								overflowX: 'auto',
								whiteSpace: 'nowrap',
								cursor: 'ew-resize',

							}}>{site_url}/</span>
							<input
								type="text"
								value={`${task?.short_url}`}
								onChange={(e) => {
									console.info(e.target.value);
									setTask((prev) => ({
										...prev,
										short_url: e.target.value,
									}));
								}}
							/>
							<img src={plugin_root_url + 'assets/images/copy-icon-1.svg'} />
						</p>
					</div>
				</div>
				<div className="btl-form-group fbs_task_mover_actions">
					<button
						className="el-button el-button--primary"
						style={{
							width: 'auto',
							background: 'linear-gradient(202deg,#2961ff 0,#003be2 100%)',
							marginTop: '5px',
							color: '#fff',
						}}
					>
						Save
					</button>
				</div>
			</div>
			<span className="el-popper__arrow" data-popper-arrow />
		</div>
	);
};
