import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import TableLoader from 'components/Loader/TableLoader';
import DataTable from 'react-data-table-component';
import FilterComponent from '../FilterComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { betterlinks_nonce, formatDate, paginationPerPageCount } from 'utils/helper';
import { fetch_clicks_data, searchClicksData, delete_clicks, delete_links_analytics } from 'redux/actions/clicks.actions';
import { getData } from '../clicks.helper';

const DataList = (props) => {
	const { columns, data, progressPending, id = null, from = null, customDateFilter } = props;
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [searchStatus, setSearchStatus] = useState(false);
	const [isSearching, setSearching] = useState(false);
	const [filterText, setFilterText] = useState('');
	const [selectedRows, setSelectedRows] = useState([]);
	const [bulkAction, setBulkAction] = useState({});
	const [toggledClearRows, setToggledClearRows] = useState(false);
	const [warning, setWarning] = useState(false);
	const { analyticsTab } = props.activity;
	const { analytics } = props.analytics;

	useEffect(() => {
		if (!analytics) props.fetch_analytics_settings();
	}, []);

	const handleRowsSelect = (state) => {
		setSelectedRows(state.selectedRows);
	};

	const rowDeleteHandler = () => {
		if (bulkAction.value === 'delete') {
			setWarning(false);
			setToggledClearRows(!toggledClearRows);

			// Check if we're in Link List mode (no id prop) or Single Link mode (with id prop)
			if (id) {
				// Single Link Analytics mode - delete individual clicks
				const deleteItemIds = selectedRows.map((item) => item.ID);
				let deleteParams = { click_ids: deleteItemIds, link_id: id };
				if (customDateFilter && customDateFilter[0]) {
					deleteParams.from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
					deleteParams.to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
				}
				props.delete_clicks(deleteParams);
			} else {
				// Link List mode - delete analytics for multiple links
				const deleteLinkIds = selectedRows.map((item) => item.link_id);
				let deleteParams = { link_ids: deleteLinkIds };
				if (customDateFilter && customDateFilter[0]) {
					deleteParams.from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
					deleteParams.to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');
				}
				props.delete_links_analytics(deleteParams);
			}

			setBulkAction({});
			setSelectedRows([]);
			return;
		}
		setWarning(true);
	};

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};
		const searchClickHandler = (e) => {
			e.preventDefault();
			if (filterText) {
				setSearchStatus(true);
				props.searchClicksData(betterlinks_nonce, filterText).then(() => {
					setSearchStatus(false);
					setSearching(true);
				});
			}
		};
		const resetSearch = () => {
			setSearching(false);
			setFilterText('');
			if (customDateFilter && customDateFilter[0]) {
				const filterDate = { from: formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'), to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd') };
				props.fetch_clicks_data(filterDate);
			} else {
				props.fetch_clicks_data({});
			}
		};

		return (
			<FilterComponent
				onFilter={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
				searchClickHandler={searchClickHandler}
				searchStatus={searchStatus}
				isSearching={isSearching}
				resetSearch={resetSearch}
				analytics={analytics}
				update_analytics_settings={props.update_analytics_settings}
				id={id}
				analyticsTab={analyticsTab}
				update_activity={props.update_activity}
				selectedRows={selectedRows}
				bulkAction={bulkAction}
				setBulkAction={setBulkAction}
				rowDeleteHandler={rowDeleteHandler}
				warning={warning}
			/>
		);
	}, [filterText, resetPaginationToggle, searchStatus, isSearching, analytics, analyticsTab, id, selectedRows.length, bulkAction, warning]);

	return (
		<DataTable
			className="btl-analytic-table"
			title={__('Single Clicks', 'betterlinks')}
			columns={columns}
			data={getData(data, analyticsTab, filterText, id, from)}
			pagination
			progressPending={progressPending}
			progressComponent={<TableLoader />}
			paginationResetDefaultPage={resetPaginationToggle}
			subHeader
			subHeaderComponent={subHeaderComponentMemo}
			persistTableHead
			defaultSortFieldId="name"
			paginationRowsPerPageOptions={paginationPerPageCount}
			onChangeRowsPerPage={(rpp) => localStorage.setItem('btlAnalyticsRowsPerPage', rpp)}
			paginationPerPage={+localStorage.getItem('btlAnalyticsRowsPerPage') || 10}
			selectableRows
			selectableRowsVisibleOnly
			onSelectedRowsChange={(e) => handleRowsSelect(e)}
			clearSelectedRows={toggledClearRows}
		/>
	);
};
const mapStateToProps = (state) => ({
	analytics: state.analytics,
	activity: state.activity,
});
const mapDispatchToProps = (dispatch) => ({
	searchClicksData: bindActionCreators(searchClicksData, dispatch),
	fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	fetch_analytics_settings: bindActionCreators(fetch_analytics_settings, dispatch),
	update_analytics_settings: bindActionCreators(update_analytics_settings, dispatch),
	delete_clicks: bindActionCreators(delete_clicks, dispatch),
	delete_links_analytics: bindActionCreators(delete_links_analytics, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(DataList);
