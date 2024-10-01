import { __ } from '@wordpress/i18n';
import { plugin_root_url } from 'utils/helper';

const Finish = () => {
	return (
		<>
			<div className="finish">
				<div className="header">
					<h3>{__('Congratulations!', 'betterlinks')}</h3>
					<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>
					<img src={plugin_root_url + '/assets/images/finish-setup.png'} alt="Setup Finish" />
				</div>
			</div>
		</>
	);
};

export default Finish;
