import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import Modal from 'react-modal';
import axios from 'axios';
import { nonce, route_path, modalCustomStyles } from './../../utils/helper';
import { useHistory } from 'react-router-dom';

const Migration = (props) => {
	const [migrationSubmitText, setMigrationSubmitText] = useState('Migrate Now');
	const [modalIsOpen, setIsOpen] = useState(true);
	const [prettyLinksRes, setPrettyLinksRes] = useState({});
	const [migrateRes, setMigrateRes] = useState({});
	let history = useHistory();

	useEffect(() => {
		axios.post(`${ajaxurl}?action=betterlinks/admin/get_prettylinks_data&security=${nonce}`).then(
			(response) => {
				if (response.data) {
					setPrettyLinksRes(response.data.data);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	}, []);

	function closeModal() {
		setIsOpen(false);
		history.push(route_path + 'admin.php?page=betterlinks');
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
						onSubmit={(values) => {
							setMigrationSubmitText('Request Sending...');
							let form_data = new FormData();
							form_data.append('action', 'betterlinks/admin/run_prettylinks_migration');
							form_data.append('security', nonce);
							form_data.append('type', values.checked);
							axios.post(ajaxurl, form_data).then(
								(response) => {
									if (response.data) {
										setMigrationSubmitText('Done!');
										setMigrateRes(response.data.data);
									}
								},
								(error) => {
									console.log(error);
								}
							);
						}}
					>
						{({ values }) => (
							<Form>
								<div className="btl-modal-migration" role="group" aria-labelledby="checkbox-group">
									{Object.keys(prettyLinksRes).length > 0 ? (
										<>
											<h3 className="btl-modal-migration__title">Pick Data That</h3>
											<p className="btl-modal-migration__sub-title">you want to import</p>
											<div className="btl-modal-migration__item">
												{prettyLinksRes.links && prettyLinksRes.links.length > 0 && (
													<>
														<Field id="links" type="checkbox" name="checked" value="links" />
														<label htmlFor="links">{__('Links', 'betterlinks')}</label>
													</>
												)}
											</div>
											<div className="btl-modal-migration__item">
												{prettyLinksRes.clicks && prettyLinksRes.clicks.length > 0 && (
													<>
														<Field id="clicks" type="checkbox" name="checked" value="clicks" />
														<label htmlFor="clicks">{__('Clicks', 'betterlinks')}</label>
													</>
												)}
											</div>
										</>
									) : (
										<div>{__('Please Wait...', 'betterlinks')}</div>
									)}
									<button className="button button-primary" type="submit">
										{migrationSubmitText}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				) : (
					<div className="btl-modal-migration">
						<div id="response">
							{Object.entries(migrateRes).map(([index, item]) =>
								Object.entries(item).map(([chiildIndex, childItem]) => (
									<div key={chiildIndex}>
										{childItem.map((item, index) => (
											<div key={index}>{item}</div>
										))}
									</div>
								))
							)}
						</div>
					</div>
				)}
			</Modal>
		</React.Fragment>
	);
};
export default Migration;
