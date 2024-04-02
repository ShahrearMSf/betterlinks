import { betterlinks_auth, saveSettingsHandler, site_url } from 'utils/helper';
import { Form, Formik } from 'formik';
import { update_option } from 'redux/actions/settings.actions';
import { connect } from 'react-redux';
import { useState } from 'react';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import CreateLinkExternallyTeaser from 'components/Teasers/CreateLinkExternally';
import { redirectType } from 'utils/data';
import Select2 from 'react-select';

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
							{props.values?.cle?.enable_cle && <DragableButton cle={props.values?.cle} />}
							<Notes />
							<FreeSettings props={props} />
							{props.values?.cle?.advanced_options &&
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
	return (
		<>
			<span className="btl-form-group">
				<label className="btl-form-label" style={{ 'min-width': '120px' }}>
					{__('Enable', 'betterlinks-pro')}
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
						<span className="text">{__('', 'betterlinks-pro')}</span>
					</label>
				</div>
			</span>
			<span className="btl-form-group">
				<label className="btl-form-label" style={{ 'min-width': '120px' }}>
					{__('Advanced', 'betterlinks-pro')}
				</label>
				<div className="btl-form-field">
					<label className="btl-checkbox-field block">
						<input
							className="btl-check"
							name="cle.advanced_options"
							type="checkbox"
							onChange={(e) => props.setFieldValue('cle.advanced_options', e.target.checked)}
							checked={props.values?.cle?.advanced_options}
						/>
						<span className="text">{__('', 'betterlinks-pro')}</span>
					</label>
				</div>
			</span>
		</>
	);
};

const Notes = () => {
	return (
		<div className="btl-form-group">
			<div className="btl-form-field">
				<div className="short-description">
					<b style={{ fontWeight: 700 }}>Note: </b>
					<span>{__('It will allow you to create link externally from your bookmark. For more info, ')}</span>
					<a className="external-analytic-tooltip-anchor" href="#" target="_blank" style={{ color: 'inherit' }}>
						{__('Click here', 'betterlinks-pro')}
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
			}}
		>
			<a
				href={`javascript:location.href='${site_url}/index.php?action=btl_cle&api_secret=${betterlinks_auth}&target_url='+encodeURI(location.href)`}
				className="button button-primary"
			>
				Create Link Externally
			</a>
			<span>Just drag this button in your bookmark</span>
		</div>
	);
};
