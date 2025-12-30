import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { modalCustomStyles, plugin_root_url, is_pro_enabled, removeDuplicateUrls } from 'utils/helper';
import {
	fetch_ai_settings,
	process_urls_with_ai,
	publish_ai_generated_links,
	reset_ai_state,
} from 'redux/actions/ai_bulk_links.actions';
import { fetch_all_categories, fetch_all_tags } from 'redux/actions/terms.actions';
import '../../../assets/scss/components/_ai_generate_links.scss';
import InitialState from './InitialState';
import ProcessingState from './ProcessingState';
import PreviewState from './PreviewState';
import PublishingState from './PublishingState';
import ProBadge from 'components/Badge/ProBadge';

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
	// Define default prompt as a constant
	const DEFAULT_PROMPT = 'Generate SEO-friendly titles for the given URL based on its content. Make the title concise (max 60 characters) and optimized for search engines. Create compelling descriptions (max 160 characters) that work well for social media sharing. Generate Meta Title (max 60 characters) and Meta Description (max 160 characters) optimized for social media sharing and search engine results.';

	const [urls, setUrls] = useState('');
	const [redirectType, setRedirectType] = useState('302');
	const [shortUrlStrategy, setShortUrlStrategy] = useState('from_title');
	const [selectedCategory, setSelectedCategory] = useState('ai_generated');
	const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [info, setInfo] = useState('');
	const [isPublishing, setIsPublishing] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [existingUrls, setExistingUrls] = useState(new Set());

	useEffect(() => {
		if (isOpen) {
			fetch_ai_settings();
			fetch_all_categories();
			fetch_all_tags();
			// Reset closing state when modal opens
			setIsClosing(false);
		}
	}, [isOpen, fetch_ai_settings, fetch_all_categories, fetch_all_tags]);

	// Handle existing URLs change from PreviewState
	const handleExistingUrlsChange = (existingUrlsSet) => {
		setExistingUrls(existingUrlsSet);
	};

	const handleGenerateLinks = async () => {
		setError('');
		setSuccess('');
		setInfo('');

		// Remove duplicate URLs efficiently
		const { uniqueUrls: urlList, duplicatesRemoved, originalCount } = removeDuplicateUrls(urls);

		// Notify user about duplicate removal if any duplicates were found
		if (duplicatesRemoved > 0) {
			const duplicateText = duplicatesRemoved === 1 ? 'duplicate URL' : 'duplicate URLs';
			setInfo(__(`✓ Removed ${duplicatesRemoved} ${duplicateText} from ${originalCount} total URLs. Processing ${urlList.length} unique URLs.`, 'betterlinks'));
		}

		// Validate that we have URLs after duplicate removal
		if (urlList.length === 0) {
			setError(__('Please enter at least one valid URL', 'betterlinks'));
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
			enable_description: true,  // Always enabled
			enable_ai_category: selectedCategory === 'ai_generated',
			selected_category: selectedCategory !== 'ai_generated' ? selectedCategory : '',
			enable_ai_tag: true,  // Always enabled
			enable_customize_preview: true,  // Always enabled
		};

		// Get AI settings from state
		const aiSettings = aiState?.settings || {};

		// Process URLs with AI (using frontend AI service)
		await process_urls_with_ai(urlList, prompt, options, aiSettings);
	};

	const handlePublish = async () => {
		setError('');
		setSuccess('');
		setInfo('');
		setIsPublishing(true);

		// Filter out links with existing URLs
		const linksToPublish = aiState.generatedLinks.filter(link =>
			!existingUrls.has(link.short_url)
		);

		// Show publishing state for at least 3 seconds
		const minDisplayTime = new Promise(resolve => setTimeout(resolve, 3000));

		try {
			const [result] = await Promise.all([
				publish_ai_generated_links(linksToPublish),
				minDisplayTime
			]);

			if (result.success) {
				// Set closing flag to prevent InitialState from showing
				setIsClosing(true);
				// Close modal immediately after publishing without showing success message
				onClose();
				// Reset state after modal is closed
				setTimeout(() => {
					reset_ai_state();
					setUrls('');
					setIsPublishing(false);
					setIsClosing(false);
					// Don't clear prompt - keep it for next time modal opens
				}, 100);
			}
		} catch (err) {
			setIsPublishing(false);
			setError(__('Error publishing links. Please try again.', 'betterlinks'));
		}
	};

	const handleClose = () => {
		// Set closing flag to prevent InitialState from showing
		setIsClosing(true);
		// Close modal first
		onClose();
		// Reset state after modal is closed to avoid showing InitialState
		setTimeout(() => {
			reset_ai_state();
			setUrls('');
			// Don't clear prompt - keep it for next time modal opens
			setError('');
			setSuccess('');
			setInfo('');
			setIsPublishing(false);
			setIsClosing(false);
		}, 100);
	};

	const isProcessing = aiState?.processing?.isProcessing;
	const generatedLinks = aiState?.generatedLinks || [];
	const hasGeneratedLinks = generatedLinks.length > 0;
	const settingsLoading = aiState?.settingsLoading !== false; // Default to true if undefined

	// Only show InitialState when we're truly in the initial state (not after publishing or closing)
	const shouldShowInitialState = !isProcessing && !hasGeneratedLinks && !isPublishing && !isClosing;

	// Check if URLs field is empty or only contains whitespace
	const isUrlsEmpty = !urls.trim();

	// Check if API key is configured based on selected provider
	// Only check after settings are loaded to avoid flickering
	const hasValidApiKey =
		!settingsLoading && (
			aiState?.settings?.ai_provider === 'openai'
				? (aiState?.settings?.openai_api_key && aiState.settings.openai_api_key.trim())
				: (aiState?.settings?.gemini_api_key && aiState.settings.gemini_api_key.trim())
		);

	// Enhanced URL setter that clears info message when user modifies URLs
	const handleUrlsChange = (newUrls) => {
		setUrls(newUrls);
		// Clear info message when user starts typing to provide fresh feedback
		if (info) {
			setInfo('');
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={handleClose}
			style={modalCustomStyles}
			ariaHideApp={false}
			className="btl-ai-bulk-link-modal"
		>
		{/* Header with gradient background */}
          <div className="btl-ai-header-container">
            <div className="btl-ai-left-section">
			  <img src={plugin_root_url + '/assets/images/icons/ai-hedaer-icon.svg'} alt="AI Icon" />
              <div className="btl-ai-content-wrapper">
                <h1 className="btl-ai-title">{__('AI Bulk Link Generator', 'betterlinks')} { !is_pro_enabled && <ProBadge />} </h1> 
                <p className="btl-ai-description">
					{__('Generate bulk short links instantly with AI from your URLs. Learn more in the. ', 'betterlinks')}
					<a
						href={'https://betterlinks.io/docs/ai-bulk-link-generator/'}
						target="_blank"
						style={{ textDecoration: 'underline' }}
						onClick={() => {
							onClose();
						}}
					>
						{__(' docs', 'betterlinks')}
					</a>
                </p>
              </div>
            </div>
            <div className="btl-ai-close-button" onClick={handleClose}>
              <svg
                className="btl-ai-close-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

			{/* Error/Success/Info Messages */}
			{error && <div className="btl-ai-error-message">{error}</div>}
			{success && <div className="btl-ai-success-message">{success}</div>}
			{info && <div className="btl-ai-info-message">{info}</div>}

			{/* Main Content */}
			<div className="btl-ai-content">
				{/* Initial State */}
				{shouldShowInitialState && (
					<InitialState
						urls={urls}
						setUrls={handleUrlsChange}
						redirectType={redirectType}
						setRedirectType={setRedirectType}
						shortUrlStrategy={shortUrlStrategy}
						setShortUrlStrategy={setShortUrlStrategy}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						prompt={prompt}
						setPrompt={setPrompt}
						defaultPrompt={DEFAULT_PROMPT}
						terms={terms}
						onGenerateLinks={handleGenerateLinks}
						isProcessing={isProcessing}
						isUrlsEmpty={isUrlsEmpty}
						hasValidApiKey={hasValidApiKey}
						settingsLoading={settingsLoading}
					/>
				)}

				{/* Processing State */}
				{isProcessing && !isPublishing && <ProcessingState aiState={aiState} />}

				{/* Publishing State */}
				{isPublishing && <PublishingState />}

				{/* Preview State */}
				{hasGeneratedLinks && !isProcessing && !isPublishing && (
					<>
						<PreviewState
							generatedLinks={generatedLinks}
							selectedCategory={selectedCategory}
							onExistingUrlsChange={handleExistingUrlsChange}
						/>
						
						{/* Footer */}
						<div className="btl-ai-modal-footer">
							<button
								className="btl-ai-btn-secondary"
								onClick={() => {
									reset_ai_state();
								}}
							>
								 {__('＜ Back to Edit', 'betterlinks')}
							</button>
							<button
								className="btl-ai-btn-generate"
								onClick={handlePublish}
								disabled={isProcessing || isPublishing}
							>
								{generatedLinks.length > 1 ? __('Publish All Links', 'betterlinks') : __('Publish', 'betterlinks')}
							</button>
						</div>
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

