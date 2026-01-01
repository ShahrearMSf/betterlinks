import React from 'react';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const ProcessingState = ({ aiState }) => {
	const currentIndex = aiState?.processing?.currentIndex || 1;
	const totalUrls = aiState?.processing?.totalUrls || 1;
	const progressPercentage = (currentIndex / totalUrls) * 100;

	return (
		<div className="btl-ai-processing">
			{/* Header Icon with Circular Progress */}
			<div className="btl-ai-processing-icon">
				<svg className="btl-ai-circular-progress" width="100" height="100" viewBox="0 0 100 100">
					{/* Background Circle */}
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="#E5E7EB"
						strokeWidth="4"
					/>
					{/* Animated Gradient Segments */}
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="url(#progressGradient)"
						strokeWidth="4"
						strokeLinecap="round"
						strokeDasharray="70 213"
						strokeDashoffset="0"
						className="btl-ai-progress-circle"
					/>
					<defs>
						<linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
							<stop offset="0%" stopColor="#00E6FF" />
							<stop offset="45.53%" stopColor="#AEA4FF" />
							<stop offset="97.01%" stopColor="#0847F9" />
						</linearGradient>
					</defs>
				</svg>
				<div className="btl-ai-icon-center">
					<img width={40} height={40} src={plugin_root_url + '/assets/images/icons/ai-btn-icon.svg'} alt="AI Icon" />
				</div>
			</div>

			{/* Title and Subtitle */}
			<h3 className="btl-ai-processing-title">{__('Bulk Link Generation in Progress…', 'betterlinks')}</h3>
			<p className="btl-ai-processing-subtitle">
				{__('Please, don’t close this window until it’s done!', 'betterlinks')}
			</p>

			{/* Progress Count */}
			<div className="btl-ai-processing-count">
				{__('Processing URL', 'betterlinks')} {currentIndex}/{totalUrls}
			</div>

			{/* Progress Bar */}
			<div className="btl-ai-progress-bar-container">
				<div className="btl-ai-progress-bar-track">
					<div 
						className="btl-ai-progress-bar-fill" 
						style={{ width: `${progressPercentage}%` }}
					></div>
				</div>
			</div>

			{/* Step Indicators */}
			<div className="btl-ai-processing-steps">
				<div className="btl-ai-step-item btl-ai-step-completed">
					<div className="btl-ai-step-icon-wrapper">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" fill="#10B981" opacity="0.1"/>
							<circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="1"/>
							<path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
					<span className="btl-ai-step-label">{__('Checking URLs', 'betterlinks')}</span>
				</div>

				{/* <div className="btl-ai-step-item btl-ai-step-completed">
					<div className="btl-ai-step-icon-wrapper">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" fill="#10B981" opacity="0.1"/>
							<circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="1"/>
							<path d="M8 12L11 15L16 9" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</div>
					<span className="btl-ai-step-label">{__('Scrapping Content', 'betterlinks')}</span>
				</div> */}

				<div className="btl-ai-step-item btl-ai-step-active">
					<div className="btl-ai-step-icon-wrapper btl-ai-step-spinner">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" fill="#667EEA" opacity="0.1"/>
							<circle cx="12" cy="12" r="10" stroke="#667EEA" strokeWidth="1"/>
							<g className="btl-ai-spinner-dots">
								<circle cx="12" cy="6" r="1.5" fill="#667EEA"/>
								<circle cx="15.5" cy="7.5" r="1.5" fill="#667EEA" opacity="0.8"/>
								<circle cx="17.5" cy="10.5" r="1.5" fill="#667EEA" opacity="0.6"/>
								<circle cx="17.5" cy="13.5" r="1.5" fill="#667EEA" opacity="0.4"/>
								<circle cx="15.5" cy="16.5" r="1.5" fill="#667EEA" opacity="0.2"/>
							</g>
						</svg>
					</div>
					<span className="btl-ai-step-label">{__('AI Processing', 'betterlinks')}</span>
				</div>

				<div className="btl-ai-step-item btl-ai-step-pending">
					<div className="btl-ai-step-icon-wrapper">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="12" r="10" fill="#9CA3AF" opacity="0.1"/>
							<circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="1"/>
							<circle cx="12" cy="12" r="7" stroke="#9CA3AF" strokeWidth="1.5"/>
							<path d="M12 8V12L14.5 14.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
						</svg>
					</div>
					<span className="btl-ai-step-label">{__('Generating Bulk Links', 'betterlinks')}</span>
				</div>
			</div>
		</div>
	);
};

export default ProcessingState;

