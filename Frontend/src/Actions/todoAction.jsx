import axios from "axios"
import { createTodoFail, createTodoRequest, createTodoSuccess, deleteTodoFail, deleteTodoRequest, deleteTodoSuccess, editTodoRequest, editTodoSuccess, getAllTodosFail, getAllTodosRequest, getAllTodosSuccess } from "../Slice/TodoSlice"
import { toast } from "react-toastify"


export const getTodos = () => async(dispatch) =>{

    try {
        
        dispatch(getAllTodosRequest())

        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        }

        const {data} = await axios.get('https://todo-slzv.onrender.com/gettodo',config)

        dispatch(getAllTodosSuccess(data.todos))
    } catch (error) {
        dispatch(getAllTodosFail(error.response.data.message))
    }

}

export const createTodo = (todoData) => async (dispatch)=>{
    try {
        
        dispatch(createTodoRequest())
        const config = {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        }

        const {data} = await axios.post('https://todo-slzv.onrender.com/createtodo',todoData,config)
        dispatch(createTodoSuccess())
        dispatch(getTodos())
        toast.success("Todo added successful")
    } catch (error) {
        dispatch(createTodoFail(error.response.data.message))
    }
}

 export const updateTodo = (id,todoData) => async (dispatch) =>{

    try {
        
        dispatch(editTodoRequest())

        const config = {
            headers:{
                Authorization:`Bearer ${localStorage.getItem("accesstoken")}`
            }
        }

        const {data} = await axios.put(`https://todo-slzv.onrender.com/edittodo/${id}`,todoData,config);

        dispatch(editTodoSuccess())
        dispatch(getTodos())
        toast.success("Todo Updated Successfully")
    } catch (error) {
        dispatch(editTodoRequest(error.response.data.message))
    }
 }

 export const deleteTodo = (id) => async (dispatch) =>{
    try {
        dispatch(deleteTodoRequest())
        const config ={
            headers:{
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        }

        const {data} = await axios.delete(`https://todo-slzv.onrender.com/deletetodo/${id}`,config)
        dispatch(deleteTodoSuccess())
        dispatch(getTodos())
        toast.success("Todos Deleted Successfully")
    } catch (error) {
        dispatch(deleteTodoFail(error.response.data.message))
    }
 }