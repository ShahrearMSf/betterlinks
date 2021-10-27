import React from 'react';
import { __ } from '@wordpress/i18n';
import Topbar from './../group/TopBar';
import ListKeywords from './../group/ListKeywords';
import AddNewKeywords from '../../components/AddNewKeywords';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function KeywordsLinking(props) {
	return (
		<React.Fragment>
			<Topbar
				label={__('Keywords Linking', 'betterlinks')}
				render={() => (
					<>
						<AddNewKeywords />
					</>
				)}
			/>
			<ListKeywords />
		</React.Fragment>
	);
}

KeywordsLinking.propTypes = propTypes;
KeywordsLinking.defaultProps = defaultProps;
