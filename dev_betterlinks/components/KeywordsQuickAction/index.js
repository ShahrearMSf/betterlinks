import React from 'react';
import { __ } from '@wordpress/i18n';
import ActionButton from './../ActionButton';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function KeywordsQuickAction(props) {
	return (
		<React.Fragment>
			<div className="btl-actions">
				<ActionButton type="edit" label={__('Edit Keyword', 'betterlinks')} />
				<ActionButton type="delete" label={__('Delete Keyword', 'betterlinks')} />
			</div>
		</React.Fragment>
	);
}

KeywordsQuickAction.propTypes = propTypes;
KeywordsQuickAction.defaultProps = defaultProps;
