const express = require('express')
const router = express.Router()


const {signUpUser,loginUser,isLogin} = require('../Controllers/userControllers')
const {jwtAuthMiddleware} = require('../jwt')


router.route('/signup').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/isLogin').get(jwtAuthMiddleware,isLogin)


module.exports = router;