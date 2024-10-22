import { __ } from '@wordpress/i18n';
import { useContext, useEffect } from 'react';
import { plugin_root_url, site_url } from 'utils/helper';
import { SetupContext } from 'pages/QuickSetup';
import { connect } from 'react-redux';
import { update_quick_setup } from 'redux/actions/quick-setup.actions';
import { bindActionCreators } from 'redux';

const Finish = (props) => {
	useEffect(() => {
		props.update_quick_setup({ isCreated: false, duplicateLink: false });
	}, []);
	console.info(props.createdLink);
	return (
		<>
			<div className="finish">
				<div className="header">
					<h3>{__('Congratulations!', 'betterlinks')}</h3>
					<p>{__('Lorem ipsum dolor sit amet consectetur. Amet vulputate ante ipsum maecenas diam vestibulum potenti augue.', 'betterlinks')}</p>
					{props?.createdLink && Object.keys(props.createdLink).length && (
						<div className="link">
							<a href={`${site_url}/${props.createdLink.short_url}`}> {`${site_url}/${props.createdLink.short_url}`} </a>
						</div>
					)}
					<img src={plugin_root_url + '/assets/images/finish-setup.png'} alt="Setup Finish" />
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		isCreated: state.quickSetup?.isCreated,
		createdLink: state.quickSetup?.createdLink,
	};
};
const mapDispatchToProps = (dispatch) => ({
	update_quick_setup: bindActionCreators(update_quick_setup, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Finish);
