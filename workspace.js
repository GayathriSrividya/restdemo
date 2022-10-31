router.post('/products', async(req, res)=>{
    const newProd = new product({
        pid:req.body.pid,
        name:req.body.name,
        price:req.body.price
        })     
        const pid = req.params.pid
            const prod = await product.find({"pid":pid})
        if(prod){
            try{
            finalProd=await newProd.save()
            res.status(200).send(finalProd)
            }
            catch(err){
                // if(err.code==11000)
                // {
                //     res.status(409).send('id already exists')
                //     return
                // }
                if(err.name = "CastError"){
                    res.status(400).send('invalid product id')
                }  
                res.send(err)
            }
        }    
        else{
            res.status(409).send('id already exists')
        }}

        
)


router.put('/products/:pid', async(req, res)=>{
    const pid = req.params.pid
    try{
    const prod = await product.find({"pid":pid})
    if(prod.length==0){
        res.status(404).send(`product with id '${pid}' does not exists`)
    }
    product.updateMany(req.body)
    res.status(200).send('entry updated successfully')
    }
    catch(err)
    {   
        if(err instanceof mongoose.CastError){
            res.status(400).send('invalid product id')
        }
        res.json(err)
    }})
