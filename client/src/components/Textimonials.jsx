import React from 'react'
import { assets, testimonialsData } from '../assets/assets'

const Textimonials = () => {
  return (
    <div className='flex flex-col items-center justify-center my-20 py-12'>
         <h1 className='text-3xl sm:text-5xl font-black mb-2 text-black tracking-tight text-center'>Customer Testimonials</h1>
         <p className='text-base sm:text-lg text-stone-600 font-semibold mb-12 text-center'>What Our Users Are Saying</p>
         
         <div className='flex flex-wrap justify-center gap-8 px-4'>
            {testimonialsData.map((testimonail, index) => (
                <div key={index} 
                  className='bg-white p-8 border-2 border-black rounded-none neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm duration-150 transition-all w-80 cursor-pointer'
                >
                    <div className='flex flex-col items-center'>
                        <img src={testimonail.image} alt={testimonail.name}
                          className='border-2 border-black rounded-none w-16 h-16 object-cover shadow-sm' 
                        />
                        <h2 className='text-lg font-bold text-black mt-3'>{testimonail.name}</h2>
                        <p className='text-stone-500 text-xs font-semibold mb-3'>{testimonail.role}</p>
                        
                        <div className='flex gap-1 mb-4 bg-[#FAF7F2] px-3 py-1 border border-black rounded-none'>
                            {Array(testimonail.stars).fill().map((item, index)=>(
                                <img key={index} src={assets.rating_star} alt="star" className='w-4 h-4' />
                            ))}
                        </div>
                        <p className='text-center text-sm text-stone-700 font-medium leading-relaxed'>"{testimonail.text}"</p>
                    </div>
                </div>
            ))}
         </div>
    </div>
  )
}

export default Textimonials
