import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import Select2 from 'react-select';
import { is_pro_enabled, plugin_root_url, route_path, pro_version_check } from 'utils/helper';
import { redirectType as redirectTypeOptions, urlGenerationTypes } from 'utils/data';
import { useUpgradeProModal } from 'utils/customHooks';
import ProBadge from 'components/Badge/ProBadge';
import UpgradeToPro from '../Teasers/UpgradeToPro';
import { connect } from 'react-redux';

// Estimated tokens per batch (10 URLs) for each model
// Based on: Input (prompt + URL content) + Output (title, description, meta fields, category, tags)
// These estimates include both input and completion tokens for typical use cases
const ESTIMATED_TOKENS_PER_BATCH = {
	// OpenAI Models (Generally more efficient with structured output)
	'gpt-4.1-nano': 1200,      // Nano tier - optimized for speed
	'gpt-4.1-mini': 1400,      // Mini tier - good balance
	'gpt-4.1': 1800,           // Standard tier - more detailed
	'gpt-5-nano': 1300,        // Next-gen nano
	'gpt-5-mini': 1600,        // Next-gen mini
	'gpt-5.2': 2200,           // Most capable, uses more tokens
	
	// Gemini Models (Generally use more tokens for similar tasks)
	'gemini-2.5-flash-lite': 1600,    // Lite version - more efficient
	'gemini-2.5-flash': 2000,         // Standard flash
	'gemini-2.5-pro': 2500,           // Pro tier - more comprehensive
	'gemini-3-flash-preview': 2200,   // Preview - newer tech
	'gemini-3-pro-preview': 3000,     // Pro preview - most detailed
};

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
modalRef, // Add modalRef prop for scrolling
error, // Add error prop to trigger validation styling
aiSettings, // Add AI settings from Redux
onEstimatedTokensChange, // Add callback to pass estimated tokens to parent
}) => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();

	// Check if BetterLinks Pro version is 2.6.0 or newer
	const isProVersionValid = pro_version_check('2.6.0');

	// Validation states
	const [validationErrors, setValidationErrors] = useState({
		urls: false,
		prompt: false
	});
	const [showValidation, setShowValidation] = useState(false);

	// Calculate URL count and token recommendation
	const tokenRecommendation = useMemo(() => {
		if (!urls.trim()) {
			// Clear estimated tokens when URLs are empty
			if (onEstimatedTokensChange) {
				onEstimatedTokensChange(null);
			}
			return null;
		}

		// Count URLs (split by newline or space)
		const urlList = urls
			.split(/[\n\s]+/)
			.map(url => url.trim())
			.filter(url => url.length > 0);
		
		const urlCount = urlList.length;
		if (urlCount === 0) {
			// Clear estimated tokens when no valid URLs
			if (onEstimatedTokensChange) {
				onEstimatedTokensChange(null);
			}
			return null;
		}

		// Get current model and token limit from AI settings
		const provider = aiSettings?.ai_provider || 'openai';
		const model = provider === 'openai' 
			? (aiSettings?.openai_model || 'gpt-4o-mini')
			: (aiSettings?.gemini_model || 'gemini-2.5-flash-lite');
		const currentTokenLimit = provider === 'openai'
			? (aiSettings?.openai_token_limit || 3000)
			: (aiSettings?.gemini_token_limit || 3000);

		// Get estimated tokens per batch (10 URLs) for the model
		const tokensPerBatch = ESTIMATED_TOKENS_PER_BATCH[model] || 1400;
		
		// Calculate estimated tokens per URL (divide batch estimate by 10)
		const tokensPerUrl = tokensPerBatch / 10;
		
		// Calculate estimated total tokens needed (per URL × URL count)
		const estimatedTotalTokens = Math.ceil(tokensPerUrl * urlCount);

		// Pass estimated tokens to parent component
		if (onEstimatedTokensChange) {
			onEstimatedTokensChange(estimatedTotalTokens);
		}

		// Check if current limit might be exceeded
		const willExceed = estimatedTotalTokens > currentTokenLimit;

		return {
			urlCount,
			tokensPerUrl: Math.ceil(tokensPerUrl),
			estimatedTotalTokens,
			currentTokenLimit,
			willExceed,
			recommendedLimit: Math.ceil(estimatedTotalTokens / 100) * 100, // Round up to nearest 100
		};
	}, [urls, aiSettings, onEstimatedTokensChange]);

	// Effect to trigger validation styling when error appears
	React.useEffect(() => {
		if (error) {
			// Determine which fields have errors based on error message content and current field values
			const errors = {
				urls: (error.includes('URL') || error.includes('url')) && !urls.trim(),
				prompt: (error.includes('prompt') || error.includes('AI')) && !prompt.trim()
			};

			setValidationErrors(errors);
			setShowValidation(true);

			// Scroll to top when error appears
			if (modalRef?.current) {
				modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		} else {
			// Clear validation when no error
			setShowValidation(false);
		}
	}, [error, modalRef, urls, prompt]);



	// Handle generate button click - just call parent function
	// Parent will handle validation, error messages, and trigger our visual styling via error prop
	const handleGenerateClick = () => {
		onGenerateLinks();
	};

	// Get validation class for textarea
	const getTextareaClass = (fieldName) => {
		if (!showValidation) return 'btl-ai-textarea';

		const hasError = validationErrors[fieldName];
		const hasValue = fieldName === 'urls' ? urls.trim() : prompt.trim();

		if (hasError) {
			return 'btl-ai-textarea btl-ai-textarea-error';
		} else if (hasValue) {
			return 'btl-ai-textarea btl-ai-textarea-success';
		}

		return 'btl-ai-textarea';
	};

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
			{/* Version Check Notice - Show if Pro version is less than 2.6.0 */}
			{is_pro_enabled && !isProVersionValid && (
				<div className="btl-ai-header">
					<div>
						⚠️ {__('AI Bulk Link Generator requires BetterLinks Pro ', 'betterlinks')}<strong>v2.6.0</strong>{__(' or newer. Please update the plugin to use it.', 'betterlinks')}
					</div>
				</div>
			)}

			{/* API Key Missing Notice - Only show if settings are loaded, no valid API key, and Pro version is valid */}
			{!settingsLoading && !hasValidApiKey && isProVersionValid && (
				<div className="btl-ai-header">
					<p>
						⚠️ {__('Notice: API key must be configured to use AI bulk link generation. ', 'betterlinks')}
						<Link
							to={`${route_path}admin.php?page=betterlinks-settings&advanced=true`}
							style={{ textDecoration: 'underline' }}
							onClick={() => {
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
					<span onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer' } : {}}>
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
							isDisabled={!is_pro_enabled || !isProVersionValid}
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
					<span onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer' } : {}}>
						<Select2
							className="btl-modal-select--full"
							classNamePrefix="btl-react-select"
							options={urlGenerationTypes}
							value={urlGenerationTypes.filter((item) => item.value === shortUrlStrategy)[0]}
							onChange={(option) => setShortUrlStrategy(option?.value || 'from_title')}
							isSearchable={false}
							isDisabled={!is_pro_enabled || !isProVersionValid}
						/>
					</span>
				</div>

				{/* Assign Category */}
				<div className="btl-ai-setting-group">
					<label className="btl-ai-label btl-white">
						{__('Category', 'betterlinks')}
					  <div className="btl-tooltip">
						   <span className="dashicons dashicons-info-outline" />
						   <span className="btl-tooltiptext" style={{ width: '186px', textAlign: 'left', lineHeight: '1.2em' }}>
							   {__('Select category from dropdown or let AI choose category automatically.', 'betterlinks-pro')}
						   </span>
					   </div>
					</label>
					<span onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer' } : {}}>
						<Select2
							className="btl-modal-select--full"
							classNamePrefix="btl-react-select"
							options={categoryOptions}
							value={
								categoryOptions.find((cat) => cat.value === selectedCategory) || categoryOptions[0]
							}
							onChange={(option) => setSelectedCategory(option?.value || 'ai_generated')}
							placeholder={__('Select a category...', 'betterlinks')}
							isDisabled={!is_pro_enabled || !isProVersionValid}
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
					<div onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer', position: 'relative', display: 'block', width: '100%' } : { position: 'relative', display: 'block', width: '100%' }}>
					<textarea
						className={getTextareaClass('urls')}
						placeholder={__('https://your-target-url.com/sample-link\n\nhttps://your-target-url.com/sample-link-2\n\nhttps://example.com/sample-link', 'betterlinks')}
						value={urls}
						onChange={(e) => {
							setUrls(e.target.value);
							// Clear validation when user starts typing
							if (showValidation) {
								setShowValidation(false);
							}
						}}
						rows="5"
						disabled={isProcessing || !is_pro_enabled || !isProVersionValid}
						style={!is_pro_enabled || !isProVersionValid ? { pointerEvents: 'none' } : {}}
					>
						https://your-target-url.com/sample-link
						https://your-target-url.com/sample-link-2
						https://example.com/sample-link
					</textarea>
					</div>
					<div className="btl-ai-note">
						{/* {__('Enter One or Multiple URLs (one per line or separated by space)', 'betterlinks')} */}
						{tokenRecommendation ? (
							<>
								<span style={{ color: '#5e6d79', fontSize: '12px' }}>
									{tokenRecommendation.urlCount} {__(' URLs detected. Estimated token usage is approximately ~ ', 'betterlinks')}{tokenRecommendation.estimatedTotalTokens.toLocaleString()}{__('.', 'betterlinks')}
								</span>
								{tokenRecommendation.willExceed && (
									<>
										<br />
										<span style={{ color: '#d63638', fontWeight: '500', fontSize: '12px' }}>
										 {__('Warning : Current token limit is', 'betterlinks')} {tokenRecommendation.currentTokenLimit.toLocaleString()}{__('. Recommended token limit to process all URLs is', 'betterlinks')} {tokenRecommendation.recommendedLimit.toLocaleString()} {__('or higher. Change the limit ', 'betterlinks')}{' '}
											<Link
												to={`${route_path}admin.php?page=betterlinks-settings&advanced=true`}
												target="_blank"
												style={{ textDecoration: 'underline', color: '#d63638' }}
												onClick={() => {
													if (typeof onClose === 'function') onClose();
												}}
											>
												{__('here', 'betterlinks')}
											</Link>
										</span>
									</>
								)}
							</>
						) : __('Enter One or Multiple URLs (one per line or separated by space)', 'betterlinks')}
					</div>
				</div>

				{/* AI Prompt */}
				<div className="btl-ai-form-group">
					<div className="btl-ai-label-with-reset">
						<label className="btl-ai-label">
							<img src={plugin_root_url + '/assets/images/icons/ai-prompt-label.svg'} alt="AI Icon" />
							{__('AI Instructions', 'betterlinks')}
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
					<div onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer', position: 'relative', display: 'block', width: '100%' } : { position: 'relative', display: 'block', width: '100%' }}>
					<textarea
						className={getTextareaClass('prompt')}
						placeholder={__('Enter your AI prompt for generating link data:', 'betterlinks')}
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
							// Clear validation when user starts typing
							if (showValidation) {
								setShowValidation(false);
							}
						}}
						rows="5"
						disabled={isProcessing || !is_pro_enabled || !isProVersionValid}
						style={!is_pro_enabled || !isProVersionValid ? { pointerEvents: 'none' } : {}}
					/>
				    </div>
				</div>

				{/* Generate Button */}
				<div onClick={!is_pro_enabled || !isProVersionValid ? openUpgradeToProModal : undefined} style={!is_pro_enabled || !isProVersionValid ? { cursor: 'pointer', display: 'inline-block', position: 'relative' } : { display: 'inline-block', position: 'relative' }}>
				<button
					className="btl-ai-btn-generate"
					onClick={is_pro_enabled && isProVersionValid ? handleGenerateClick : undefined}
					disabled={isProcessing || !settingsLoading && !hasValidApiKey || !isProVersionValid}
					style={(!is_pro_enabled || !isProVersionValid) && (isProcessing || isUrlsEmpty) ? { pointerEvents: 'none' } : {}}
					title={!is_pro_enabled ? __('Pro Feature - Upgrade to Pro', 'betterlinks') : !isProVersionValid ? __('AI feature requires BetterLinks Pro v2.6.0 or newer. Please update the plugin to use it.', 'betterlinks') : !settingsLoading && !hasValidApiKey ? __('Configure your API key', 'betterlinks') : ''}
				>
					{isProcessing ? (
<>
							<span className="btl-ai-spinner"></span>
							{__('Generating...', 'betterlinks')}
						</>
					) : (
<>
							<img src={plugin_root_url + '/assets/images/icons/ai-generate-btn.svg'} alt="AI Icon" />
							 {!isProVersionValid ? __('Requires BetterLinks Pro v2.6.0+', 'betterlinks') : __('Generate Links', 'betterlinks')}
						</>
					)}
				</button>
				</div>
			</div>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
		</>
	);
};

const mapStateToProps = (state) => ({
	aiSettings: state.aiBulkLinks?.settings,
});

export default connect(mapStateToProps)(InitialState);
