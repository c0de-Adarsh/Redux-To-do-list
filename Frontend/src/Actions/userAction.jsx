import { loginRequest , loginSuccess , loginFail, isLoginSuccess , resgisterFail , resgisterRequest,resgisterSuccess, isLoginRequest , isLoginFail } from "../Slice/UserSlice";
import axios from 'axios'
import {toast} from 'react-toastify'


 
 export const loginUser = (userData) => async(dispatch)=> {
   
    try {
        dispatch(loginRequest())

        const {data} = await axios.post('https://todo-slzv.onrender.com/login',userData,)

        dispatch(loginSuccess());
        localStorage.setItem('accesstoken',data.token)
        toast.success('Login Successfull!')
    } catch (error) {
        dispatch(loginFail(error.response.data.message))
        toast.error(error.response.data.message)
    }
 }

 export const signupUser = (userData) => async (dispatch) =>{


   try {
      dispatch(resgisterRequest())

      const {data} = await axios.post('https://todo-slzv.onrender.com/signup',userData)

      dispatch(resgisterSuccess())

      localStorage.setItem('accesstoken',data.token);
      toast.success('Register Successful!')
   } catch (error) {
      dispatch(resgisterFail(error.response.data.message))
      if(error.response?.data?.message?.includes('duplicate')){
         toast.error('User already exist')

      }else{
         toast.error(error.response.data.message)
      }

   }
 }
 
 export const IsLogin = () => async (dispatch) =>{

   try {
      dispatch(isLoginRequest())

      const config ={
         headers:{
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
         }
      }

      const {data} = await axios.get('https://todo-slzv.onrender.com/isLogin',config)

      dispatch(isLoginSuccess(data))
   } catch (error) {
      dispatch(isLoginFail(error.response.data.message))
   }
 }