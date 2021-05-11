import React from 'react';
import UpgradeToPro from './UpgradeToPro';
export default class GoogleAnalytics extends React.Component {
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
						<div className="btl-googleanalytics-container">
							<form
								className="form"
								id="googleAnalytics"
								onSubmit={(e) => {
									e.preventDefault();
									this.openModal();
								}}
								action="#"
							>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Enable Google Analytics <span className="pro-badge">Pro</span>
									</label>
									<div className="link-options__body">
										<input
											type="checkbox"
											name="is_enable_ga"
											onChange={(e) => {
												e.preventDefault();
												this.openModal();
											}}
										/>
									</div>
								</div>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Google Analytics Tracking ID <span className="pro-badge">Pro</span>
									</label>
									<div className="link-options__body">
										<input type="text" name="ga_tracking_code" onClick={(e) => this.openModal()} />
									</div>
								</div>
								<button className="button-primary btn-save-settings" type="submit">
									Save Settings
								</button>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
