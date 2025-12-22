import { __ } from '@wordpress/i18n';
import { useUpgradeProModal } from 'utils/customHooks';
import { plugin_root_url } from 'utils/helper';
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

	return (
		<>
			<UpgradeToPro isOpenModal={isOpenUpgradeToProModal} closeModal={closeUpgradeToProModal} />
			<div className="btl-ai-settings">
				<div style={{ borderBottom: '1px solid #DEE1E9' }}>
					<h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
						{__('AI Configuration', 'betterlinks')}
					</h3>
				</div>

				<div className="btl-form-group">
                    <div className="btl-form-field">
                        <div className="short-description">
                            <b style={{ fontWeight: 700 }}>Note: </b>
                            <span>
                                {__('AI Bulk Link Generator feature is available in the pro version. Read the documentation for more information.', 'betterlinks')}
                            </span>
                            <a
                                className="external-analytic-tooltip-anchor"
                                href="https://betterlinks.io/docs/ai-bulk-link-generator/"
                                target="_blank"
                                style={{ color: 'inherit' }}
                            >
                                {__('Click here', 'betterlinks-pro')}
                            </a>
                        </div>
                    </div>
                </div>
				{/* AI Provider Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('AI Provider', 'betterlinks')}
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

				{/* OpenAI API Key Section */}
				<div style={{ marginBottom: '30px' }} onClick={openUpgradeToProModal}>
					<label style={{ display: 'block', marginBottom: '12px', fontWeight: '500', fontSize: '14px' }}>
						{__('OpenAI API Key', 'betterlinks')}
					</label>
					<input
						type="password"
						placeholder={__('*****************************', 'betterlinks')}
						disabled
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
						disabled
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

				{/* How to get API Key Section */}
				{/* <div style={{ marginBottom: '30px', padding: '16px', background: '#F9FAFB', borderRadius: '8px' }}>
					<div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
						<div style={{ padding: '24px' }}>
							<div style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
								<img width="20" height="20" src={plugin_root_url + '/assets/images/icons/ai-api-icon.svg'} alt="Target" />
								{__('How to get API Key', 'betterlinks')}
							</div>
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
				</div> */}

				{/* Save Settings Button */}
				{/* <div style={{ marginTop: '30px' }}>
					<button
						type="button"
						disabled
						onClick={openUpgradeToProModal}
						style={{
							padding: '10px 24px',
							background: '#2563EB',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							fontSize: '14px',
							fontWeight: '500',
							cursor: 'pointer',
							opacity: 0.7,
						}}
					>
						{__('Save Settings', 'betterlinks')}
					</button>
				</div> */}
			</div>
		</>
	);
};

