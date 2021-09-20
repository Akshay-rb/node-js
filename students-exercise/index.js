const express = require('express')
const fs = require('fs')
 
const port = 3010

const app = express()
app.use(express.json())

app.get('/students', function(req,res){
    fs.readFile('./data/students.json', 'utf-8', function(err, students){
        students = JSON.parse(students)
        if(err){
            res.json({error:err})
        }else{
            res.json(students)
        }
    })
})

app.post('/students', function(req,res){
    const body = req.body
    bosy = JSON.parse(body)
    
    
    // fs.writeFile('./data/students.json', JSON.parse(body), 'application/json', function(err, students){
    //     // students = JSON.parse(students)
    //     if(err){
    //         res.json({error:err})
    //     }else{
    //         students.push(body)
    //         res.json({notice:"successfully created student", body})
    //     }
    // })
})


app.listen(port, function(){
    console.log('listening on port ', port)
})