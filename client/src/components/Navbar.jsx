import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {

    const { setShowLogin, user, credit, logout } = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div className='flex items-center justify-between py-4 border-b-2 border-black mb-10'>

            <Link to='/' className='hover:opacity-85 transition-opacity'>
                <img className='w-28 sm:w-32 lg:w-40' src={assets.logo} alt="Logo" />
            </Link>

            <div>
                {
                    user
                        ? <div className='flex items-center gap-3 sm:gap-4'>
                            <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-[#00B2E2] px-4 sm:px-6 py-2 border-2 border-black rounded-none neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200 cursor-pointer'>
                                <img className='w-5 invert' src={assets.credit_star} alt="" />
                                <p className='text-xs sm:text-sm font-bold text-black'>Credits left : {credit}</p>
                            </button>
                            <p className='text-black font-bold max-sm:hidden pl-2'>Hi, {user.name}</p>
                            <div className='relative group'>
                                <img className='w-10 border-2 border-black cursor-pointer' src={assets.profile_icon} alt="Profile" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10'>
                                    <ul className='list-none m-0 p-2 bg-white border-2 border-black rounded-none neo-shadow-sm text-sm min-w-[120px]'>
                                        <li onClick={logout} className='py-2 px-3 cursor-pointer hover:bg-[#FAF7F2] font-semibold text-center border-2 border-transparent hover:border-black transition-all'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        : <div className='flex items-center gap-4 sm:gap-6'>
                            <p onClick={() => navigate('/buy')} className='cursor-pointer font-bold hover:underline decoration-2'>Pricing</p>
                            <button onClick={() => setShowLogin(true)} className='bg-black text-white px-6 py-2 sm:px-8 sm:py-2.5 text-sm font-bold border-2 border-black rounded-none neo-shadow-sm hover:bg-white hover:text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200 cursor-pointer'>
                                Login
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar