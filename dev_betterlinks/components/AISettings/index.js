import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { Formik, Form, Field } from 'formik';
import { API, delayStatusChanged } from 'utils/helper';
import Select from '../Select';

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
			<div style={{ marginBottom: '30px' }}>
				<h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
					{__('AI Configuration', 'betterlinks')}
				</h3>
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
				{({ isSubmitting, errors, touched, values, setFieldValue }) => (
					<Form>
						{/* AI Provider Section */}
						<div style={{ marginBottom: '30px' }}>
							<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
								{__('AI Provider', 'betterlinks')}
							</label>
							<div style={{ maxWidth: '350px' }}>
								<Select
									name="ai_provider"
									value={[
										{
											value: 'openai',
											label: __('Open AI', 'betterlinks'),
										},
										{
											value: 'gemini',
											label: __('Google Gemini', 'betterlinks'),
										},
									]}
									setFieldValue={setFieldValue}
								/>
							</div>
							<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
								{__('Choose how short URLs should be generated', 'betterlinks')}
							</div>
						</div>

						{/* OpenAI API Key Section */}
						{values.ai_provider === 'openai' && (
							<div style={{ marginBottom: '30px' }}>
								<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
									{__('OpenAI API Key', 'betterlinks')}
								</label>
								<Field
									type="password"
									name="openai_api_key"
									placeholder={__('*****************************', 'betterlinks')}
									value={values.openai_api_key}
									style={{
										width: '100%',
										maxWidth: '350px',
										padding: '10px 12px',
										border: `1px solid ${errors.openai_api_key && touched.openai_api_key ? '#f97272' : '#ddd'}`,
										borderRadius: '4px',
										fontSize: '14px',
										boxSizing: 'border-box',
										backgroundColor: '#f9f9f9',
									}}
								/>
								<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
									{__('Get your API key from', 'betterlinks')}{' '}
									<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
										{__('OpenAI Platform', 'betterlinks')}
									</a>
								</div>
							</div>
						)}

						{/* Gemini AI API Key Section */}
						{values.ai_provider === 'gemini' && (
							<div style={{ marginBottom: '30px' }}>
								<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
									{__('Gemini AI API Key', 'betterlinks')}
								</label>
								<Field
									type="password"
									name="gemini_api_key"
									placeholder={__('*****************************', 'betterlinks')}
									value={values.gemini_api_key}
									style={{
										width: '100%',
										maxWidth: '350px',
										padding: '10px 12px',
										border: `1px solid ${errors.gemini_api_key && touched.gemini_api_key ? '#f97272' : '#ddd'}`,
										borderRadius: '4px',
										fontSize: '14px',
										boxSizing: 'border-box',
										backgroundColor: '#f9f9f9',
									}}
								/>
								<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
									{__('Get your API key from', 'betterlinks')}{' '}
									<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
										{__('Google AI Studio', 'betterlinks')}
									</a>
								</div>
							</div>
						)}

						{/* How to get API Key Section */}
						<div style={{ marginBottom: '30px', padding: '16px', background: '#f5f5f5', borderRadius: '6px' }}>
							<div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
								<div style={{ fontSize: '20px', marginTop: '2px' }}>ℹ️</div>
								<div>
									<h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#333' }}>
										{__('How to get API Key', 'betterlinks')}
									</h4>
									<div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
										<div style={{ marginBottom: '8px' }}>
											<strong>{__('Open AI:', 'betterlinks')}</strong> {__('Visit', 'betterlinks')}{' '}
											<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
												platform.openai.com
											</a>
											{__(' and create a new API key', 'betterlinks')}
										</div>
										<div>
											<strong>{__('Google Gemini:', 'betterlinks')}</strong> {__('Visit', 'betterlinks')}{' '}
											<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
												makersuite.google.com
											</a>
											{__(' and create a new API key', 'betterlinks')}
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Save Settings Button */}
						<div style={{ marginTop: '30px' }}>
							<button
								type="submit"
								disabled={isSubmitting}
								style={{
									padding: '10px 24px',
									background: '#2563EB',
									color: 'white',
									border: 'none',
									borderRadius: '4px',
									fontSize: '14px',
									fontWeight: '500',
									cursor: isSubmitting ? 'not-allowed' : 'pointer',
									opacity: isSubmitting ? 0.7 : 1,
									transition: 'background-color 0.2s',
								}}
								onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#1d4ed8')}
								onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#2563EB')}
							>
								{submitText}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AISettings;

