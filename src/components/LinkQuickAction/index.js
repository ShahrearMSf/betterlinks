import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Link from './../Link';
import { site_url, copyToClipboard } from './../../utils/helper';

const LinkQuickAction = (props) => {
	const { item, cat_id, cat_name, submitLinkHandler, deleteLinkHandler } = props;
	const [isCopyUrl, setCopyUrl] = useState(false);
	const [isDeleteConfirm, setDeleteConfrim] = useState(false);
	const deleteHandler = () => {
		setDeleteConfrim(!isDeleteConfirm);
	};
	const noDelete = () => {
		setDeleteConfrim(false);
	};
	const copyShortUrl = (url) => {
		copyToClipboard(url);
		setCopyUrl(true);
	};
	return (
		<React.Fragment>
			{item.analytic && (
				<button className="dnd-link-button btl-tooltip">
					<span className="btl-tooltiptext">{'Clicks: ' + item.analytic.link_count + ' / ' + 'Unique Clicks: ' + item.analytic.ip.length}</span>
					<span className="icon">{item.analytic.link_count + '/' + item.analytic.ip.length}</span>
				</button>
			)}
			{!isDeleteConfirm ? (
				<>
					<button className="dnd-link-button btl-tooltip" onClick={() => copyShortUrl(site_url + '/' + item.short_url)}>
						<span className="icon">{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-link"></i>}</span>
						<span className="btl-tooltiptext">{__('Copy Link', 'betterlinks')}</span>
					</button>
					<div className="btl-tooltip">
						<Link cat_id={cat_id} cat_name={cat_name} item={item} submitHandler={submitLinkHandler} />
						<span className="btl-tooltiptext">{__('Edit Link', 'betterlinks')}</span>
					</div>
					<button type="button" className="dnd-link-button delete-button btl-tooltip" onClick={() => deleteHandler()}>
						<span className="icon">
							<i className="btl btl-delete"></i>
						</span>
						<span className="btl-tooltiptext">{__('Delete', 'betterlinks')}</span>
					</button>
				</>
			) : (
				<div className="btl-confirm-message">
					<span className="action-text">{__('Are Your Sure?', 'betterlinks')}</span>
					<div className="action-set">
						<button
							className="action yes"
							onClick={() => {
								deleteLinkHandler(cat_id, item.ID, item.short_url);
							}}
						>
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
