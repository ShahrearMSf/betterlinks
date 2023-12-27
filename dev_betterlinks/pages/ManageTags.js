import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_all_tags } from 'redux/actions/terms.actions';
import { useEffect } from 'react';

const ManageTags = (props) => {
	useEffect(() => {
		props.fetch_all_tags();
	}, []);
	return (
		<>
			<h1>Hello from Manage Tags</h1>
		</>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetch_all_tags: bindActionCreators(fetch_all_tags, dispatch),
});

export default connect(null, mapDispatchToProps)(ManageTags);
