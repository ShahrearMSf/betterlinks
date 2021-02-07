import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import { DateRangePicker } from 'react-date-range';
import { subDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import LinksListViewFilter from './LinksListViewFilter';
import { linksFilterData, site_url, formatDate } from './../../utils/helper';
import { fetch_links_data, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import LinkQuickAction from './../../components/LinkQuickAction';

const getLinksListViewColumnData = (props) => {
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

<<<<<<< HEAD
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

const FilterComponent = ({ filterText, onFilter, onClear, bulkActionData, deleteLinkHandler }) => {
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
					defaultValue={{ value: '', label: 'Categories' }}
					options={[{ value: 'shop', label: 'shop' }]}
				/>
				<Select
					className="btl-list-view-select btl-sort-selector"
					classNamePrefix="btl-react-select"
					defaultValue={{ value: '', label: 'Short by Clicks' }}
					options={[
						{ value: 'unique', label: 'Unique Clicks' },
						{ value: 'clicks', label: 'All Clicks' },
					]}
				/>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					defaultValue={{ value: '', label: 'All Dates' }}
					options={[{ value: 'Jan 2021', label: 'Unique Clicks' }]}
				/>
				<input className="btl-link-input-field" placeholder="Links to Show" />
				<button className="btl-link-filter-button">Filter</button>
			</div>
		</React.Fragment>
	);
};

=======
>>>>>>> 9398ec2163ef2a41c3e265b95c9860e095505fcc
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

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<LinksListViewFilter
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
						columns={getLinksListViewColumnData(props)}
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
