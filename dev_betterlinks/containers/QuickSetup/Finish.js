import { __ } from '@wordpress/i18n';
import { useContext, useEffect } from 'react';
import { plugin_root_url } from 'utils/helper';
import { SetupContext } from 'pages/QuickSetup';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';

const Finish = (props) => {
	const { errors } = useContext(SetupContext);
	useEffect(() => {
		props.update_quick_setup({ isCreated: false });
	}, [])
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
		isCreated: state.quickSetup?.isCreated,
	};
};
const mapDispatchToProps = (dispatch) => ({
	update_quick_setup: bindActionCreators(update_quick_setup, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Finish);
