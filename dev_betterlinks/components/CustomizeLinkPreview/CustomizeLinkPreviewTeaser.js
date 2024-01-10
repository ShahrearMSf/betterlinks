import { __ } from '@wordpress/i18n';
import Note from './Note';
import { is_pro_enabled } from 'utils/helper';
import CustomizePreviewContainr from './CustomizePreviewContainer';
import { teaserDescription, teaserTitle } from './data';

const CustomizeLinkPreviewTeaser = ({ openUpgradeToProModal }) => {
	if (is_pro_enabled) return null;
	return (
		<div className="btl-modal-customize-link-preview-container">
			<div className="btl-modal-customize-link-preview">
				<h3 className="btl-modal-customize-link-preview__title">
					{__('Customize Link Preview', 'betterlinks')}
					<span className="pro-badge" onClick={openUpgradeToProModal}>
						{__('Pro', 'betterlinks')}
					</span>
				</h3>

				<div className="btl-modal-customize-link-preview__body">
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_title">{__('Meta Title', 'betterlinks')}</label>
						<div>
							<textarea defaultValue={teaserTitle} rows={3} style={{ height: '55px', cursor: 'not-allowed' }} disabled />
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Note note={__('Recommended meta title length is 50-60 characters. Maximum length is 160 characters.', 'betterlinks')} />
								<span className="btl-modal-customize-link-preview--text-counter">42/60</span>
							</div>
						</div>
					</div>
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_description">{__('Meta Description', 'betterlinks')}</label>
						<div>
							<textarea id="meta_description" name="meta_description" rows={3} disabled style={{ cursor: 'not-allowed' }}>
								{teaserDescription}
							</textarea>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<Note note={__('Recommended meta description length is 150-160 characters.', 'betterlinks')} />
								<span className="btl-modal-customize-link-preview--text-counter">146/160</span>
							</div>
						</div>
					</div>
					<div className="btl-modal-customize-link-preview__form-group">
						<label htmlFor="meta_description">{__('Meta Image', 'betterlinks')}</label>
						<div>
							<button
								className="btl-modal-customize-link-preview__btn dashicons dashicons-upload"
								type="button"
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
						<button className="btl-modal-customize-link-preview__save_btn--teaser" type="button" onClick={openUpgradeToProModal}>
							{__('Save', 'betterlinks')}
						</button>
					</div>
				</div>
			</div>
			<CustomizePreviewContainr />
		</div>
	);
};

export default CustomizeLinkPreviewTeaser;
