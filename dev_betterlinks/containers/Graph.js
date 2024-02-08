import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Chart from 'react-apexcharts';
import { DateRangePicker } from 'react-date-range';
import { getDataset, get_labels, is_extra_data_tracking_compatible, is_pro_enabled, plugin_root_url, formatDate, insertOverlayElement, removeOverlayElement } from 'utils/helper';
import {
	fetchCustomClicksData,
	fetch_clicks_data,
	fetch_individual_clicks,
	get_analytics_graph_by_tag,
	get_analytics_unique_list_by_id,
	get_chart_data,
	get_graph_data,
	get_medium_data,
} from 'redux/actions/clicks.actions';
import TopAnalyticsChartTeaser from 'components/Teasers/Analytics/TopAnalyticsChartTeaser';
import GraphTeaser from './Clicks/GraphTeaser';
import ChartLoader from './Clicks/ChartLoader';

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
		activity,
	} = props;
	const id = betterLinksQuery.get('id');
	const tag_id = betterLinksQuery.get('tag_id');
	const labels = get_labels(is_pro_enabled ? props.data.clicks : []);

	const [filterButtonText, setFilterButtonText] = useState(__('Filter', 'betterlinks'));
	const [isOpenCustomDateFilter, setOPenCustomDateFilter] = useState(false);

	const { darkMode } = activity;

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
			if (id && is_pro_enabled) {
				props.fetch_individual_clicks({ link_id: id, from, to, setLoading });
			}

			if (tag_id) {
				props.get_analytics_graph_by_tag({ from, to, tag_id, setLoading });
				props.get_analytics_unique_list_by_id({ from, to, tag_id, setLoading });
			}
			setTimeout(function () {
				setFilterButtonText(__('Done!', 'betterlinks'));
				setTimeout(function () {
					setFilterButtonText(__('Filter', 'betterlinks'));
				}, 3000);
			}, 1000);
		} catch (e) {
			console.log({ error: e.message });
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
				size: 5,
			},
			legend: {
				position: 'top',
			},
		},
		series: getDataset(props.data),
	};

	return (
		<div>
			<div className="btl-analytics-filter">
				<h3 className="btl-analytics-filter__heading">{__('Click Analytics', 'betterlinks')}</h3>
				<div className="btl-analytics-filter__control">
					<button onClick={customCalendarToggleHandler} className="btl-list-view-calendar">
						<span className="dashicons dashicons-calendar" />
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
				<div className={`btl-analytics-chart-line${!is_pro_enabled && id ? ' btl-analytics-chart-line-teaser' : ''}`}>
					{!is_pro_enabled && id ? (
						<img className="btl-analytics-chart-image" src={plugin_root_url + 'assets/images/teasers/individual-analytics.png'} />
					) : (
						<Chart options={dataOptions.options} series={dataOptions.series} type="area" height="350" />
					)}
					{id && <GraphTeaser />}
				</div>
				{is_pro_enabled && chartLoading ? (
					<ChartLoader />
				) : (
					!id &&
					!tag_id &&
					betterLinksHooks.applyFilters('BetterlinksAnalyticsChart', !is_extra_data_tracking_compatible && <TopAnalyticsChartTeaser darkMode={darkMode} />, extraAnalytics)
				)}
			</div>
		</div>
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
		get_analytics_graph_by_tag: bindActionCreators(get_analytics_graph_by_tag, dispatch),
		get_analytics_unique_list_by_id: bindActionCreators(get_analytics_unique_list_by_id, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
