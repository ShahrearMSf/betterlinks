import { __ } from '@wordpress/i18n';
import { is_pro_enabled } from 'utils/helper';
import CustomizeLinkPreviewTeaser from './CustomizeLinkPreviewTeaser';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import { modalCustomStyles } from 'utils/helper';
import { useUpgradeProModal } from 'utils/customHooks';
import UpgradeToPro from 'components/Teasers/UpgradeToPro';
import Note from './Note';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const CustomizeLinkPreview = ({ openAccordion, togglePanel, form, settings, metaTag }) => {
	if (!form.values?.enable_customize_meta_tags) return null;
	const [openModal, setOpenModal] = useState(false);
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const closeModal = () => setOpenModal(false);

	const ReactTabs = { Tab, Tabs, TabList, TabPanel };

	const customStyles = {
		...modalCustomStyles,
		content: {
			...modalCustomStyles.content,
			maxWidth: '1000px',
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
	return (
		<>
			<div className={`link-options link-options--advanced ${openAccordion ? 'link-options--open' : ''}`}>
				<button className="link-options__head" type="button" onClick={() => togglePanel('optimizeMetaTags')}>
					<h4 className="link-options__head--title">
						{__('Customize Link Preview', 'betterlinks')} {!is_pro_enabled && <span className="pro-badge">{__('Pro', 'betterlinks')}</span>}
					</h4>{' '}
					<i className="btl btl-angle-arrow-down" />
				</button>
				<>
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
										Enable Link Preview
										{form.values.enable_meta_tags && (
											<div className="btl-tooltip">
												<span
													className="btl btl-edit"
													style={{ color: 'rgba(0,59,226,.9)' }}
													onClick={(e) => {
														e.preventDefault();
														setOpenModal(true);
													}}
												/>
											</div>
										)}
									</span>
								</label>
							</div>
						</div>
					</div>
					<Modal isOpen={openModal} onRequestClose={closeModal} style={customStyles} ariaHideApp={false}>
						<span className="btl-close-modal" onClick={closeModal}>
							<i className="btl btl-cancel" />
						</span>
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
