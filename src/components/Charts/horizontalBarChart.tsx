import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const HorizontalBarChart = () => {
    useEffect(() => {
        // Initialize the chart
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);

        // Specify the configuration options
        const option = {
            title: {
                text: 'Customer Orders in 2024',
                subtext: 'Comparison of New vs Existing Customers',
                left: 'center'
            },
            tooltip: {},
            legend: {
                data: ['New Customers', 'Existing Customers'],
                bottom: 'bottom'
            },
            xAxis: {
                type: 'value',
                name: 'Number of Orders'
            },
            yAxis: {
                type: 'category',
                data: [
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ]
            },
            series: [
                {
                    name: 'New Customers',
                    type: 'bar',
                    data: [120, 200, 150, 80, 70, 110, 
                           130, 150, 200, 250, 300, 400], // Example data
                    emphasis: {
                        focus: 'series'
                    }
                },
                {
                    name: 'Existing Customers',
                    type: 'bar',
                    data: [300, 350, 400, 450, 500, 600, 
                           700, 750, 800, 850, 900, 1000], // Example data
                    emphasis: {
                        focus: 'series'
                    }
                }
            ]
        };

        // Use the specified configuration to set the chart
        myChart.setOption(option);

        // Resize the chart when the window is resized
        window.addEventListener('resize', () => myChart.resize());

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', () => myChart.resize());
        };
    }, []);

    return <div id="main" style={{ width: '600px', height: '400px' }} />;
};

export default HorizontalBarChart;
