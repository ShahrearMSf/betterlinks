import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

const ProgressDisplay = ({ generationStatus, postCount, plugin_root_url }) => {
    const [displayProgress, setDisplayProgress] = useState(0);
    const [lastStatus, setLastStatus] = useState(null);
    
    useEffect(() => {
        if (!generationStatus) return;
        
        const currentProgress = generationStatus.progress_percent || 0;
        const currentStatus = generationStatus.status;
        
        // If status changed to a new generation (detected by status change or progress reset to 0)
        if (currentStatus !== lastStatus || (currentProgress === 0 && displayProgress > 0)) {
            setDisplayProgress(0);
            setLastStatus(currentStatus);
        } else if (currentProgress >= displayProgress) {
            // Only update if progress increases
            setDisplayProgress(currentProgress);
        }
        // Never allow progress to decrease during the same generation
    }, [generationStatus?.progress_percent, generationStatus?.status]);

    if (!generationStatus || generationStatus.status === 'completed') return null;

    return (
        <div className="btl-progress-main-container">
            <div className="btl-progress-main">
                {/* Circular Progress */}
                <div className="btl-progress-circle-container">
                    <div className="btl-progress-circle">
                        <svg width="64" height="64" viewBox="0 0 120 120" className="btl-progress-svg">
                            {/* Background circle */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#E5E7EB"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Progress circle */}
                            <circle
                                cx="60"
                                cy="60"
                                r="50"
                                stroke="#3B82F6"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - displayProgress / 100)}`}
                                transform="rotate(-90 60 60)"
                                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                            />
                        </svg>
                        <div className="btl-progress-percentage-display">
                            <span className="btl-progress-percent-text">{Math.round(displayProgress)}%</span>
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
                    {displayProgress > 0 && displayProgress < 100 && (
                        <div className="btl-progress-time-left">
                            <span className="btl-time-label">{__('Time Left: ~', 'betterlinks')}</span>
                            <span className="btl-time-value">
                                {(() => {
                                    const remainingPercent = 100 - displayProgress;
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

