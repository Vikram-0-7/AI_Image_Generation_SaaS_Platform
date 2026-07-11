import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-6 mt-20 border-t-2 border-black'>
        <img src={assets.logo} width={130} alt="Logo" />
        <p className='flex-1 border-l-2 border-black pl-4 text-sm text-stone-600 font-bold max-sm:hidden'>Copyright @Vikram | All right reserved.</p>
        <div className='flex gap-3'>
            <div className='border-2 border-black p-1.5 hover:bg-black group transition-all duration-150 cursor-pointer bg-white'>
                <img src={assets.facebook_icon} alt="Facebook" className='w-5 h-5 group-hover:invert transition-all' />
            </div>
            <div className='border-2 border-black p-1.5 hover:bg-black group transition-all duration-150 cursor-pointer bg-white'>
                <img src={assets.twitter_icon} alt="Twitter" className='w-5 h-5 group-hover:invert transition-all' />
            </div>
            <div className='border-2 border-black p-1.5 hover:bg-black group transition-all duration-150 cursor-pointer bg-white'>
                <img src={assets.instagram_icon} alt="Instagram" className='w-5 h-5 group-hover:invert transition-all' />
            </div>
        </div>
    </div>
  )
}

export default Footer
