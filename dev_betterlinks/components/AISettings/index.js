import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { API, delayStatusChanged } from 'utils/helper';

const AISettings = () => {
	const [initialValues, setInitialValues] = useState({
		openai_api_key: '',
		gemini_api_key: '',
		ai_provider: 'openai',
	});
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [submitText, setSubmitText] = useState(__('Save Settings', 'betterlinks'));

	useEffect(() => {
		fetchAISettings();
	}, []);

	const fetchAISettings = async () => {
		try {
			const res = await API.get('betterlinks/v1/ai-settings');
			if (res.data.success) {
				console.log('Fetched AI settings:', res.data.data);
				setInitialValues({
					openai_api_key: res.data.data?.openai_api_key || '',
					gemini_api_key: res.data.data?.gemini_api_key || '',
					ai_provider: res.data.data?.ai_provider || 'openai',
				});
			}
		} catch (e) {
			console.error('Error fetching AI settings:', e);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			setMessage('');

			// Build data to send - only include non-empty API keys
			const dataToSend = {
				ai_provider: values.ai_provider,
			};

			if (values.openai_api_key && values.openai_api_key.trim() !== '') {
				dataToSend.openai_api_key = values.openai_api_key;
			}

			if (values.gemini_api_key && values.gemini_api_key.trim() !== '') {
				dataToSend.gemini_api_key = values.gemini_api_key;
			}

			// Use PUT method like the existing settings system
			const res = await API.put('betterlinks/v1/ai-settings', dataToSend);

			if (res.data.success) {
				setMessageType('success');
				setMessage(__('AI settings saved successfully!', 'betterlinks'));
				delayStatusChanged(__('Saving...', 'betterlinks'), __('Saved!', 'betterlinks'), __('Save Settings', 'betterlinks'), setSubmitText);
				setTimeout(() => setMessage(''), 3000);
			} else {
				setMessageType('error');
				setMessage(res.data.message || __('Failed to save AI settings', 'betterlinks'));
			}
		} catch (e) {
			console.error('Error saving AI settings:', e);
			setMessageType('error');
			setMessage(e.response?.data?.message || __('Error saving AI settings', 'betterlinks'));
		} finally {
			setSubmitting(false);
		}
	};



	if (loading) {
		return <div>{__('Loading...', 'betterlinks')}</div>;
	}

	return (
		<div className="btl-ai-settings">
			<div style={{ marginBottom: '20px' }}>
				<h3>{__('AI Configuration', 'betterlinks')}</h3>
				<p style={{ color: '#666', fontSize: '14px' }}>
					{__('Configure your AI API keys for the bulk link generation feature.', 'betterlinks')}
				</p>
			</div>

			{message && (
				<div
					style={{
						padding: '12px',
						marginBottom: '20px',
						borderRadius: '4px',
						backgroundColor: messageType === 'success' ? '#e8f5e9' : '#ffebee',
						color: messageType === 'success' ? '#2e7d32' : '#c62828',
						border: `1px solid ${messageType === 'success' ? '#4CAF50' : '#f97272'}`,
					}}
				>
					{message}
				</div>
			)}

			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				{({ isSubmitting, errors, touched, values }) => (
					<Form>
						<div style={{ marginBottom: '20px' }}>
							<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
								{__('AI Provider', 'betterlinks')}
							</label>
							<Field
								as="select"
								name="ai_provider"
								style={{
									width: '100%',
									padding: '10px 12px',
									border: '1px solid #ddd',
									borderRadius: '4px',
									fontSize: '14px',
								}}
							>
								<option value="openai">{__('OpenAI (GPT)', 'betterlinks')}</option>
								<option value="gemini">{__('Google Gemini', 'betterlinks')}</option>
							</Field>
							<div style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
								{__('Select which AI provider to use for link generation', 'betterlinks')}
							</div>
						</div>

						{values.ai_provider === 'openai' && (
							<div style={{ marginBottom: '20px' }}>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
									{__('OpenAI API Key', 'betterlinks')}
								</label>
								<Field
									type="password"
									name="openai_api_key"
									placeholder={__('Enter your OpenAI API key', 'betterlinks')}
									value={values.openai_api_key}
									style={{
										width: '100%',
										padding: '10px 12px',
										border: `1px solid ${errors.openai_api_key && touched.openai_api_key ? '#f97272' : '#ddd'}`,
										borderRadius: '4px',
										fontSize: '14px',
										boxSizing: 'border-box',
									}}
								/>
								<div style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
									{__('Get your API key from', 'betterlinks')}{' '}
									<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
										{__('OpenAI Platform', 'betterlinks')}
									</a>
								</div>
							</div>
						)}

						{values.ai_provider === 'gemini' && (
							<div style={{ marginBottom: '20px' }}>
								<label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
									{__('Google Gemini API Key', 'betterlinks')}
								</label>
								<Field
									type="password"
									name="gemini_api_key"
									placeholder={__('Enter your Google Gemini API key', 'betterlinks')}
									value={values.gemini_api_key}
									style={{
										width: '100%',
										padding: '10px 12px',
										border: `1px solid ${errors.gemini_api_key && touched.gemini_api_key ? '#f97272' : '#ddd'}`,
										borderRadius: '4px',
										fontSize: '14px',
										boxSizing: 'border-box',
									}}
								/>
								<div style={{ fontSize: '12px', color: '#999', marginTop: '6px' }}>
									{__('Get your API key from', 'betterlinks')}{' '}
									<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
										{__('Google AI Studio', 'betterlinks')}
									</a>
								</div>
							</div>
						)}

						<div style={{ marginTop: '30px' }}>
							<button
								type="submit"
								disabled={isSubmitting}
								style={{
									padding: '10px 20px',
									background: '#4CAF50',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									fontSize: '14px',
									fontWeight: '500',
									cursor: isSubmitting ? 'not-allowed' : 'pointer',
									opacity: isSubmitting ? 0.6 : 1,
								}}
							>
								{submitText}
							</button>
						</div>
					</Form>
				)}
			</Formik>

			<div style={{ marginTop: '30px', padding: '15px', background: '#f0f7ff', borderRadius: '4px' }}>
				<h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
					{__('How to get API Keys:', 'betterlinks')}
				</h4>
				<ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: '#333' }}>
					<li>
						<strong>{__('OpenAI:', 'betterlinks')}</strong> {__('Visit', 'betterlinks')}{' '}
						<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">
							platform.openai.com
						</a>
						{__(' and create a new API key', 'betterlinks')}
					</li>
					<li>
						<strong>{__('Google Gemini:', 'betterlinks')}</strong> {__('Visit', 'betterlinks')}{' '}
						<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
							makersuite.google.com
						</a>
						{__(' and create a new API key', 'betterlinks')}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default AISettings;

