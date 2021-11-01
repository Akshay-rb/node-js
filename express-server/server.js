const express = require('express')
const app = express()
const port = 3010

app.use(express.json())

const users = [{id:1, name: 'akshay', username:'bijapur'}, {id:2, name:'ani', username:'ani'}]

app.get('/', (req,res)=>{
    res.json({notice:'welcome to the app'})
})

app.get('/users', (req,res)=>{
    res.json(users)
})

app.listen(port, ()=>{
    console.log('listening on port ', port)
})