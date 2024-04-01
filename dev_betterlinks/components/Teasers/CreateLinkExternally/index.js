import { useUpgradeProModal } from 'utils/customHooks';
import SelectTeaser from '../AutoLinkCreate/SelectTeaser';
import UpgradeToPro from '../UpgradeToPro';
import { __ } from '@wordpress/i18n';
import CheckList from '../AutoLinkCreate/CheckList';

const CreateLinkExternallyTeaser = ({ props }) => {
	if (!props.values?.cle?.enable_cle || !props.values?.cle?.advanced_options) return;
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<SelectTeaser title={__('BetterLink Category')} is_pro={true} onClick={openUpgradeToProModal} />
			<SelectTeaser title={__('Redirect Type')} is_pro={true} onClick={openUpgradeToProModal} />
			<CheckList title={__('No Follow', 'betterlinks')} is_pro={true} onClick={openUpgradeToProModal} />
			<CheckList title={__('Sponsored', 'betterlinks')} is_pro={true} onClick={openUpgradeToProModal} />
			<CheckList title={__('Parameter Forwarding', 'betterlinks')} is_pro={true} onClick={openUpgradeToProModal} />
			<CheckList title={__('Tracking', 'betterlinks')} is_pro={true} onClick={openUpgradeToProModal} />
		</>
	);
};

export default CreateLinkExternallyTeaser;
