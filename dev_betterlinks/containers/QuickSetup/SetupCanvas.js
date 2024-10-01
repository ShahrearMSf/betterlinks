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
import { useContext } from 'react';
import { SetupContext } from 'pages/QuickSetup';

function getSteps() {
	return [__('Getting Started', 'betterlinks'), __('Configuration', 'betterlinks'), __('Migration', 'betterlinks'), __('Create Link', 'betterlinks'), __('Finish', 'betterlinks')];
}

const setupStepComponents = [<GettingStarted />, <Configuration />, <Migration />, <CreateLink />, <Finish />];
const SetupCanvas = () => {
	const steps = getSteps();
	const { activeStep, setActiveStep } = useContext(SetupContext);

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
							<button disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
								Back
							</button>
							{activeStep !== steps.length - 1 && (
								<button
									className="button button-primary"
									onClick={() => {
										if (activeStep !== steps.length - 1) {
											setActiveStep(activeStep + 1);
										}
									}}
								>
									Skip
								</button>
							)}

							<button
								className="button button-primary"
								onClick={() => {
									if (activeStep !== steps.length - 1) {
										setActiveStep(activeStep + 1);
									}
								}}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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

export default SetupCanvas;
