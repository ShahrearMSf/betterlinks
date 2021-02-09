import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from './../../components/Select';
import { fetch_clicks_data } from './../../redux/actions/clicks.actions';
import { update_option } from './../../redux/actions/settings.actions';
import { redirectType } from './../../utils/data';
import { exists_clicks_json, nonce, exists_links_json } from './../../utils/helper';
const TabsGeneral = ({ settings, fetch_clicks_data, update_option }) => {
	const [cacheButtonText, setCacheButtonText] = useState('Clear Cache');
	const [fastRedirectButtonText, setFastRedirectButtonText] = useState('Active Now');
	const [formSubmitText, setFormSubmitText] = useState('Save');
	const [fastRedirectStatus, setFastRedirectStatus] = useState(exists_links_json);
	const [fastClicksButtonText, setFastClicksButtonText] = useState('Active Now');
	const [fastClicksStatus, setFastClicksStatus] = useState(exists_clicks_json);
	const writeLinkJSONHandler = () => {
		setFastRedirectButtonText('Request Sending...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/write_json_links&security=${nonce}`).then(
			(response) => {
				if (response.data) {
					setFastRedirectButtonText('Done!');
					setFastRedirectStatus(true);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	const writeClicksJSONHandler = () => {
		setFastClicksButtonText('Request Sending...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/write_json_clicks&security=${nonce}`).then(
			(response) => {
				if (response.data) {
					setFastClicksButtonText('Done!');
					setFastClicksStatus(true);
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	const analyticClicksHandler = () => {
		setCacheButtonText('Request Sending...');
		axios.post(`${ajaxurl}?action=betterlinks/admin/analytics&security=${nonce}`).then(
			(response) => {
				if (response.data) {
					setCacheButtonText('Done!');
					// update analytic data
					fetch_clicks_data();
				}
			},
			(error) => {
				console.log(error);
			}
		);
	};
	return (
		<React.Fragment>
			<Formik
				enableReinitialize
				initialValues={{ ...settings }}
				onSubmit={(values) => {
					update_option(values);
					setFormSubmitText('Saved!');
				}}
			>
				{(props) => (
					<Form>
						<div className="btl-tab-panel-inner">
							<span className="btl-form-group">
								<label className="btl-form-label">
									{__('Link Redirection Status (Fast Mode)', 'betterlinks')}
									<br />
									<span className="short-description">
										{__(
											"If it's enabled, when you click on the link, it will fetch the target URL from the .json file and will redirect it. Otherwise, it will fetch directly from the database",
											'betterlinks'
										)}
									</span>
								</label>
								<div className="active-status">{fastRedirectStatus ? 'Active' : 'Disable'}</div>
								{!fastRedirectStatus && (
									<button type="button" onClick={writeLinkJSONHandler} className="button button-primary">
										{fastRedirectButtonText}
									</button>
								)}
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">
									{!fastClicksStatus ? __('Click Data Status (Fast Mode)', 'betterlinks') : __('Fetch Analytics Data', 'betterlinks')}
									<br />
									<span className="short-description">
										{!fastClicksStatus
											? __(
													"If it's enabled, before a link is redirected, the click data will be saved in the json file in 1 hour time interval. Otherwise, it will be directly inserted into the database",
													'betterlinks'
											  )
											: __("Analytics data is updated within 1 hour interval. Hit the 'Clear Cache' button to instantly update your analytics data", 'betterlinks')}
									</span>
								</label>
								<div className="active-status">{fastClicksStatus ? 'Active' : 'Disable'}</div>
								{!fastClicksStatus ? (
									<button type="button" onClick={writeClicksJSONHandler} className="button button-primary">
										{fastClicksButtonText}
									</button>
								) : (
									<button type="button" onClick={analyticClicksHandler} className="button button-primary">
										{cacheButtonText}
									</button>
								)}
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">{__('Redirect Type', 'betterlinks')}</label>
								<Select
									className="btl-modal-select--full"
									classNamePrefix="btl-react-select"
									id="redirect_type"
									name="redirect_type"
									value={redirectType}
									setFieldValue={props.setFieldValue}
									isMulti={false}
								/>
							</span>
							<span className="btl-form-group">
								<label className="btl-form-label">{__('Link Options', 'betterlinks')}</label>
								<div className="link-options__body">
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="nofollow" type="checkbox" onChange={() => props.setFieldValue('nofollow', !props.values.nofollow)} />
										<span className="text">
											{__('No Follow', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add nofollow attribute to your link. (Recommended)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="sponsored" type="checkbox" onChange={() => props.setFieldValue('sponsored', !props.values.sponsored)} />
										<span className="text">
											{__('Sponsored', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will add sponsored attribute to your link. (Recommended for Affiliate links)', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="param_forwarding" type="checkbox" onChange={() => props.setFieldValue('param_forwarding', !props.values.param_forwarding)} />
										<span className="text">
											{__('Parameter Forwarding', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will pass the parameters you have set in the target URL', 'betterlinks')}</span>
											</div>
										</span>
									</label>
									<label className="btl-checkbox-field block">
										<Field className="btl-check" name="track_me" type="checkbox" onChange={() => props.setFieldValue('track_me', !props.values.track_me)} />
										<span className="text">
											{__('Tracking', 'betterlinks')}
											<div className="btl-tooltip">
												<span className="dashicons dashicons-info-outline"></span>
												<span className="btl-tooltiptext">{__('This will let you check Analytics report of your links', 'betterlinks')}</span>
											</div>
										</span>
									</label>
								</div>
							</span>
							<button className="button-primary" type="submit">
								{formSubmitText}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});

const mapDispatchToProps = (dispatch) => {
	return {
		update_option: bindActionCreators(update_option, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TabsGeneral);
