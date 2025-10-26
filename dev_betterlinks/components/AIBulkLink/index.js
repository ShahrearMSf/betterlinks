import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalCustomStyles, is_pro_enabled } from 'utils/helper';
import {
	fetch_ai_settings,
	process_urls_with_ai,
	publish_ai_generated_links,
	reset_ai_state,
} from 'redux/actions/ai_bulk_links.actions';
import { fetch_all_categories, fetch_all_tags } from 'redux/actions/terms.actions';
import { redirectType as redirectTypeOptions } from 'utils/data';
import Select2 from 'react-select';
import '../../../assets/scss/components/_ai_generate_links.scss';

// Custom Checkbox Component
const CustomCheckbox = ({ name, checked, onChange, label }) => (
	<label className="btl-checkbox-field">
		<input
			className="btl-check"
			name={name}
			type="checkbox"
			checked={checked}
			onChange={onChange}
		/>
		<span className="text">{label}</span>
	</label>
);

const AIBulkLink = ({
	isOpen,
	onClose,
	fetch_ai_settings,
	process_urls_with_ai,
	publish_ai_generated_links,
	reset_ai_state,
	aiState,
	fetch_all_categories,
	fetch_all_tags,
	terms,
}) => {
	const [urls, setUrls] = useState('');
	const [enableDescription, setEnableDescription] = useState(true);
	const [redirectType, setRedirectType] = useState('302');
	const [shortUrlStrategy, setShortUrlStrategy] = useState('from_title');
	const [enableAICategory, setEnableAICategory] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [enableAITag, setEnableAITag] = useState(true);
	const [selectedTags, setSelectedTags] = useState([]);
	const [accordionOpen, setAccordionOpen] = useState(false);
	const [enableCustomizePreview, setEnableCustomizePreview] = useState(false);
	const [prompt, setPrompt] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// Generate prompt based on settings
	const generatePrompt = (desc, cat, tag, customizePreview) => {
		let promptText = 'Generate SEO-friendly titles for the given URL based on its content. Make the title concise (max 60 characters) and optimized for search engines.';

		if (desc) {
			promptText += ' Create compelling descriptions (max 160 characters) that work well for social media sharing.';
		}

		if (cat) {
			promptText += ' Suggest relevant categories based on the content topic and URL structure.';
		}

		if (tag) {
			promptText += ' Suggest ONE relevant tag based on the content topic.';
		}

		if (customizePreview) {
			promptText += ' Generate Meta Title (max 60 characters) and Meta Description (max 160 characters) optimized for social media sharing and search engine results.';
		}

		return promptText;
	};

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
	]
	// Update prompt when settings change
	useEffect(() => {
		const newPrompt = generatePrompt(enableDescription, enableAICategory, enableAITag, enableCustomizePreview);
		setPrompt(newPrompt);
	}, [enableDescription, enableAICategory, enableAITag, enableCustomizePreview]);

	useEffect(() => {
		if (isOpen) {
			fetch_ai_settings();
			fetch_all_categories();
			fetch_all_tags();
		}
	}, [isOpen, fetch_ai_settings, fetch_all_categories, fetch_all_tags]);

	const handleGenerateLinks = async () => {
		setError('');
		setSuccess('');

		// Validate URLs
		const urlList = urls
			.split(/[\s\n]+/)
			.filter((url) => url.trim())
			.map((url) => url.trim());

		if (urlList.length === 0) {
			setError(__('Please enter at least one URL', 'betterlinks'));
			return;
		}

		// Validate prompt
		if (!prompt.trim()) {
			setError(__('Please enter an AI prompt', 'betterlinks'));
			return;
		}

		// Build options object with settings
		const options = {
			redirect_type: redirectType,
			short_url_strategy: shortUrlStrategy,
			enable_description: enableDescription,
			enable_ai_category: enableAICategory,
			selected_category: !enableAICategory ? selectedCategory : '',
			enable_ai_tag: enableAITag,
			selected_tags: !enableAITag ? selectedTags : [],
			enable_customize_preview: enableCustomizePreview,
		};

		// Process URLs with AI
		await process_urls_with_ai(urlList, prompt, options);
	};

	const handlePublish = async () => {
		setError('');
		setSuccess('');

		try {
			const result = await publish_ai_generated_links(aiState.generatedLinks);
			if (result.success) {
				setSuccess(__('Links published successfully!', 'betterlinks'));
				setTimeout(() => {
					reset_ai_state();
					setUrls('');
					setPrompt('');
					onClose();
				}, 1500);
			}
		} catch (err) {
			setError(__('Error publishing links. Please try again.', 'betterlinks'));
		}
	};

	const handleClose = () => {
		reset_ai_state();
		setUrls('');
		setPrompt('');
		setError('');
		setSuccess('');
		onClose();
	};

	const isProcessing = aiState?.processing?.isProcessing;
	const generatedLinks = aiState?.generatedLinks || [];
	const hasGeneratedLinks = generatedLinks.length > 0;

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleClose}
			style={modalCustomStyles}
			ariaHideApp={false}
			className="btl-ai-bulk-link-modal"
		>
			<div className="btl-ai-modal-header">
				<h2>✕ {__('Generate Links with AI', 'betterlinks')}</h2>
				<button className="btl-ai-close-btn" onClick={handleClose}>
					×
				</button>
			</div>

			{/* Error/Success Messages */}
			{error && <div className="btl-ai-error-message">{error}</div>}
			{success && <div className="btl-ai-success-message">{success}</div>}

			{/* Main Content */}
			<div className="btl-ai-content">
				{!isProcessing && !hasGeneratedLinks && (
					<>
						{/* Header */}
						<div className="btl-ai-header">
							<p>{__('Use advanced AI to automatically generate optimized short links from your target URLs', 'betterlinks')}</p>
						</div>

						{/* Accordion Section - Short Link Settings */}
						<div className="btl-ai-accordion">
							<div
								className="btl-ai-accordion-header"
								onClick={() => setAccordionOpen(!accordionOpen)}
							>
								<span className="btl-ai-accordion-icon">
									{accordionOpen ? '▼' : '▶'}
								</span>
								<h3>{__('Short Link Settings', 'betterlinks')}</h3>
							</div>

							{accordionOpen && (
								<div className="btl-ai-accordion-content">
									{/* Enable AI Description */}
									<div className="btl-ai-setting-group">
										<CustomCheckbox
											name="enable_ai_description"
											checked={enableDescription}
											onChange={() => setEnableDescription(!enableDescription)}
											label={__('Enable AI Description', 'betterlinks')}
										/>
										<p className="btl-ai-setting-help">
											{__('If enabled, AI will generate descriptions for each link', 'betterlinks')}
										</p>
									</div>

									{/* Redirect Type */}
									<div className="btl-ai-setting-group">
										<label className="btl-ai-label">
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
										<label className="btl-ai-label">
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
										<p className="btl-ai-setting-help">
											{__('Choose how short URLs should be generated', 'betterlinks')}
										</p>
									</div>

									{/* AI Generate Suggested Category */}
									<div className="btl-ai-setting-group">
										<div>
											<CustomCheckbox
												name="enable_ai_category"
												checked={enableAICategory}
												onChange={() => setEnableAICategory(!enableAICategory)}
												label={__('AI Generate Suggested Category', 'betterlinks')}
											/>
											<p className="btl-ai-setting-help">
												{__('If enabled, AI will suggest categories based on URL content. If disabled, use selected category below.', 'betterlinks')}
											</p>
										</div>
										{!enableAICategory && (
											<div className="btl-ai-setting-subgroup">
												<label className="btl-ai-label">
													{__('Default Category', 'betterlinks')}
												</label>
												<Select2
													className="btl-modal-select--full"
													classNamePrefix="btl-react-select"
													options={terms?.categories?.map((cat) => ({
														value: cat.ID,
														label: cat.term_name,
													})) || []}
													value={
														selectedCategory
															? {
																	value: selectedCategory,
																	label: terms?.categories?.find((cat) => cat.ID == selectedCategory)?.term_name || '',
															  }
															: null
													}
													onChange={(option) => setSelectedCategory(option?.value || '')}
													placeholder={__('Select a category...', 'betterlinks')}
													isClearable={true}
												/>
											</div>
										)}
									</div>

									{/* AI Generate Suggested Tag */}
									<div className="btl-ai-setting-group">
										<CustomCheckbox
											name="enable_ai_tag"
											checked={enableAITag}
											onChange={() => setEnableAITag(!enableAITag)}
											label={__('AI Generate Suggested Tag', 'betterlinks')}
										/>
										<p className="btl-ai-setting-help">
											{__('If enabled, AI will suggest ONE tag per link based on URL content. If disabled, use selected tags below.', 'betterlinks')}
										</p>

										{!enableAITag && (
											<div className="btl-ai-setting-subgroup">
												<label className="btl-ai-label">
													{__('Default Tags', 'betterlinks')}
												</label>
												<Select2
													className="btl-modal-select--full"
													classNamePrefix="btl-react-select"
													isMulti={true}
													options={terms?.tags?.map((tag) => ({
														value: tag.ID,
														label: tag.term_name,
													})) || []}
													value={
														selectedTags.length > 0
															? selectedTags.map((tagId) => ({
																	value: tagId,
																	label: terms?.tags?.find((tag) => tag.ID == tagId)?.term_name || '',
															  }))
															: []
													}
													onChange={(options) => setSelectedTags(options?.map((opt) => opt.value) || [])}
													placeholder={__('Select tags...', 'betterlinks')}
													isClearable={true}
												/>
											</div>
										)}
									</div>

									{/* Customize Link Preview */}
									<div className="btl-ai-setting-group">
										<CustomCheckbox
											name="enable_customize_preview"
											checked={enableCustomizePreview}
											onChange={() => setEnableCustomizePreview(!enableCustomizePreview)}
											label={__('Customize Link Preview', 'betterlinks')}
										/>
										<p className="btl-ai-setting-help">
											{__('If enabled, AI will generate Meta Title and Meta Description optimized for social media sharing', 'betterlinks')}
										</p>
									</div>
								</div>
							)}
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
									placeholder={__('Enter one or multiple URLs (one per line or separated by spaces):', 'betterlinks')}
									value={urls}
									onChange={(e) => setUrls(e.target.value)}
									rows="5"
									disabled={isProcessing}
								>
									https://example.com
									https://another-example.com
								</textarea>
							</div>

							{/* AI Prompt */}
							<div className="btl-ai-form-group">
								<label className="btl-ai-label">
									{__('AI Prompt', 'betterlinks')}
								</label>
								<textarea
									className="btl-ai-textarea btl-ai-prompt"
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
								onClick={handleGenerateLinks}
								disabled={isProcessing}
							>
								{isProcessing ? (
									<>
										<span className="btl-ai-spinner"></span>
										{__('Generating...', 'betterlinks')}
									</>
								) : (
									<>
										+ {__('Generate Links', 'betterlinks')}
									</>
								)}
							</button>
						</div>
					</>
				)}

				{/* Processing State */}
				{isProcessing && (
					<div className="btl-ai-processing">
						<div className="btl-ai-spinner-large"></div>
						<h3>{__('Generating Links with AI...', 'betterlinks')}</h3>
						<p>{__('Please wait while we analyze your URLs and generate optimized short links.', 'betterlinks')}</p>
						<div className="btl-ai-processing-steps">
							<div className="btl-ai-step-item">
								<span className="btl-ai-step-check">✓</span>
								{__('Extracting URLs', 'betterlinks')}
							</div>
							<div className="btl-ai-step-item">
								<span className="btl-ai-step-check">✓</span>
								{__('Scraping content', 'betterlinks')}
							</div>
							<div className="btl-ai-step-item">
								<span className="btl-ai-step-spinner">⟳</span>
								{__('AI processing', 'betterlinks')}
							</div>
							<div className="btl-ai-step-item">
								<span className="btl-ai-step-icon">🔗</span>
								{__('Generating links', 'betterlinks')}
							</div>
						</div>
						<p className="btl-ai-processing-count">
							{__('Processing URL', 'betterlinks')} {aiState?.processing?.currentIndex || 1} / {aiState?.processing?.totalUrls || 1}
						</p>
					</div>
				)}

				{/* Generated Links Preview */}
				{hasGeneratedLinks && !isProcessing && (
					<div className="btl-ai-preview">
						<h3>✨ {__('Generated Links Preview', 'betterlinks')}</h3>
						<div className="btl-ai-links-list">
							{generatedLinks.map((link, index) => (
								<div key={index} className="btl-ai-link-card">
									<div className="btl-ai-link-header">
										<span className="btl-ai-link-icon">🔗</span>
										<h4>{link.link_title || 'Untitled'}</h4>
									</div>
									<p className="btl-ai-link-description">{link.link_note || 'No description'}</p>
									<div className="btl-ai-link-details">
										<div className="btl-ai-detail-row">
											<span className="btl-ai-detail-label">🎯 {__('Target:', 'betterlinks')}</span>
											<span className="btl-ai-detail-value">{link.target_url}</span>
										</div>
										<div className="btl-ai-detail-row">
											<span className="btl-ai-detail-label">🔗 {__('Short URL:', 'betterlinks')}</span>
											<span className="btl-ai-detail-value btl-ai-short-url">{link.short_url}</span>
										</div>
										{link.category && (
											<div className="btl-ai-detail-row">
												<span className="btl-ai-detail-label">📁 {__('Category:', 'betterlinks')}</span>
												<span className="btl-ai-detail-value">{link.category}</span>
											</div>
										)}
										{link.tags && link.tags.length > 0 && (
											<div className="btl-ai-detail-row">
												<span className="btl-ai-detail-label">🏷️ {__('Tags:', 'betterlinks')}</span>
												<span className="btl-ai-detail-value">{link.tags}</span>
											</div>
										)}
										<div className="btl-ai-detail-row">
											<span className="btl-ai-detail-label">🤖 {__('AI Generated:', 'betterlinks')}</span>
											<span className="btl-ai-detail-value btl-ai-badge-success">✓ {__('Enhanced with AI', 'betterlinks')}</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="btl-ai-modal-footer">
				{hasGeneratedLinks && !isProcessing && (
					<>
						<button
							className="btl-ai-btn-secondary"
							onClick={() => {
								reset_ai_state();
								setUrls('');
							}}
						>
							← {__('Back to Edit', 'betterlinks')}
						</button>
						<button
							className="btl-ai-btn-primary"
							onClick={handlePublish}
							disabled={isProcessing}
						>
							✓ {__('Publish All Links', 'betterlinks')}
						</button>
					</>
				)}
			</div>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	aiState: state.aiBulkLinks || {},
	terms: state.terms || {},
	settings: state.settings?.settings || {},
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			fetch_ai_settings,
			process_urls_with_ai,
			publish_ai_generated_links,
			reset_ai_state,
			fetch_all_categories,
			fetch_all_tags,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(AIBulkLink);

