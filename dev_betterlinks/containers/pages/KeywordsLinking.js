import React from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_keywords, add_new_keyword } from './../../redux/actions/keywords.actions';
import Topbar from './../group/TopBar';
import ListKeywords from './../group/ListKeywords';
import AddNewKeywords from '../../components/AddNewKeywords';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

const KeywordsLinking = (props) => {
	return (
		<React.Fragment>
			<Topbar
				label={__('Keywords Linking', 'betterlinks')}
				render={() => (
					<>
						<AddNewKeywords addNewKeywordHandler={props.add_new_keyword} />
					</>
				)}
			/>
			<ListKeywords />
		</React.Fragment>
	);
};

KeywordsLinking.propTypes = propTypes;
KeywordsLinking.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
	keywords: state.keywords,
});
const mapDispatchToProps = (dispatch) => {
	return {
		fetch_keywords: bindActionCreators(fetch_keywords, dispatch),
		add_new_keyword: bindActionCreators(add_new_keyword, dispatch),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(KeywordsLinking);
