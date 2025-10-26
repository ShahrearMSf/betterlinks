import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

const StepThree = ({ generatedLinks }) => {
	const [expandedLink, setExpandedLink] = useState(null);
	const [editedLinks, setEditedLinks] = useState(generatedLinks || []);

	// Sync editedLinks when generatedLinks changes
	useEffect(() => {
		setEditedLinks(generatedLinks || []);
	}, [generatedLinks]);

	const handleEditField = (linkIndex, field, value) => {
		const updated = [...editedLinks];
		updated[linkIndex] = {
			...updated[linkIndex],
			[field]: value,
		};
		setEditedLinks(updated);
	};

	const toggleExpand = (index) => {
		setExpandedLink(expandedLink === index ? null : index);
	};

	if (!generatedLinks || generatedLinks.length === 0) {
		return (
			<div className="btl-ai-error-message">
				{__('No links were generated. Please try again.', 'betterlinks')}
			</div>
		);
	}

	return (
		<div className="btl-ai-preview-links">
			<div style={{ marginBottom: '20px' }}>
				<p style={{ color: '#666', fontSize: '14px' }}>
					{__('Review the generated links below. You can edit any field before publishing.', 'betterlinks')}
				</p>
			</div>

			{editedLinks.map((link, index) => (
				<div key={index} className="btl-ai-link-item">
					<div className="btl-ai-link-header">
						<div className="btl-ai-link-number">
							{__('Link', 'betterlinks')} {index + 1} / {editedLinks.length}
						</div>
						<div className="btl-ai-link-actions">
							<button
								type="button"
								onClick={() => toggleExpand(index)}
								title={__('Toggle Details', 'betterlinks')}
							>
								{expandedLink === index ? '▼' : '▶'}
							</button>
						</div>
					</div>

					{/* Always show title, target URL, and short URL */}
					<div className="btl-ai-link-field">
						<div className="btl-ai-field-label">
							{__('Title', 'betterlinks')}
						</div>
						<input
							type="text"
							className="btl-ai-field-value"
							value={link.link_title || ''}
							onChange={(e) =>
								handleEditField(index, 'link_title', e.target.value)
							}
						/>
					</div>

					<div className="btl-ai-link-field">
						<div className="btl-ai-field-label">
							{__('Target URL', 'betterlinks')}
						</div>
						<div className="btl-ai-field-value" style={{ wordBreak: 'break-all' }}>
							{link.target_url}
						</div>
					</div>

					<div className="btl-ai-link-field">
						<div className="btl-ai-field-label">
							{__('Short URL', 'betterlinks')}
						</div>
						<input
							type="text"
							className="btl-ai-field-value"
							value={link.short_url || ''}
							onChange={(e) =>
								handleEditField(index, 'short_url', e.target.value)
							}
						/>
					</div>

					{/* Expandable details */}
					{expandedLink === index && (
						<>
							<div className="btl-ai-link-field">
								<div className="btl-ai-field-label">
									{__('Description', 'betterlinks')}
								</div>
								<textarea
									className="btl-ai-field-value"
									style={{ minHeight: '80px', resize: 'vertical' }}
									value={link.link_note || ''}
									onChange={(e) =>
										handleEditField(index, 'link_note', e.target.value)
									}
								/>
							</div>

							<div className="btl-ai-link-field">
								<div className="btl-ai-field-label">
									{__('Category', 'betterlinks')}
									{link.category && link.category !== 'Uncategorized' && (
										<span style={{ fontSize: '12px', color: '#4caf50', marginLeft: '8px' }}>
											✓ {__('Auto-detected', 'betterlinks')}
										</span>
									)}
								</div>
								<input
									type="text"
									className="btl-ai-field-value"
									value={link.category || ''}
									onChange={(e) =>
										handleEditField(index, 'category', e.target.value)
									}
									placeholder={__('Auto-detected category', 'betterlinks')}
								/>
							</div>

							<div className="btl-ai-link-field">
								<div className="btl-ai-field-label">
									{__('Tags', 'betterlinks')}
									{link.suggested_tags && link.suggested_tags.length > 0 && (
										<span style={{ fontSize: '12px', color: '#4caf50', marginLeft: '8px' }}>
											✓ {__('Auto-detected', 'betterlinks')}
										</span>
									)}
								</div>
								<input
									type="text"
									className="btl-ai-field-value"
									value={link.tags || ''}
									onChange={(e) =>
										handleEditField(index, 'tags', e.target.value)
									}
									placeholder={__('Comma-separated tags', 'betterlinks')}
								/>
								{link.suggested_tags && link.suggested_tags.length > 0 && (
									<div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
										<strong>{__('Suggested:', 'betterlinks')}</strong>
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
											{link.suggested_tags.map((tag, tagIndex) => (
												<span
													key={tagIndex}
													style={{
														background: '#e3f2fd',
														padding: '4px 8px',
														borderRadius: '3px',
														cursor: 'pointer',
														border: '1px solid #90caf9',
													}}
													onClick={() => {
														const currentTags = link.tags ? link.tags.split(',').map(t => t.trim()) : [];
														if (!currentTags.includes(tag)) {
															const newTags = [...currentTags, tag].join(', ');
															handleEditField(index, 'tags', newTags);
														}
													}}
													title={__('Click to add tag', 'betterlinks')}
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								)}
							</div>

							<div className="btl-ai-link-field">
								<div className="btl-ai-field-label">
									{__('Redirect Type', 'betterlinks')}
								</div>
								<input
									type="text"
									className="btl-ai-field-value"
									value={link.redirect_type || ''}
									onChange={(e) =>
										handleEditField(index, 'redirect_type', e.target.value)
									}
									placeholder={__('Global setting', 'betterlinks')}
								/>
							</div>
						</>
					)}
				</div>
			))}

			<div style={{ marginTop: '20px', padding: '15px', background: '#f0f7ff', borderRadius: '4px' }}>
				<p style={{ margin: '0', fontSize: '13px', color: '#1976d2' }}>
					<strong>{__('Note:', 'betterlinks')}</strong> {__('Categories and tags will be created automatically if they do not exist.', 'betterlinks')}
				</p>
			</div>
		</div>
	);
};

export default StepThree;

