import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';
import { pro_version_check } from 'utils/helper';
import UpgradeToPro from '../Teasers/UpgradeToPro';

const AISettings = () => {
	const filterResult = betterLinksHooks.applyFilters('BetterLinksAISettings', null, {});
	// If pro plugin is active, filterResult will have the pro component
	// If pro plugin is inactive, filterResult will be null, so show teaser
	return filterResult || <Teaser />;
};

export default AISettings;

const Teaser = () => {
	const [isOpenUpgradeToProModal, openUpgradeToProModal, closeUpgradeToProModal] = useUpgradeProModal();
	const isProVersionValid = pro_version_check('2.6.0');

	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-ai-settings">
				<div style={{ borderBottom: '1px solid #DEE1E9' }}>
					<h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
						{__('API Configuration', 'betterlinks')}
					</h3>
				</div>

				<div className="btl-form-group">
                    <div className="btl-form-field">
                        <div className="short-description">
                            <b style={{ fontWeight: 700 }}>Note: </b>
                            <span>
                                { !isProVersionValid ? __('AI Bulk Link Generator requires BetterLinks Pro v2.6.0 or newer. Please update the plugin to use it.', 'betterlinks') : __('Make sure to save your API key and configure it to use AI features. For more details, ', 'betterlinks')}
                            </span>
							{
								isProVersionValid && (
									<a
										className="external-analytic-tooltip-anchor"
										href="https://betterlinks.io/docs/ai-bulk-link-generator-in-betterlinks/"
										target="_blank"
										style={{ color: 'inherit' }}
									>
									{__('click here', 'betterlinks-pro')}
									</a>
								)
							}
                           
                        </div>
                    </div>
                </div>
				{/* AI Provider Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('Select AI Provider', 'betterlinks')}
					</label>
					<div style={{ maxWidth: '350px', opacity: 0.6, pointerEvents: 'none' }}>
						<div style={{
							width: '100%',
							padding: '10px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '14px',
							backgroundColor: '#f9f9f9',
							color: '#999',
						}}>
							{__('Select AI Provider', 'betterlinks')}
						</div>
					</div>
					<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
						{__('Choose your preferred AI provider', 'betterlinks')}
					</div>
				</div>

				{/* AI Model Selection Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('AI Model', 'betterlinks')}
					</label>
					<div style={{ maxWidth: '350px', opacity: 0.6, pointerEvents: 'none' }}>
						<div style={{
							width: '100%',
							padding: '10px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '14px',
							backgroundColor: '#f9f9f9',
							color: '#999',
						}}>
							{__('GPT-4o Mini', 'betterlinks')}
						</div>
					</div>
					<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
						{__('Choose the AI model for link generation based on your selected provider', 'betterlinks')}
					</div>
				</div>

				{/* OpenAI API Key Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('OpenAI API Key', 'betterlinks')}
					</label>
					<input
						type="password"
						placeholder={__('*****************************', 'betterlinks')}
						readOnly
						style={{
							width: '100%',
							maxWidth: '350px',
							padding: '10px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '14px',
							boxSizing: 'border-box',
							backgroundColor: '#f9f9f9',
							opacity: 0.6,
							cursor: 'not-allowed',
						}}
					/>
					<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
						{__('Get your API key from', 'betterlinks')}{' '}
						<a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
							{__('OpenAI Platform', 'betterlinks')}
						</a>
					</div>
				</div>

				{/* Gemini API Key Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('Gemini AI API Key', 'betterlinks')}
					</label>
					<input
						type="password"
						placeholder={__('*****************************', 'betterlinks')}
						readOnly
						style={{
							width: '100%',
							maxWidth: '350px',
							padding: '10px 12px',
							border: '1px solid #ddd',
							borderRadius: '4px',
							fontSize: '14px',
							boxSizing: 'border-box',
							backgroundColor: '#f9f9f9',
							opacity: 0.6,
							cursor: 'not-allowed',
						}}
					/>
					<div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
						{__('Get your API key from', 'betterlinks')}{' '}
						<a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#2563EB', textDecoration: 'none' }}>
							{__('Google AI Studio', 'betterlinks')}
						</a>
					</div>
				</div>
				{/* Add Save Settings Button */}
				<div style={{ marginTop: '30px' }} onClick={openUpgradeToProModal}>
					<button
						type="button"
						style={{
							padding: '10px 24px',
							background: '#2563EB',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							fontSize: '14px',
							fontWeight: '500',
							cursor: 'not-allowed',
						}}
					>
						{__('Requires BetterLinks Pro v2.6.0+', 'betterlinks')}
					</button>
				</div>
				
			</div>
		</>
	);
};

