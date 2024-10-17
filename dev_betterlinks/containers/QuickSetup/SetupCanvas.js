import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MobileStepper from '@material-ui/core/MobileStepper';
import { __ } from '@wordpress/i18n';
import GettingStarted from './GettingStarted';
import Configuration from './Configuration';
import Migration from './Migration';
import CreateLink from './CreateLinks';
import Finish from './Finish';
import { useContext, useEffect } from 'react';
import { SetupContext } from 'pages/QuickSetup';
import { CONFIGURATION, CREATE_LINK, FINISH, getStepCount, GETTING_STARTED, migratePluginsData, MIGRATION } from './quicksetup.helper';
import { generateSlug, makeRequest, migratable_plugins, modalCustomSmallStyles, route_path, shortURLUniqueCheck } from 'utils/helper';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';
import { add_new_link } from 'redux/actions/links.actions';
import { useHistory } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';

function getSteps() {
	const isMigrationExists = Object.values(migratable_plugins).some((plugin) => plugin);
	if (!isMigrationExists) {
		return [__('Getting Started', 'betterlinks'), __('Configuration', 'betterlinks'), __('Create Link', 'betterlinks'), __('Finish', 'betterlinks')];
	}
	return [__('Getting Started', 'betterlinks'), __('Configuration', 'betterlinks'), __('Migration', 'betterlinks'), __('Create Link', 'betterlinks'), __('Finish', 'betterlinks')];
}

const getSetupStepComponents = (component) => {
	const isMigrationExists = Object.values(migratable_plugins).some((plugin) => plugin);
	if (!isMigrationExists) {
		const components = {
			0: <GettingStarted />,
			1: <Configuration />,
			2: <CreateLink />,
			3: <Finish />,
		};
		return components[component];
	}
	const components = {
		0: <GettingStarted />,
		1: <Configuration />,
		2: <Migration />,
		3: <CreateLink />,
		4: <Finish />,
	};
	return components[component];
};
// const setupStepComponents = getSetupStepComponents();
const SetupCanvas = (props) => {
	const history = useHistory();
	const steps = getSteps();
	const {
		activeStep,
		setActiveStep,
		clientConsent,
		update_option,
		settings,
		linkOptions,
		setLinkOptions,
		errors,
		setErrors,
		terms,
		migrationSettings,
		setModalIsOpen,
		modalConfirm,
		setModalConfirm,
		migrationStatus,
		setMigrationStatus,
	} = useContext(SetupContext);

	const isMigrationExists = Object.values(migratable_plugins).some((plugin) => plugin);
	useEffect(() => {
		if (props.isCreated) {
			setActiveStep(4);
		}
		if (modalConfirm) {
			migratePluginsData(migrationSettings, setMigrationStatus);
		}
	}, [props.isCreated, activeStep, modalConfirm]);

	// Refactored to handle different steps with a switch-case for clarity
	const handleStepChange = () => {
		switch (activeStep) {
			case 1:
				update_option(settings);
				setLinkOptions({
					...settings,
					...linkOptions,
				});
				setActiveStep(isMigrationExists ? 2 : 3);
				break;
			case 2: {
				setModalIsOpen(true);
				// migratePluginsData();
				// setActiveStep(3);
				break;
			}
			case 3:
				submitLinkHandler(linkOptions, setErrors);
				setActiveStep(4);
				break;
			case 4:
				completeSetup();
				break;
			default:
				break;
		}
	};

	// Extracted submit logic into a separate function for better readability
	const submitLinkHandler = (values, setErrorCallback) => {
		const regex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/;
		if (regex.test(values.link_title)) {
			setErrorCallback((prev) => ({
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

						props
							.add_new_link(values)
							.then((response) => {
								if (response?.data) {
									props.update_quick_setup({ isCreated: true });
									setErrors({ isCreated: true });
								}
							})
							.catch((error) => console.log('---error (submitHandler)--', { error }));
					}
				}
			}
			props.update_quick_setup({ duplicateLink: isDuplicate });
		});
	};

	const completeSetup = async () => {
		const res = await makeRequest({
			action: 'betterlinks__complete_setup',
		});
		const data = res.data?.data;
		if (data?.result === 'complete') {
			history.push(route_path + 'admin.php?page=betterlinks');
			history.go(0);
		}
	};

	return (
		<>
			<ConfirmationModal />
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
				<div className="btl-setup-steps">{getSetupStepComponents(activeStep)}</div>

				<div className="btl-setup-slider">
					<div>
						{[2, 3].includes(activeStep) && (
							<a
								className="skip"
								href="#"
								disabled={activeStep === 0}
								onClick={(e) => {
									e.preventDefault();
									setActiveStep(activeStep + 1);
								}}
							>
								Skip
							</a>
						)}
					</div>
					<MobileStepper variant="dots" steps={steps.length} position="static" activeStep={activeStep} />
					{activeStep > 0 ? (
						<div>
							{(activeStep !== 1 || !clientConsent) && (
								<button className="button" disabled={activeStep === 0} onClick={() => setActiveStep(activeStep - 1)}>
									Back
								</button>
							)}
							<button className="button button-primary" onClick={handleStepChange}>
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
	add_new_link: bindActionCreators(add_new_link, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetupCanvas);
// export default SetupCanvas;
