import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        loading: false,
        allTodos: [],
        error: null,
    },
    reducers: {
        getAllTodosRequest: (state) => {
            state.loading = true
        },
        getAllTodosSuccess: (state, action) => {
            state.loading = false
            state.allTodos = action.payload
        },
        getAllTodosFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        createTodoRequest: (state) => {
            state.loading = true
        },
        createTodoSuccess: (state, action) => {
            state.loading = false
            state.allTodos = [...state.allTodos, action.payload]
        },
        createTodoFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        editTodoRequest: (state) => {
            state.loading = true
        },
        editTodoSuccess: (state, action) => {
            state.loading = false
            state.allTodos = state.allTodos.map(todo => 
                todo._id === action.payload._id ? action.payload : todo
            )
        },
        editTodoFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        deleteTodoRequest: (state) => {
            state.loading = true
        },
        deleteTodoSuccess: (state, action) => {
            state.loading = false
            state.allTodos = state.allTodos.filter(todo => todo._id !== action.payload)
        },
        deleteTodoFail: (state, action) => {
            state.loading = false
            state.error = action.payload
        },
    }
})

export const {
    getAllTodosRequest,
    getAllTodosSuccess,
    getAllTodosFail,
    createTodoRequest, 
    createTodoSuccess,
    createTodoFail,
    editTodoRequest,
    editTodoSuccess,
    editTodoFail,
    deleteTodoRequest,
    deleteTodoSuccess,
    deleteTodoFail,
} = todoSlice.actions

export default todoSlice.reducer