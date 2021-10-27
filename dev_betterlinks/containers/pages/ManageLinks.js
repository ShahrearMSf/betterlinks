import React from 'react';
import { connect } from 'react-redux';
import { __ } from '@wordpress/i18n';
import Topbar from './../group/TopBar';
import DndCanvas from './../group/DndCanvas';
import ListCanvas from './../group/ListCanvas';
const ManageLinks = ({ activity }) => {
	return (
		<React.Fragment>
			<Topbar label={__('BetterLinks', 'betterlinks')} />
			{activity.linksView == 'list' ? <ListCanvas /> : <DndCanvas />}
		</React.Fragment>
	);
};
const mapStateToProps = (state) => ({
	activity: state.activity,
});
export default connect(mapStateToProps)(ManageLinks);
