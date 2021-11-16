import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import Topbar from 'containers/TopBar';
import DndCanvas from 'containers/DndCanvas';
import ListCanvas from 'containers/ListCanvas';
import { add_new_link } from 'redux/actions/links.actions';
import Link from 'containers/Link';
const ManageLinks = ({ add_new_link, activity }) => {
	return (
		<React.Fragment>
			<Topbar
				label={__('BetterLinks', 'betterlinks')}
				render={() => (
					<>
						{betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && (
							<div className="btl-create-links">
								<Link isShowIcon={false} submitHandler={add_new_link} />
							</div>
						)}
					</>
				)}
			/>
			{activity.linksView == 'list' ? <ListCanvas /> : <DndCanvas />}
		</React.Fragment>
	);
};
const mapStateToProps = (state) => ({
	activity: state.activity,
});
const mapDispatchToProps = (dispatch) => {
	return {
		add_new_link: bindActionCreators(add_new_link, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageLinks);
