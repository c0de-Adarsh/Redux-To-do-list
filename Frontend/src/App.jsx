import React, { useEffect } from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'
import {Todos} from './Pages/Todos'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { IsLogin } from './Actions/userAction'


const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{

    const logOrNot = () =>{
      dispatch(IsLogin())
      
    }
    logOrNot()
  },[])
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/todos' element={<Todos />} />
        </Routes>

        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          className='mt-14 font-bold'
        />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App