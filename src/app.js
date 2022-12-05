const express = require('express')
const prodRouter = require('./routes/products')
const mongoose = require('mongoose')
const config=require('./config/config.json')
const app=express()
const con=mongoose.connection
const port=config.port
let options = {useNewUrlParser: true}

mongoose.connect(config.dbUri, options)

con.on('open', ()=>{
    console.log("connected to database prodDB")
})

app.use(express.json())

app.use('/', prodRouter)

app.listen(port, ()=>{
    console.log('server started')
})

module.exports=app