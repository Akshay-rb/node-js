const express = require('express')

let users =[{id: 1 , userName:'Sam', gender:'male'},{id:'monica', userName:'John', gender:"female"}]

const port = 3010
const app = express()

app.get('/users/gender?name=', function(req,res){
    // console.log(req.query)
    const name = req.query[name]
    // const name = req.params.userName
    const user = users.find(function(user){
        return user.userName.toLowerCase() == name.toLowerCase()
    })
    if(user){
        res.json(user)
    }else{
        res.json({error:"user does not exist"})
    }

})

app.listen(port,function(){
    console.log('listening on port ', port)
})