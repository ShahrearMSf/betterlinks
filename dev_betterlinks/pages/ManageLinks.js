import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { __ } from '@wordpress/i18n';
import Topbar from 'containers/TopBar';
import DndCanvas from 'containers/DndCanvas';
import ListCanvas from 'containers/ListCanvas';
import { add_new_link } from 'redux/actions/links.actions';
import { add_new_password } from 'redux/actions/password.actions';
import Link from 'containers/Link';

const ManageLinks = ({ add_new_link, add_new_password, activity, favouriteSort }) => {
	const { sortByFav } = favouriteSort;
	return (
		<React.Fragment>
			<Topbar
				label={__('BetterLinks', 'betterlinks')}
				render={() => (
					<>
						{betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && !sortByFav && (
							<div className="btl-create-links">
								<Link isShowIcon={false} submitHandler={add_new_link} add_new_password={add_new_password} />
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
	favouriteSort: state.favouriteSort,
});
const mapDispatchToProps = (dispatch) => {
	return {
		add_new_link: bindActionCreators(add_new_link, dispatch),
		add_new_password: bindActionCreators(add_new_password, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageLinks);
