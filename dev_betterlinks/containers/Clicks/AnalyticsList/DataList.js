import { __ } from '@wordpress/i18n';
import { useState, useEffect } from 'react';
import TableLoader from 'components/Loader/TableLoader';
import DataTable from 'react-data-table-component';
import FilterComponent from '../FilterComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { betterlinks_nonce, formatDate } from 'utils/helper';
import { fetch_clicks_data, searchClicksData } from 'redux/actions/clicks.actions';
import { getData } from '../clicks.helper';

const DataList = (props) => {
	const { columns, data, progressPending, id = null, from = null } = props;
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [searchStatus, setSearchStatus] = useState(false);
	const [isSearching, setSearching] = useState(false);
	const [filterText, setFilterText] = useState('');
	const { analyticsTab } = props.activity;
	const { analytics } = props.analytics;

	useEffect(() => {
		if (!analytics) props.fetch_analytics_settings();
	}, []);

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
			const filterDate = { from: formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'), to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd') };
			props.fetch_clicks_data(filterDate);
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
			/>
		);
	}, [filterText, resetPaginationToggle, searchStatus, setSearchStatus, isSearching, setSearching, analytics, analyticsTab, id]);

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
});
export default connect(mapStateToProps, mapDispatchToProps)(DataList);
