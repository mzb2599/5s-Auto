import React from 'react';
import ReactECharts from 'echarts-for-react';

const HalfPieChart = () => {
    const data = [
        { value: 120, name: 'Area 1' },
        { value: 200, name: 'Area 2' },
        { value: 150, name: 'Area 3' },
        { value: 80, name: 'Area 4' },
        { value: 100, name: 'Area 5' },
      ];
  // Define the option for the chart
  const options = {
    title: {
      text: 'Area-wise Order Sales',
      left: 'center',
      top: '5%',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      //top:"10%",
      //bottom: '5%',
    },
    series: [
      {
        name: 'Orders',
        type: 'pie',
        radius: ['50%', '80%'],
        startAngle: 180, // Start from the bottom
        center: ['50%', '60%'], // Align in the center
        data: data,
        label: {
          show: true,
          formatter: '{b}: {c} ({d}%)',
        },
        labelLine: {
          show: true,
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />;
};

export default HalfPieChart;
