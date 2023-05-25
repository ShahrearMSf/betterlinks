import React, { useEffect, useState, useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import TableLoader from 'components/Loader/TableLoader';
import { bindActionCreators } from 'redux';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_keywords } from 'redux/actions/keywords.actions';
import { fetch_post_types_data } from 'redux/actions/posttypesdata.actions';
import Topbar from 'containers/TopBar';
import ListKeywords from 'containers/ListKeywords';
import AddNewKeywords from 'containers/AddNewKeywords';
import { parseLinksForKeywordsListing, parseLinksForUpdateModal } from 'utils/helper';

const propTypes = {};
const defaultProps = {};
const KeywordsLinking = (props) => {
	const [searchedText, setSearchedText] = useState('');
	const [matchedKeywordsDatas, setMatchedKeywordsDatas] = useState(null);
	const handleSearchTextChange = (e) => {
		const value = (e?.target?.value || '').trim();
		const regex = new RegExp(value, 'gi');
		const matchedData = (props?.keywords?.data || [])?.filter((item) => {
			return (item?.keywords || '').match(regex);
		});
		setSearchedText(value);
		setMatchedKeywordsDatas(matchedData);
	};
	useEffect(() => {
		if (!props.postdatas.fetchedAll) {
			props.fetch_post_types_data();
		}
		if (!props.keywords.data) {
			props.fetch_keywords();
		}
		if (!props.links.links) {
			props.fetch_links_data();
		}
	}, []);

	const linksForUpdateModal = parseLinksForUpdateModal(props.links);

	const postTypesProps = {
		postTypes: props.postdatas.postTypes || [],
		postTags: props.postdatas.postTags || [],
		postCategories: props.postdatas.postCategories || [],
	};

	const loadedAll = props.postdatas.fetchedAll && props.keywords.data;

	const search = (
		<div class="btl-autolink-filter">
			<input id="search_autolink" type="search" placeholder="Search Keywords" value={searchedText} onChange={handleSearchTextChange} />
		</div>
	);

	return (
		<React.Fragment>
			{loadedAll ? (
				<>
					<Topbar
						label={__('Auto-Link Keywords', 'betterlinks')}
						render={() => <AddNewKeywords postTypesProps={postTypesProps} linksForUpdateModal={linksForUpdateModal} keywords={props.keywords} />}
					/>
					<ListKeywords
						search={search}
						postTypesProps={postTypesProps}
						links={parseLinksForKeywordsListing(props.links)}
						linksForUpdateModal={linksForUpdateModal}
						keywords={Array.isArray(matchedKeywordsDatas) ? { data: matchedKeywordsDatas } : props.keywords}
						setMatchedKeywordsDatas={setMatchedKeywordsDatas}
					/>
				</>
			) : (
				<TableLoader />
			)}
		</React.Fragment>
	);
};

KeywordsLinking.propTypes = propTypes;
KeywordsLinking.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
	keywords: state.keywords,
	links: state.links,
	postdatas: state.postdatas,
});
const mapDispatchToProps = (dispatch) => {
	return {
		fetch_keywords: bindActionCreators(fetch_keywords, dispatch),
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		fetch_post_types_data: bindActionCreators(fetch_post_types_data, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordsLinking);
