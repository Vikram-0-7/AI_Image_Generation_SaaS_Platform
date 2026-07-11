import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (user) {
      navigate('/result')
    } else {
      setShowLogin(true)
    }
  }
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-12'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className='text-black inline-flex text-center gap-2 bg-[#FAF7F2] px-5 py-1.5 border-2 border-black rounded-none neo-shadow-sm font-semibold'
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="Star Icon" />
      </motion.div>

      <motion.h1 className='text-4xl max-w-[320px] sm:text-7xl sm:max-w-[640px] mx-auto mt-10 text-center font-black tracking-tight leading-tight text-black'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
      >
        Turn text to <span className='text-[#00B2E2] underline decoration-black decoration-4 sm:decoration-8 underline-offset-4'>image</span>, in seconds.
      </motion.h1>

      <p className='text-center max-w-xl mx-auto mt-6 text-stone-700 font-medium px-4'>
        Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.
      </p>

      <motion.button
        className='sm:text-lg text-black bg-[#FFD166] w-auto mt-8 px-10 py-3.5 flex items-center gap-3 border-2 border-black rounded-none neo-shadow font-bold hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm transition-all duration-150 cursor-pointer'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0.4 }, opacity: { delay: 0.6, duration: 0.8 } }}
        onClick={onClickHandler}
      >
        Generate Images <img className='h-6 invert' src={assets.star_group} alt="" />
      </motion.button>

      <div className='flex flex-wrap justify-center mt-16 gap-4 px-4'>
        {Array(6).fill('').map((item, index) => (
          <div key={index} className='border-2 border-black bg-white p-1.5 rounded-none neo-shadow-sm hover:translate-y-[-4px] hover:shadow transition-all duration-300'>
            <img 
              className='cursor-pointer max-sm:w-12 h-16 w-16 object-cover rounded-none'
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2} 
              alt="Sample Output" 
              width={70} 
            />
          </div>
        ))}
      </div>
      <p className='mt-3 text-stone-500 font-semibold text-sm'>Generated images from imagify</p>
    </motion.div>
  )
}

export default Header
