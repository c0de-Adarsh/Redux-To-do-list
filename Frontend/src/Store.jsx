import { configureStore } from "@reduxjs/toolkit"
import userReducer from './Slice/UserSlice'
import todoReducer from './Slice/TodoSlice'


 export const store = configureStore({
    reducer:{
        user: userReducer,
        todo: todoReducer
    }
 })