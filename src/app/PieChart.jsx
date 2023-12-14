import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({countData}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Get the context of the canvas element
        const ctx = chartRef.current.getContext('2d');

        const data = {
            labels: ['Blocked', 'Active', 'Inactive'],
            datasets: [
                {
                    label: 'Dataset 1',
                    data: countData,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(54, 162, 235)'
                    ]
                }
            ]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Contacts by Status'
                    }
                }
            },
        };

        const myPieChart = new Chart(ctx, config);

        return () => {
            myPieChart.destroy();
        };
    }, []);

    return (
        <div>
            <canvas ref={chartRef} width="400" height="400"></canvas>
        </div>
    );
};

export default PieChart;
