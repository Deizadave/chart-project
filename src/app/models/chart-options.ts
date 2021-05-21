import { ChartOptions } from 'chart.js';

export const CHART_OPTIONS: ChartOptions = {
    defaultColor: 'black',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        xAxes: [
            {
                type: 'time',
                time: {
                    unit: 'day'
                },
                ticks: {
                    maxTicksLimit: 10
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    reverse: true,
                    min: 1
                },
                gridLines: {
                    display: true,
                    color: "rgba(221,221,221,0.1)"
                },
            }
        ]
    },
    hover: {
        mode: 'dataset'
    }
};
