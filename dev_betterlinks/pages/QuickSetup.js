import { __ } from '@wordpress/i18n';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import { CONFIGURATION, GETTING_STARTED } from 'containers/QuickSetup/quicksetup.helper';
import SetupCanvas from 'containers/QuickSetup/SetupCanvas';
import Topbar from 'containers/TopBar';
import { createContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { add_new_link, fetch_links_data } from 'redux/actions/links.actions';
import { update_option } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import { betterlinks_quick_setup_step, betterlinks_settings, formatDate, migratable_plugins } from 'utils/helper';

export const SetupContext = createContext('quick-setup');

const QuickSetup = (props) => {
	console.info(migratable_plugins);
	const [activeStep, setActiveStep] = useState(betterlinks_quick_setup_step ? 2 : 0);
	const [clientConsent, setClientConsent] = useState(+betterlinks_quick_setup_step);
	const [settings, setSettings] = useState({ ...betterlinks_settings });
	const [migrationSettings, setMigrationSettings] = useState(migratable_plugins);
	const [linkOptions, setLinkOptions] = useState(getInitialValues());
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const [errors, setErrors] = useState({ isCreated: false });
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [migrationStatus, setMigrationStatus] = useState({
		...(migratable_plugins?.simple301redirects && { simple301redirects: '' }),
		...(migratable_plugins?.thirstyaffiliates && { thirstyaffiliates: '' }),
		...(migratable_plugins?.prettylinks && { prettylinks: '' }),
	});
	useEffect(() => {
		if (Object.keys(props.terms).length === 0) {
			props.fetch_terms_data();
		}
		if (!props.links.links) {
			props.fetch_links_data();
		}
	}, []);

	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};
	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};
	const modal = { isOpenUpgradeToProModal, setUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal };

	// all settings
	const value = {
		activeStep,
		setActiveStep,
		settings,
		setSettings,
		migrationSettings,
		setMigrationSettings,
		linkOptions,
		getInitialValues,
		setLinkOptions,
		modal,
		terms: props?.terms,
		clientConsent,
		setClientConsent,
		update_option: props?.update_option,
		add_new_link: props?.add_new_link,
		errors,
		setErrors,
		modalIsOpen,
		setModalIsOpen,
		modalConfirm,
		setModalConfirm,
		migrationStatus,
		setMigrationStatus,
	};
	return (
		<SetupContext.Provider value={value}>
			<Topbar label={__('BetterLinks Quick Setup', 'betterlinks')} />
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<SetupCanvas />
		</SetupContext.Provider>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
	links: state.links,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	update_option: bindActionCreators(update_option, dispatch),
	add_new_link: bindActionCreators(add_new_link, dispatch),
	fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuickSetup);

const getInitialValues = (settings) => {
	const currentDate = formatDate(new Date(), 'yyyy-mm-dd h:m:s');
	return {
		link_title: '',
		link_slug: '',
		target_url: '',
		short_url: '',
		link_note: '',
		link_date: currentDate,
		link_date_gmt: currentDate,
		link_modified: currentDate,
		link_modified_gmt: currentDate,
		// redirect_type: settings?.redirect_type || '307',
		cat_id: null,
		// sponsored: !!settings?.sponsored,
		// track_me: !!settings?.track_me,
		// nofollow: !!settings?.nofollow,
		// uncloaked: !!settings?.uncloaked,
		// param_forwarding: !!settings?.param_forwarding,
	};
};
