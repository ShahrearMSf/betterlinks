import React from 'react';
import { __ } from '@wordpress/i18n';

const ProgressDisplay = ({ generationStatus, postCount, plugin_root_url }) => {
    if (!generationStatus || generationStatus.status === 'completed') return null;

    return (
        <div className="btl-progress-main-container">
            <div className="btl-progress-main">
                {/* Circular Progress */}
                <div className="btl-progress-circle-container">
                    <div className="btl-progress-circle">
                        <svg width="64" height="64" viewBox="0 0 200 200" className="btl-progress-svg">
                            {/* Background circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                stroke="#E5E7EB"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                stroke="#3B82F6"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 80}`}
                                strokeDashoffset={`${2 * Math.PI * 80 * (1 - (generationStatus.progress_percent || 0) / 100)}`}
                                transform="rotate(-90 100 100)"
                                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                            />
                        </svg>
                        <div className="btl-progress-percentage-display">
                            <span className="btl-progress-percent-text">{generationStatus.progress_percent || 0}%</span>
                        </div>
                    </div>
                </div>
                
                {/* Progress Content */}
                <div className="btl-progress-content-main">
                    <h3 className="btl-progress-title">{__('Link Generation in Progress', 'betterlinks')}</h3>
                    <p className="btl-progress-subtitle">
                        {__('⚠️ Please Do Not Close This Tab Until Auto Link Generation is Complete....', 'betterlinks')}
                    </p>
                    
                    {/* Time Left */}
                    {generationStatus.progress_percent > 0 && generationStatus.progress_percent < 100 && (
                        <div className="btl-progress-time-left">
                            <span className="btl-time-label">{__('Time Left: ~', 'betterlinks')}</span>
                            <span className="btl-time-value">
                                {(() => {
                                    const remainingPercent = 100 - generationStatus.progress_percent;
                                    const estimatedMinutes = Math.ceil((remainingPercent / 100) * Math.ceil((generationStatus.total || 1) / 10));
                                    return estimatedMinutes > 0 ? `${estimatedMinutes} ${__('minutes', 'betterlinks')}` : __('Almost done', 'betterlinks');
                                })()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Statistics on the right */}
            <div className="btl-progress-stats">
                <div className="btl-progress-stat-item btl-stat-processed">
                    <div className="btl-progress-stat-icon btl-stat-processed-icon">
                        <img src={plugin_root_url + 'assets/images/icons/progress.svg'} alt="" />
                    </div>
                    <div className="btl-progress-stat-content">
                        <div className="btl-progress-stat-number">{generationStatus.processed || 0}</div>
                        <div className="btl-progress-stat-label">{__('Processed', 'betterlinks')}</div>
                    </div>
                </div>
                
                <div className="btl-progress-stat-item btl-stat-total">
                    <div className="btl-progress-stat-icon btl-stat-total-icon">
                       <img src={plugin_root_url + 'assets/images/icons/layout-list.svg'} alt="" />
                    </div>
                    <div className="btl-progress-stat-content">
                        <div className="btl-progress-stat-number">{postCount || 0}</div>
                        <div className="btl-progress-stat-label">{__('Total Posts', 'betterlinks')}</div>
                    </div>
                </div>
                
                <div className="btl-progress-stat-item btl-stat-success">
                    <div className="btl-progress-stat-icon btl-stat-success-icon">
                        <img src={plugin_root_url + 'assets/images/icons/circle-checked.svg'} alt="" />
                    </div>
                    <div className="btl-progress-stat-content">
                        <div className="btl-progress-stat-number">{generationStatus.successful || 0}</div>
                        <div className="btl-progress-stat-label">{__('Successful', 'betterlinks')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressDisplay;

