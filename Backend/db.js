const mongoose = require('mongoose');

const mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on('connected',()=>{
    console.log('Mongodb connected successfully')
})

db.on('error',()=>{
    console.log('Mongodb connection error')
})

db.on('disconnected',()=>{
    console.log('Mongodb disconnect successfully')
})

module.exports = db;