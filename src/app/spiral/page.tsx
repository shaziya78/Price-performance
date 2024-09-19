"use client";
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartData {
  series: number[];
  labels: string[];
}

const page: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/pie.json');
      const data: ChartData = await response.json();
      setChartData(data);
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <div>Loading...</div>; 
  }

  const options: ApexOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%',
        },
        track: {
          background: '#F2F4F7',
          strokeWidth: '100%',
          margin: 10,
        },
        dataLabels: {
          show: false,
        },
        endAngle: 360,
      },
    },
    stroke: {
      lineCap: 'round',
    },
    colors: ['#9B8AFB', '#FDA29B', '#36BFFA'],
    labels: chartData.labels, 
  };

  return (
    <div className="relative bg-white w-[442.67px] h-[424px] border border-1 border-[#E4E7EC] rounded-xl">
      <div className="w-full flex items-center justify-start p-4">
        <h1 className="text-xl font-bold text-[#475467] text-[16px] leading-6 font-semibold">Category</h1>
      </div>
      <div className="flex justify-center">
        <Chart options={options} series={chartData.series} type="radialBar" height={350} />
      </div>

      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-[40px]">
        <div className="absolute" style={{ top: '58%', left: '32.9%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <span className="text-[#475467] text-[12px] font-semibold leading-5">{chartData.series[0]}%</span>
        </div>
        <div className="absolute" style={{ top: '52%', left: '64.2%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <span className="text-[#475467] text-[12px] font-semibold">{chartData.series[1]}%</span>
        </div>
        <div className="absolute" style={{ top: '33.2%', left: '60%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <span className="text-[#475467] text-[12px] font-semibold">{chartData.series[2]}%</span>
        </div>
      </div>

      <div className="mt-8 flex space-x-[16px] text-sm leading-5 font-normal text-[#475467] justify-center p-[24px]">
        {chartData.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <span className="w-4 h-4 inline-block rounded rounded-sm mr-3" style={{ backgroundColor: options.colors?.[index] }}></span>
            <span className="text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
