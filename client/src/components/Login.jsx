import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'


const Login = () => {
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext)
    const onSubmitHandler = async (e) => {
            e.preventDefault()
    
            try {
    
                if (state === 'Login') {
    
                    const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
    
                    if (data.success) {
                        setToken(data.token)
                        setUser(data.user)
                        localStorage.setItem('token', data.token)
                        setShowLogin(false)
                    } else {
                        toast.error(data.message)
                    }
    
                } else {
    
                    const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
    
                    if (data.success) {
                        setToken(data.token)
                        setUser(data.user)
                        localStorage.setItem('token', data.token)
                        setShowLogin(false)
                    } else {
                        toast.error(data.message)
                    }
    
                }
    
    
    
            } catch (error) {
                toast.error(error.message)
            }
        }
    

      useEffect(() => {
            // Disable scrolling on body when the login is open
            document.body.style.overflow = 'hidden';
    
            // Cleanup function to re-enable scrolling
            return () => {
                document.body.style.overflow = 'unset';
            };
        }, []);
    
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-[#FAF7F2] p-8 md:p-10 border-4 border-black rounded-none text-black w-full max-w-md neo-shadow-xl mx-4'>
                <h1 className='text-center text-3xl font-black text-black tracking-tight mb-2'>{state}</h1>
                <p className='text-sm text-stone-600 font-semibold text-center mb-6'>Welcome back! Please sign in to continue</p>
                
                {state !== 'Login' && (
                    <div className='border-2 border-black px-4 py-2.5 flex items-center gap-2 rounded-none bg-white mt-4'>
                        <img src={assets.user_icon} alt="" className='w-5 h-5' />
                        <input onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm w-full font-semibold placeholder-stone-500' type="text" placeholder='Full Name' required />
                    </div>
                )}
                
                <div className='border-2 border-black px-4 py-2.5 flex items-center gap-2 rounded-none bg-white mt-4'>
                    <img src={assets.email_icon} alt="" className='w-5 h-5' />
                    <input onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm w-full font-semibold placeholder-stone-500' type="email" placeholder='Email Address' required />
                </div>

                <div className='border-2 border-black px-4 py-2.5 flex items-center gap-2 rounded-none bg-white mt-4'>
                    <img src={assets.lock_icon} alt="" className='w-5 h-5' />
                    <input onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm w-full font-semibold placeholder-stone-500' type="password" placeholder='Password' required />
                </div>
                
                <p className='text-sm text-[#00B2E2] font-bold hover:underline my-4 cursor-pointer inline-block'>Forgot password?</p>
                
                <button type='submit' className='bg-[#FFD166] text-black w-full font-extrabold py-3 border-2 border-black rounded-none neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sm duration-150 transition-all cursor-pointer uppercase tracking-wider'>
                    {state === 'Login' ? 'login' : 'create account'}
                </button>
                
                {state === "Login"
                    ? <p className='mt-6 text-center text-sm font-semibold text-stone-700'>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-[#00B2E2] font-bold hover:underline cursor-pointer'>Sign up</span></p>
                    : <p className='mt-6 text-center text-sm font-semibold text-stone-700'>Already have an account? <span onClick={() => setState('Login')} className='text-[#00B2E2] font-bold hover:underline cursor-pointer'>Login</span></p>
                }
                
                <div onClick={() => setShowLogin(false)} className='absolute top-4 right-4 border-2 border-black p-1.5 bg-white hover:bg-black group transition-all duration-150 cursor-pointer rounded-none w-8 h-8 flex items-center justify-center'>
                    <img className='w-4 h-4 group-hover:invert transition-all' src={assets.cross_icon} alt="Close" />
                </div>
            </form>
        </div>
    )
}

export default Login
