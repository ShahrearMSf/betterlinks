import { __ } from '@wordpress/i18n';
import CodeBlock from './CodeBlock';

const ApacheConfig = ({ host, custom_domain }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				{__('Copy and place the following rewrite rule at the beginning of the', 'betterlinks')} <strong>.htaccess</strong>{' '}
				{__("file in your website's root directory:", 'betterlinks')}
			</div>
			<div className="btl-code-block-wrapper">
				<strong>
					<CodeBlock
						code={`RewriteEngine On <br>RewriteCond %{HTTP_HOST} ^${host}$ [OR] <br>RewriteCond %{HTTP_HOST} ^www.${host}$ <br>RewriteRule (.*)$ ${custom_domain?.shortlink_custom_domain?.replace(
							/\/$/,
							''
						)}/$1 [R=301,L]`}
						copyCode={`RewriteEngine On \nRewriteCond %{HTTP_HOST} ^${host}$ [OR] \nRewriteCond %{HTTP_HOST} ^www.${host}$ \nRewriteRule (.*)$ ${custom_domain?.shortlink_custom_domain?.replace(
							/\/$/,
							''
						)}/$1 [R=301,L]`}
					/>
				</strong>
			</div>
		</div>
	);
};

export default ApacheConfig;
