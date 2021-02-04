import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { site_url, formatDate } from './../../utils/helper';
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

const FilterComponent = ({ filterText, onFilter, onClear, bulkActionData, deleteLinkHandler, catItems, categorySelectHandler, dateHandler, clicksTypeHandler, limitHandler }) => {
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
					options={catItems}
					onChange={(e) => categorySelectHandler(e)}
				/>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					defaultValue={{ value: '', label: 'Short by Clicks' }}
					options={[
						{ value: 'mostClicks', label: 'Most Clicks' },
						{ value: 'leastClicks', label: 'Least Clicks' },
						{ value: 'mostUniqueClicks', label: 'Most Unique Clicks' },
						{ value: 'leastUniqueClicks', label: 'Least Unique Clicks' },
					]}
					onChange={(e) => clicksTypeHandler(e)}
				/>
				<Select
					className="btl-list-view-select"
					classNamePrefix="btl-react-select"
					defaultValue={{ value: '', label: 'All Dates' }}
					options={[
						{ value: 'mostRecent', label: 'Most Recent' },
						{ value: 'leastRecent', label: 'Least Recent' },
					]}
					onChange={(e) => dateHandler(e)}
				/>
				<input className="btl-link-input-field" placeholder="Links to Show" onChange={(e) => limitHandler(parseInt(e.target.value))} />
				<button className="btl-link-filter-button">Filter</button>
			</div>
		</React.Fragment>
	);
};

const ListCanvas = (props) => {
	const { links } = props.links;
	const [bulkActionData, setBulkActionData] = useState({});
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [selectedCategory, setCategory] = useState({});
	const [selectedClicksType, setClicksType] = useState({});
	const [selectedDateType, setDateType] = useState({});
	const [paginationPerPage, setPaginationPerPage] = useState(10);

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
				categorySelectHandler={setCategory}
				clicksTypeHandler={setClicksType}
				limitHandler={setPaginationPerPage}
				dateHandler={setDateType}
				onClear={handleClear}
				filterText={filterText}
			/>
		);
	}, [filterText, resetPaginationToggle, bulkActionData, delete_link, categories]);

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	const getData = () => {
		let results = stored;
		results = stored.filter((item) => item.link_title.toLowerCase().includes(filterText.toLowerCase()));
		if (selectedCategory.value) {
			results = results.filter((item) => item.cat_id == selectedCategory.value);
		}
		if (selectedClicksType.value == 'mostClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (parseInt(a.analytic.link_count) < parseInt(b.analytic.link_count) ? 1 : -1));
		}
		if (selectedClicksType.value == 'leastClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (parseInt(a.analytic.link_count) > parseInt(b.analytic.link_count) ? 1 : -1));
		}
		if (selectedClicksType.value == 'mostUniqueClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (a.analytic.ip.length < b.analytic.ip.length ? 1 : -1));
		}
		if (selectedClicksType.value == 'leastUniqueClicks') {
			results = results.filter((item) => item.analytic != undefined);
			results = results.sort((a, b) => (a.analytic.ip.length > b.analytic.ip.length ? 1 : -1));
		}
		if (selectedDateType.value == 'mostRecent') {
			results = results.sort((a, b) => new Date(b.link_date) - new Date(a.link_date));
		}
		if (selectedDateType.value == 'leastRecent') {
			results = results.sort((a, b) => new Date(a.link_date) - new Date(b.link_date));
		}
		return results;
	};

	return (
		<React.Fragment>
			<div className="btl-list-view">
				{links && (
					<DataTable
						className="btl-list-view-table"
						columns={getColumnData(props)}
						data={getData()}
						pagination
						paginationResetDefaultPage={resetPaginationToggle}
						subHeader
						subHeaderComponent={subHeaderComponentMemo}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => onSelectedRowsChange(e)}
						paginationPerPage={paginationPerPage}
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
