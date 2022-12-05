const mongoose = require('mongoose')
const prodSchema =  new mongoose.Schema({
    pid:{
        type : Number,
        required : true,
        unique : true
    },
    name:{
        type : String,
        required : true
    },
    price:{
        type: Number,
        required : true
    }

})

const product=mongoose.model('product', prodSchema)
module.exports=product