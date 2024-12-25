import React, { useContext } from 'react';
import ReactECharts from 'echarts-for-react';
import { OrderContext } from "../../context/Orders.tsx";
import { getOrderCountByArea } from '../helpers/order.tsx';
import {useNavigate} from 'react-router-dom'

const PieChart = () => {
  const { ordersData } = useContext(OrderContext);

  // Initialize the history object for navigation
  const navigate=useNavigate();

  // Transform the data to match ECharts pie chart format
  const data = getOrderCountByArea(ordersData).map(item => ({
    name: item.Area,
    value: item.orderCount
  }));

  // Define the option for the chart
  const options = {
    title: {
      text: 'Area-wise Order Sales',
      left: 'center',
      top: '55%',
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
    },
    series: [
      {
        name: 'Orders',
        type: 'pie',
        radius: ['50%', '80%'],
        startAngle: 180, // Start from the bottom
        center: ['50%', '60%'], // Align in the center
        data: data, // Updated data format
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

  // Handle chart click events
  const handleChartClick = (params: any) => {
    // Extract the information about the clicked sector
    const { name, value, percent } = params.data;

    // Log or process the clicked sector's details
    console.log(`Clicked on: ${name}`);
    console.log(`Value: ${value}`);
    console.log(`Percentage: ${percent}%`);

    // Redirect to /customers
    navigate(`/customers/areawise/${name}`)
  };

  // Set up the events for the chart (e.g., when a sector is clicked)
  const onEvents = {
    'click': handleChartClick,
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: '400px', width: '100%' }}
      onEvents={onEvents} // Attach the event listener
    />
  );
};

export default PieChart;
