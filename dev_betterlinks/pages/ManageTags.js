import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_all_tags } from 'redux/actions/terms.actions';
import { useEffect } from 'react';
import TopBar from 'containers/TopBar';
import { __ } from '@wordpress/i18n';
import AddNewTags from 'containers/AddNewTags';

const ManageTags = (props) => {
	const { tags } = props.terms;
	useEffect(() => {
		if (!tags) props.fetch_all_tags();
	}, []);

	return (
		<>
			<TopBar label={__('Manage Tags', 'betterlinks')} render={() => <AddNewTags tags={tags} />} />
		</>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_all_tags: bindActionCreators(fetch_all_tags, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTags);
