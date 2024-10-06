import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Graph = () => {
  const chartRef = useRef(null);
  const alertData = useSelector((state) => state.alerts.data);
  const dispatch = useDispatch();

  const options = {
    chart: {
      type: 'line',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      style: {
        fontFamily: 'Arial, sans-serif'
      }
    },
    title: {
      text: 'Transparent Line Chart',
      style: { color: '#ffffff' }
    },
    xAxis: {
      type: 'datetime',
      labels: {
        style: { color: '#ffffff' }
      },
      lineColor: '#ffffff',
      tickColor: '#ffffff'
    },
    yAxis: {
      title: {
        text: 'Value',
        style: { color: '#ffffff' }
      },
      labels: {
        style: { color: '#ffffff' }
      },
      gridLineColor: 'rgba(255, 255, 255, 0.1)'
    },
    series: [{
      name: 'Alerts',
      data: alertData.map((value, index) => [Date.now() - (alertData.length - 1 - index) * 1000, value]),
      color: 'rgba(75, 192, 192, 1)',
      fillColor: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, 'rgba(75, 192, 192, 0.8)'],
          [1, 'rgba(75, 192, 192, 0)']
        ]
      }
    }],
    legend: {
      itemStyle: { color: '#ffffff' },
      itemHoverStyle: { color: '#dddddd' }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      style: { color: '#ffffff' }
    },
    credits: {
      enabled: false
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      if (chart.series[0]) {
        const seriesData = alertData.map((value, index) => [Date.now() - (alertData.length - 1 - index) * 1000, value]);
        chart.series[0].setData(seriesData, true, true);
      }
    }
  }, [alertData]);

  const addDataPoint = () => {
    const newValue = Math.random() * 100;
    dispatch({ type: 'ADD_ALERT', payload: newValue });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={addDataPoint}
      >
        Add Random Data Point
      </button>
    </div>
  );
};

export default Graph;