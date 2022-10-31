let chai = require('chai')
let chaiHttp=require('chai-http')
let server=require('../app')
chai.should()
chai.use(chaiHttp)

describe('catalog API', ()=>{


    /*
    Test GET route
    */
    describe('GET / ', ()=>{
        it('should display welcome message when correct url is given', (done)=>{
            chai.request(server)
            .get('/')
            .end((err, response)=>{
                response.should.have.status(200)
                response.text.should.be.eq('hello, welcome to our product catalog')
            done()
            })
        })
        it('should not display welcome message if incorrect url is given', (done)=>{
            chai.request(server)
            .get('/.')
            .end((err, response)=>{
                response.should.have.status(404)
            done()
            })
        })
        it('should display all products', (done)=>{
            chai.request(server)
            .get('/products')
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                response.body.should.length(0)
            done()
            })
        })
    })


    /*
    Test POST route
    */
    describe('POST /products', ()=>{
        it('should create the entry into database ', (done)=>{
            chai.request(server)
            .post('/products')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('pid').eq(1)
                response.body.should.have.property('name')
                response.body.should.have.property('price')
            done()
            })
        })
        it('should not create the entry into database because of duplicate id', (done)=>{
            chai.request(server)
            .post('/products')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(409)
            done()
            })
        })
        it('should not create the entry into database because of invalid id', (done)=>{
            chai.request(server)
            .post('/products')
            .send({"pid":"cat", "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(400)
            done()
            })
        })
        it('should not create the entry in database bacause of incorrect url', (done)=>{
            chai.request(server)
            .post('/.')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(404)
            done()
            })
        })
    })


    /*
    Test GET By id route
    */
    describe('GET /products/pid', ()=>{
        it('should display available products matches id', (done)=>{
            chai.request(server)
            .get('/products/1')
            .end((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('array')
                response.body.should.have.length(1)
                response.body[0].should.have.property('pid').eq(1)
                response.body[0].should.have.property('name')
                response.body[0].should.have.property('price')

            done()
            })
        })
        it('should not display available products because of nonexistent id', (done)=>{
            chai.request(server)
            .get('/products/11')
            .end((err, response)=>{
                response.should.have.status(404)
             done()
            })
        })
        it('should not display available products because of invalid id', (done)=>{
            chai.request(server)
            .get('/products/cat')
            .end((err, response)=>{
                response.should.have.status(400)
             done()
            })
        })
    })

    /*
    Test PUT By id route
    */
    describe('PUT /products/pid', ()=>{
        it('should update the entry in database', (done)=>{
            chai.request(server)
            .put('/products/1')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(200)
                response.text.should.be.eq('entry updated successfully')
            done()
            })
        })
        it('should not update the entry in database because of nonexistent id', (done)=>{
            chai.request(server)
            .put('/products/11')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(404)
            done()
            })
        })
        it('should not update the entry in database because of invalid id', (done)=>{
            chai.request(server)
            .put('/products/cat')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(400)
            done()
            })
        })
        it('should not update the entry in database because of invalid url', (done)=>{
            chai.request(server)
            .put('/products')
            .send({"pid":1, "name":"notebook", "price":20})
            .end((err, response)=>{
                response.should.have.status(404)
            done()
            })
        })
    })

    /*
    Test DELETE By id route
    */
    describe('DELETE /products/pid', ()=>{
        it('should delete entry in database', (done)=>{
            chai.request(server)
            .delete('/products/1')
            .end((err, response)=>{
                response.should.have.status(200)
                response.text.should.be.eq('entry deleted')
            done()
            })
        })
        it('should not delete entry in database because of nonexistent id', (done)=>{
            chai.request(server)
            .delete('/products/11')
            .end((err, response)=>{
                response.should.have.status(404)
             done()
            })
        })
        it('should not delete entry in database because of invalid id', (done)=>{
            chai.request(server)
            .delete('/products/cat')
            .end((err, response)=>{
                response.should.have.status(400)
             done()
            })
        })
        it('should not delete available products because of invalid url', (done)=>{
            chai.request(server)
            .delete('/products/')
            .end((err, response)=>{
                response.should.have.status(404)
             done()
            })
        })
         
    })
})