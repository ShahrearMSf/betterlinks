import { useState } from 'react';
import { Form, Formik } from 'formik';
import { __ } from '@wordpress/i18n';
import CheckList from './CheckList';
import UpgradeToPro from '../UpgradeToPro';

export default function AutoLinkCreate() {
	const [isOpenUpgradeToProModal, setUpgradeToProModal] = useState(false);
	const openUpgradeToProModal = () => {
		setUpgradeToProModal(true);
	};

	const closeUpgradeToProModal = () => {
		setUpgradeToProModal(false);
	};

	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-tab-panel-inner">
				<Formik>
					<Form>
						<CheckList title={__('Post Shortlinks', 'betterlinks')} onClick={openUpgradeToProModal} />
						<CheckList title={__('Page Shortlinks', 'betterlinks')} onClick={openUpgradeToProModal} />
					</Form>
				</Formik>
			</div>
		</>
	);
}
