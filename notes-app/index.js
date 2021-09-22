// mongoose is known as ODM - Object Document Mapper
// ODM  does 3 things 
//maps a model to a collection 
// maps a object for document
// mpas an object's property to a field

const express = require('express')
const mongoose = require('./config/database')
const router = require('./config/routes')
const app = express()
app.use(express.json())
app.use('/', router)
const port = 3015

app.get('/', (req,res)=>{
    res.json({
        notice:'wlecome to the note taking app'
    })
})

app.listen(port,()=>{
    console.log('listening on port ', port)
})

