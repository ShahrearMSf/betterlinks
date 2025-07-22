import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { delete_tag, fetch_all_tags, fetch_all_categories, fetch_terms_data } from 'redux/actions/terms.actions';
import { useEffect } from 'react';
import TopBar from 'containers/TopBar';
import { __ } from '@wordpress/i18n';
import AddNewTags from 'containers/AddNewTags';
import AddNewCategories from 'containers/AddNewCategories';
import DataTable from 'react-data-table-component';
import TableLoader from 'components/Loader/TableLoader';
import TagQuickAction from 'containers/AddNewTags/TagQuickAction';
import CategoryQuickAction from 'containers/AddNewCategories/CategoryQuickAction';
import Select from 'react-select';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { is_extra_data_tracking_compatible, route_path, sortByClicksTag, sortByClicksCategory, sortFunction } from 'utils/helper';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ManageTags = (props) => {
	const { tags, tag_analytics, categories, category_analytics } = props.terms;
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	useEffect(() => {
		// Always fetch fresh data when component mounts
		props.fetch_all_tags();
		props.fetch_terms_data();
		props.fetch_all_categories();
	}, []);

	// Handle tab change to refresh data when switching to Categories Analytics
	const handleTabChange = (index) => {
		setActiveTabIndex(index);
		if (index === 1) { // Categories Analytics tab
			// Refresh categories data when switching to Categories Analytics tab
			props.fetch_all_categories();
		} else if (index === 0) { // Tags Analytics tab
			// Refresh tags data when switching to Tags Analytics tab
			props.fetch_all_tags();
		}
	};

	// Tags Component
	const TagsAnalytics = () => {
		const [bulkActionData, setBulkActionData] = useState({});
		const [toggledClearRows, setToggleClearRows] = useState(false);
		const [searchText, setSearchText] = useState('');
		const [selectedClicksType, setClicksType] = useState(null);

		const columns = [
			{
				name: __('Tags', 'betterlinks'),
				selector: 'tags',
				sortable: false,
				cell: (row) => (
					<AddNewTags tags={tags || []} icon={true} row={row}>
						{<div style={{ textDecoration: 'underline' }}>{row.term_name}</div>}
					</AddNewTags>
				),
			},
			{
				name: __('Link Count', 'betterlinks'),
				selector: 'link_count',
				...(is_extra_data_tracking_compatible && { sortFunction: sortFunction('link_count') }),
				cell: (row) => {
					return <div>{+(row?.link_count || 0)}</div>;
				},
			},
			{
				name: __('Analytics', 'betterlinks'),
				selector: 'link_count',
				sortable: false,
				cell: (row) => {
					const total_clicks = tag_analytics?.['total_clicks']?.[row.id] || 0;
					const unique_clicks = tag_analytics?.['unique_clicks']?.[row.id] || 0;
					return (
						<div>
							<button className="dnd-link-button btl-tooltip">
								<span className="btl-tooltiptext">
									Clicks: {total_clicks} / Unique Clicks: {unique_clicks}
								</span>
								{total_clicks > 0 ? (
									<Link to={route_path + 'admin.php?page=betterlinks-analytics&tag_id=' + row.id}>
										{total_clicks}/{unique_clicks}
									</Link>
								) : (
									<span>
										{total_clicks}/{unique_clicks}
									</span>
								)}
							</button>
						</div>
					);
				},
			},
			{
				name: __('Action', 'betterlinks'),
				selector: 'link_count',
				sortable: false,
				cell: (row) => {
					return (
						<TagQuickAction delete_tag={() => props.delete_tag([{ tag_id: row.id || row.ID }])}>
							<AddNewTags tags={tags || []} icon={true} row={row} />
						</TagQuickAction>
					);
				},
			},
		];

		const __handleSearch = (e) => {
			setSearchText(e.target.value);
		};

		const getFilteredTags = () => {
			const regex = new RegExp(searchText, 'gi');
			const matchedTags = (tags || [])?.filter((item) => {
				return (item?.term_slug || '').match(regex);
			});

			const sortedTags = sortByClicksTag(selectedClicksType?.value, matchedTags, tag_analytics);
			return Array.isArray(sortedTags) ? sortedTags : tags;
		};

		const subHeaderComponent = (
			<TagActions bulkActionData={bulkActionData} setToggledClearRows={() => setToggleClearRows(!toggledClearRows)} delete_tag={props.delete_tag}>
				<div className="btl-autolink-filter btl-click-filter">
					<input id="search_autolink" type="search" placeholder="Search Tags" value={searchText} onChange={__handleSearch} />
				</div>
				<Select
					className="btl-list-view-select btl-shortable-filter"
					classNamePrefix="btl-react-select"
					placeholder="Sort by Clicks"
					options={[
						{ value: 'total_clicks-desc', label: __('Most Clicks', 'betterlinks') },
						{ value: 'total_clicks-asc', label: __('Least Clicks', 'betterlinks') },
						{ value: 'unique_clicks-desc', label: __('Most Unique Clicks', 'betterlinks') },
						{ value: 'unique_clicks-asc', label: __('Least Unique Clicks', 'betterlinks') },
					]}
					value={selectedClicksType}
					onChange={(e) => setClicksType(e)}
					isClearable={true}
				/>
			</TagActions>
		);

		return (
			<div className="btl-list-view">
				{tags ? (
					<DataTable
						className="btl-list-view-table"
						columns={columns}
						data={getFilteredTags()}
						pagination
						subHeader
						highlightOnHover
						subHeaderComponent={subHeaderComponent}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => setBulkActionData(e)}
						clearSelectedRows={toggledClearRows}
					/>
				) : (
					<>
						<TableLoader />
					</>
				)}
			</div>
		);
	};

	// Categories Component
	const CategoriesAnalytics = () => {
		const [bulkActionData, setBulkActionData] = useState({});
		const [toggledClearRows, setToggleClearRows] = useState(false);
		const [searchText, setSearchText] = useState('');
		const [selectedClicksType, setClicksType] = useState(null);

		const columns = [
			{
				name: __('Categories', 'betterlinks'),
				selector: 'categories',
				sortable: false,
				cell: (row) => (
					<AddNewCategories categories={categories || []} icon={true} row={row}>
						{<div style={{ textDecoration: 'underline' }}>{row.term_name}</div>}
					</AddNewCategories>
				),
			},
			{
				name: __('Link Count', 'betterlinks'),
				selector: 'link_count',
				...(is_extra_data_tracking_compatible && { sortFunction: sortFunction('link_count') }),
				cell: (row) => {
					return <div>{+(row?.link_count || 0)}</div>;
				},
			},
			{
				name: __('Analytics', 'betterlinks'),
				selector: 'link_count',
				sortable: false,
				cell: (row) => {
					const total_clicks = category_analytics?.['total_clicks']?.[row.id] || 0;
					const unique_clicks = category_analytics?.['unique_clicks']?.[row.id] || 0;
					return (
						<div>
							<button className="dnd-link-button btl-tooltip">
								<span className="btl-tooltiptext">
									Clicks: {total_clicks} / Unique Clicks: {unique_clicks}
								</span>
								{total_clicks > 0 ? (
									<Link to={route_path + 'admin.php?page=betterlinks-analytics&category_id=' + row.id}>
										{total_clicks}/{unique_clicks}
									</Link>
								) : (
									<span>
										{total_clicks}/{unique_clicks}
									</span>
								)}
							</button>
						</div>
					);
				},
			},
			{
				name: __('Action', 'betterlinks'),
				selector: 'link_count',
				sortable: false,
				cell: (row) => {
					return (
						<CategoryQuickAction delete_tag={() => props.delete_tag([{ tag_id: row.id || row.ID }])}>
							<AddNewCategories categories={categories || []} icon={true} row={row} />
						</CategoryQuickAction>
					);
				},
			},
		];

		const __handleSearch = (e) => {
			setSearchText(e.target.value);
		};

		const getFilteredCategories = () => {
			const regex = new RegExp(searchText, 'gi');
			const matchedCategories = (categories || [])?.filter((item) => {
				return (item?.term_slug || '').match(regex);
			});

			const sortedCategories = sortByClicksCategory(selectedClicksType?.value, matchedCategories, category_analytics);
			return Array.isArray(sortedCategories) ? sortedCategories : categories;
		};

		const subHeaderComponent = (
			<CategoryActions bulkActionData={bulkActionData} setToggledClearRows={() => setToggleClearRows(!toggledClearRows)} delete_tag={props.delete_tag}>
				<div className="btl-autolink-filter btl-click-filter">
					<input id="search_categories" type="search" placeholder="Search Categories" value={searchText} onChange={__handleSearch} />
				</div>
				<Select
					className="btl-list-view-select btl-shortable-filter"
					classNamePrefix="btl-react-select"
					placeholder="Sort by Clicks"
					options={[
						{ value: 'total_clicks-desc', label: __('Most Clicks', 'betterlinks') },
						{ value: 'total_clicks-asc', label: __('Least Clicks', 'betterlinks') },
						{ value: 'unique_clicks-desc', label: __('Most Unique Clicks', 'betterlinks') },
						{ value: 'unique_clicks-asc', label: __('Least Unique Clicks', 'betterlinks') },
					]}
					value={selectedClicksType}
					onChange={(e) => setClicksType(e)}
					isClearable={true}
				/>
			</CategoryActions>
		);

		return (
			<div className="btl-list-view">
				{categories ? (
					<DataTable
						className="btl-list-view-table"
						columns={columns}
						data={getFilteredCategories()}
						pagination
						subHeader
						highlightOnHover
						subHeaderComponent={subHeaderComponent}
						persistTableHead
						selectableRows
						selectableRowsVisibleOnly
						onSelectedRowsChange={(e) => setBulkActionData(e)}
						clearSelectedRows={toggledClearRows}
					/>
				) : (
					<>
						<TableLoader />
					</>
				)}
			</div>
		);
	};

	return (
		<>
			<TopBar label={__('Manage Terms', 'betterlinks')} />
			<Tabs selectedIndex={activeTabIndex} onSelect={handleTabChange}>
				<TabList>
					<Tab>{__('Tags Analytics', 'betterlinks')}</Tab>
					<Tab>{__('Categories Analytics', 'betterlinks')}</Tab>
				</TabList>
				<TabPanel>
					<div style={{ marginTop: '20px' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
							<AddNewTags tags={tags} />
						</div>
						<TagsAnalytics />
					</div>
				</TabPanel>
				<TabPanel>
					<div style={{ marginTop: '20px' }}>
						<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
							<AddNewCategories categories={categories} />
						</div>
						<CategoriesAnalytics />
					</div>
				</TabPanel>
			</Tabs>
		</>
	);
};

const TagActions = (props) => {
	const [bulkAction, setBulkAction] = useState({});
	const [warning, setWarning] = useState(false);
	const handleDeleteTags = (bulkActionData) => {
		if (bulkAction.value !== 'delete') return setWarning(true);
		setWarning(false);
		const selectedTags = bulkActionData.selectedRows.map((item) => ({ tag_id: item.id || item.ID }));
		props.delete_tag(selectedTags, bulkAction);
		setBulkAction({});
		return props.setToggledClearRows();
	};

	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{props.bulkActionData && props.bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: __('Bulk Actions', 'betterlinks') }}
							value={bulkAction?.value ? bulkAction : { value: '', label: __('Bulk Actions', 'betterlinks') }}
							options={[{ value: 'delete', label: __('Delete', 'betterlinks') }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<div className="btl-tooltip">
							<button className="btl-link-apply-button" onClick={() => handleDeleteTags(props.bulkActionData)}>
								{__('Apply', 'betterlinks')}
							</button>
							{warning && bulkAction?.value !== 'delete' && <span className="btl-tooltiptext">{__('Please Select Action', 'betterlinks')}</span>}
						</div>
					</div>
				)}
				{props.children}
			</div>
		</React.Fragment>
	);
};

const CategoryActions = (props) => {
	const [bulkAction, setBulkAction] = useState({});
	const [warning, setWarning] = useState(false);
	const handleDeleteCategories = (bulkActionData) => {
		if (bulkAction.value !== 'delete') return setWarning(true);
		setWarning(false);
		const selectedCategories = bulkActionData.selectedRows.map((item) => ({ tag_id: item.id || item.ID }));
		props.delete_tag(selectedCategories, bulkAction);
		setBulkAction({});
		return props.setToggledClearRows();
	};

	return (
		<React.Fragment>
			<div className="btl-links-filter">
				{props.bulkActionData && props.bulkActionData.selectedCount > 0 && (
					<div className="btl-bulk-actions">
						<Select
							className="btl-list-view-select"
							classNamePrefix="btl-react-select"
							defaultValue={{ value: '', label: __('Bulk Actions', 'betterlinks') }}
							value={bulkAction?.value ? bulkAction : { value: '', label: __('Bulk Actions', 'betterlinks') }}
							options={[{ value: 'delete', label: __('Delete', 'betterlinks') }]}
							onChange={(e) => setBulkAction(e)}
						/>
						<div className="btl-tooltip">
							<button className="btl-link-apply-button" onClick={() => handleDeleteCategories(props.bulkActionData)}>
								{__('Apply', 'betterlinks')}
							</button>
							{warning && bulkAction?.value !== 'delete' && <span className="btl-tooltiptext">{__('Please Select Action', 'betterlinks')}</span>}
						</div>
					</div>
				)}
				{props.children}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	terms: state.terms,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_all_tags: bindActionCreators(fetch_all_tags, dispatch),
	fetch_all_categories: bindActionCreators(fetch_all_categories, dispatch),
	fetch_terms_data: bindActionCreators(fetch_terms_data, dispatch),
	delete_tag: bindActionCreators(delete_tag, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTags);
