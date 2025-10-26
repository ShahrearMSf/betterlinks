import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';

const StepTwo = ({ processing, generatedLinks }) => {
	const [displayedStep, setDisplayedStep] = useState(0);

	useEffect(() => {
		if (processing?.isProcessing) {
			const interval = setInterval(() => {
				setDisplayedStep((prev) => {
					if (prev < 4) {
						return prev + 1;
					}
					return prev;
				});
			}, 1500);

			return () => clearInterval(interval);
		}
	}, [processing?.isProcessing]);

	const steps = [
		{
			label: __('Extracting URLs', 'betterlinks'),
			icon: '📋',
		},
		{
			label: __('Scraping Content', 'betterlinks'),
			icon: '🔍',
		},
		{
			label: __('AI Processing', 'betterlinks'),
			icon: '🤖',
		},
		{
			label: __('Generating Links', 'betterlinks'),
			icon: '⚙️',
		},
	];

	const progress = Math.min(
		((displayedStep + 1) / steps.length) * 100,
		100
	);

	return (
		<div className="btl-ai-processing-steps">
			<div className="btl-ai-processing-count">
				{processing?.totalUrls > 0 && (
					<>
						{__('Processing', 'betterlinks')} {processing?.totalUrls}{' '}
						{processing?.totalUrls === 1
							? __('URL', 'betterlinks')
							: __('URLs', 'betterlinks')}
					</>
				)}
			</div>

			{steps.map((step, index) => (
				<div key={index} className="btl-ai-step-item">
					<div
						className={`btl-ai-step-icon ${
							index < displayedStep ? 'completed' : ''
						} ${index === displayedStep ? 'processing' : ''}`}
					>
						{index < displayedStep ? '✓' : index === displayedStep ? '⟳' : index + 1}
					</div>
					<div className="btl-ai-step-text">
						{step.label}
						{index === displayedStep && processing?.isProcessing && (
							<span className="btl-ai-step-status">
								{__('Processing...', 'betterlinks')}
							</span>
						)}
						{index < displayedStep && (
							<span className="btl-ai-step-status">
								{__('Completed', 'betterlinks')}
							</span>
						)}
					</div>
				</div>
			))}

			<div className="btl-ai-progress-bar">
				<div
					className="btl-ai-progress-fill"
					style={{ width: `${progress}%` }}
				></div>
			</div>

			{!processing?.isProcessing && generatedLinks?.length > 0 && (
				<div className="btl-ai-success-message">
					{__('Successfully generated', 'betterlinks')} {generatedLinks.length}{' '}
					{generatedLinks.length === 1
						? __('link', 'betterlinks')
						: __('links', 'betterlinks')}
					! {__('Click Next to preview and publish.', 'betterlinks')}
				</div>
			)}

			{processing?.error && (
				<div className="btl-ai-error-message">
					{__('Error:', 'betterlinks')} {processing.error}
				</div>
			)}
		</div>
	);
};

export default StepTwo;

