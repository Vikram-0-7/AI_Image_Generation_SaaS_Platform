import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
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
    <div className='my-16 px-4'>
      <div className='max-w-5xl mx-auto bg-[#FFD166] border-2 border-black rounded-none p-8 md:py-16 text-center neo-shadow'>
        <h1 className='text-3xl md:text-5xl font-black text-black tracking-tight mb-8'>See the magic. Try now</h1>
        <button 
          onClick={onClickHandler} 
          className='cursor-pointer inline-flex items-center gap-3 px-10 py-4 border-2 border-black rounded-none bg-black text-white font-bold neo-shadow hover:bg-white hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm transition-all duration-150'
        >
          Generate Images
          <img src={assets.star_group} alt="" className='h-6 invert' />
        </button>
      </div>
    </div>
  )
}

export default GenerateBtn
