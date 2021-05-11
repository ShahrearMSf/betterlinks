import React from 'react';
import UpgradeToPro from './UpgradeToPro';
export default class RoleManagement extends React.Component {
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
		const roles = { editor: 'Editor', author: 'Author', contributor: 'Contributor', subscriber: 'Subscriber' };
		return (
			<React.Fragment>
				<UpgradeToPro isOpenModal={this.state.isOpenModal} closeModal={this.closeModal} />
				<div className="btl-tab-inner-divider-2">
					<div className="btl-tab-panel-inner">
						<div className="btl-role-container teaser">
							<form
								className="form"
								onSubmit={(e) => {
									e.preventDefault();
									this.openModal();
								}}
								id="rolemanagement"
							>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Who Can View Links? <span className="pro-badge">Pro</span>
									</label>
									<div className="writelinks link-options__body" onClick={() => this.openModal()}>
										{Object.entries(roles).map(([key, value], index) => (
											<label htmlFor={`viewlinks_${index}`} key={`viewlinks_${index}`} className="btl-checkbox-field block">
												<input id={`viewlinks_${index}`} type="checkbox" name="viewlinks" className="btl-check" value={key} disabled={true} /> <span className="text">{value}</span>
											</label>
										))}
									</div>
								</div>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Who Can Write Links? <span className="pro-badge">Pro</span>
									</label>
									<div className="writelinks link-options__body" onClick={() => this.openModal()}>
										{Object.entries(roles).map(([key, value], index) => (
											<label htmlFor={`writelinks_${index}`} key={`writelinks_${index}`} className="btl-checkbox-field block">
												<input id={`writelinks_${index}`} type="checkbox" name="writelinks" className="btl-check" value={key} disabled={true} />{' '}
												<span className="text">{value}</span>
											</label>
										))}
									</div>
								</div>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Who Can Edit Links? <span className="pro-badge">Pro</span>
									</label>
									<div className="editlinks link-options__body" onClick={() => this.openModal()}>
										{Object.entries(roles).map(([key, value], index) => (
											<label htmlFor={`editlinks_${index}`} key={`editlinks_${index}`} className="btl-checkbox-field block">
												<input id={`editlinks_${index}`} type="checkbox" name="editlinks" className="btl-check" value={key} disabled={true} /> <span className="text">{value}</span>
											</label>
										))}
									</div>
								</div>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Who Can Check Analytics? <span className="pro-badge">Pro</span>
									</label>
									<div className="checkanalytics link-options__body" onClick={() => this.openModal()}>
										{Object.entries(roles).map(([key, value], index) => (
											<label htmlFor={`checkanalytics_${index}`} key={`checkanalytics_${index}`} className="btl-checkbox-field block">
												<input id={`checkanalytics_${index}`} type="checkbox" name="checkanalytics" className="btl-check" value={key} disabled={true} />{' '}
												<span className="text">{value}</span>
											</label>
										))}
									</div>
								</div>
								<div className="btl-role-item btl-form-group">
									<label className="btl-form-label">
										Who Can Edit Settings? <span className="pro-badge">Pro</span>
									</label>
									<div className="checkanalytics link-options__body" onClick={() => this.openModal()}>
										{Object.entries(roles).map(([key, value], index) => (
											<label htmlFor={`editsettings_${index}`} key={`editsettings_${index}`} className="btl-checkbox-field block">
												<input id={`editsettings_${index}`} type="checkbox" name="editsettings" className="btl-check" value={key} disabled={true} />{' '}
												<span className="text">{value}</span>
											</label>
										))}
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
