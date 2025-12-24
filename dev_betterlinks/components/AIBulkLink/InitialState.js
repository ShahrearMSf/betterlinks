import React from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';
import { is_pro_enabled, plugin_root_url, route_path } from 'utils/helper';
import { redirectType as redirectTypeOptions, urlGenerationTypes } from 'utils/data';
import { useUpgradeProModal } from 'utils/customHooks';
import ProBadge from 'components/Badge/ProBadge';
import UpgradeToPro from '../Teasers/UpgradeToPro';

const InitialState = ({
urls,
setUrls,
redirectType,
setRedirectType,
shortUrlStrategy,
setShortUrlStrategy,
selectedCategory,
setSelectedCategory,
prompt,
setPrompt,
terms,
onGenerateLinks,
isProcessing,
isUrlsEmpty,
hasValidApiKey,
settingsLoading,
defaultPrompt,
}) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	// Prepare category options with AI Generated as first option
	const categoryOptions = [
		{
			value: 'ai_generated',
			label: __('AI Suggested Category', 'betterlinks'),
		},
		...(terms?.categories?.map((cat) => ({
value: cat.ID,
label: cat.term_name,
})) || []),
	];

	return (
<>
			{/* API Key Missing Notice - Only show if settings are loaded and no valid API key */}
			{!settingsLoading && !hasValidApiKey && (
				<div className="btl-ai-header">
					<p>
						⚠️ {__('Notice: API key must be configured to use AI bulk link generation. ', 'betterlinks')}
						<Link 
							to={`${route_path}admin.php?page=betterlinks-settings&advanced=true`}
							style={{ textDecoration: 'underline' }}
							onClick={(e) => {
								// Close the modal when navigating to settings
								if (typeof onClose === 'function') onClose();
							}}
						>
							{__('Click to Configure API', 'betterlinks')}
						</Link>
					</p>
				</div>
			)}

			{/* Short Link Settings - 2 Column Layout */}
			<div className="btl-ai-settings-grid">
				{/* Redirect Type */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Link Redirect Type', 'betterlinks')}
					  <div className="btl-tooltip">
						   <span className="dashicons dashicons-info-outline" />
						   <span className="btl-tooltiptext" style={{ width: '255px', textAlign: 'left', lineHeight: '1.2em' }}>
							   {__('Select redirect type for your generated short links', 'betterlinks-pro')}
						   </span>
					   </div>
					</label>
					<span onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer' } : {}}>
						<Select2
							className="btl-modal-select--full"
							classNamePrefix="btl-react-select"
							options={[
								...redirectTypeOptions,
								{
									value: is_pro_enabled ? 'cloak' : 'pro',
									label: (
										<>
											{__('Cloaked', 'betterlinks')} <ProBadge />
										</>
									),
									disabled: !is_pro_enabled,
								},
							]}
							value={[
								...redirectTypeOptions,
								{
									value: is_pro_enabled ? 'cloak' : 'pro',
									label: (
										<>
											{__('Cloaked', 'betterlinks')} <ProBadge />
										</>
									),
									disabled: !is_pro_enabled,
								},
							].filter((item) => item.value === redirectType)[0] || redirectTypeOptions[0]}
							onChange={(option) => setRedirectType(option?.value || '302')}
							isSearchable={false}
							isOptionDisabled={(option) => option.disabled}
							isDisabled={!is_pro_enabled}
						/>
					</span>
				</div>

				{/* Short URL Generation Strategy */}
				<div className="btl-ai-setting-group">
					   <label className="btl-ai-label btl-white">
						   {__('Short URL Generation', 'betterlinks')}
						   <div className="btl-tooltip">
							   <span className="dashicons dashicons-info-outline" />
							   <span className="btl-tooltiptext" style={{ width: '255px', textAlign: 'left', lineHeight: '1.2em' }}>
								   {__('Select the input source that AI will use to generate your short links', 'betterlinks-pro')}
							   </span>
						   </div>
					   </label>
					<span onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer' } : {}}>
						<Select2
							className="btl-modal-select--full"
							classNamePrefix="btl-react-select"
							options={urlGenerationTypes}
							value={urlGenerationTypes.filter((item) => item.value === shortUrlStrategy)[0]}
							onChange={(option) => setShortUrlStrategy(option?.value || 'from_title')}
							isSearchable={false}
							isDisabled={!is_pro_enabled}
						/>
					</span>
				</div>

				{/* Assign Category */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Category', 'betterlinks')}
					  <div className="btl-tooltip">
						   <span className="dashicons dashicons-info-outline" />
						   <span className="btl-tooltiptext" style={{ width: '255px', textAlign: 'left', lineHeight: '1.2em' }}>
							   {__('Select category from dropdown or let AI choose category automatically.', 'betterlinks-pro')}
						   </span>
					   </div>
					</label>
					<span onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer' } : {}}>
						<Select2
							className="btl-modal-select--full"
							classNamePrefix="btl-react-select"
							options={categoryOptions}
							value={
								categoryOptions.find((cat) => cat.value === selectedCategory) || categoryOptions[0]
							}
							onChange={(option) => setSelectedCategory(option?.value || 'ai_generated')}
							placeholder={__('Select a category...', 'betterlinks')}
							isDisabled={!is_pro_enabled}
						/>
					</span>
				</div>
			</div>

			{/* Input Form */}
			<div className="btl-ai-form">
				{/* Target URLs */}
				<div className="btl-ai-form-group">
					<label className="btl-ai-label">
						<span className="btl-ai-required">*</span>
						{__('Target URLs', 'betterlinks')}
						<div className="btl-tooltip">
						   <span className="dashicons dashicons-info-outline" />
						   <span className="btl-tooltiptext" style={{ width: '255px', textAlign: 'left', lineHeight: '1.2em' }}>
							   {__('Enter your destination URLs for AI-powered bulk link generation', 'betterlinks-pro')}
						   </span>
					   </div>
					</label>
					<div onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer', position: 'relative', display: 'block', width: '100%' } : { position: 'relative', display: 'block', width: '100%' }}>
					<textarea
						className="btl-ai-textarea"
						placeholder={__('http://test-site.local/go/ui8/product-name/contact-page\n\nhttps://examplelink.com', 'betterlinks')}
						value={urls}
						onChange={(e) => setUrls(e.target.value)}
						rows="5"
						disabled={isProcessing || !is_pro_enabled}
						style={!is_pro_enabled ? { pointerEvents: 'none' } : {}}
					>
						https://example.com
						https://another-example.com
					</textarea>
					</div>
					<p className="btl-ai-note">
						{__('Enter One or Multiple URLs (one per line or separated by space)', 'betterlinks')}
					</p>
				</div>

				{/* AI Prompt */}
				<div className="btl-ai-form-group">
					<div className="btl-ai-label-with-reset">
						<label className="btl-ai-label">
							<img src={plugin_root_url + '/assets/images/icons/ai-prompt-label.svg'} alt="AI Icon" />
							{__('Add link with AI', 'betterlinks')}
						</label>
						<button
							type="button"
							className="btl-ai-reset-prompt-btn"
							onClick={() => setPrompt(defaultPrompt)}
							disabled={isProcessing || prompt === defaultPrompt}
							title={__('Reset to default prompt', 'betterlinks')}
						>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C9.84871 2 11.5 2.84871 12.6213 4.17157" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
								<path d="M12 2V4.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							{__('Reset Prompt', 'betterlinks')}
						</button>
					</div>
					<div onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer', position: 'relative', display: 'block', width: '100%' } : { position: 'relative', display: 'block', width: '100%' }}>
					<textarea
						className="btl-ai-textarea"
						placeholder={__('Enter your AI prompt for generating link data:', 'betterlinks')}
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						rows="5"
						disabled={isProcessing || !is_pro_enabled}
						style={!is_pro_enabled ? { pointerEvents: 'none' } : {}}
					/>
				    </div>
				</div>

				{/* Generate Button */}
				<div onClick={!is_pro_enabled ? openUpgradeToProModal : undefined} style={!is_pro_enabled ? { cursor: 'pointer', display: 'inline-block', position: 'relative' } : { display: 'inline-block', position: 'relative' }}>
				<button
					className="btl-ai-btn-generate"
					onClick={is_pro_enabled ? onGenerateLinks : undefined}
					disabled={isProcessing || isUrlsEmpty || !settingsLoading && !hasValidApiKey}
					style={!is_pro_enabled && (isProcessing || isUrlsEmpty) ? { pointerEvents: 'none' } : {}}
					title={!is_pro_enabled ? __('Pro Feature - Upgrade to Pro', 'betterlinks') : !settingsLoading && !hasValidApiKey ? __('Configure your API key', 'betterlinks') : ''}
				>
					{isProcessing ? (
<>
							<span className="btl-ai-spinner"></span>
							{__('Generating...', 'betterlinks')}
						</>
					) : (
<>
							<img src={plugin_root_url + '/assets/images/icons/ai-generate-btn.svg'} alt="AI Icon" />
							 {__('Generate Links', 'betterlinks')}
						</>
					)}
				</button>
				</div>
			</div>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
		</>
	);
};

export default InitialState;
