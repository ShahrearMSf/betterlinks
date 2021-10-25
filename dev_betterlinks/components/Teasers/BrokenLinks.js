import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import { plugin_root_url } from '../../utils/helper';
const weekOption = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
import UpgradeToPro from './UpgradeToPro';

const propTypes = {};

const defaultProps = {};

export default function BrokenLinks(props) {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};
	return (
		<React.Fragment>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-tab-panel-inner btl-broken-links-panel btl-broken-links-panel-disabled">
				<div className="btl-broken-link-checker-wrapper">
					<div className="btl-broken-link-checker">
						<h3>{__('Scheduled Scan', 'betterlinks')}</h3>
						<p>
							{__('Enable', 'betterlinks')} <strong>{__('“Scheduled Scan”', 'betterlinks')}</strong> {__('to automatically scan broken links on your website.', 'betterlinks')}
						</p>
						<Formik>
							<Form>
								<div className="btl-role-item btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Enable Scheduled Scan', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field">
											<Field type="checkbox" className="btl-check" disabled />
											<sapan className="text"></sapan>
										</label>
									</div>
								</div>
								<div className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Frequency', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<Select className="btl-select" classNamePrefix="btl" isDisabled />
									</div>
								</div>
								<div className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Day', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<div className="scheduleweekdayselect">
											{weekOption.map((day, index) => (
												<label key={index}>
													<Field type="radio" checked={false} disabled />
													<span>{day.slice(0, 3)}</span>
												</label>
											))}
										</div>
									</div>
								</div>
								<div className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Time', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<TextField disabled />
									</div>
								</div>
							</Form>
						</Formik>
						<div className="btl-scan-outputs" style={{ marginTop: 30 }} onClick={() => openUpgradeToProModal()}>
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
								<span className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Enable Reporting', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field">
											<Field type="checkbox" className="btl-check" disabled />
											<sapan className="text"></sapan>
										</label>
									</div>
								</span>
								<span className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Reporting Email', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field block">
											<Field type="text" className="btl-form-control" disabled />
										</label>
									</div>
								</span>
								<span className="btl-form-group" onClick={() => openUpgradeToProModal()}>
									<label className="btl-form-label">
										{__('Reporting Email Subject', 'betterlinks')}
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field block">
											<Field type="text" className="btl-form-control" disabled />
										</label>
									</div>
								</span>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

BrokenLinks.propTypes = propTypes;
BrokenLinks.defaultProps = defaultProps;
