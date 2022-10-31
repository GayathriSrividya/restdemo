const express = require('express')
const { default: mongoose } = require('mongoose')
const router=express.Router()
const product = require('../models/product')


router.get('/', (req, res)=>{
    res.send('hello, welcome to our product catalog')
})


router.get('/products', async(req, res)=>{
    const prod = await product.find()
    res.status(200)
    res.json(prod)
})


router.get('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
    }
    else{
    res.send(prod)
    }}
    catch(err)
    {   
        res.status(400).json(err)
    }})


router.post('/products', async(req, res)=>{
    const newProd = new product({
        pid:req.body.pid,
        name:req.body.name,
        price:req.body.price
        })     
        try{
            finalProd=await newProd.save()
            res.status(200).send(finalProd)
            }
            catch(err){
                if(err.code==11000)
                {
                    res.status(409).send('id already exists')
                    return
                }
                res.status(400).send(err)
            }
        })


router.put('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
    }
    product.updateOne(req.body)
    res.status(200).send('entry updated successfully')
    }
    catch(err)
    {   
        if(err instanceof mongoose.CastError){
            res.status(400).send('invalid product id')
            return
        }
        res.json(err)
    }})

    
router.delete('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
    }
    await product.deleteOne({"pid":pid})
    res.status(200).send('entry deleted')
    }
    catch(err)
    {   
        if(err instanceof mongoose.CastError){
            res.status(400).send('invalid product id')
        }
        res.json(err)
    }})

    
module.exports=router