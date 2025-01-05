import React from 'react'
import NavBar from './Components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import About from './Pages/About'

import Todos from './Pages/Todos'
import Footer from './Components/Footer'


const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/todos' element={<Todos/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App