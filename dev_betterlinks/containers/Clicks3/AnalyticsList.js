import { __ } from '@wordpress/i18n';
import { useEffect, useCallback, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Internal Components
import DataTable from 'react-data-table-component';
// internal helpers
import { getColumns } from 'utils/helper';
import { fetch_settings_data } from 'redux/actions/settings.actions';
import { fetch_analytics_settings, update_analytics_settings } from 'redux/actions/analytics.actions';
import { getData } from './clicks.helper';
import TableLoader from 'components/Loader/TableLoader';

const AnalyticsList = (props) => {
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const [filterText, setFilterText] = useState('');
	const { id, analyticsTab, unique_list, loading, clicks } = props;
	const { individual_clicks } = clicks;
	const { settings } = props.settings;
	const { analytics } = props.analytics;

	useEffect(() => {
		if (!settings) props.fetch_settings_data();
		if (!analytics) props.fetch_analytics_settings();
	}, []);

	const columns = useCallback(getColumns(id, analytics, analyticsTab), [id, analytics, analyticsTab]);
	const newColumns = settings?.is_disable_analytics_ip ? columns.filter((item) => item.selector !== 'ip') : columns;
	const getDataCallback = useCallback(getData, [id]);

	const getClicksData = (id) => {
		if (!id) return unique_list;
		return individual_clicks?.[id] || [];
	};
	return (
		<>
			{/* <h1>Hello from list</h1> */}
			{unique_list ? (
				<DataTable
					className="btl-analytic-table"
					title={__('All Clicks', 'betterlinks')}
					columns={newColumns}
					data={getDataCallback(id, getClicksData(id), analyticsTab, filterText)}
					pagination
					progressPending={loading}
					progressComponent={<TableLoader />}
					paginationResetDefaultPage={resetPaginationToggle}
					subHeader
					// subHeaderComponent={subHeaderComponentMemo}
					persistTableHead
					defaultSortFieldId="name"
					striped
					highlightOnHover
				/>
			) : (
				<TableLoader />
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	settings: state.settings,
	analytics: state.analytics,
	clicks: state.clicks,
});
const mapDispatchToProps = (dispatch) => ({
	fetch_settings_data: bindActionCreators(fetch_settings_data, dispatch),
	fetch_analytics_settings: bindActionCreators(fetch_analytics_settings, dispatch),
	update_analytics_settings: bindActionCreators(update_analytics_settings, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(AnalyticsList);
