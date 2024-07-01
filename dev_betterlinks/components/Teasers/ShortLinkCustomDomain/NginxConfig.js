import { __ } from '@wordpress/i18n';
import CodeBlock from './CodeBlock';

const NginxConfig = ({ site_url }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				{__('Copy and place the following rewrite rule Inside the Server Block of your Nginx configuration & make sure add this before the', 'betterlinks')}{' '}
				<strong>{__('location block', 'betterlinks')}</strong>
			</div>
			<div className="btl-code-block-wrapper">
				<strong>
					<CodeBlock code={`rewrite ^/(.*)$ ${site_url}/$1 permanent;`} />
				</strong>
			</div>
		</div>
	);
};

export default NginxConfig;
