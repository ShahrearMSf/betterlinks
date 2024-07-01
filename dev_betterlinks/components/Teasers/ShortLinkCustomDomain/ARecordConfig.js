import { __ } from '@wordpress/i18n';
import CodeBlock from './CodeBlock';

const ARecordConfig = ({ custom_host, siteIp }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				<span>{__('Please add the following A record to your DNS settings:', 'betterlinks')}</span>
			</div>
			<div className="btl-code-block-wrapper">
				<strong>
					{__('Record Type:', 'betterlinks')}
					<CodeBlock code="A" copyCode="A" />
				</strong>
				<br />
				<strong>
					{__('Host:', 'betterlinks')} <CodeBlock code={custom_host} copyCode={custom_host} />
				</strong>
				{custom_host && (
					<span>
						[{__('Use', 'betterlinks')} <strong>@</strong> {__('for root domain', 'betterlinks')}]
					</span>
				)}
				<br />
				<br />
				<strong>
					Value:
					<CodeBlock code={siteIp || __('Loading...', 'betterlinks')} copyCode={siteIp || __('Loading...', 'betterlinks')} />
				</strong>
			</div>
			<div className="btl-instruction-block-wrapper">
				{__('Please note that it may take up to', 'betterlinks')} <strong>{__('72 hours', 'betterlinks')}</strong>{' '}
				{__('for the A record to propagate, depending on your domain provider', 'betterlinks')}
				<br />
				<br />
				{__('Now point to this WordPress installation, use the given redirect rule available in the next tab based on your server', 'betterlinks')}
			</div>
		</div>
	);
};

export default ARecordConfig;
