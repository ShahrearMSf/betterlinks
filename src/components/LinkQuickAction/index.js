import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import ReactTooltip from 'react-tooltip';
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
			<ReactTooltip className="light-tooltip" />
			{item.analytic && (
				<button className="dnd-link-button">
					<span data-tip={item.analytic.ip.map((item) => Object.keys(item) + '(' + Object.values(item) + ')')} className="icon">
						{item.analytic.link_count}
					</span>
				</button>
			)}

			{/* 
            <button className='dnd-link-button'>
                <span className='icon'>
                    <i className='btl btl-reload'></i>
                </span>
            </button> */}
			{!isDeleteConfirm ? (
				<>
					<button className="dnd-link-button" onClick={() => copyShortUrl(site_url + '/' + item.short_url)}>
						<span data-tip="Copy Link" className="icon">
							{isCopyUrl ? <span className="dashicons dashicons-yes"></span> : <i className="btl btl-link"></i>}
						</span>
					</button>
					<div data-tip="Edit Link">
						<Link cat_id={cat_id} cat_name={cat_name} item={item} submitHandler={submitLinkHandler} />
					</div>
					<button data-tip="Delete" type="button" className="dnd-link-button delete-button" onClick={() => deleteHandler()}>
						<span className="icon">
							<i className="btl btl-delete"></i>
						</span>
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
