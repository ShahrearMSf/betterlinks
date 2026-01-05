import React from 'react';
import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const PublishingState = () => {
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
					{/* Animated Gradient Circle */}
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="url(#publishGradient)"
						strokeWidth="4"
						strokeLinecap="round"
						strokeDasharray="70 213"
						strokeDashoffset="0"
						className="btl-ai-progress-circle"
					/>
					<defs>
						<linearGradient id="publishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
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
			<h3 className="btl-ai-processing-title">{__('Publishing Links in Progress...', 'betterlinks')}</h3>
			<p className="btl-ai-processing-subtitle">
				{__('Please, don’t close this window until it’s done!', 'betterlinks')}
			</p>

			{/* Status Text */}
			{/* <div className="btl-ai-processing-count">
				{__('Saving to Database...', 'betterlinks')}
			</div> */}
		</div>
	);
};

export default PublishingState;
