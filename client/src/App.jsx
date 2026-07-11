import React, { useContext } from 'react'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import { Routes, Route } from 'react-router-dom'  
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer} from 'react-toastify';
import Login from './components/Login'
import { AppContext } from './context/AppContext'

const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-[#FAF7F2] text-[#1E1E1E] pb-10'>
   <ToastContainer position='bottom-right' />
   <Navbar />
        { showLogin && <Login /> }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result/>} />
        <Route path='/buy' element={<BuyCredit/>} />
        {/* <Route path='/login' element={<Login/>}/> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
