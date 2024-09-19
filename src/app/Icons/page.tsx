import React from 'react'
import Image from 'next/image'
import JDMF from './jdmf.png'
const page = () => {
  return (
    <div className='rounded-full w-20 h-30'>
      <Image src={JDMF} alt='icons'/>
    </div>
  )
}

export default page

