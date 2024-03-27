import { __ } from '@wordpress/i18n';
import { is_pro_enabled, pro_version_check } from 'utils/helper';
import CustomizeLinkPreviewTeaser from './CustomizeLinkPreviewTeaser';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { modalCustomStyles } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import Note from './Note';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const CustomizeLinkPreview = ({ openAccordion, form, settings, metaTag, __handleToggle }) => {
	const { enable_customize_meta_tags } = settings.settings;
	if (is_pro_enabled && !enable_customize_meta_tags) return null;

	const [openModal, setOpenModal] = useState(false);
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const closeModal = () => setOpenModal(false);

	const ReactTabs = { Tab, Tabs, TabList, TabPanel };

	const customStyles = {
		...modalCustomStyles,
		content: {
			...modalCustomStyles.content,
			maxWidth: '1000px',
			...(!is_pro_enabled && { height: '400px' }),
		},
	};

	useEffect(() => {
		if (is_pro_enabled) {
			form.setFieldValue('enable_meta_tags', !!+metaTag?.status);
			form.setFieldValue('meta_title', metaTag?.meta_title || '');
			form.setFieldValue('meta_description', metaTag?.meta_desc || '');
			form.setFieldValue('meta_image', metaTag?.meta_image || '');
		}
	}, []);

	const pro_version = pro_version_check();

	return (
		<>
			<div className={`link-options link-options--advanced link-options--customize-link-preview ${openAccordion ? 'link-options--open' : ''}`}>
				<button
					className="link-options__head"
					type="button"
					onClick={() => {
						setOpenModal(true);
						__handleToggle('optimizeMetaTags');
					}}
				>
					<h4 className="link-options__head--title">
						{__('Customize Link Preview', 'betterlinks')} {!is_pro_enabled && <span className="pro-badge">{__('Pro', 'betterlinks')}</span>}
					</h4>{' '}
					{is_pro_enabled && <i className="btl btl-angle-arrow-down" />}
				</button>
				<>
					{is_pro_enabled && (
						<div className="link-options__body">
							<div className="link-options--teasers">
								<div className="btl-modal-form-group">
									<label className="btl-checkbox-field">
										<input
											id="enable_meta_tags"
											name="enable_meta_tags"
											className="btl-check"
											type="checkbox"
											checked={!!form.values?.enable_meta_tags}
											onClick={(e) => {
												const checked = e.target.checked;
												if (checked) setOpenModal(checked);
												form.setFieldValue('enable_meta_tags', checked);
											}}
										/>
										<span className="text">
											<span>{__('Enable Link Preview', 'betterlinks')}</span>
											{form.values.enable_meta_tags && (
												<div className="btl-tooltip">
													<span
														className="btl btl-edit"
														onClick={(e) => {
															e.preventDefault();
															setOpenModal(true);
														}}
													/>
													<span className="btl-tooltiptext">{__('Edit Link Preview', 'betterlinks')}</span>
												</div>
											)}
										</span>
									</label>
								</div>
							</div>
						</div>
					)}
					<Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
						<span className="btl-close-modal" onClick={closeModal}>
							<i className="btl btl-cancel" />
						</span>
						{pro_version !== null && pro_version < 8 && (
							<div className="btl-form-group">
								<div className="short-description">
									<b style={{ fontWeight: 700 }}>{__('Note: ')}</b>
									{__('To Utilize the Customize Link Preview Feature, kindly ensure that you have updated to the latest version of BetterLinks Pro v-1.8.0', 'betterlinks')}
								</div>
							</div>
						)}
						<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
						<CustomizeLinkPreviewTeaser openUpgradeToProModal={openUpgradeToProModal} />
						{betterLinksHooks.applyFilters('linkOptionsOptimizeMetaTags', null, { ...form, ...settings, metaTag, Note, closeModal, ReactTabs })}
					</Modal>
				</>
			</div>
		</>
	);
};

export default CustomizeLinkPreview;
