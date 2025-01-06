import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RxCross2} from 'react-icons/rx'
import {FaBars} from 'react-icons/fa'
import logo from '../assets/logo2.png'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { isLogin } from '../Actions/userAction'


const NavBar = () => {

    const [toggle , setToggle] = useState(null)
    const {IsLogin} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logOut = () =>{
        localStorage.removeItem('accesstoken');
        navigate('/')
        dispatch(isLogin())
        setToggle(!toggle)
        toast.success('LogOut Successfull')
    }
  return (
    <>
    <nav>
        <div>
            <ul className='flex py-3 fixed min-w-full bg-gray-900 text-xl text-white font-semibold md:justify-between z-10 justify-start md:px-9 px-3'>
                <Link to='/' className='flex md:gap-1 gap-1'>
                <span ><img src={logo} alt="" className='md:h-8 h-7'/></span>
                <p className='text-center font-bold text-2xl'>ToDo</p>
                </Link>
                <div className='md:flex font-semibold hidden gap-9 '>
                    <Link to='/' className=' hover:text-orange-500'>Home</Link>
                    <Link to='/todos' className=' hover:text-orange-500'>Todo's</Link>
                    <Link to='/about' className=' hover:text-orange-500'>About</Link>
                </div>

                <div className=' md:flex hidden gap-7'>
                    <Link className=' hover:text-gray-700' to='/login'>Login</Link>
                    <Link className=' hover:text-gray-700' to='/signup'>Signup</Link>
                </div>

                <div className=' md:hidden flex absolute md:top-3 top-4 right-3'>
                   {
                    toggle? (
                        <RxCross2 size={30} className='cursor-pointer ' onClick={()=> setToggle(!toggle)}/>
                        
                    ):(<FaBars size={30} className='cursor-pointer' onClick={()=> setToggle(!toggle)}/>)
                   }
                </div>
            </ul>
            {

              
              <div className={`${toggle? 'flex' :'hidden'}`}>

               <div className='md:hidden max-h-screen opacity-95 bg-gray-900 text-white z-10 fixed w-full top-14 py-4 text-2xl font-sans border border-t-2 border-b-0 border-x-0 text-center gap-12 flex flex-col pt-14'>
               <Link to='/'>Home</Link>
                    <Link to='/todos' onClick={()=> setToggle(!toggle)}>Todo's</Link>
                    <Link to='/about' onClick={()=> setToggle(!toggle)}>About</Link>

                    {
                        !IsLogin ? 
                        <>
                        <Link to='/login' className=' hover:text-gray-700' onClick={()=> setToggle(!toggle)} >Login</Link>
                        <Link to='/signup' className=' hover:text-gray-700' onClick={()=> setToggle(!toggle)}>Signup</Link>
                        </>
                        :
                        <button onClick={logOut}>Logout</button>
                    }
                    
               </div>

              </div> 

            }
        </div>
    </nav>
    </>
  )
}

export default NavBar