import React from 'react';
import { __ } from '@wordpress/i18n';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
export default class ExternalAnalytics extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModal: false,
		};
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}
	openModal() {
		this.setState({ isOpenModal: true });
	}
	closeModal() {
		this.setState({ isOpenModal: false });
	}
	render() {
		return (
			<React.Fragment>
				<UpgradeToPro isOpenModal={this.state.isOpenModal} closeModal={this.closeModal} />
				<div className="btl-tab-inner-divider">
					<div className="btl-tab-panel-inner">
						<div className="btl-external-analytics-container btl-googleanalytics-container teaser">
							<form
								className="form"
								id="googleAnalytics"
								onSubmit={(e) => {
									e.preventDefault();
									this.openModal();
								}}
								action="#"
							>
								<div className="btl-role-item btl-form-group" onClick={() => this.openModal()}>
									<label className="btl-form-label">
										{__('Enable Google Analytics', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field">
											<input type="checkbox" className="btl-check" name="is_enable_ga" disabled />
											<span className="text"></span>
										</label>
									</div>
								</div>
								<div className="btl-role-item btl-form-group" onClick={() => this.openModal()}>
									<label className="btl-form-label">
										{__('Google Analytics Tracking ID', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<input type="text" className="btl-form-control" name="ga_tracking_code" disabled />
									</div>
								</div>
							</form>
						</div>

						<div className="btl-external-analytics-container btl-fb-pixel-container teaser">
							<form
								className="form"
								id="fbPixel"
								onSubmit={(e) => {
									e.preventDefault();
									this.openModal();
								}}
								action="#"
							>
								<div className="btl-role-item btl-form-group" onClick={() => this.openModal()}>
									<label className="btl-form-label">
										{__('Enable Facebook Pixel Tracking', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<label className="btl-checkbox-field">
											<input type="checkbox" className="btl-check" name="is_enable_pixel" disabled />
											<span className="text"></span>
										</label>
									</div>
								</div>
								<div className="btl-role-item btl-form-group" onClick={() => this.openModal()}>
									<label className="btl-form-label">
										{__('Pixel ID', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<input type="text" className="btl-form-control" name="pixel_id" disabled />
									</div>
								</div>
								<div className="btl-role-item btl-form-group" onClick={() => this.openModal()}>
									<label className="btl-form-label">
										{__('Pixel API Access Token', 'betterlinks')} <span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<textarea type="text" className="btl-form-control" name="pixel_access_token" disabled />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
