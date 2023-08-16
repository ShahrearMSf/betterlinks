import { useState } from 'react';
import { Form, Formik } from 'formik';
import { __ } from '@wordpress/i18n';
import CheckList from './CheckList';
import UpgradeToPro from '../UpgradeToPro';
import { is_pro_enabled } from 'utils/helper';

export default function AutoLinkCreate({ autoCreateLinkSettings, terms }) {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	return (
		<>
			{!is_pro_enabled ? (
				<>
					<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
					<Formik>
						<Form>
							<CheckList title={__('Enable Auto-Create Links', 'betterlinks')} onClick={openUpgradeToProModal} />
						</Form>
					</Formik>
				</>
			) : (
				betterLinksHooks.applyFilters('BetterLinksAutoCreateLinksPro', null, { autoCreateLinkSettings: autoCreateLinkSettings, terms: terms })
			)}
		</>
	);
}
