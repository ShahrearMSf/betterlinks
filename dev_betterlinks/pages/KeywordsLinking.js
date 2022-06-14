import React, { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import { bindActionCreators } from 'redux';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_keywords } from 'redux/actions/keywords.actions';
import Topbar from 'containers/TopBar';
import ListKeywords from 'containers/ListKeywords';
import AddNewKeywords from 'containers/AddNewKeywords';
import { makeRequest, getLinks } from 'utils/helper';

const propTypes = {};
const defaultProps = {};
const KeywordsLinking = (props) => {
	const [postTypes, setPostTypes] = useState([]);
	const [postTags, setPostTags] = useState([]);
	const [postCategories, setPostCategories] = useState([]);
	useEffect(() => {
		if (!props.keywords.data) {
			props.fetch_keywords();
		}
		if (!props.links.links) {
			props.fetch_links_data();
		}
		// get post type info for adding or updating keywords
		makeRequest({
			action: 'betterlinks/admin/get_post_types',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				setPostTypes(data);
			}
		});
		makeRequest({
			action: 'betterlinks/admin/get_post_tags',
		}).then((response) => {
			if (response.data && response.data.data) {
				const data = Object.entries(response.data.data).reduce((acc, item) => {
					acc.push({ label: item[1], value: item[0] });
					return acc;
				}, []);
				setPostTags(data);
			}
		});
		makeRequest({
			action: 'betterlinks/admin/get_post_categories',
		}).then((response) => {
			const data = Object.entries(response.data.data).reduce((acc, item) => {
				acc.push({ label: item[1], value: item[0] });
				return acc;
			}, []);
			setPostCategories(data);
		});
	}, []);
	const newLinks = getLinks(props.links || {});
	const postTypesProps = {
		postTypes,
		postTags,
		postCategories,
	};
	return (
		<React.Fragment>
			<Topbar
				label={__('Auto-Link Keywords', 'betterlinks')}
				render={() => (
					<>
						<AddNewKeywords postTypesProps={postTypesProps} links={newLinks} keywords={props.keywords} />
					</>
				)}
			/>
			{props.links.links ? <ListKeywords postTypesProps={postTypesProps} links={newLinks} keywords={props.keywords} /> : <Loader />}
		</React.Fragment>
	);
};

KeywordsLinking.propTypes = propTypes;
KeywordsLinking.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
	keywords: state.keywords,
	links: state.links,
});
const mapDispatchToProps = (dispatch) => {
	return {
		fetch_keywords: bindActionCreators(fetch_keywords, dispatch),
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordsLinking);
