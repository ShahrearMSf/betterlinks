import { __ } from '@wordpress/i18n';
import { Field } from 'formik';

const ServerConfig = ({ willShowUpgradeToProModal }) => {
	return (
		<>
			<div className="server-type-wrapper">
				<div id="server-type" className="server-type-title">
					{__('Select your server type', 'betterlinks')}
				</div>
				<div role="group" aria-labelledby="server-type" className="server-type">
					<div>
						<label htmlFor="apache">
							<Field id="apache" type="radio" name="server_type" value="apache" {...willShowUpgradeToProModal} />
							{__('Apache', 'betterlinks')}
						</label>
					</div>
					<div>
						<label htmlFor="nginx">
							<Field id="nginx" type="radio" name="server_type" value="nginx" disabled {...willShowUpgradeToProModal} />
							{__('Nginx', 'betterlinks')}
						</label>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServerConfig;
