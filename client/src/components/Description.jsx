import React from 'react'
import { assets } from '../assets/assets'

const Description = () => {
  return (
    <div className='flex flex-col items-center justify-center my-24 p-4 md:p-6'>
      <h1 className='text-3xl sm:text-5xl font-black mb-2 text-black tracking-tight text-center'>Create AI Images</h1>
      <p className='text-base sm:text-lg text-stone-600 font-semibold mb-10 text-center'>Turn your imagination into visuals</p>

      <div className='w-full max-w-5xl border-2 border-black bg-white flex flex-col md:flex-row rounded-none neo-shadow overflow-hidden'>
        <div className='w-full md:w-1/2 bg-[#FAF7F2] p-8 flex justify-center items-center md:border-r-2 border-b-2 md:border-b-0 border-black'>
          <img src={assets.sample_img_1} alt="AI Generation Preview" className='w-full max-w-sm border-2 border-black rounded-none neo-shadow-sm' />
        </div>
        <div className='w-full md:w-1/2 bg-[#00B2E2] p-8 md:p-12 flex flex-col justify-center text-black'>
          <h2 className='text-2xl sm:text-3xl font-black max-w-lg mb-6 leading-tight'>
            Introducing the AI-powered Text to Image Generator
          </h2>
          <div className='space-y-4 text-black/90 font-medium text-sm sm:text-base leading-relaxed'>
            <p>
              Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks. Imagine it, describe it, and watch it come to life instantly.
            </p>
            <p>
              Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly. Powered by advanced AI technology, the creative possibilities are endless!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
