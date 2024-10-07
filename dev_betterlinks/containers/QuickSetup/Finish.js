import { __ } from '@wordpress/i18n';
import { useContext } from 'react';
import { plugin_root_url } from 'utils/helper';
import { SetupContext } from 'pages/QuickSetup';
import { connect } from 'react-redux';

const Finish = (props) => {
	console.info(props);
	const { errors } = useContext(SetupContext);
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

const mapStateToProps = (state) => {
	return {
		isCreate: state.quickSetup?.isCreated,
	};
};
export default connect(mapStateToProps, null)(Finish);
