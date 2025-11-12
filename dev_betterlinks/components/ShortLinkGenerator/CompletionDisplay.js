import React from 'react';
import { __ } from '@wordpress/i18n';

const CompletionDisplay = ({ generationStatus, postCount, plugin_root_url }) => {
    if (!generationStatus || generationStatus.status !== 'completed') return null;

    return (
        <div className="btl-completion-container btl-fade-in">
            <div className="btl-completion-main">
                {/* Completion Circle */}
                <div className="btl-completion-circle">
                    <div className="btl-completion-progress-circle">
                        <svg width="64" height="64" viewBox="0 0 120 120" className="btl-completion-progress-svg">
                            {/* Background circle */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#E5E7EB"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Completed progress circle - full 100% */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#10B981"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset="0"
                                transform="rotate(-90 60 60)"
                                className="btl-completion-progress-fill"
                            />
                        </svg>
                        <div className="btl-completion-percentage-display">
                            <span className="btl-completion-percent-text">100%</span>
                        </div>
                    </div>
                </div>
                
                {/* Completion Content */}
                <div className="btl-completion-content-main">
                    <div className="btl-completion-title">{__('Auto Link Generation Completed', 'betterlinks')}</div>
                    <div className="btl-completion-subtitle">
                        {`${__('Successfully generated', 'betterlinks')} ${generationStatus.successful || 0} ${__('short links for your selected posts.', 'betterlinks')}.`}
                    </div>
                </div>
                
                {/* Time Display */}
                <div className="btl-completion-time">
                    {generationStatus.message && (
                        <div className="btl-time-message">{__('Generation Completed', 'betterlinks')}</div>
                    )}
                </div>
            </div>
            
            {/* Statistics on the right */}
            <div className="btl-completion-stats">
                <div className="btl-completion-stat-item btl-stat-processed">
                    <div className="btl-completion-stat-icon btl-stat-processed-icon">
                        <img src={plugin_root_url + 'assets/images/icons/progress.svg'} alt="" />
                    </div>
                    <div className="btl-completion-stat-content">
                        <div className="btl-completion-stat-number">{generationStatus.processed || 0}</div>
                        <div className="btl-completion-stat-label">{__('Processed', 'betterlinks')}</div>
                    </div>
                </div>
                
                <div className="btl-completion-stat-item btl-stat-total">
                    <div className="btl-completion-stat-icon btl-stat-total-icon">
                       <img src={plugin_root_url + 'assets/images/icons/layout-list.svg'} alt="" />
                    </div>
                    <div className="btl-completion-stat-content">
                        <div className="btl-completion-stat-number">{postCount || 0}</div>
                        <div className="btl-completion-stat-label">{__('Total Posts', 'betterlinks')}</div>
                    </div>
                </div>
                
                <div className="btl-completion-stat-item btl-stat-success">
                    <div className="btl-completion-stat-icon btl-stat-success-icon">
                        <img src={plugin_root_url + 'assets/images/icons/circle-checked.svg'} alt="" />
                    </div>
                    <div className="btl-completion-stat-content">
                        <div className="btl-completion-stat-number">{generationStatus.successful || 0}</div>
                        <div className="btl-completion-stat-label">{__('Successful', 'betterlinks')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompletionDisplay;

