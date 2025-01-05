import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, } from 'react-router-dom'
import { loginUser } from '../Actions/userAction'


const Login = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const {loading , isLogin} = useSelector(state=> state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const loginHandler = async(e) =>{
      
    e.preventDefault();
    const data = {
      email,
      password
    }

    dispatch(loginUser(data))
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

          <form onSubmit={loginHandler} className='flex md:pt-0 pt-7 flex-col md:w-[40%] w-2/3 justify-center gap-3 r shadow-2xl p-10' action="">

            <h1 className='text-center text-white text-5xl py-3 font-bold ' >Login</h1>

            <input required onChange={(e) => setEmail(e.target.value)} className='text-black rounded-md outline-none py-1 px-2 placeholder-bold' placeholder='Email' type="text" />

            <input required onChange={(e) => setPassword(e.target.value)} className='text-black rounded-md outline-none py-1 px-2 placeholder-bold' placeholder='Password' type="password" />

            <div className='pt-2 flex justify-center w-full items-center flex-col'>
                            <button className='bg-blue-500 w-full rounded-md font-semibold text-lg py-1 text-white'>Login</button>
            </div>

            <p className="text-center md:text-md text-sm text-white font-bold">
              Don't have an account, <Link className="underline text-white" to="/signup">Signup</Link> here.
            </p>
          </form>

        </div>
      </div> 
    </>

    
  )
}

export default Login