const mongoose = require('mongoose')


// db config
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/notes-app', {useNewUrlParser:true}) // useNewUrlParser is optional
    .then(()=>{
        console.log('successfully connected to the db')
    })
    .catch((err)=>{
        console.log('an error occured', err)
    })

module.exports = mongoose    