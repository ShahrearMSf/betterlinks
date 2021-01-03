import React from 'react'
import { Line } from 'react-chartjs-2'
const Analytics = (props) => {
    const data = {
        labels: Object.keys(props.data),
        datasets: [
            {
                label: 'Clicks',
                fill: true,
                lineTension: 10,
                backgroundColor: 'rgba(129, 162, 255,0.4)',
                defaultFontColor: '#000',
                borderColor: '#2a62ff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
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
    }

    const options = {
        tooltips: {
            backgroundColor: 'rgb(255, 255, 255)',
            titleFontColor: '#000',
            callbacks: {
                labelColor: function (tooltipItem, chart) {
                    return {
                        borderColor: '#2a62ff',
                        backgroundColor: '#2a62ff',
                    }
                },
                labelTextColor: function (tooltipItem, chart) {
                    return '#000'
                },
            },
        },
    }

    return (
        <React.Fragment>
            <Line data={data} options={options} />
        </React.Fragment>
    )
}
export default Analytics
