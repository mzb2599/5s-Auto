import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { registerMap } from 'echarts/core';

// Example of how to register the map
import maharashtraMap from './maharashtra.json';

registerMap('Maharashtra', maharashtraMap);
const MaharashtraSalesMap = () => {
    const getOption = () => {
        return {
            title: {
                text: 'Area-wise Sales in Maharashtra',
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    // Check if params.data exists
                    if (params.data) {
                      const { name, value } = params.data;
                      return `${name}: ${value} Sales`;
                  }
                  return '';
                },
            },
            visualMap: {
                min: 0,
                max: 1000, // Set this to the max sales figure
                left: 'left',
                top: 'bottom',
                text: ['High', 'Low'], // Text for visual map
                calculable: true,
                inRange: {
                    color: ['#f7f7f7', '#ff6666'], // Gradient color range
                },
            },
            series: [
                {
                    name: 'Sales',
                    type: 'map',
                    map: 'Maharashtra', // Ensure the map is registered
                    roam: true,
                    label: {
                        show: true,
                    },
                    data: [
                        { name: 'Mumbai', value: 500 },
                        { name: 'Pune', value: 300 },
                        { name: 'Nagpur', value: 200 },
                        { name: 'Thane', value: 400 },
                        { name: 'Nashik', value: 250 },
                        // Add more areas as needed
                    ],
                },
            ],
        };
    };

    return (
        <ReactECharts
            option={getOption()}
            style={{ height: '500px', width: '100%' }}
        />
    );
};

export default MaharashtraSalesMap;
