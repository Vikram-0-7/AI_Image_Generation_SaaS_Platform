import React, { useContext, useState } from 'react'

import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Result = () => {
  const { generateImage } = useContext(AppContext)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
    const [input, setInput] = useState('')
  
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }
  
  const [image, setImage] = useState(assets.sample_img_1)

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col min-h-[80vh] justify-center items-center py-10 px-4'>
      <div>
        <div className='relative border-2 border-black bg-white p-2.5 rounded-none neo-shadow'>
          <img src={image} alt="Generated Preview" className='max-w-sm w-full h-auto object-contain rounded-none' />
          <span className={`absolute bottom-2.5 left-2.5 right-2.5 h-1.5 bg-[#00B2E2] ${loading ? 'w-[calc(100%-20px)] transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={`text-stone-700 font-bold text-center mt-4 animate-pulse ${!loading ? 'hidden' : ''}`}>
          Loading.....
        </p>
      </div>

      {!isImageLoaded && (
        <div className='flex w-full max-w-xl bg-white border-2 border-black text-black text-sm rounded-none neo-shadow mt-10 overflow-hidden'>
          <input 
            onChange={e => setInput(e.target.value)} 
            value={input} 
            type="text" 
            placeholder='Describe what you want to generate' 
            className='flex-1 bg-transparent outline-none px-6 py-4 max-sm:w-20 text-black font-bold placeholder-stone-500' 
          />
          <button 
            type='submit' 
            className='bg-[#00B2E2] text-black font-extrabold border-l-2 border-black px-8 sm:px-12 hover:bg-[#0090B5] transition-all cursor-pointer uppercase tracking-wider'
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-4 flex-wrap justify-center text-sm mt-10'>
          <p 
            onClick={() => { setIsImageLoaded(false) }} 
            className='bg-white border-2 border-black text-black px-8 py-3.5 rounded-none font-bold neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm duration-150 transition-all cursor-pointer'
          >
            Generate Another
          </p>
          <a 
            href={image} 
            download 
            className='bg-[#FFD166] border-2 border-black text-black px-10 py-3.5 rounded-none font-bold neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm duration-150 transition-all cursor-pointer text-center'
          >
            Download
          </a>
        </div>
      )}
    </form>
  )
}

export default Result
