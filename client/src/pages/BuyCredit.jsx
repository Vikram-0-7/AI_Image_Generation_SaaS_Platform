import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext)
  return (
    <div className='min-h-[80vh] text-center pt-14 mb-16'>
      <div className='border-2 border-black bg-white px-8 py-2.5 rounded-none font-bold text-black neo-shadow-sm mb-8 inline-block'>
        Our Plans
      </div>
      <h1 className='text-center text-3xl sm:text-5xl font-black mb-12 text-black tracking-tight'>Choose the plan</h1>
      
      <div className='flex flex-wrap justify-center gap-8 text-left px-4'>
        {plans.map((item, index) => (
          <div 
            className='bg-white border-2 border-black rounded-none py-10 px-8 text-black neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm duration-200 transition-all w-72 flex flex-col justify-between' 
            key={index}
          >
            <div>
              <div className='w-12 h-12 border-2 border-black p-2 bg-[#FAF7F2] rounded-none flex items-center justify-center mb-4'>
                <img className='w-full object-contain' src={assets.logo_icon} alt="Plan Icon" />
              </div>
              <p className='mt-3 mb-1 font-black text-xl text-black'>{item.id}</p>
              <p className='text-sm text-stone-600 font-semibold'>{item.desc}</p>
            </div>
            
            <div>
              <p className='mt-8 border-t-2 border-dashed border-black pt-4 text-stone-700 font-bold'>
                <span className='text-3xl sm:text-4xl font-black text-black'>₹{item.price}</span> / {item.credits} credits
              </p>
              
              <button className='w-full bg-[#00B2E2] text-black font-extrabold mt-8 text-sm border-2 border-black rounded-none py-3 neo-shadow hover:bg-[#0090B5] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-150 cursor-pointer uppercase tracking-wider text-center'>
                {user ? 'Purchase' : 'Get Started'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit
