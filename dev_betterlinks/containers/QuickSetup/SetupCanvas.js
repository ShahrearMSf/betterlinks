import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import { __ } from '@wordpress/i18n';
import GettingStarted from './GettingStarted';
import Configuration from './Configuration';
import Migration from './Migration';
import CreateLink from './CreateLinks';
import Finish from './Finish';
import { useContext, useState } from 'react';
import { SetupContext } from 'pages/QuickSetup';
import { add_top_loader, generateSlug, remove_top_loader, shortURLUniqueCheck } from 'utils/helper';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';

function getSteps() {
	return [__('Getting Started', 'betterlinks'), __('Configuration', 'betterlinks'), __('Migration', 'betterlinks'), __('Create Link', 'betterlinks'), __('Finish', 'betterlinks')];
}

const setupStepComponents = [<GettingStarted />, <Configuration />, <Migration />, <CreateLink />, <Finish />];
const SetupCanvas = (props) => {
	const steps = getSteps();
	const { activeStep, setActiveStep, clientConsent, update_option, settings, linkOptions, setLinkOptions, errors, setErrors, add_new_link, terms } = useContext(SetupContext);

	const submitLinkHandler = (values) => {
		const regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
		if (regex.test(values.link_title)) {
			setErrors((prev) => ({
				...prev,
				link_title: __('Please ensure the link title does not contain any script.', 'betterlinks'),
			}));
			return;
		}
		onSubmit(values);
	};

	const onSubmit = (values) => {
		const { short_url } = values;
		values.short_url = short_url.substring(0, short_url.length - +(short_url.lastIndexOf('/') == short_url.length - 1));
		shortURLUniqueCheck(values.short_url, values.ID, () => {}).then((isDuplicate) => {
			if (!isDuplicate) {
				if (!values.cat_id) {
					const { ID } = terms.terms?.filter((item) => item.term_slug == 'uncategorized')[0];
					values.cat_id = ID;
				}
				if (!values.link_slug) {
					values.link_slug = generateSlug(values.link_title);
				}
				if (isNaN(values?.cat_id)) {
					values.cat_slug = generateSlug(values.cat_id);
				}
				values.wildcards = Number(values.short_url.includes('*'));
				if (values.cat_id) {
					const link_title = values.link_title.trim();
					if (link_title) {
						values.link_title = link_title;
						// cinfo;
						add_new_link(values)
							.then((response) => {
								if (response?.data) {
									console.info(response.data);
									props.update_quick_setup({ isCreated: true });
									// setErrors({ isCreated: true });
								}
							})
							.catch((error) => console.log('---error (submitHandler)--', { error }));
					}
				}
			}
		});
	};

	return (
		<>
			<div className="btl-quick-setup">
				<Stepper activeStep={activeStep} connector={<span className="dashicons dashicons-arrow-right-alt2" />}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<div className="btl-setup-steps">{setupStepComponents[activeStep]}</div>

				<div className="btl-setup-slider">
					<div></div>
					<MobileStepper variant="dots" steps={steps.length} position="static" activeStep={activeStep} />
					{activeStep > 0 ? (
						<div>
							{(activeStep !== 1 || !clientConsent) && (
								<button className="button" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
									Back
								</button>
							)}
							<button
								className="button button-primary"
								onClick={() => {
									if (activeStep === 1) {
										update_option(settings);
										setLinkOptions({
											...settings,
											...linkOptions,
										});
									}
									if (activeStep === 3) {
										submitLinkHandler(linkOptions, setErrors);
									}

									// if (activeStep !== steps.length - 1) {
									// 	setActiveStep(activeStep + 1);
									// }
								}}
							>
								{activeStep === steps.length - 1 ? __('Finish', 'betterlinks') : __('Continue', 'betterlinks')}
							</button>
						</div>
					) : (
						<div />
					)}
				</div>
			</div>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		isCreated: state.quickSetup?.isCreated,
	};
};
const mapDispatchToProps = (dispatch) => ({
	update_quick_setup: bindActionCreators(update_quick_setup, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetupCanvas);
// export default SetupCanvas;
