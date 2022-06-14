import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import AddNewKeywords from 'containers/AddNewKeywords';
import ActionButton from 'components/ActionButton';
import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

export default function KeywordsQuickAction({ links, data, deleteKeywordHandler, keywords, postTypesProps }) {
	const [isOpenDeleteBox, setIsOpenDeleteBox] = useState(false);
	const openConfirmDialog = () => {
		setIsOpenDeleteBox(true);
	};
	return (
		<React.Fragment>
			<div className="btl-list-view-action-wrapper">
				{isOpenDeleteBox ? (
					<div className="btl-confirm-message">
						<span className="action-text">{__('Are You Sure?', 'betterlinks')}</span>
						<div className="action-set">
							<button className="action yes" onClick={() => deleteKeywordHandler()}>
								{__('Yes', 'betterlinks')}
							</button>
							<button className="action no" onClick={() => setIsOpenDeleteBox(false)}>
								{__('No', 'betterlinks')}
							</button>
						</div>
					</div>
				) : (
					<>
						<AddNewKeywords postTypesProps={postTypesProps} links={links} data={data} keywords={keywords} />
						<ActionButton onClickHandler={openConfirmDialog} type="delete" label={__('Delete Keyword', 'betterlinks')} />
					</>
				)}
			</div>
		</React.Fragment>
	);
}

KeywordsQuickAction.propTypes = propTypes;
KeywordsQuickAction.defaultProps = defaultProps;
