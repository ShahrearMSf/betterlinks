import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import Modal from 'react-modal';
import axios from 'axios';
import { betterlinks_nonce, route_path, plugin_root_url, modalCustomStyles } from './../../utils/helper';
import { useHistory } from 'react-router-dom';

const Migration = (props) => {
	const [migrationSubmitText, setMigrationSubmitText] = useState('Migrate Now');
	const [modalIsOpen, setIsOpen] = useState(true);
	const [dataIsFetch, setDataIsFetch] = useState(false);
	const [prettyLinksRes, setPrettyLinksRes] = useState({});
	const [simple301RedirectRes, setSimple301RedirectRes] = useState({});
	const [thirstyAffiliatesRes, setThirstyAffiliatesRes] = useState({});
	const [migrateRes, setMigrateRes] = useState({});
	let history = useHistory();
	useEffect(() => {
		if (props.mode === 'simple301redirects') {
			setDataIsFetch(true);
			axios.post(`${ajaxurl}?action=betterlinks/admin/get_simple301redirects_data&security=${betterlinks_nonce}`).then(
				(response) => {
					if (response) {
						setSimple301RedirectRes(response.data.data);
						setDataIsFetch(false);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		} else if (props.mode === 'prettylinks') {
			setDataIsFetch(true);
			axios.post(`${ajaxurl}?action=betterlinks/admin/get_prettylinks_data&security=${betterlinks_nonce}`).then(
				(response) => {
					if (response.data) {
						setPrettyLinksRes(response.data.data);
						setDataIsFetch(false);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		} else if (props.mode === 'thirstyaffiliates') {
			setDataIsFetch(true);
			axios.post(`${ajaxurl}?action=betterlinks/admin/get_thirstyaffiliates_data&security=${betterlinks_nonce}`).then(
				(response) => {
					if (response.data) {
						setThirstyAffiliatesRes(response.data.data);
						setDataIsFetch(false);
					}
				},
				(error) => {
					console.log(error);
				}
			);
		}
	}, []);

	const onSubmitHandler = (values) => {
		setMigrationSubmitText(__('Migration is in Progress...', 'betterlinks'));
		let form_data = new FormData();
		if (props.mode === 'prettylinks') {
			form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
		} else if (props.mode === 'simple301redirects') {
			form_data.append('action', 'betterlinks/admin/run_simple301redirects_migration');
		} else if (props.mode === 'thirstyaffiliates') {
			form_data.append('action', 'betterlinks/admin/run_thirstyaffiliates_migration');
		}
		form_data.append('security', betterlinks_nonce);
		form_data.append('type', values.checked);
		axios.post(ajaxurl, form_data).then(
			(response) => {
				if (response.data) {
					setMigrationSubmitText(__('Done!', 'betterlinks'));
					setMigrateRes(response.data.data);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};

	function closeModal() {
		setIsOpen(false);
		history.push(route_path + 'admin.php?page=betterlinks');
		history.go(0);
	}
	return (
		<React.Fragment>
			<Modal isOpen={modalIsOpen} shouldCloseOnOverlayClick={false} onRequestClose={closeModal} style={modalCustomStyles} ariaHideApp={false}>
				<span className="btl-close-modal" onClick={closeModal}>
					<i className="btl btl-cancel"></i>
				</span>
				{Object.keys(migrateRes).length === 0 ? (
					<Formik
						initialValues={{
							checked: [],
						}}
						onSubmit={(values) => onSubmitHandler(values)}
					>
						{({ values }) => (
							<Form>
								<div className="btl-modal-migration" role="group" aria-labelledby="checkbox-group">
									{dataIsFetch && <div>{__('Please Wait...', 'betterlinks')}</div>}

									{Object.keys(prettyLinksRes).length > 0 && (
										<>
											<h3 className="btl-modal-migration__title">
												{__('Pick Data that You want to Import', 'betterlinks')} <img width="25" src={plugin_root_url + 'assets/images/pointing-down.svg'} alt="icon" />
											</h3>
											<div className="btl-modal-migration__item">
												{prettyLinksRes.links && prettyLinksRes.links.length > 0 && (
													<>
														<Field id="links" type="checkbox" name="checked" value="links" />
														<label htmlFor="links">
															{__('Links ', 'betterlinks')}
															{`(${prettyLinksRes.links.length})`}
														</label>
													</>
												)}
											</div>
											<div className="btl-modal-migration__item">
												{prettyLinksRes.clicks && prettyLinksRes.clicks.length > 0 && (
													<>
														<Field id="clicks" type="checkbox" name="checked" value="clicks" />
														<label htmlFor="clicks">
															{__('Clicks ', 'betterlinks')}
															{`(${prettyLinksRes.clicks.length})`}
														</label>
													</>
												)}
											</div>
										</>
									)}

									{Object.keys(simple301RedirectRes).length > 0 && (
										<>
											<h3 className="btl-modal-migration__title">
												{__('Pick Data that You want to Import', 'betterlinks')} <img width="25" src={plugin_root_url + 'assets/images/pointing-down.svg'} alt="icon" />
											</h3>
											<div className="btl-modal-migration__item">
												{simple301RedirectRes && Object.keys(simple301RedirectRes).length > 0 && (
													<>
														<Field id="links" type="checkbox" name="checked" value="links" />
														<label htmlFor="links">
															{__('Links ', 'betterlinks')}
															{`(${Object.keys(simple301RedirectRes).length})`}
														</label>
													</>
												)}
											</div>
										</>
									)}

									{Object.keys(thirstyAffiliatesRes).length > 0 && (
										<>
											<h3 className="btl-modal-migration__title">
												{__('Pick Data that You want to Import', 'betterlinks')} <img width="25" src={plugin_root_url + 'assets/images/pointing-down.svg'} alt="icon" />
											</h3>
											<div className="btl-modal-migration__item">
												{thirstyAffiliatesRes && Object.keys(thirstyAffiliatesRes).length > 0 && (
													<>
														<Field id="links" type="checkbox" name="checked" value="links" />
														<label htmlFor="links">
															{__('Links ', 'betterlinks')}
															{`(${Object.keys(thirstyAffiliatesRes).length})`}
														</label>
													</>
												)}
											</div>
										</>
									)}

									{prettyLinksRes.links && prettyLinksRes.links.length == 0 && prettyLinksRes.clicks && prettyLinksRes.clicks.length == 0 ? (
										<h3>{__('Nothing Found To Import', 'betterlinks')}</h3>
									) : (
										<button className="button button-primary" type="submit">
											{migrationSubmitText}
										</button>
									)}
								</div>
							</Form>
						)}
					</Formik>
				) : (
					<div className="btl-modal-migration">
						<div id="response">
							<h3>
								{__('Migration is Complete', 'betterlinks')} <img width="25" src={plugin_root_url + 'assets/images/checkmark.svg'} alt="icon" />
							</h3>
							{Object.entries(migrateRes).map(
								([index, item]) =>
									Object.entries(item).length > 0 &&
									Object.entries(item).map(([chiildIndex, childItem]) => (
										<div key={chiildIndex}>{Array.isArray(childItem) ? childItem.map((item, index) => <div key={index}>{item}</div>) : childItem}</div>
									))
							)}
						</div>
						<p style={{ textAlign: 'left' }}>
							<button className="button button-primary" type="button" onClick={closeModal}>
								{__('Ok', 'betterlinks')}
							</button>
						</p>
					</div>
				)}
			</Modal>
		</React.Fragment>
	);
};
export default Migration;
