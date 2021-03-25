import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import { subDays } from 'date-fns';
import LinkCopyUrl from './../../components/LinkCopyUrl';
import LinksListViewFilter from './LinksListViewFilter';
import { linksFilterData, formatDate, route_path, insertOverlayElement } from './../../utils/helper';
import { fetch_links_data, add_new_cat, add_new_link, edit_link, delete_link } from './../../redux/actions/links.actions';
import LinkQuickAction from './../../components/LinkQuickAction';
import TableLoader from './../../components/Loader/TableLoader';

const getLinksListViewColumnData = (props) => {
	const analytic = (analytic, ID) => {
		let isLinkAble = betterLinksHooks.applyFilters('betterLinksIsEnableIndividualAnalytic', false);
		if (isLinkAble) {
			return <a href={route_path + 'admin.php?page=betterlinks-analytics&id=' + ID}>{analytic.link_count + '/' + analytic.ip.length}</a>;
		}
		return analytic.link_count + '/' + analytic.ip.length;
	};

	return [
		{
			name: __('Title', 'betterlinks'),
			selector: 'link_title',
			sortable: false,
			cell: (row) => {
				return row.link_title.length && <div className="btl-link-title" dangerouslySetInnerHTML={{ __html: row.link_title }}></div>;
			},
		},
		{
			name: __('Shortened URL', 'betterlinks'),
			selector: 'short_url',
			sortable: false,
			cell: (row) => {
				return <LinkCopyUrl shortUrl={row.short_url} />;
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
							<span className="icon">{analytic(row.analytic, row.ID)}</span>
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
					<LinkQuickAction
						isShowVisitLink={true}
						isShowAnalytics={false}
						isShowCopyLink={false}
						catId={parseInt(row.cat_id)}
						submitLinkHandler={props.edit_link}
						deleteLinkHandler={props.delete_link}
						data={row}
					/>
				</div>
			),
		},
	];
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
			startDate: subDays(new Date(), 30),
			endDate: new Date(),
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
			insertOverlayElement();
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
				customDateFilter={customDateFilter}
				setCustomDateFilter={setCustomDateFilter}
				isOpenCustomDateFilter={isOpenCustomDateFilter}
				setIsOpenCustomDateFilter={setIsOpenCustomDateFilter}
				onClear={handleClear}
				filterText={filterText}
				resetFilterHandler={resetFilterHandler}
			/>
		);
	}, [
		filterText,
		resetPaginationToggle,
		bulkActionData,
		delete_link,
		categories,
		customDateFilter,
		setCustomDateFilter,
		isOpenCustomDateFilter,
		setIsOpenCustomDateFilter,
		resetFilterHandler,
	]);

	return (
		<React.Fragment>
			<div className="btl-list-view">
				{links ? (
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
				) : (
					<TableLoader />
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
