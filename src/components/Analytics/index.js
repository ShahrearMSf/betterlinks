import React from 'react';
import LineChart from './../LineChart';

const Analytics = (props) => {
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
	return (
		<React.Fragment>
			<div className="btl-analytics-chart">
				<LineChart data={data.datasets[0].data} title={data.labels} color="#3E517A" />
			</div>
		</React.Fragment>
	);
};
export default Analytics;
