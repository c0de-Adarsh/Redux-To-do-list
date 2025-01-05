import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signupUser } from '../Actions/userAction';


const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [loading , isLogin] = useState('')
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const signupHandler = (e) => {
    e.preventDefault()
    const data = {
      name,
      email,
      password
    }

    dispatch(signupUser(data))

  }

  useEffect(()=>{

    if(isLogin){
      navigate('/todos')
    }
  },[isLogin])
  return (
    <>
      <div className='min-h-screen pt-20 bg-gradient-to-b from-blue-900 to-purple-500' >
        <div className='flex justify-center' >



          <form onSubmit={signupHandler} className='flex md:pt-0 pt-7 flex-col md:w-[40%] w-2/3 justify-center gap-3 shadow-2xl p-10 '>

            <h1 className='text-center text-white text-5xl py-3 font-bold ' >Register</h1>

            <input required onChange={(e) => { setName(e.target.value) }} className='text-black rounded-md outline-none py-1 px-2 placeholder-bold' placeholder='Name' type="text" />

            <input required onChange={(e) => { setEmail(e.target.value) }} className='text-black rounded-md outline-none py-1 px-2 placeholder-bold' placeholder='Email' type="email" />

            <input required onChange={(e) => { setPassword(e.target.value) }} className='text-black rounded-md outline-none py-1 px-2 placeholder-bold' placeholder='Password' type="password" />

            <div className='pt-2 flex justify-center w-full items-center flex-col'>
              <button className='bg-blue-500 w-full rounded-md font-semibold text-lg py-1 text-white' >Signup</button>
            </div>

            <p className='text-center md:text-md text-sm text-white font-bold'>Already have a account, <Link className='underline text-white' to="/login">Login</Link > here.</p>

          </form>

        </div>
      </div>

    </>

  )
}

export default Signup