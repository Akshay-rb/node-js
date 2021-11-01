const express = require('express')
const mongoose = require('mongoose')
const port = 3020
const app = express()

app.use(express.json())
const router = express.Router()
app.use('/', router)

const users = [{id:1, name: 'akshay', username:'bijapur'}, {id:2, name:'ani', username:'ani'}]


mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser:true})
        .then(()=>{
            console.log('successfully connected to the db')
        })
        .catch((error)=>{
            console.log(error)
        })

const Schema = mongoose.Schema
const noteSchema = new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Number(new Date())
    }
})        

const Note = mongoose.model('Note', noteSchema)

// function notesController(){
//     controllers:{
//         list:(req,res)=>{
//             Note.find()
//                 .then((users)=>{
//                     res.json(users)
//                 })
//                 .catch((error)=>{
//                     res.json({notice:error})
//                 })
//         }
//     }
//    return controllers
// }

const listUsers = (req,res)=>{
    Note.find()
        .then((users)=>{
            res.json(users)
        })
        .catch((error)=>{
            res.json({notice:error})
        })
}

const postUsers = (req,res)=>{
    const body = req.body
    const note = new Note(body)
    note.save()
        .then((users)=>{
            res.json(users)
        })
        .catch((error)=>{
            res.json(error)
        })
}

const updateUser =(req,res)=>{
    const id = req.params.id
    const body = req.body
    Note.findByIdAndUpdate(id, body , {new: true, runValidators:true})
        .then((user)=>{
            res.json(user)
        })
        .catch((error)=>{
            res.json(error)
        })

}

const deleteUser = (req,res)=>{
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then((user)=>{
            res.json({notice:`successfully deleted user- ${user}`})
        })
        .catch((error)=>{
            res.json(error)
        })
}

router.get('/users', listUsers)
router.post('/users', postUsers)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

app.listen(port, ()=>{
    console.log('listening on port ', port)
})        