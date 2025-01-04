const mongoose = require('mongoose')
const validator = require('validator')

const userSchma = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Plese Enter Your Name'],
        maxLength:[30,'Name Cannot exceed 30 charecters'],
        minLength:[3,'Name should have more than 3 characters']
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:[validator.isEmail,'Please Enter valid email address']
    },
    password:{
        type:String,
        required:[true,'Please Enter a Password']
    }
})

const User = mongoose.model('User',userSchma)

module.exports = User;