const express = require('express')
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const db = require('./db')
const route = require('./Routes/Route')
const cors = require('cors')



const PORT = process.env.PORT || 5000

app.use(bodyParser.json())




app.use(cors({
    origin:'https://adarsh-redux-todo.netlify.app',
    
    credentials:true
}))

app.use(route)

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`this server is up and listening ${PORT}`)
})