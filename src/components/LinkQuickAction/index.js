import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Link from './../Link';
import { site_url, copyToClipboard } from './../../utils/helper';

const propTypes = {
	isShowAnalytics: PropTypes.bool,
	isShowVisitLink: PropTypes.bool,
	isShowCopyLink: PropTypes.bool,
	isShowEditLink: PropTypes.bool,
	isShowDeleteLink: PropTypes.bool,
	catId: PropTypes.number,
	catName: PropTypes.string,
	submitLinkHandler: PropTypes.func,
	deleteLinkHandler: PropTypes.func,
	data: PropTypes.object,
};

const defaultProps = {
	isShowAnalytics: false,
	isShowVisitLink: false,
	isShowCopyLink: true,
	isShowEditLink: true,
	isShowDeleteLink: true,
};

const LinkQuickAction = ({ isShowCopyLink, isShowAnalytics, isShowVisitLink, isShowEditLink, isShowDeleteLink, data, catId, catName, submitLinkHandler, deleteLinkHandler }) => {
	const [isCopyUrl, setCopyUrl] = useState(false);
	const [isDeleteConfirm, setDeleteConfrim] = useState(false);
	const deleteHandler = () => {
		setDeleteConfrim(!isDeleteConfirm);
	};
	const confirmDelete = () => {
		setDeleteConfrim(false);
		deleteLinkHandler(data.ID);
	};
	const noDelete = () => {
		setDeleteConfrim(false);
	};
	const copyShortUrl = (url) => {
		copyToClipboard(url);
		setCopyUrl(true);
		window.setTimeout(function () {
			setCopyUrl(false);
		}, 3000);
	};
	return (
		<React.Fragment>
			{isShowAnalytics && data.analytic && (
				<button className="dnd-link-button btl-tooltip">
					<span className="btl-tooltiptext">{'Clicks: ' + data.analytic.link_count + ' / ' + 'Unique Clicks: ' + data.analytic.ip.length}</span>
					<span className="icon">{data.analytic.link_count + '/' + data.analytic.ip.length}</span>
				</button>
			)}
			{!isDeleteConfirm ? (
				<>
					{isShowCopyLink && (
						<button className="dnd-link-button btl-tooltip" onClick={() => copyShortUrl(site_url + '/' + data.short_url)}>
							<span className="icon">{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-link"></i>}</span>
							<span className="btl-tooltiptext">{__('Copy Link', 'betterlinks')}</span>
						</button>
					)}
					{isShowVisitLink && (
						<div className="btl-tooltip">
							<a className="dnd-link-button" href={site_url + '/' + data.short_url} target="_blank">
								<i className="btl btl-visit-url"></i>
							</a>
							<span className="btl-tooltiptext">{__('Visit Link', 'betterlinks')}</span>
						</div>
					)}
					{isShowEditLink && (
						<div className="btl-tooltip">
							<Link catId={parseInt(catId)} catName={catName} data={data} submitHandler={submitLinkHandler} />
							<span className="btl-tooltiptext">{__('Edit Link', 'betterlinks')}</span>
						</div>
					)}
					{isShowDeleteLink && (
						<button type="button" className="dnd-link-button delete-button btl-tooltip" onClick={() => deleteHandler()}>
							<span className="icon">
								<i className="btl btl-delete"></i>
							</span>
							<span className="btl-tooltiptext">{__('Delete', 'betterlinks')}</span>
						</button>
					)}
				</>
			) : (
				<div className="btl-confirm-message">
					<span className="action-text">{__('Are Your Sure?', 'betterlinks')}</span>
					<div className="action-set">
						<button className="action yes" onClick={() => confirmDelete()}>
							{__('Yes', 'betterlinks')}
						</button>
						<button className="action no" onClick={noDelete}>
							{__('No', 'betterlinks')}
						</button>
					</div>
				</div>
			)}
		</React.Fragment>
	);
};
export default LinkQuickAction;
LinkQuickAction.propTypes = propTypes;
LinkQuickAction.defaultProps = defaultProps;
