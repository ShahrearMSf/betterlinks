import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_links_data } from 'redux/actions/links.actions';
import { fetch_keywords } from 'redux/actions/keywords.actions';
import Topbar from 'containers/TopBar';
import ListKeywords from 'containers/ListKeywords';
import AddNewKeywords from 'containers/AddNewKeywords';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

const KeywordsLinking = (props) => {
	useEffect(() => {
		if (!props.keywords.data) {
			props.fetch_keywords();
		}
		if (!props.links.data) {
			props.fetch_links_data();
		}
	}, []);
	const getLinks = (data) => {
		if (data.links) {
			const results = Object.entries(data.links).reduce((acc, item) => {
				acc = [...acc, ...item[1].lists];
				return acc;
			}, []);
			return results.reduce((acc, item) => {
				acc = [...acc, { value: item.ID, label: item.link_title }];
				return acc;
			}, []);
		}
		return [];
	};
	return (
		<React.Fragment>
			<Topbar
				label={__('Auto-Link Keywords', 'betterlinks')}
				render={() => (
					<>
						<AddNewKeywords />
					</>
				)}
			/>
			<ListKeywords links={getLinks(props.links)} keywords={props.keywords} />
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
