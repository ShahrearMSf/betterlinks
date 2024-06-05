import CodeBlock from './CodeBlock';

const ARecordConfig = ({ custom_host, siteIp }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				<span>Please add the following A record to your DNS settings:</span>
			</div>
			<div className="btl-code-block-wrapper">
				<strong>
					Record Type:
					<CodeBlock code="A" copyCode="A" />
				</strong>
				<br />
				<strong>
					Host: <CodeBlock code={custom_host} copyCode={custom_host} />
				</strong>
				{custom_host && (
					<span>
						[Use <strong>@</strong> for root domain]
					</span>
				)}
				<br />
				<br />
				<strong>
					Value:
					<CodeBlock code={siteIp || 'Loading...'} copyCode={siteIp || 'Loading...'} />
				</strong>
			</div>
			<div className="btl-instruction-block-wrapper">
				Please note that it may take up to <strong>72 hours</strong> for the A record to propagate, depending on your domain provider
				<br />
				<br />
				Now point to this WordPress installation, use the given redirect rule available in the next tab based on your server
			</div>
		</div>
	);
};

export default ARecordConfig;
