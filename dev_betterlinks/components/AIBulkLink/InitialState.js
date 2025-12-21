import React from 'react';
import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';
import { is_pro_enabled, plugin_root_url } from 'utils/helper';
import { redirectType as redirectTypeOptions } from 'utils/data';

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
	const shortURLSlugTypes = [
		{
			value: 'from_title',
			label: __('From Title (Recommended)', 'betterlinks'),
		},
		{
			value: 'random',
			label: __('Random Slug', 'betterlinks'),
		},
		{
			value: 'custom_prefix',
			label: __('Custom Prefix', 'betterlinks'),
		},
	];

	// Prepare category options with AI Generated as first option
	const categoryOptions = [
		{
			value: 'ai_generated',
			label: __('AI Generated Category', 'betterlinks'),
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
					<p>{__('Notice: Please add your API key to use the AI Link Generation feature.', 'betterlinks')}</p>
				</div>
			)}

			{/* Short Link Settings - 2 Column Layout */}
			<div className="btl-ai-settings-grid">
				{/* Redirect Type */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Redirect Type', 'betterlinks')}
					</label>
					<Select2
						className="btl-modal-select--full"
						classNamePrefix="btl-react-select"
						options={[
							...redirectTypeOptions,
							{
								value: is_pro_enabled ? 'cloak' : 'pro',
								label: __('Cloaked', 'betterlinks'),
								disabled: !is_pro_enabled,
							},
						]}
						value={[
							...redirectTypeOptions,
							{
								value: is_pro_enabled ? 'cloak' : 'pro',
								label: __('Cloaked', 'betterlinks'),
								disabled: !is_pro_enabled,
							},
						].filter((item) => item.value === redirectType)[0] || redirectTypeOptions[0]}
						onChange={(option) => setRedirectType(option?.value || '302')}
						isSearchable={false}
						isOptionDisabled={(option) => option.disabled}
					/>
				</div>

				{/* Short URL Generation Strategy */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Short URL Generation', 'betterlinks')}
					</label>
					<Select2
						className="btl-modal-select--full"
						classNamePrefix="btl-react-select"
						options={shortURLSlugTypes}
						value={shortURLSlugTypes.filter((item) => item.value === shortUrlStrategy)[0]}
						onChange={(option) => setShortUrlStrategy(option?.value || 'from_title')}
						isSearchable={false}
					/>
				</div>

				{/* Assign Category */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Assign Category', 'betterlinks')}
					</label>
					<Select2
						className="btl-modal-select--full"
						classNamePrefix="btl-react-select"
						options={categoryOptions}
						value={
							categoryOptions.find((cat) => cat.value === selectedCategory) || categoryOptions[0]
						}
						onChange={(option) => setSelectedCategory(option?.value || 'ai_generated')}
						placeholder={__('Select a category...', 'betterlinks')}
					/>
				</div>
			</div>

			{/* Input Form */}
			<div className="btl-ai-form">
				{/* Target URLs */}
				<div className="btl-ai-form-group">
					<label className="btl-ai-label">
						<span className="btl-ai-required">*</span>
						{__('Target URLs', 'betterlinks')}
					</label>
					<textarea
						className="btl-ai-textarea"
						placeholder={__('http://test-site.local/go/ui8/product-name/contact-page\n\nhttps://examplelink.com', 'betterlinks')}
						value={urls}
						onChange={(e) => setUrls(e.target.value)}
						rows="5"
						disabled={isProcessing}
					>
						https://example.com
						https://another-example.com
					</textarea>
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
					<textarea
						className="btl-ai-textarea"
						placeholder={__('Enter your AI prompt for generating link data:', 'betterlinks')}
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						rows="5"
						disabled={isProcessing}
					/>
				</div>

				{/* Generate Button */}
				<button
					className="btl-ai-btn-generate"
					onClick={onGenerateLinks}
					disabled={isProcessing || isUrlsEmpty}
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
		</>
	);
};

export default InitialState;
