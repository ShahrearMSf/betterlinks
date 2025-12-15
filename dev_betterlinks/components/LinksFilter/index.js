import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Select from 'react-select';
import { DateRangePicker } from 'react-date-range';
import { removeOverlayElement } from 'utils/helper';

const rowDeleteHandler = (selectedRows, action, deleteLinkHandler, setWarning, setToggledClearRows) => {
	if (action.value === 'delete') {
		setWarning(false);
		const deleteItemLists = [];
		selectedRows.map((item) => {
			deleteItemLists.push({
				ID: item.ID,
				term_id: item.cat_id,
				short_url: item.short_url,
			});
		});
		setToggledClearRows();
		deleteLinkHandler(deleteItemLists);
		return;
	}
	setWarning(true);
};

const rowAssignCategoryHandler = (selectedRows, action, selectedCategory, assignCategoryHandler, setWarning, setToggledClearRows) => {
	if (action.value === 'assign_category') {
		if (!selectedCategory || !selectedCategory.value) {
			setWarning(true);
			return;
		}
		setWarning(false);
		const assignItemLists = [];
		selectedRows.map((item) => {
			assignItemLists.push({
				ID: item.ID,
				cat_id: selectedCategory.value,
			});
		});
		setToggledClearRows();
		assignCategoryHandler(assignItemLists);
		return;
	}
};

const LinksFilter = (props) => {
	const [bulkAction, setBulkAction] = useState({});
	const [warning, setWarning] = useState(false);
	const [selectedAssignCategory, setSelectedAssignCategory] = useState(null);
	const dateRangePickerOnChangeHandler = (item) => {
		props.setCustomDateFilter([item.selection]);
		if (item.selection.endDate != item.selection.startDate) {
			removeOverlayElement();
			props.setIsOpenCustomDateFilter(false);
		}
	};
	const closeDatePicker = () => {
		removeOverlayElement();
		props.setIsOpenCustomDateFilter(false);
		props.dateHandler(null);
	};
	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{props.bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: __('Bulk Actions', 'betterlinks') }}
							value={bulkAction?.value ? bulkAction : { value: '', label: __('Bulk Actions', 'betterlinks') }}
							options={[
								{ value: 'delete', label: __('Delete', 'betterlinks') },
								{ value: 'assign_category', label: __('Assign Category', 'betterlinks') }
							]}
							onChange={(e) => {
								setBulkAction(e);
								setSelectedAssignCategory(null);
								setWarning(false);
							}}
						/>
						{bulkAction.value === 'assign_category' && (
							<Select
								className="btl-list-view-select"
								classNamePrefix="btl-react-select"
								placeholder={__('Select Category', 'betterlinks')}
								value={selectedAssignCategory}
								options={props.catItems}
								onChange={(e) => setSelectedAssignCategory(e)}
							/>
						)}
						<div className="btl-tooltip">
							<button
								className="btl-link-apply-button"
								onClick={() => {
									if (bulkAction.value === 'assign_category') {
										rowAssignCategoryHandler(props.bulkActionData.selectedRows, bulkAction, selectedAssignCategory, props.assignCategoryHandler, setWarning, props.setToggledClearRows);
									} else {
										rowDeleteHandler(props.bulkActionData.selectedRows, bulkAction, props.deleteLinkHandler, setWarning, props.setToggledClearRows);
									}
									setBulkAction({});
									setSelectedAssignCategory(null);
								}}
							>
								{__('Apply', 'betterlinks')}
							</button>
							{warning && <span className="btl-tooltiptext">{bulkAction.value === 'assign_category' ? __('Please Select Category.', 'betterlinks') : __('Please Select Action.', 'betterlinks')}</span>}
						</div>
					</div>
				)}
				<div className="btl-click-filter" style = {bulkAction.value === 'assign_category' ? { width: '130px' } : {}}>
					<input id="search" type="text" placeholder={__('Search', 'betterlinks')} value={props.filterText} onChange={props.onFilter} />
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
					className="btl-list-view-select btl-category-filter"
					classNamePrefix="btl-react-select"
					placeholder="Tags"
					value={props.selectedTag}
					options={props.tagItems}
					onChange={(e) => props.tagSelectHandler(e)}
					isClearable={true}
				/>
				<Select
					className="btl-list-view-select btl-shortable-filter"
					classNamePrefix="btl-react-select"
					placeholder="Sort by Clicks"
					options={[
						{ value: 'mostClicks', label: __('Most Clicks', 'betterlinks') },
						{ value: 'leastClicks', label: __('Least Clicks', 'betterlinks') },
						{ value: 'mostUniqueClicks', label: __('Most Unique Clicks', 'betterlinks') },
						{ value: 'leastUniqueClicks', label: __('Least Unique Clicks', 'betterlinks') },
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
						{ value: 'mostRecent', label: __('Most Recent', 'betterlinks') },
						{ value: 'leastRecent', label: __('Least Recent', 'betterlinks') },
						{ value: 'custom', label: __('Custom', 'betterlinks') },
					]}
					value={props.selectedDateType}
					onChange={(e) => props.dateHandler(e)}
					isClearable={true}
				/>
				{props.selectedDateType && props.selectedDateType.value === 'custom' && (
					<React.Fragment>
						<button className="btl-list-view-calendar" onClick={() => props.dateHandler({ value: 'custom', label: __('Custom', 'betterlinks') })}>
							<span className="dashicons dashicons-calendar"></span>
							{String(props.customDateFilter[0].startDate).slice(4, 15)} - {String(props.customDateFilter[0].endDate).slice(4, 15)}
						</button>
					</React.Fragment>
				)}

				<button className="btl-link-filter-button" onClick={props.resetFilterHandler}>
					Reset Filter
				</button>
				{props.isOpenCustomDateFilter && (
					<div className="btl-date-range-picker-wrap">
						<div className="btl-date-range-picker">
							<button className="btn-date-range-close" onClick={() => closeDatePicker()}>
								<span className="dashicons dashicons-no-alt"></span>
							</button>
							<DateRangePicker
								onChange={(item) => dateRangePickerOnChangeHandler(item)}
								showSelectionPreview={true}
								moveRangeOnFirstSelection={false}
								months={2}
								ranges={props.customDateFilter}
								direction="horizontal"
							/>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};
export default LinksFilter;
