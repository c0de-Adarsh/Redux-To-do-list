const express = require('express')
const router = express.Router()


const {signUpUser,loginUser,isLogin} = require('../Controllers/userControllers')
const {jwtAuthMiddleware} = require('../jwt')
const {createTodo,getTodo,editTodo,deleteTodo} = require('../Controllers/todoControllers')

//user routes
router.route('/signup').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/isLogin').get(jwtAuthMiddleware,isLogin)


//todo routes
router.route('/createtodo').post(jwtAuthMiddleware,createTodo)
router.route('/gettodo').get(jwtAuthMiddleware,getTodo)
router.route('/edittodo/:id').put(jwtAuthMiddleware,editTodo)
router.route('/deletetodo/:id').delete(jwtAuthMiddleware,deleteTodo)


module.exports = router;