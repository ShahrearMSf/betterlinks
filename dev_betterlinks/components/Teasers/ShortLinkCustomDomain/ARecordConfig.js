import { __ } from '@wordpress/i18n';
import CodeBlock from './CodeBlock';

const ARecordConfig = ({ custom_host, siteIp }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				<span>{__('Please add the following A record to your DNS settings. ', 'betterlinks-pro')}</span>
				<a
					target="_blank"
					href="https://betterlinks.io/docs/configure-custom-domain/#1-toc-title"
					style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}
				>
					{__('Learn More', 'betterlinks-pro')}
				</a>
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
					<CodeBlock code={siteIp || ''} copyCode={siteIp || ''} />
				</strong>
			</div>
			<div className="btl-instruction-block-wrapper">
				{__('Please note that it may take up to', 'betterlinks')} <strong>{__('72 hours', 'betterlinks')}</strong>{' '}
				{__('for the A record to propagate, depending on your domain provider', 'betterlinks')}
				<br />
				<br />
				{__('Now point to this WordPress installation, use the given redirect rule available in the following ', 'betterlinks')}
				<strong>{__('"Server Configuration"', 'betterlinks')} </strong>
				{__(' section. For more info ', 'betterlinks')}
				<a
					target="_blank"
					href="https://betterlinks.io/docs/configure-custom-domain/#2-toc-title"
					style={{ color: 'inherit', 'font-weight': '700', 'text-decoration': 'underline', 'font-size': 'inherit' }}
				>
					{__('Click Here', 'betterlinks-pro')}
				</a>
			</div>
		</div>
	);
};

export default ARecordConfig;
