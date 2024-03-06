import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Link from 'containers/Link';
import QRScanner from 'components/QRScanner';
import { site_url, copyShortUrl, analytic } from 'utils/helper';
import { Link as ReactLink } from 'react-router-dom/cjs/react-router-dom.min';

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
	handle_link_favorite: PropTypes.func,
};

const defaultProps = {
	isShowAnalytics: false,
	isShowVisitLink: true,
	isShowCopyLink: true,
	isShowEditLink: true,
	isShowDeleteLink: true,
};

const LinkQuickAction = ({
	isAlowQr,
	isShowCopyLink,
	isShowAnalytics,
	isShowVisitLink,
	isShowEditLink,
	isShowDeleteLink,
	data,
	catId,
	catName,
	submitLinkHandler,
	deleteLinkHandler,
}) => {
	const [isCopyUrl, setCopyUrl] = useState(false);
	const [isDeleteConfirm, setDeleteConfrim] = useState(false);
	const deleteHandler = () => {
		setDeleteConfrim(!isDeleteConfirm);
	};
	const confirmDelete = () => {
		setDeleteConfrim(false);
		deleteLinkHandler({
			ID: data.ID,
			short_url: data.short_url,
			term_id: catId,
		});
	};
	const noDelete = () => {
		setDeleteConfrim(false);
	};
	const copyShortUrlHandler = (url) => {
		copyShortUrl(url);
		setCopyUrl(true);
		window.setTimeout(function () {
			setCopyUrl(false);
		}, 3000);
	};
	return (
		<React.Fragment>
			{betterLinksHooks.applyFilters('linkQuickActionNewField', '', { data, ReactLink })}
			{isShowAnalytics && data.analytic && (
				<button className="dnd-link-button btl-tooltip">
					<span className="btl-tooltiptext">{__('Clicks: ', 'betterlinks') + +data.analytic.link_count + ' / ' + __('Unique Clicks: ', 'betterlinks') + +data.analytic.ip}</span>
					<span className="icon">{analytic(data.analytic, data.ID)}</span>
				</button>
			)}
			{!isDeleteConfirm ? (
				<>
					{isShowVisitLink && (
						<div className="btl-tooltip">
							<a className="dnd-link-button" href={site_url + '/' + data.short_url} target="_blank">
								<i className="btl btl-visit-url"></i>
							</a>
							<span className="btl-tooltiptext">{__('Visit Link', 'betterlinks')}</span>
						</div>
					)}
					{isAlowQr && <QRScanner shortUrl={data.short_url} />}
					{isShowCopyLink && (
						<button className="dnd-link-button btl-tooltip" onClick={() => copyShortUrlHandler(data.short_url)}>
							<span className="icon">{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-link"></i>}</span>
							<span className="btl-tooltiptext">{__('Copy Link', 'betterlinks')}</span>
						</button>
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
					<span className="action-text">{__('Are You Sure?', 'betterlinks')}</span>
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
LinkQuickAction.propTypes = propTypes;
LinkQuickAction.defaultProps = defaultProps;

export default LinkQuickAction;
