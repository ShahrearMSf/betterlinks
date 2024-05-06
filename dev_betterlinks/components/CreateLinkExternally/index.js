import { betterlinks_auth, is_pro_enabled, saveSettingsHandler, site_url } from 'utils/helper';
import { Form, Formik } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import CreateLinkExternallyTeaser from 'components/Teasers/CreateLinkExternally';
import { redirectType } from 'utils/data';
import Select2 from 'react-select';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';

const CreateLinkExternally = ({ settings, terms, update_option }) => {
	const [formSubmitText, setFormSubmitText] = useState(__('Save Settings', 'betterlinks'));
	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{ ...settings }}
				onSubmit={(values) => {
					saveSettingsHandler(values, update_option, setFormSubmitText);
				}}
			>
				{(props) => {
					return (
						<Form className="btl-cle">
							<Notes />
							{props.values?.cle?.enable_cle && <DragableButton cle={props.values?.cle} />}
							<FreeSettings props={props} />
							{props.values?.cle?.enable_cle &&
								props.values?.cle?.advanced_options &&
								betterLinksHooks.applyFilters('betterLinksCleAdvanced', <CreateLinkExternallyTeaser props={props} />, { ...props, settings, terms, redirectType, Select2 })}
							<button className="button-primary btn-save-settings" type="submit">
								{formSubmitText}
							</button>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	update_option: bindActionCreators(update_option, dispatch),
});

export default connect(null, mapDispatchToProps)(CreateLinkExternally);

const FreeSettings = ({ props }) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<span className="btl-form-group">
				<label className="btl-form-label" style={{ 'min-width': '120px' }}>
					{__('Enable Quick Link Creation', 'betterlinks')}
				</label>
				<div className="btl-form-field">
					<label className="btl-checkbox-field block">
						<input
							className="btl-check"
							name="cle.enable_cle"
							type="checkbox"
							onChange={(e) => props.setFieldValue('cle.enable_cle', e.target.checked)}
							checked={props.values?.cle?.enable_cle}
						/>
						<span className="text">{__('', 'betterlinks')}</span>
					</label>
				</div>
			</span>
			{props.values?.cle?.enable_cle && (
				<>
					<span className="btl-form-group">
						<label className="btl-form-label" style={{ 'min-width': '120px' }}>
							{__('Enable Powered By', 'betterlinks')}
						</label>
						<div className="btl-form-field">
							<label className="btl-checkbox-field block">
								<input
									className="btl-check"
									name="cle.powered_by"
									type="checkbox"
									onChange={(e) => props.setFieldValue('cle.powered_by', e.target.checked)}
									checked={props.values?.cle?.powered_by}
								/>
								<span className="text">{__('', 'betterlinks')}</span>
							</label>
						</div>
					</span>
					<span className="btl-form-group">
						<label className="btl-form-label" style={{ 'min-width': '120px' }}>
							{__('Advanced Options', 'betterlinks')}
							{!is_pro_enabled && (
								<span onClick={openUpgradeToProModal} className="pro-badge">
									Pro
								</span>
							)}
						</label>
						<div className="btl-form-field">
							<label className="btl-checkbox-field block">
								{is_pro_enabled ? (
									<>
										<input
											className="btl-check"
											name="cle.advanced_options"
											type="checkbox"
											onChange={(e) => props.setFieldValue('cle.advanced_options', e.target.checked)}
											checked={props.values?.cle?.advanced_options}
										/>
										<span className="text">{__('', 'betterlinks')}</span>
									</>
								) : (
									<span
										onClick={() => props.setFieldValue('cle.advanced_options', !props.values?.cle?.advanced_options)}
										className={`dashicons dashicons-arrow-${props.values?.cle?.advanced_options ? 'down' : 'up'}-alt2`}
									/>
								)}
							</label>
						</div>
					</span>
				</>
			)}
		</>
	);
};

const Notes = () => {
	return (
		<div className="btl-form-group">
			<div className="btl-form-field">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>{__('Note', 'betterlinks')}: </b>
					<span>{__('It will allow you to create ', 'betterlinks')}</span>
					<span>
						<strong>{__('Quick Link ', 'betterlinks')}</strong>
					</span>
					<span>{__('directly from your bookmark. For more info, ', 'betterlinks')}</span>
					<a className="external-analytic-tooltip-anchor" href="#" target="_blank" style={{ color: 'inherit' }}>
						{__('Click here', 'betterlinks')}
					</a>
				</div>
			</div>
		</div>
	);
};

const DragableButton = () => {
	return (
		<div
			style={{
				display: 'flex',
				'column-gap': '5px',
				'align-items': 'center',
				'background-color': 'rgb(227, 244, 255)',
				position: 'sticky',
				top: '35px',
				zIndex: '1',
				padding: '12px',
				marginBottom: '20px',
			}}
		>
			<a
				onClick={(e) => e.preventDefault()}
				href={`javascript:location.href='${site_url}/index.php?action=btl_cle&api_key=${betterlinks_auth}&target_url='+encodeURI(location.href)+'&title='+encodeURI(document.title)`}
				className="button button-primary"
			>
				{__('Quick Link Creation', 'betterlinks')}
			</a>
			<span>{__('Just Drag & Drop this button in your bookmark', 'betterlinks')}</span>
		</div>
	);
};
