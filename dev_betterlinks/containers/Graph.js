import React, { useState } from 'react';
import axios from 'axios';
import { __ } from '@wordpress/i18n';
import { Line } from 'react-chartjs-2';
import { DateRangePicker } from 'react-date-range';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays } from 'date-fns';
import { API, getDataset, is_extra_data_tracking_compatible, is_pro_enabled, namespace } from 'utils/helper';
import { formatDate, betterlinks_nonce, insertOverlayElement, removeOverlayElement } from 'utils/helper';
import { fetchCustomClicksData } from 'redux/actions/clicks.actions';

import Chart from 'react-apexcharts';
import TopAnalyticsChartTeaser from 'components/Teasers/Analytics/TopAnalyticsChartTeaser';

const Graph = (props) => {
	const { customDateFilter, setCustomDateFilter, extraAnalytics } = props;
	const { darkMode } = props.activity;
	const id = betterLinksQuery.get('id');
	const labels = Object.keys(props.data.clicks)
		?.reverse?.()
		?.map?.((item) => {
			const splitted = item.split('-');
			return `${splitted[1]}-${splitted[2]}-${splitted[0]}`;
		});
	const data = {
		labels,
		datasets: getDataset(props.data),
	};
	const options = {
		plugins: {
			legend: {
				labels: {
					color: darkMode ? '#fff' : '#252525',
				},
			},
		},
		maintainAspectRatio: false,
		responsive: true,
		aspectRatio: 2,
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
						steps: 20,
						stepSize: 500,
					},
				},
			],
		},
		tooltips: {
			backgroundColor: 'rgb(255, 255, 255)',
			titleFontColor: '#000',
			callbacks: {
				labelColor: function (tooltipItem, chart) {
					return {
						borderColor: '#2a62ff',
						backgroundColor: '#2a62ff',
					};
				},
				labelTextColor: function (tooltipItem, chart) {
					return '#000';
				},
			},
		},
	};
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
		let endPoint = betterLinksHooks.applyFilters('betterLinksFetchClicksData', namespace + 'clicks');
		setFilterButtonText(__('Filtering...', 'betterlinks'));
		try {
			const res = await API.get(endPoint, {
				params: { from: formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'), to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd') },
			});
			setTimeout(function () {
				props.fetchCustomClicksData(res.data);
				setFilterButtonText(__('Done!', 'betterlinks'));
				setTimeout(function () {
					setFilterButtonText(__('Filter', 'betterlinks'));
				}, 3000);
			}, 1000);
		} catch (e) {
			let form_data = new FormData();
			form_data.append('action', 'betterlinks/admin/fetch_analytics');
			form_data.append('security', betterlinks_nonce);
			form_data.append('from', formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'));
			form_data.append('to', formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd'));
			await axios.post(ajaxurl, form_data).then(
				(response) => {
					if (response.data) {
						setTimeout(function () {
							props.fetchCustomClicksData(response.data);
							setFilterButtonText(__('Done!', 'betterlinks'));
							setTimeout(function () {
								setFilterButtonText(__('Filter', 'betterlinks'));
							}, 3000);
						}, 1000);
					}
				},
				(error) => {
					console.log(error);
				}
			);
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
									<span className="dashicons dashicons-no-alt"></span>
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
				<Chart options={dataOptions.options} series={dataOptions.series} type="area" height="350" />
				{!id && betterLinksHooks.applyFilters('BetterlinksAnalyticsChart', !is_extra_data_tracking_compatible && <TopAnalyticsChartTeaser />, extraAnalytics)}
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
