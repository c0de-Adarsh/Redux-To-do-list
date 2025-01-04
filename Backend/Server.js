const express = require('express')
const bodyParser = require('body-parser')
const app = express();
require('dotenv').config()
const db = require('./db')
const route = require('./Routes/Route')


const PORT = process.env.PORT || 5000

app.use(bodyParser.json())

app.use(route)

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.listen(PORT,()=>{
    console.log(`this server is up and listening ${PORT}`)
})