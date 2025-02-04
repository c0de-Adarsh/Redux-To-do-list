import axios from "axios"
import { createTodoFail, createTodoRequest, createTodoSuccess, deleteTodoFail, deleteTodoRequest, deleteTodoSuccess, editTodoFail, editTodoRequest, editTodoSuccess, getAllTodosFail, getAllTodosRequest, getAllTodosSuccess } from "../Slice/TodoSlice"
import { toast } from "react-toastify"


export const getTodos = () => async(dispatch) => {
    try {
      dispatch(getAllTodosRequest());
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      };
      const { data } = await axios.get('https://todo-v4wt.onrender.com/gettodo', config);
      
      dispatch(getAllTodosSuccess(data.todo)); // Correct property name "todo" from response
    } catch (error) {
      dispatch(getAllTodosFail(error.response.data.message));
    }
  };
  


// export const createTodo = (todoData) => async (dispatch)=>{
//     try {
        
//         dispatch(createTodoRequest())
//         const config = {
//             headers:{
//                 Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
//             }
//         }

//         const {data} = await axios.post('https://todo-slzv.onrender.com/createtodo',todoData,config)
//         dispatch(createTodoSuccess())
//         dispatch(getTodos())
//         toast.success("Todo added successful")
//     } catch (error) {
//         dispatch(createTodoFail(error.response.data.message))
//     }
// }

export const createTodo = (todoData) => async (dispatch) => {
    try {
        dispatch(createTodoRequest())
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        }
        const {data} = await axios.post('https://todo-v4wt.onrender.com/createtodo', todoData, config)
        dispatch(createTodoSuccess(data.todo)) // Pass the todo data
        toast.success("Todo added successful")
    } catch (error) {
        dispatch(createTodoFail(error.response?.data?.message))
    }
}




export const updateTodo = (id, todoData) => async (dispatch) => {
    try {
        dispatch(editTodoRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
            }
        }

        // Make the API request
        const { data } = await axios.put(`https://todo-v4wt.onrender.com/edittodo/${id}`, todoData, config);

        console.log("Received data:", data);  // Log the full response

        // Check if the response contains the necessary data
        if (data?.success && data?.todo) {
            dispatch(editTodoSuccess(data.todo));  // Pass the todo data
            dispatch(getTodos())
            toast.success("Todo Updated Successfully!")
        } else {
            throw new Error("Todo data or ID is missing in response");
        }

    } catch (err) {
        console.error("Error:", err);  // Log the error message
        dispatch(editTodoFail(err.message || "An error occurred. Please try again."));
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

        const {data} = await axios.delete(`https://todo-v4wt.onrender.com/deletetodo/${id}`,config)
        dispatch(deleteTodoSuccess())
        dispatch(getTodos())
        toast.success("Todos Deleted Successfully")
    } catch (error) {
        dispatch(deleteTodoFail(error.response.data.message))
    }
 }