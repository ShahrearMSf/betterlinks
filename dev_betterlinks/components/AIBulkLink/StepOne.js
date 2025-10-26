import React from 'react';
import { __ } from '@wordpress/i18n';
import { redirectType } from 'utils/data';

const StepOne = ({
	urls,
	setUrls,
	prompt,
	setPrompt,
	titleLength,
	setTitleLength,
	descriptionLength,
	setDescriptionLength,
	redirectType: selectedRedirectType,
	setRedirectType,
	shortUrlStrategy,
	setShortUrlStrategy,
	settings,
}) => {
	const defaultPrompt = __(
		'Generate SEO-friendly titles and descriptions for the given URLs based on their content. Make the title concise (max {title_length} characters). Suggest relevant categories and tags based on the URL topic and structure. If suggested categories and tags do not exist, create them.',
		'betterlinks'
	).replace('{title_length}', titleLength);

	return (
		<div className="btl-ai-step-one">
			{/* URLs Input */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-urls">
					{__('Target URLs', 'betterlinks')}
					<span className="btl-ai-required">*</span>
				</label>
				<textarea
					id="btl-ai-urls"
					className="btl-ai-urls-input"
					placeholder={__(
						'Enter URLs separated by space or new line...',
						'betterlinks'
					)}
					value={urls}
					onChange={(e) => setUrls(e.target.value)}
				/>
				<div className="btl-ai-help-text">
					{__('You can paste multiple URLs separated by spaces or new lines', 'betterlinks')}
				</div>
			</div>

			{/* AI Prompt */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-prompt">
					{__('AI Prompt', 'betterlinks')}
					<span className="btl-ai-required">*</span>
				</label>
				<textarea
					id="btl-ai-prompt"
					className="btl-ai-prompt-input"
					placeholder={__('Enter your AI prompt here...', 'betterlinks')}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
				/>
				<div className="btl-ai-help-text">
					{__('Example: ', 'betterlinks')}
					{defaultPrompt}
				</div>
			</div>

			{/* Title Length */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-title-length">
					{__('Title Length Limit', 'betterlinks')}
				</label>
				<input
					id="btl-ai-title-length"
					type="number"
					min="20"
					max="200"
					value={titleLength}
					onChange={(e) => setTitleLength(parseInt(e.target.value))}
				/>
				<div className="btl-ai-help-text">
					{__('Maximum characters for generated titles (default: 60)', 'betterlinks')}
				</div>
			</div>

			{/* Description Length */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-description-length">
					{__('Description Length Limit', 'betterlinks')}
				</label>
				<input
					id="btl-ai-description-length"
					type="number"
					min="50"
					max="500"
					value={descriptionLength}
					onChange={(e) => setDescriptionLength(parseInt(e.target.value))}
				/>
				<div className="btl-ai-help-text">
					{__('Maximum characters for generated descriptions (default: 160)', 'betterlinks')}
				</div>
			</div>

			{/* Redirect Type */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-redirect-type">
					{__('Redirect Type', 'betterlinks')}
				</label>
				<select
					id="btl-ai-redirect-type"
					value={selectedRedirectType}
					onChange={(e) => setRedirectType(e.target.value)}
				>
					<option value="">
						{__('Use Global Setting', 'betterlinks')}
					</option>
					{redirectType.map((type) => (
						<option key={type.value} value={type.value}>
							{type.label}
						</option>
					))}
				</select>
				<div className="btl-ai-help-text">
					{__('Leave empty to use the global redirect type setting', 'betterlinks')}
				</div>
			</div>

			{/* Short URL Strategy */}
			<div className="btl-ai-form-group">
				<label htmlFor="btl-ai-short-url-strategy">
					{__('Short URL Strategy', 'betterlinks')}
				</label>
				<select
					id="btl-ai-short-url-strategy"
					value={shortUrlStrategy}
					onChange={(e) => setShortUrlStrategy(e.target.value)}
				>
					<option value="from_title">
						{__('From Title', 'betterlinks')}
					</option>
					<option value="from_target_path">
						{__('From Target Path', 'betterlinks')}
					</option>
					<option value="random">
						{__('Random', 'betterlinks')}
					</option>
					<option value="custom_prefix">
						{__('Custom Prefix + Auto', 'betterlinks')}
					</option>
				</select>
				<div className="btl-ai-help-text">
					{__('Choose how short URLs should be generated', 'betterlinks')}
				</div>
			</div>
		</div>
	);
};

export default StepOne;

