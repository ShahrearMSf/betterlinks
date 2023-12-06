import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { DateRangePicker } from 'react-date-range';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataset, is_extra_data_tracking_compatible } from 'utils/helper';
import { formatDate, insertOverlayElement, removeOverlayElement } from 'utils/helper';
import { fetchCustomClicksData, fetch_clicks_data, fetch_individual_clicks, get_chart_data, get_graph_data, get_medium_data } from 'redux/actions/clicks.actions';

import Chart from 'react-apexcharts';
import TopAnalyticsChartTeaser from 'components/Teasers/Analytics/TopAnalyticsChartTeaser';
import LineChartLoader from 'components/Loader/LineChartLoader';
import ChartLoader from 'components/Loader/ChartLoader';

const defaultFunc = () => {};
const Graph = (props) => {
	const {
		customDateFilter,
		setCustomDateFilter,
		extraAnalytics,
		chartLoading = false,
		setChartLoading = defaultFunc,
		setLoading = defaultFunc,
		setGraphLoading = defaultFunc,
		setMediumLoading = defaultFunc,
	} = props;
	const id = betterLinksQuery.get('id');
	const labels = Object.keys(props.data.clicks)
		?.reverse?.()
		?.map?.((item) => {
			const splitted = item.split('-');
			return `${splitted[1]}-${splitted[2]}-${splitted[0]}`;
		});

	const [filterButtonText, setFilterButtonText] = useState(__('Filter', 'betterlinks'));
	const [isOpenCustomDateFilter, setOPenCustomDateFilter] = useState(false);

	const dateRangePickerOnChangeHandler = (item) => {
		setCustomDateFilter([item.selection]);
		if (item.selection.endDate != item.selection.startDate) {
			removeOverlayElement();
			setOPenCustomDateFilter(false);
		}
	};

	const customCalendarToggleHandler = () => {
		insertOverlayElement();
		setOPenCustomDateFilter(!isOpenCustomDateFilter);
	};

	const filterHandler = async () => {
		setFilterButtonText(__('Filtering...', 'betterlinks'));
		try {
			const from = formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd');
			const to = formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd');

			if (!id) {
				props.fetch_clicks_data({ from, to, setLoading });
				props.get_graph_data({ from, to, setLoading: setGraphLoading });
				props.get_chart_data({ from, to, setLoading: setChartLoading });
				props.get_medium_data({ from, to, setLoading: setMediumLoading });
			}
			if (id) {
				props.fetch_individual_clicks({ link_id: id, from, to, setLoading });
			}
			setTimeout(function () {
				setFilterButtonText(__('Done!', 'betterlinks'));
				setTimeout(function () {
					setFilterButtonText(__('Filter', 'betterlinks'));
				}, 3000);
			}, 1000);
		} catch (e) {
			console.log({ error: e.message });
			// let form_data = new FormData();
			// form_data.append('action', 'betterlinks/admin/fetch_analytics');
			// form_data.append('security', betterlinks_nonce);
			// form_data.append('from', formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'));
			// form_data.append('to', formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd'));
			// await axios.post(ajaxurl, form_data).then(
			// 	(response) => {
			// 		if (response.data) {
			// 			setTimeout(function () {
			// 				props.fetchCustomClicksData(response.data);
			// 				setFilterButtonText(__('Done!', 'betterlinks'));
			// 				setTimeout(function () {
			// 					setFilterButtonText(__('Filter', 'betterlinks'));
			// 				}, 3000);
			// 			}, 1000);
			// 		}
			// 	},
			// 	(error) => {
			// 		console.log(error);
			// 	}
			// );
		}
	};

	const closeDatePicker = () => {
		removeOverlayElement();
		setOPenCustomDateFilter(false);
	};

	const dataOptions = {
		options: {
			chart: {
				id: 'analytics-click-count',
			},
			xaxis: {
				categories: labels,
			},
			stroke: {
				curve: 'smooth',
			},
			colors: ['#FF7818', '#6034E6'],
			markers: {
				// show: true,
				size: 5,
			},
			legend: {
				position: 'top',
			},
		},
		series: getDataset(props.data),
	};
	return (
		<React.Fragment>
			<div className="btl-analytics-filter">
				<h3 className="btl-analytics-filter__heading">{__('Click Analytics', 'betterlinks')}</h3>
				<div className="btl-analytics-filter__control">
					<button onClick={customCalendarToggleHandler} className="btl-list-view-calendar">
						<span className="dashicons dashicons-calendar"></span>
						{String(customDateFilter[0].startDate).slice(4, 15)} - {String(customDateFilter[0].endDate).slice(4, 15)}
					</button>
					{isOpenCustomDateFilter && (
						<div className="btl-date-range-picker-wrap">
							<div className="btl-date-range-picker">
								<button onClick={closeDatePicker} className="btn-date-range-close">
									<span className="dashicons dashicons-no-alt" />
								</button>
								<DateRangePicker
									onChange={(item) => dateRangePickerOnChangeHandler(item)}
									showSelectionPreview={true}
									moveRangeOnFirstSelection={false}
									months={2}
									ranges={customDateFilter}
									direction="horizontal"
								/>
							</div>
						</div>
					)}
					<button className="btl-filter-action" onClick={filterHandler}>
						{filterButtonText}
					</button>
				</div>
			</div>
			<div className="btl-analytics-chart">
				{dataOptions.series[0].data.length > 0 ? <Chart options={dataOptions.options} series={dataOptions.series} type="area" height="350" /> : <LineChartLoader />}
				{chartLoading ? (
					<ChartLoader />
				) : (
					!id && betterLinksHooks.applyFilters('BetterlinksAnalyticsChart', !is_extra_data_tracking_compatible && <TopAnalyticsChartTeaser />, extraAnalytics)
				)}
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
	activity: state.activity,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCustomClicksData: bindActionCreators(fetchCustomClicksData, dispatch),
		get_chart_data: bindActionCreators(get_chart_data, dispatch),
		get_graph_data: bindActionCreators(get_graph_data, dispatch),
		get_medium_data: bindActionCreators(get_medium_data, dispatch),
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
		fetch_individual_clicks: bindActionCreators(fetch_individual_clicks, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
