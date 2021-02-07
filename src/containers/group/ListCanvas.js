import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { linksFilterData, site_url, formatDate } from './../../utils/helper';
import { fetch_links_data, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import LinkQuickAction from './../../components/LinkQuickAction';

const getColumnData = (props) => {
	return [
		{
			name: __('Title', 'betterlinks'),
			selector: 'link_title',
			sortable: false,
			cell: (row) => {
				return <div className="btl-link-title" dangerouslySetInnerHTML={{ __html: row.link_title }}></div>;
			},
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
			cell: (row) => {
				return (
					<div className="btl-short-url-wrapper">
						<span className="btl-short-url">{site_url + '/' + row.short_url}</span>
					</div>
				);
			},
		},
		{
			name: __('Redirect Type', 'betterlinks'),
			selector: 'redirect_type',
			sortable: false,
			cell: (row) => <div>{row.redirect_type}</div>,
		},
		{
			name: __('Clicks', 'betterlinks'),
			selector: '',
			sortable: false,
			cell: (row) => (
				<div>
					{row.analytic ? (
						<button className="dnd-link-button btl-tooltip">
							<span className="btl-tooltiptext">{'Clicks: ' + row.analytic.link_count + ' / ' + 'Unique Clicks: ' + row.analytic.ip.length}</span>
							<span className="icon">{row.analytic.link_count + '/' + row.analytic.ip.length}</span>
						</button>
					) : (
						<button className="dnd-link-button btl-tooltip">
							<span className="btl-tooltiptext">{'Clicks: 0 / ' + 'Unique Clicks: 0'}</span>
							<span className="icon">0/0</span>
						</button>
					)}
				</div>
			),
		},
		{
			name: __('Date', 'betterlinks'),
			selector: 'link_date',
			sortable: false,
			cell: (row) => <div>{formatDate(new Date(row.link_date), 'mm/dd/yyyy')}</div>,
		},
		{
			name: __('Action', 'betterlinks'),
			selector: '',
			sortable: false,
			cell: (row) => (
				<div className="btl-list-view-action-wrapper">
					<LinkQuickAction isShowAnalytics={false} cat_id={row.cat_id} submitLinkHandler={props.edit_link} deleteLinkHandler={props.delete_link} item={row} />
				</div>
			),
		},
	];
};

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

const FilterComponent = (props) => {
	const { filterText, onFilter, onClear, bulkActionData, deleteLinkHandler, catItems, categorySelectHandler, dateHandler, setClicksType, resetFilterHandler } = props;
	const [bulkAction, setBulkAction] = useState({});
	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: 'Bulk Actions' }}
							options={[{ value: 'delete', label: 'Delete' }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<button className="btl-link-apply-button" onClick={() => rowDeleteHandler(bulkActionData.selectedRows, bulkAction, deleteLinkHandler)}>
							Apply
						</button>
					</div>
				)}
				<div className="btl-click-filter">
					<input id="search" type="text" placeholder={__('Search short link', 'betterlinks')} value={filterText} onChange={onFilter} />
				</div>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					placeholder="Categories"
					value={props.selectedCategory}
					options={catItems}
					onChange={(e) => categorySelectHandler(e)}
					isClearable={true}
				/>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					placeholder="Short by Clicks"
					options={[
						{ value: 'mostClicks', label: 'Most Clicks' },
						{ value: 'leastClicks', label: 'Least Clicks' },
						{ value: 'mostUniqueClicks', label: 'Most Unique Clicks' },
						{ value: 'leastUniqueClicks', label: 'Least Unique Clicks' },
					]}
					value={props.selectedClicksType}
					onChange={(e) => setClicksType(e)}
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
					onChange={(e) => dateHandler(e)}
					isClearable={true}
				/>
				<button className="btl-link-filter-button" onClick={resetFilterHandler}>
					Reset Filter
				</button>
			</div>
		</React.Fragment>
	);
};

const ListCanvas = (props) => {
	const { links } = props.links;
	const [bulkActionData, setBulkActionData] = useState({});
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [selectedCategory, setCategory] = useState(null);
	const [selectedClicksType, setClicksType] = useState(null);
	const [selectedDateType, setDateType] = useState(null);
	const [isOpenCustomDateFilter, setIsOpenCustomDateFilter] = useState(false);
	const [customDateFilter, setCustomDateFilter] = useState([
		{
			startDate: new Date(),
			endDate: subDays(new Date(), 30),
			key: 'selection',
		},
	]);

	useEffect(() => {
		if (!links) {
			props.fetch_links_data();
		}
	}, []);

	const dateFilterControl = (type) => {
		setDateType(type);
		if (type && type.value == 'custom') {
			setIsOpenCustomDateFilter(!isOpenCustomDateFilter);
		} else {
			setIsOpenCustomDateFilter(false);
		}
	};

	const resetFilterHandler = () => {
		setFilterText('');
		setCategory(null);
		setClicksType(null);
		setDateType(null);
		setIsOpenCustomDateFilter(false);
	};

	var stored =
		links &&
		Object.values(links).reduce(function (total, item) {
			total = [...total, ...item.lists];
			return total;
		}, []);

	var categories =
		links &&
		Object.entries(links).reduce(function (total, [key, item]) {
			total = [...total, { value: key, label: item.term_name }];
			return total;
		}, []);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<FilterComponent
				deleteLinkHandler={props.delete_link}
				catItems={categories}
				bulkActionData={bulkActionData}
				onFilter={(e) => setFilterText(e.target.value)}
				selectedCategory={selectedCategory}
				categorySelectHandler={setCategory}
				selectedClicksType={selectedClicksType}
				setClicksType={setClicksType}
				selectedDateType={selectedDateType}
				dateHandler={dateFilterControl}
				onClear={handleClear}
				filterText={filterText}
				resetFilterHandler={resetFilterHandler}
			/>
		);
	}, [filterText, resetPaginationToggle, bulkActionData, delete_link, categories, resetFilterHandler]);

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	return (
		<React.Fragment>
			{isOpenCustomDateFilter && (
				<DateRangePicker
					onChange={(item) => setCustomDateFilter([item.selection])}
					showSelectionPreview={true}
					moveRangeOnFirstSelection={false}
					months={2}
					ranges={customDateFilter}
					direction="horizontal"
				/>
			)}
			<div className="btl-list-view">
				{links && (
					<DataTable
						className="btl-list-view-table"
						columns={getColumnData(props)}
						data={linksFilterData(stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter)}
						pagination
						paginationResetDefaultPage={resetPaginationToggle}
						subHeader
						subHeaderComponent={subHeaderComponentMemo}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => onSelectedRowsChange(e)}
					/>
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	links: state.links,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		add_new_cat: bindActionCreators(add_new_cat, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
		edit_link: bindActionCreators(edit_link, dispatch),
		delete_link: bindActionCreators(delete_link, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCanvas);
