import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Line } from 'react-chartjs-2';
import { DateRangePicker } from 'react-date-range';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { subDays } from 'date-fns';
import { API, namespace } from './../../utils/helper';
import { formatDate, insertOverlayElement, removeOverlayElement } from '../../utils/helper';
import { fetchCustomClicksData } from '../../redux/actions/clicks.actions';

const Graph = (props) => {
	const data = {
		labels: Object.keys(props.data),
		datasets: [
			{
				label: 'Clicks',
				fill: true,
				backgroundColor: 'rgba(129, 162, 255,0.4)',
				defaultFontColor: '#000',
				borderColor: '#2a62ff',
				borderCapStyle: 'butt',
				pointBorderColor: 'rgba(129, 162, 255,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(129, 162, 255,1)',
				pointHoverBorderColor: 'rgba(129, 162, 255,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 5,
				pointHitRadius: 5,
				data: Object.values(props.data),
			},
		],
	};
	const options = {
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
	const [filterButtonText, setFilterButtonText] = useState('Filter');
	const [isOpenCustomDateFilter, setOPenCustomDateFilter] = useState(false);
	const [customDateFilter, setCustomDateFilter] = useState([
		{
			startDate: betterLinksHooks.applyFilters('betterLinksAnalyticsFilterStartDate', subDays(new Date(), 30)),
			endDate: new Date(),
			key: 'selection',
		},
	]);

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
		setFilterButtonText('Filtering...');
		try {
			const res = await API.get(endPoint, {
				params: { from: formatDate(customDateFilter[0].startDate, 'yyyy-mm-dd'), to: formatDate(customDateFilter[0].endDate, 'yyyy-mm-dd') },
			});
			props.fetchCustomClicksData(res.data);
			setFilterButtonText('Done!');
			window.setTimeout(function () {
				setFilterButtonText('Filter');
			}, 3000);
		} catch (e) {
			console.log(e);
		}
	};

	const closeDatePicker = () => {
		removeOverlayElement();
		setOPenCustomDateFilter(false);
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
				<Line data={data} options={options} />
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	clicks: state.clicks,
});

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCustomClicksData: bindActionCreators(fetchCustomClicksData, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
