import React from 'react';
import { Formik, Field, Form } from 'formik';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import {plugin_root_url} from '../../utils/helper';
const weekOption = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

const propTypes = {};

const defaultProps = {};

export default function BrokenLinks(props) {
	return (
		<React.Fragment>
			<div className="btl-tab-panel-inner btl-broken-links-panel btl-broken-links-panel-disabled">
				<div className="btl-broken-link-checker-wrapper">
					<div className="btl-broken-link-checker">
						<h3>{__('Scheduled Scan', 'betterlinks')}</h3>
						<p>{__('You can schedule scan so that your website automatically scan for dead links.', 'betterlinks')}</p>
						<Formik>
							<Form>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">{__('Enable Schedule Scan', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div className="link-options__body">
										<label className="btl-checkbox-field">
											<Field type="checkbox" className="btl-check" disabled />
											<sapan className="text"></sapan>
										</label>
									</div>
								</div>
								<div class="btl-form-group">
									<label class="btl-form-label">{__('Frequently', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<Select
											className="btl-select"
											classNamePrefix="btl"
											isDisabled
										/>
									</div>
								</div>
								<div class="btl-form-group">
									<label class="btl-form-label">{__('Day', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<div className="scheduleweekdayselect">
											{weekOption.map((day, index) => (
												<label key={index}>
													<Field type="radio" checked={false} disabled/>
													<span>{day.slice(0, 3)}</span>
												</label>
											))}
										</div>
									</div>
								</div>
								<div class="btl-form-group">
									<label class="btl-form-label">{__('Time', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<TextField disabled/>
									</div>
								</div>
							</Form>
						</Formik>
						<div className="btl-scan-outputs">
								<div className="btl-scan-output">
									<span className="icon">
										<img src={plugin_root_url + 'assets/images/padlock.svg'} alt="" />
									</span>
									<h4 className="count">0</h4>
									<p className="title">{__('Total Links', 'betterlinks')}</p>
								</div>
								<div className="btl-scan-output">
									<span className="icon">
										<img src={plugin_root_url + 'assets/images/padlock.svg'} alt="" />
									</span>
									<h4 className="count">0</h4>
									<p className="title">{__('Links Scanned', 'betterlinks')}</p>
								</div>
								<div className="btl-scan-output">
									<span className="icon">
										<img src={plugin_root_url + 'assets/images/padlock.svg'} alt="" />
									</span>
								<h4 className="count">0</h4>
								<p className="title">{__(' Broken Links Found', 'betterlinks')}</p>
							</div>
						</div>
					</div>
					<div className="btl-broken-link-checker">
						<Formik>
							<Form>
								<span class="btl-form-group">
									<label class="btl-form-label">{__('Enable Reporting', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<label className="btl-checkbox-field">
											<Field type="checkbox" className="btl-check" disabled />
											<sapan className="text"></sapan>
										</label>
									</div>
								</span>
								<span class="btl-form-group">
									<label class="btl-form-label">{__('Reporting Email', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<label class="btl-checkbox-field block">
											<Field type="text" className="btl-form-control" disabled />
										</label>
									</div>
								</span>
								<span class="btl-form-group">
									<label class="btl-form-label">{__('Reporting Email Subject', 'betterlinks')}<span className="pro-badge">{__('Pro', 'betterlinks')}</span></label>
									<div class="link-options__body">
										<label class="btl-checkbox-field block">
											<Field type="text" className="btl-form-control" disabled />
										</label>
									</div>
								</span>
							</Form>
						</ Formik>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

BrokenLinks.propTypes = propTypes;
BrokenLinks.defaultProps = defaultProps;
