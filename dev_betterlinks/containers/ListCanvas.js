import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataTable from 'react-data-table-component';
import { subDays } from 'date-fns';
import { dateI18n } from '@wordpress/date';
import LinkCopyUrl from 'components/LinkCopyUrl';
import LinksFilter from 'components/LinksFilter';
import { linksFilterData, insertOverlayElement, analytic, get_tags, betterlinks_date_format, paginationPerPageCount } from 'utils/helper';
import { fetch_links_data, add_new_cat, add_new_link, edit_link, delete_link } from 'redux/actions/links.actions';
import { fetch_settings_data, fetch_tracking_settings } from 'redux/actions/settings.actions';
import { fetch_terms_data } from 'redux/actions/terms.actions';
import LinkQuickAction from 'components/LinkQuickAction';
import FavoriteIcon from 'components/FavoriteIcon';
import TableLoader from 'components/Loader/TableLoader';
import { useBtlExpireStatusDot } from 'utils/customHooks';
import { fetch_links_password } from 'redux/actions/password.actions';
import { fetch_meta_tags } from 'redux/actions/metaTags.actions';
import Link from 'containers/Link';

const getLinksListViewColumnData = (props) => {
	const is_allow_qr = props?.settings?.settings?.is_allow_qr;
	return [
		{
			name: __('Title', 'betterlinks'),
			selector: 'link_title',
			sortable: false,
			width: '255px',
			cell: (row) => {
				const expireStatusDot = useBtlExpireStatusDot({ data: row, view: 'list' });
				return (
					!!row.link_title && (
						<>
							<FavoriteIcon data={row} />
							{expireStatusDot}
							<Link catId={parseInt(row.cat_id)} catName={''} data={row} submitHandler={props.edit_link}>
								<div className="btl-link-title">{row.link_title}</div>
							</Link>
						</>
					)
				);
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
			name: __('Target URL', 'betterlinks'),
			selector: 'target_url',
			sortable: false,
			// width: '450px',
			cell: (row) => {
				return (
					<div className="btl-short-url-wrapper">
						<span className="btl-short-url btl-truncate" title={row.target_url}>
							{row.target_url}
						</span>
						<a className="dnd-link-button" href={row.target_url} target="_blank">
							<i className="btl btl-visit-url" />
						</a>
					</div>
				);
			},
		},
		{
			name: __('Redirect Type', 'betterlinks'),
			selector: 'redirect_type',
			sortable: false,
			width: '80px',
			cell: (row) => <div>{row.redirect_type == 'cloak' ? 'Cloaked' : row.redirect_type}</div>,
		},
		{
			name: __('Clicks', 'betterlinks'),
			selector: '',
			sortable: false,
			width: '120px',
			cell: (row) => (
				<div>
					{row.analytic ? (
						<button className="dnd-link-button btl-tooltip">
							<span className="btl-tooltiptext">{__('Clicks: ', 'betterlinks') + row.analytic.link_count + ' / ' + __('Unique Clicks: ', 'betterlinks') + row.analytic.ip}</span>
							<span className="icon">{analytic(row.analytic, row.ID)}</span>
						</button>
					) : (
						<button className="dnd-link-button btl-tooltip">
							<span className="btl-tooltiptext">{__('Clicks: 0 / ', 'betterlinks') + __('Unique Clicks: 0', 'betterlinks')}</span>
							<span className="icon">{__('0/0', 'betterlinks')}</span>
						</button>
					)}
				</div>
			),
		},
		{
			name: __('Date', 'betterlinks'),
			selector: 'link_date',
			sortable: false,
			width: '120px',
			cell: (row) => <div>{dateI18n(betterlinks_date_format || 'F j, Y', new Date(row.link_date))}</div>,
		},
		{
			name: __('Action', 'betterlinks'),
			selector: '',
			sortable: false,
			width: '150px',
			cell: (row) => (
				<div className="btl-list-view-action-wrapper">
					<LinkQuickAction
						isAlowQr={is_allow_qr}
						isShowVisitLink={true}
						isShowAnalytics={false}
						isShowCopyLink={false}
						catId={parseInt(row.cat_id)}
						submitLinkHandler={props.edit_link}
						deleteLinkHandler={props.delete_link}
						addNewLink={props.add_new_link}
						data={row}
						isShowEditLink={betterLinksHooks.applyFilters('betterLinksIsShowViewLink', true)}
						isShowDeleteLink={betterLinksHooks.applyFilters('betterLinksIsShowDeleteLink', true)}
					/>
				</div>
			),
		},
	];
};

const ListCanvas = (props) => {
	const { links } = props.links;
	const { settings } = props.settings;
	const { terms } = props.terms;
	const { password } = props.password;
	const { metaTags } = props.metaTags;
	const [bulkActionData, setBulkActionData] = useState({});
	const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [selectedCategory, setCategory] = useState(null);
	const [selectedTag, setTag] = useState(null);
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
	const [toggledClearRows, setToggledClearRows] = useState(false);

	const { sortByFav } = props.favouriteSort;

	useEffect(() => {
		if (!links) {
			props.fetch_links_data();
		}
		if (!settings) {
			props.fetch_settings_data();
			props.fetch_tracking_settings();
		}
		if (!terms) {
			props.fetch_terms_data();
		}
		if (!password) {
			props.fetch_links_password();
		}
		if (!metaTags) {
			props.fetch_meta_tags();
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

	const tags =
		links &&
		Object.entries(get_tags(links)).reduce((total, item) => {
			total = [...total, { value: item?.[0], label: item?.[1] }];
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
		setTag(null);
		setClicksType(null);
		setDateType(null);
		setIsOpenCustomDateFilter(false);
	};

	const onSelectedRowsChange = (e) => {
		setBulkActionData(e);
	};

	const handleClearRows = () => {
		setToggledClearRows(!toggledClearRows);
	};

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		return (
			<LinksFilter
				deleteLinkHandler={props.delete_link}
				catItems={categories}
				tagItems={tags}
				bulkActionData={bulkActionData}
				onFilter={(e) => setFilterText(e.target.value)}
				selectedCategory={selectedCategory}
				categorySelectHandler={setCategory}
				selectedTag={selectedTag}
				tagSelectHandler={setTag}
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
				setToggledClearRows={handleClearRows}
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
						data={linksFilterData(stored, filterText, selectedCategory, selectedClicksType, selectedDateType, customDateFilter, sortByFav, selectedTag)}
						pagination
						paginationResetDefaultPage={resetPaginationToggle}
						subHeader
						highlightOnHover
						onChangeRowsPerPage={(rpp) => localStorage.setItem('btlRowsPerPage', rpp)}
						paginationPerPage={+localStorage.getItem('btlRowsPerPage') || 10}
						subHeaderComponent={subHeaderComponentMemo}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => onSelectedRowsChange(e)}
						clearSelectedRows={toggledClearRows}
						paginationRowsPerPageOptions={paginationPerPageCount}
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
	settings: state.settings,
	terms: state.terms,
	favouriteSort: state.favouriteSort,
	password: state.password,
	metaTags: state.metaTags,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_links_data: bindActionCreators(fetch_links_data, dispatch),
		fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
		fetch_tracking_settings: bindActionCreators(fetch_tracking_settings, dispatch),
		add_new_cat: bindActionCreators(add_new_cat, dispatch),
		add_new_link: bindActionCreators(add_new_link, dispatch),
		edit_link: bindActionCreators(edit_link, dispatch),
		delete_link: bindActionCreators(delete_link, dispatch),
		fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
		fetch_links_password: bindActionCreators(fetch_links_password, dispatch),
		fetch_meta_tags: bindActionCreators(fetch_meta_tags, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCanvas);
