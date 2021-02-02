import React from 'react';
import { connect } from 'react-redux';
import DndCanvas from './../group/DndCanvas';
import ListCanvas from './../group/ListCanvas';
import Topbar from './../group/TopBar';
const ManageLinks = ({ activity }) => {
	return (
		<React.Fragment>
			<Topbar />
			{activity.linksView == 'list' ? <ListCanvas /> : <DndCanvas />}
		</React.Fragment>
	);
};
const mapStateToProps = (state) => ({
	activity: state.activity,
});
export default connect(mapStateToProps)(ManageLinks);
