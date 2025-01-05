import { createSlice }  from "@reduxjs/toolkit"

const userSlice = createSlice({
     name:'user',
     initialState:{
        loading:false,
        isLogin:false,
        error:null
     },
     reducers:{
        loginRequest:(state) =>{
            state.loading = true
        },
        loginSuccess:(state) =>{
            state.loading = false,
            state.isLogin = true
        },
        loginFail:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },

        resgisterRequest:(state)=>{
            state.loading = true
        },
        resgisterSuccess:(state)=>{
            state.loading = false,
            state.isLogin = true
        },

        resgisterFail:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        
        isLoginRequest:(state)=>{
            state.isLogin = false

        },

        isLoginSuccess:(state,action)=>{
            state.isLogin = action.payload
        },

        isLoginFail:(state,action)=>{
            state.error = action.payload
        }
     }



})

export const {loginRequest , loginSuccess,loginFail,resgisterRequest,resgisterSuccess,resgisterFail,isLoginRequest,isLoginSuccess,isLoginFail} = userSlice.actions

export default userSlice.reducer;