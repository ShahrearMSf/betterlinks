import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatDate } from '../../utils/helper';
import { fetch_clicks_data } from '../../redux/actions/clicks.actions';

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
						steps: 10,
						stepSize: 20,
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
	const currentDate = new Date();
	let pastDate = new Date();
	pastDate = pastDate.setDate(currentDate.getDate() - 30);
	const [dateFrom, setDateFrom] = useState(new Date(pastDate));
	const [dateTo, setDateTo] = useState(new Date());
	return (
		<React.Fragment>
			<div className="btl-analytics-filter">
				<h3 className="btl-analytics-filter__heading">{__('BetterLinks: All clicks on all links between', 'betterlinks')}</h3>
				<div className="btl-analytics-filter__control">
					<DatePicker onChange={setDateFrom} value={dateFrom} format={'y-MM-dd'} clearIcon={false} calendarIcon={false} />
					{__('From', 'betterlinks')}
					<DatePicker onChange={setDateTo} value={dateTo} format={'y-MM-dd'} clearIcon={false} calendarIcon={false} />
					<button
						className="btl-filter-action"
						onClick={() => {
							props.fetch_clicks_data({ from: formatDate(dateFrom, 'yyyy-mm-dd'), to: formatDate(new Date(dateTo), 'yyyy-mm-dd') });
						}}
					>
						Filter
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
		fetch_clicks_data: bindActionCreators(fetch_clicks_data, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
