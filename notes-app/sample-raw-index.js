// mongoose is known as ODM - Object Document Mapper
// ODM  does 3 things 
//maps a model to a collection 
// maps a object for document
// mpas an object's property to a field

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

const port = 3015

// db configuration 
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/notes-app', {useNewUrlParser:true}) // useNewUrlParser is optional
    .then(()=>{
        console.log('successfully connected to the db')
    })
    .catch((err)=>{
        console.log('an error occured', err)
    })

// creating the note schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
}) 

// note constructor function
const Note = mongoose.model('Note', noteSchema)

app.get('/', (req,res)=>{
    res.json({
        notice:'wlecome to the note taking app'
    })
})

app.get('/notes', (req,res)=>{
    Note.find()                     // find() - returns promise
        .then((notes)=>{
            res.json(notes)
        })
        .catch((err)=>{
            res.send(err)
        })
})

app.post('/notes', (req,res)=>{
    const body = req.body
    const note = new Note({
        title:body.title,
        description:body.description
    })
            // can also pass like------ const note = new Note(body) 
    note.save()
        .then((note)=>{
            res.json(note)
        })
        .catch((err)=>{
            res.json(err)
        })

})

app.listen(port,()=>{
    console.log('listening on port ', port)
})