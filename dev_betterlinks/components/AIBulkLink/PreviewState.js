import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { plugin_root_url, shortURLUniqueCheck, route_path } from 'utils/helper';
import { connect } from 'react-redux';

const PreviewState = ({ generatedLinks, terms, selectedCategory, onExistingUrlsChange, tokenLimitWarning, onClose }) => {
	// Get site URL from WordPress
	const siteUrl = window.location.origin;
	const [copiedIndex, setCopiedIndex] = useState(null);
	const [existingUrls, setExistingUrls] = useState(new Set());

	// Check URL existence when component mounts or generatedLinks change
	useEffect(() => {
		const checkUrlExistence = async () => {
			if (!generatedLinks || generatedLinks.length === 0) {
				return;
			}

			const existingSet = new Set();

			// Check each generated link's short URL
			for (const link of generatedLinks) {
				if (link.short_url) {
					try {
						// Pass empty ID since we're checking for new links
						const exists = await shortURLUniqueCheck(link.short_url, '', () => {});
						if (exists) {
							existingSet.add(link.short_url);
						}
					} catch (error) {
						console.error('Error checking URL existence:', error);
					}
				}
			}

			setExistingUrls(existingSet);

			// Notify parent component about existing URLs
			if (onExistingUrlsChange) {
				onExistingUrlsChange(existingSet);
			}
		};

		checkUrlExistence();
	}, [generatedLinks]); // Removed onExistingUrlsChange from dependencies to prevent infinite loop

	// Helper function to get category name from ID or return the category as-is if it's already a name
	const getCategoryDisplayName = (category) => {
		if (!category) return '';

		// If category is a number (ID), look up the name from terms
		if (!isNaN(category) && terms?.categories) {
			const categoryTerm = terms.categories.find(cat => cat.ID == category);
			return categoryTerm ? categoryTerm.term_name : category;
		}

		// If category is already a string (AI generated or prompt-based), return as-is
		return category;
	};

	// Helper function to get the selected category name for the header message
	const getSelectedCategoryName = () => {
		if (!selectedCategory || selectedCategory === 'ai_generated') {
			return null;
		}

		// If selectedCategory is a number (ID), look up the name from terms
		if (!isNaN(selectedCategory) && terms?.categories) {
			const categoryTerm = terms.categories.find(cat => cat.ID == selectedCategory);
			return categoryTerm ? categoryTerm.term_name : selectedCategory;
		}

		// If selectedCategory is already a string, return as-is
		return selectedCategory;
	};

	// Handle copy to clipboard
	const handleCopyToClipboard = (text, identifier) => {
		if (!text) return;

		// Try modern clipboard API first
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(() => {
				setCopiedIndex(identifier);
				setTimeout(() => setCopiedIndex(null), 2000);
			}).catch(() => {
				// Fallback if clipboard API fails
				fallbackCopy(text, identifier);
			});
		} else {
			// Fallback for older browsers
			fallbackCopy(text, identifier);
		}
	};

	// Fallback copy method for older browsers
	const fallbackCopy = (text, identifier) => {
		try {
			const textArea = document.createElement('textarea');
			textArea.value = text;
			textArea.style.position = 'fixed';
			textArea.style.left = '-999999px';
			document.body.appendChild(textArea);
			textArea.select();
			const successful = document.execCommand('copy');
			document.body.removeChild(textArea);

			if (successful) {
				setCopiedIndex(identifier);
				setTimeout(() => setCopiedIndex(null), 2000);
			}
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	// Handle open in new tab
	const handleOpenInNewTab = (url) => {
		window.open(url, '_blank');
	};

	// Get the header message based on selected category
	const getHeaderMessage = () => {
		const categoryName = getSelectedCategoryName();
		if (categoryName) {
			return (
				<>
					{__('Bulk link generation completed and added to ', 'betterlinks')}
					<span className="btl-ai-category-badge">{categoryName}</span>
				</>
			);
		}
		return __('Bulk link generation completed; please review before publishing.', 'betterlinks');
	};

	return (
		<div className="btl-ai-preview">
			{/* Token Limit Warning Banner */}
			{tokenLimitWarning && (
				<div className="btl-ai-warning-banner">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M10 6V10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						<path d="M10 14H10.01" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					<div className="btl-ai-warning-content">
						<div className="btl-ai-warning-title">
							{__('Partial Results Due to Token Limit', 'betterlinks')}
						</div>
						<div className="btl-ai-warning-message">
							{__(`Successfully generated ${tokenLimitWarning.processedCount} of ${tokenLimitWarning.totalCount} links using ${tokenLimitWarning.tokensUsed}/${tokenLimitWarning.tokenLimit} tokens. ${tokenLimitWarning.remainingCount} URLs could not be processed.`, 'betterlinks')}
						</div>
						<div className="btl-ai-warning-action">
							{__('To process all URLs, please increase the Maximum Token Limit in AI Settings. ', 'betterlinks')}
							<Link
									to={`${route_path}admin.php?page=betterlinks-settings&advanced=true`}
									style={{ textDecoration: 'underline' }}
									target="_blank"
									onClick={() => {
										// Close the modal when navigating to settings
										if (typeof onClose === 'function') onClose();
									}}
								>
									{__('here', 'betterlinks')}
							</Link>
						</div>
					</div>
				</div>
			)}
			<div className="btl-ai-preview-header">{getHeaderMessage()}</div>
			<div className="btl-ai-links-list">
				{generatedLinks.map((link, index) => {
					// Construct full short URL
					const fullShortUrl = link.short_url?.startsWith('http') 
						? link.short_url 
						: `${siteUrl}/${link.short_url}`;

					return (
						<div key={index} className="btl-ai-link-card">
							{/* Title */}
							<div className="btl-ai-card-title">{link.link_title || 'Untitled'}</div>
							
							{/* Details Grid */}
							<div className="btl-ai-link-details">
								{/* Target URL */}
								<div className="btl-ai-detail-row">
									<div className="btl-ai-detail-icon">
										<img width="20" height="20" src={plugin_root_url + '/assets/images/icons/target-url-icon.svg'} alt="Target" />
									</div>
									<div className="btl-ai-detail-content">
										<span className="btl-ai-detail-label">{__('Target:', 'betterlinks')}</span>
										<span className="btl-ai-detail-value">{link.target_url}</span>
									</div>
									<div className="btl-ai-detail-actions">
										<button
											className="btl-ai-icon-btn"
											title={copiedIndex === `target-${index}` ? __('Copied!', 'betterlinks') : __('Copy', 'betterlinks')}
											onClick={() => handleCopyToClipboard(link.target_url, `target-${index}`)}
										>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
												<path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
											</svg>
										</button>
										<button
											className="btl-ai-icon-btn"
											title={__('Open in new tab', 'betterlinks')}
											onClick={() => handleOpenInNewTab(link.target_url)}
										>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 10L13.5 2.5M13.5 2.5H9.5M13.5 2.5V6.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M13.5 8.5V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H7.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
											</svg>
										</button>
									</div>
								</div>

								{/* Short URL */}
								<div className="btl-ai-detail-row">
									<div className="btl-ai-detail-icon">
										<img width="20" height="20" src={plugin_root_url + '/assets/images/icons/short-url-icon.svg'} alt="Short URL" />
									</div>
									<div className="btl-ai-detail-content">
										<span className="btl-ai-detail-label">{__('Short URL:', 'betterlinks')}</span>
										<div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
											<span className="btl-ai-detail-value btl-ai-short-url">{fullShortUrl}</span>
											{existingUrls.has(link.short_url) && (
												<span className="btl-ai-exists-badge">
													{__('Already Exists', 'betterlinks')}
												</span>
											)}
										</div>
									</div>
									<div className="btl-ai-detail-actions">
										<button
											className="btl-ai-icon-btn"
											title={copiedIndex === `short-${index}` ? __('Copied!', 'betterlinks') : __('Copy', 'betterlinks')}
											onClick={() => handleCopyToClipboard(fullShortUrl, `short-${index}`)}
										>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
												<path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
											</svg>
										</button>
									</div>
								</div>

								{/* Category */}
								{link.category && ! getSelectedCategoryName() && (
									<div className="btl-ai-detail-row">
										<div className="btl-ai-detail-icon">
											<img width="20" height="20" src={plugin_root_url + '/assets/images/icons/category-icon.svg'} alt="Target" />
										</div>
										<div className="btl-ai-detail-content">
											<span className="btl-ai-detail-label">{__('Category:', 'betterlinks')}</span>
											<span className="btl-ai-detail-value">
												<span className="btl-ai-category-badge">{getCategoryDisplayName(link.category)}</span>
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});

export default connect(mapStateToProps)(PreviewState);
