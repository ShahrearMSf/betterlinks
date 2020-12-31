import React from 'react'
import { Line } from 'react-chartjs-2'
const Analytics = (props) => {
    const data = {
        labels: Object.keys(props.data),
        datasets: [
            {
                label: 'BetterLinks: All clicks on all links between',
                fill: true,
                lineTension: 10,
                backgroundColor: 'rgba(129, 162, 255,0.4)',
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
    return (
        <React.Fragment>
            <Line data={data} />
        </React.Fragment>
    )
}
export default Analytics
