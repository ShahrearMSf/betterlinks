import { useState } from 'react';
import { Form, Formik } from 'formik';
import { __ } from '@wordpress/i18n';
import CheckList from './CheckList';
import UpgradeToPro from '../UpgradeToPro';
import { is_pro_enabled } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import Select from 'react-select';

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
								<div className="btl-role-item btl-form-group" onClick={openUpgradeToProModal}>
									<label className="btl-form-label">
										BetterLinks Category
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<Select className="btl-modal-select" isDisabled={true} />
									</div>
								</div>
								<CheckList title={__('Page Shortlinks', 'betterlinks')} onClick={openUpgradeToProModal} />
								<div className="btl-role-item btl-form-group" onClick={openUpgradeToProModal}>
									<label className="btl-form-label">
										BetterLinks Category
										<span className="pro-badge">{__('Pro', 'betterlinks')}</span>
									</label>
									<div className="link-options__body">
										<Select className="btl-modal-select" isDisabled={true} />
									</div>
								</div>
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
