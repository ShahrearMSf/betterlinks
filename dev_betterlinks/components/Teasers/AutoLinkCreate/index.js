import { Form, Formik } from 'formik';
import { __ } from '@wordpress/i18n';
import CheckList from './CheckList';
import UpgradeToPro from '../UpgradeToPro';
import { is_pro_enabled } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import SelectTeaser from './SelectTeaser';

export default function AutoLinkCreate({ autoCreateLinkSettings, terms, setAutoCreateLinkSettings }) {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	return (
		<>
			{!is_pro_enabled ? (
				<>
					<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
					<Formik>
						<Form>
							<CheckList title={__('Enable Auto-Create Links', 'betterlinks')} onClick={openUpgradeToProModal} />
							<div style={{ filter: 'blur(1px)' }}>
								<CheckList title={__('Post Shortlinks', 'betterlinks')} onClick={openUpgradeToProModal} />
								<SelectTeaser title={__('BetterLinks Category')} onClick={openUpgradeToProModal} />
								<CheckList title={__('Page Shortlinks', 'betterlinks')} onClick={openUpgradeToProModal} />
								<SelectTeaser title={__('BetterLinks Category')} onClick={openUpgradeToProModal} />
							</div>
						</Form>
					</Formik>
				</>
			) : (
				betterLinksHooks.applyFilters('BetterLinksAutoCreateLinksPro', null, {
					autoCreateLinkSettings: autoCreateLinkSettings,
					terms: terms,
					setAutoCreateLinkSettings: setAutoCreateLinkSettings,
				})
			)}
		</>
	);
}
