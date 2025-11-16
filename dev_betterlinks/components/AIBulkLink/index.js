import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { modalCustomStyles, plugin_root_url } from 'utils/helper';
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
	const [redirectType, setRedirectType] = useState('302');
	const [shortUrlStrategy, setShortUrlStrategy] = useState('from_title');
	const [selectedCategory, setSelectedCategory] = useState('ai_generated');
	const [prompt, setPrompt] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	// Generate default prompt (always includes all features)
	useEffect(() => {
		const defaultPrompt = 'Generate SEO-friendly titles for the given URL based on its content. Make the title concise (max 60 characters) and optimized for search engines. Create compelling descriptions (max 160 characters) that work well for social media sharing. Suggest ONE relevant tag based on the content topic. Generate Meta Title (max 60 characters) and Meta Description (max 160 characters) optimized for social media sharing and search engine results.';
		
		if (!prompt) {
			setPrompt(defaultPrompt);
		}
	}, []);

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
			selected_tags: [],
			enable_customize_preview: true,  // Always enabled
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
	
	// Check if URLs field is empty or only contains whitespace
	const isUrlsEmpty = !urls.trim();

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
                <h1 className="btl-ai-title">Generate Link With AI</h1>
                <p className="btl-ai-description">
                  Use advanced AI to automatically generate optimized short links from your target URLs
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

			{/* Error/Success Messages */}
			{error && <div className="btl-ai-error-message">{error}</div>}
			{success && <div className="btl-ai-success-message">{success}</div>}

			{/* Main Content */}
			<div className="btl-ai-content">
				{/* Initial State */}
				{!isProcessing && !hasGeneratedLinks && (
					<InitialState
						urls={urls}
						setUrls={setUrls}
						redirectType={redirectType}
						setRedirectType={setRedirectType}
						shortUrlStrategy={shortUrlStrategy}
						setShortUrlStrategy={setShortUrlStrategy}
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
						prompt={prompt}
						setPrompt={setPrompt}
						terms={terms}
						onGenerateLinks={handleGenerateLinks}
						isProcessing={isProcessing}
						isUrlsEmpty={isUrlsEmpty}
					/>
				)}

				{/* Processing State */}
				{isProcessing && <ProcessingState aiState={aiState} />}

				{/* Preview State */}
				{hasGeneratedLinks && !isProcessing && (
					<>
						<PreviewState generatedLinks={generatedLinks} />
						
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
								disabled={isProcessing}
							>
								{__('Publish All Links', 'betterlinks')}
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

