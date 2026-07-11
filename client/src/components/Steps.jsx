import React from 'react'
import { stepsData } from '../assets/assets'

const Steps = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24'>
      <h1 className='text-3xl sm:text-5xl font-black mb-2 text-black tracking-tight text-center'>How it works</h1>
      <p className='text-base sm:text-lg text-stone-600 font-semibold mb-10 text-center'>Transform words Into Stunning Images</p>
      
      <div className='space-y-6 w-full max-w-3xl text-sm px-4'> 
        {stepsData.map((item, index) => (
          <div key={index}
            className='flex items-center gap-5 p-6 bg-white border-2 border-black rounded-none neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm transition-all duration-150 cursor-pointer'
          >
            <div className='p-3 bg-[#FAF7F2] border-2 border-black rounded-none flex items-center justify-center shrink-0'>
              <img className='w-8 h-8' src={item.icon} alt="" />
            </div>
            <div>
              <h2 className='text-lg sm:text-xl font-bold text-black mb-1'>{index + 1}. {item.title}</h2>
              <p className='text-stone-600 text-sm sm:text-base font-medium'>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
