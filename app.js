const express = require('express')
const url='mongodb://localhost:27017/prodDB'
const app=express()
app.use(express.json())
const mongoose = require('mongoose')
mongoose.connect(url, {useNewUrlParser:true})
const con=mongoose.connection
const prodRouter = require('./routes/products')


con.on('open', ()=>{
    console.log("connected to database prodDB")
})


app.use('/', prodRouter)


app.listen(8080, ()=>{
    console.log('server started')
})


module.exports=app