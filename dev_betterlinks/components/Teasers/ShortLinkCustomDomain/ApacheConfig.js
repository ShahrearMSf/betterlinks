import CodeBlock from './CodeBlock';

const ApacheConfig = ({ host, custom_domain }) => {
	return (
		<div className="btl-individual-config-blocks --btl-records-bg">
			<div className="btl-instruction-block-wrapper">
				Copy and place the following rewrite rule at the beginning of the <strong>.htaccess</strong> file in your website's root directory:
			</div>
			<div className="btl-code-block-wrapper">
				<strong>
					<CodeBlock
						code={`&lt;IfModule mod_rewrite.c&gt; <br>RewriteEngine On <br>RewriteCond %{HTTP_HOST} ^${host}$ [OR] <br>RewriteCond %{HTTP_HOST} ^www.${host}$ <br>RewriteRule (.*)$ ${custom_domain?.shortlink_custom_domain?.replace(
							/\/$/,
							''
						)}/$1 [R=301,L] <br>&lt;/IfModule&gt;`}
						copyCode={`<IfModule mod_rewrite.c> \nRewriteEngine On \nRewriteCond %{HTTP_HOST} ^${host}$ [OR] \nRewriteCond %{HTTP_HOST} ^www.${host}$ \nRewriteRule (.*)$ ${custom_domain?.shortlink_custom_domain?.replace(
							/\/$/,
							''
						)}/$1 [R=301,L] \n</IfModule>`}
					/>
				</strong>
			</div>
		</div>
	);
};

export default ApacheConfig;
