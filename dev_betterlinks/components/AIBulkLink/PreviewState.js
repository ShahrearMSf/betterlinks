import React from 'react';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const PreviewState = ({ generatedLinks }) => {
	// Get site URL from WordPress
	const siteUrl = window.location.origin;

	return (
<div className="btl-ai-preview">
			<h3>{__('Generated Links Preview', 'betterlinks')}</h3>
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
										<button className="btl-ai-icon-btn" title={__('Copy', 'betterlinks')}>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
												<path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
											</svg>
										</button>
										<button className="btl-ai-icon-btn" title={__('Open in new tab', 'betterlinks')}>
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
										<span className="btl-ai-detail-value btl-ai-short-url">{fullShortUrl}</span>
									</div>
									<div className="btl-ai-detail-actions">
										<button className="btl-ai-icon-btn" title={__('Copy', 'betterlinks')}>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
												<path d="M3.5 10.5h-1a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" stroke="#9CA3AF" strokeWidth="1.5" fill="none"/>
											</svg>
										</button>
										<button className="btl-ai-icon-btn" title={__('Open in new tab', 'betterlinks')}>
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M6 10L13.5 2.5M13.5 2.5H9.5M13.5 2.5V6.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
												<path d="M13.5 8.5V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H7.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
											</svg>
										</button>
									</div>
								</div>

								{/* Category */}
								{link.category && (
									<div className="btl-ai-detail-row">
										<div className="btl-ai-detail-icon">
											<img width="20" height="20" src={plugin_root_url + '/assets/images/icons/category-icon.svg'} alt="Target" />
										</div>
										<div className="btl-ai-detail-content">
											<span className="btl-ai-detail-label">{__('Category:', 'betterlinks')}</span>
											<span className="btl-ai-detail-value">
												<span className="btl-ai-category-badge">{link.category}</span>
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

export default PreviewState;
