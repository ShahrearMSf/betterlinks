import { __ } from '@wordpress/i18n';
import Note from './Note';
import { is_pro_enabled } from 'utils/helper';

const CustomizeLinkPreviewTeaser = ({ openUpgradeToProModal }) => {
	if (is_pro_enabled) return null;
	return (
		<>
			<div className="btl-modal-customize-link-preview">
				<h3 className="btl-modal-customize-link-preview__title">
					{__('Customize Link Preview', 'betterlinks')}
					<span className="pro-badge" onClick={openUpgradeToProModal}>
						{__('Pro', 'betterlinks')}
					</span>
					<div className="btl-tooltip">
						<span className="dashicons dashicons-info-outline" />
						<span className="btl-tooltiptext">{__('Tooltip Text Here', 'betterlinks')}</span>
					</div>
				</h3>

				<div className="btl-modal-customize-link-preview__body">
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_title">{__('Meta Title', 'betterlinks')}</label>
						<div>
							<input id="meta_title" type="text" name="meta_title" disabled style={{ cursor: 'not-allowed' }} />
							<Note note={__('Recommended meta title length is 50-60 characters. Maximum length is 160 characters.', 'betterlinks')} />
						</div>
					</div>
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_description">{__('Meta Description', 'betterlinks')}</label>
						<div>
							<textarea id="meta_description" name="meta_description" rows={3} disabled style={{ cursor: 'not-allowed' }} />
							<Note note={__('Recommended meta description length is 150-160 characters.', 'betterlinks')} />
						</div>
					</div>
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_description">{__('Meta Image', 'betterlinks')}</label>
						<div>
							<button
								className="btl-modal-customize-link-preview__btn dashicons dashicons-upload"
								type="submit"
								style={{ cursor: 'not-allowed' }}
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								<span>{__('Upload Image', 'betterlinks')}</span>
							</button>
							<Note note={__('Upload at least 600x315px image. Recommended size is 1200x630px.', 'betterlinks')} />
						</div>
					</div>
					<div className="btl-modal-customize-link-preview__form-group">
						<button className="btl-modal-customize-link-preview__save_btn--teaser" type="button" disabled>
							{__('Save', 'betterlinks')}
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default CustomizeLinkPreviewTeaser;
