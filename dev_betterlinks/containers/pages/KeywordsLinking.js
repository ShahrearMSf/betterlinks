import React from 'react';
import { __ } from '@wordpress/i18n';
import Topbar from './../group/TopBar';
import ListKeywords from './../group/ListKeywords';
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
						{betterLinksHooks.applyFilters('betterLinksIsShowWriteLink', true) && (
							<div className="btl-create-keywords">
								<Link isShowIcon={false} submitHandler={add_new_link} />
							</div>
						)}
					</>
				)}
			/>
			<ListKeywords />
		</React.Fragment>
	);
}

KeywordsLinking.propTypes = propTypes;
KeywordsLinking.defaultProps = defaultProps;
