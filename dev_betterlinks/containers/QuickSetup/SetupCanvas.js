import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function getSteps() {
	return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}
function getStepContent(step) {
	switch (step) {
		case 0:
			return 'Select campaign settings...';
		case 1:
			return 'What is an ad group anyways?';
		case 2:
			return 'This is the bit I really care about!';
		default:
			return 'Unknown step';
	}
}
const SetupCanvas = () => {
	const steps = getSteps();
	const [activeStep, setActiveStep] = React.useState(0);

	return (
		<>
			<div className="btl-quick-setup">
				<Stepper activeStep={activeStep} connector={<span>{'>'}</span>}>
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
			</div>
		</>
	);
};

export default SetupCanvas;
