import React from 'react';
import { __ } from '@wordpress/i18n';
import AddNewKeywords from './../../containers/group/AddNewKeywords';
import ActionButton from './../ActionButton';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function KeywordsQuickAction({ links, data }) {
	return (
		<React.Fragment>
			<div className="btl-actions">
				<AddNewKeywords links={links} data={data} />
				<ActionButton type="delete" label={__('Delete Keyword', 'betterlinks')} />
			</div>
		</React.Fragment>
	);
}

KeywordsQuickAction.propTypes = propTypes;
KeywordsQuickAction.defaultProps = defaultProps;
