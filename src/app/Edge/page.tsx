import React from 'react'
import Image from 'next/image'
import pieChart from './pie chart.png';
import barChart from './bar chart.png';
import volume from './Volume.png'

const page = () => {
  return (
    <div className='h-screen bg-white text-black'>
      <div className='flex space-x-14 items-center justify-center px-6 py-6'>
        <div className='bg-[#FEF6EE] rounded-lg w-96 h-[100px] border border-[#FEE4E2] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'>
          <div className='flex gap-5 p-6'>
            <Image src={pieChart} alt='piechart' className='w-12'/>
            <div className='leading-[24px]'>
              <h2 className='text-[#475467] text-[12px] font-medium'>Market Size</h2>
              <h1 className='text-[#194185] font-bold text-[22px]'>$216M</h1>
            </div>
          </div>
        </div>

        {/* Second div */}
        <div className='bg-[#FEF6EE] rounded-lg w-96 h-[100px] border border-[#FEE4E2] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'>
          <div className='flex gap-5 p-6'>
            <Image src={barChart} alt='barchart' />
            <div className='leading-[24px]'>
              <h2 className='text-[#475467] text-[12px] font-medium'>CAGR Forecast</h2>
              <h1 className='text-[#194185] font-bold text-[22px]'>2.20%</h1>
            </div>
          </div>
        </div>

  
        <div className='bg-[#FEF6EE] rounded-lg w-96 h-[100px] border border-[#FEE4E2] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'>
          <div className='flex gap-5 p-6'>
            <Image src={volume} alt='volume'/>
            <div className='leading-[24px]'>
              <h2 className='text-[#475467] text-[12px] font-medium'>Volume</h2>
              <h1 className='text-[#194185] font-bold text-[22px]'>7200 MTPA</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
