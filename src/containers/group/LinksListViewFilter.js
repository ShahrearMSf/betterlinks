import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';

const rowDeleteHandler = (selectedRows, action, deleteLinkHandler) => {
	if (action.value === 'delete') {
		let deleteItemLists = [];
		selectedRows.map((item) => {
			deleteItemLists.push({
				ID: item.ID,
				term_id: item.cat_id,
				short_url: item.short_url,
			});
		});
		deleteLinkHandler(deleteItemLists);
	}
};

const LinksListViewFilter = (props) => {
	const [bulkAction, setBulkAction] = useState({});
	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{props.bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: 'Bulk Actions' }}
							options={[{ value: 'delete', label: 'Delete' }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<button className="btl-link-apply-button" onClick={() => rowDeleteHandler(props.bulkActionData.selectedRows, bulkAction, props.deleteLinkHandler)}>
							Apply
						</button>
					</div>
				)}
				<div className="btl-click-filter">
					<input id="search" type="text" placeholder={__('Search short link', 'betterlinks')} value={props.filterText} onChange={props.onFilter} />
				</div>
				<Select
					className="btl-list-view-select btl-category-filter"
					classNamePrefix="btl-react-select"
					placeholder="Categories"
					value={props.selectedCategory}
					options={props.catItems}
					onChange={(e) => props.categorySelectHandler(e)}
					isClearable={true}
				/>
				<Select
					className="btl-list-view-select btl-shortable-filter"
					classNamePrefix="btl-react-select"
					placeholder="Short by Clicks"
					options={[
						{ value: 'mostClicks', label: 'Most Clicks' },
						{ value: 'leastClicks', label: 'Least Clicks' },
						{ value: 'mostUniqueClicks', label: 'Most Unique Clicks' },
						{ value: 'leastUniqueClicks', label: 'Least Unique Clicks' },
					]}
					value={props.selectedClicksType}
					onChange={(e) => props.setClicksType(e)}
					isClearable={true}
				/>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					placeholder="All Dates"
					options={[
						{ value: 'mostRecent', label: 'Most Recent' },
						{ value: 'leastRecent', label: 'Least Recent' },
						{ value: 'custom', label: 'Custom' },
					]}
					value={props.selectedDateType}
					onChange={(e) => props.dateHandler(e)}
					isClearable={true}
				/>
				<button className="btl-link-filter-button" onClick={props.resetFilterHandler}>
					Reset Filter
				</button>
			</div>
		</React.Fragment>
	);
};
export default LinksListViewFilter;
