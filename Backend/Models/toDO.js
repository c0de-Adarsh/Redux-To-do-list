const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Enter title']
    },
    desc:{
        type:String,
        required:[true,'Plese Enter Description']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})

const Todo = mongoose.model('Todo',todoSchema)

module.exports = Todo;