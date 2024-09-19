"use client";
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);


type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth?: number;
    borderColor?: string[];  
  }[];
};


const Page: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/input-materials');
      const jsonData = await response.json();

      const formattedData: ChartData = {
        labels: jsonData.labels,
        datasets: [
          {
            label: 'Input Materials',
            data: jsonData.values,
            backgroundColor: ['#00bfae', '#fa5252', '#4d96f3', '#fecd50'],
            borderColor: [], // Semi-transparent border color for each segment
            borderWidth: 5, // Adjust the border width as needed
       
          
          },
        ],
      };

      setChartData(formattedData);
    };

    fetchData();
  }, []);


  if (!chartData) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto my-4 ">
      <h2 className="text-xl font-semibold mb-4">Input Materials</h2>
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return `${label}: ${percentage}%`;
                },
              },
            },
            legend: {
              display: true,
              position: 'bottom', // This is the correct position type
              labels: {
                usePointStyle: true, // Use small circle icons for the labels
              },
            },
            datalabels: {
              formatter: (value: number, context: any) => {
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              color: '#fff',
              font: {
                size: 14,
              },
              anchor: 'center',
              align: 'center',
              
              
            },
          },
          rotation: -Math.PI / 5, 
          cutout: '30%', 
          
        
        }}
      />
    </div>
  );
};

export default Page;
