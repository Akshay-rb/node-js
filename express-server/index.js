const express = require('express')
const fs = require('fs')
const port = 3010

const app = express()

// the blow config has to be set , to parse the json to js object , similar to response.json() in fetch()
// otherwise , post call's push will not be able to add the created user ... refer blow POST method 

app.use(express.json()) // for the same - in older express , < 4.0 --- use a package - bodyParser

let users = [{ id: 1 , name:'sam'}, { id : 2 , name:'John'}]
const customers = [{id:1, name:'Rita'}, {id:2, name:'Mona'}]


// app.matchHTTPmethod(url, callbackFunction)

app.get('/', function(request,response){
    response.send('response from express server')
})

app.get('/about', function(req,res){
    res.send('about us page')
})

app.get('/users', function(req,res){
    res.send(users)
    // res.json(users)
})

app.post('/users', function(req,res){
    const user = req.body
    console.log(user)
    users.push(user)
    res.json({user, notice:'succesfully added user'})
})

app.delete('/users/:id', function(req,res){
    const id = req.params.id
    users = users.filter(function(user){
        return user.id != id
    })
    res.json({notice:'succesfully deleted the user '})
})

app.put('/users/:id', function(req,res){
    const id = req.params.id
    const body = req.body
    const user = users.find(function(user){
        return user.id ==id
    })
    if(user){
    //    user.name = "sammy"
    //     Object.assign(users,user)
    //     res.json(user)
        Object.assign(user,body)
        res.json(user)
    }else{
        res.json({notice:"couldn't update"})
    }
})

// react -- this.props.match.params.id
app.get('/users/:id', function(req,res){
    const id = req.params.id // --------------------- if its userId - requ.params.userId
    const user = users.find(function(user){
        return user.id == id
    })
    if(user){
        res.json(user)
    }else{
        res.json({})
    }
})

app.get('/token', function(req,res){
    const token = req.headers['x-auth']
    res.json(token)
})

app.get('/services', function(req,res){
    res.send('<h2>Listing services </h2>')
})

app.get('/customers', function(req,res){
    res.json(customers)
})

app.get('/customers/:id', function(req,res){
    const id = req.params.id
    const customer = customers.find(function(customer){
        return customer.id == id
    })
    if(customer){
        res.json(customer)
    }else{
        res.json({})
    }
})

app.get('/employees', function(req,res){
    // const data = require('./data/db.json')
    // res.json(data) // --------- not prefered way of doing

    fs.readFile('./data/db.json', 'utf-8', function(err, employees){
        employees = JSON.parse(employees)
        if(err){
            res.json({error:err})
        }else{
            res.json(employees)
        }
    })
})

// ------------------------ 404 not found ----------------------------
// should be the last call --- just like if, else if, else ...... this is the else part
app.use(function(req,res){
    // to just set the message for 404 , the status will be 200 ok
    
            // res.send({notice:'not found'})

    // to set the status as 404 exclusively. otherwise the status is 200 ok 

    res.status(404).json({notice:'not found'}) 

    // res.status(404).send('anything here)

})


app.listen(port, function(){
    console.log('listening on port ', port)
})