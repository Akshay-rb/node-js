// const Note = require('../models/note')
const Note = require('../models/note')
const Category = require('../models/category')


// app.get('/', (req,res)=>{
//     res.json({
//         notice:'wlecome to the note taking app'
//     })
// })

// list
module.exports.list = (req,res)=>{
    Note.find().populate('categoryId')                     // find() - returns promise
        .then((notes)=>{
            res.json(notes)
        })
        .catch((err)=>{
            res.send(err)
        })
}


module.exports.show = (req,res)=>{
    const id = req.params.id
    // - to controll fields to be populated from category - populate('categoryId', ['name']) // [] - will contain the fields to be populated  
    // Note.findById(id).populate('categoryId')
    //     .then((note)=>{
    //         if(note){
    //             res.json(note)
    //         }else{
    //             res.json({})
    //         }
    //     })
    //     .catch((error)=>{
    //         res.json(error)
    //     })    

    // without using populate method

    Note.findById(id)
        .then((note)=>{
            if(note){
                Category.findById(note.categoryId)
                        .then((category)=>{
                            const newNote = Object.assign({}, note.toObject())
                            if(category){
                                // note.categoryId = category // OR
                                newNote.categoryId = category
                                res.json(newNote)
                            }else{
                                res.json({})
                            }
                        })
                        .catch((err)=>{
                            res.json(err)
                        })
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

// to export individual controller
//--------------- we need to use the model of the MVC , so , make use of route.. refer to the video
// app.get('/notes', (req,res)=>{
//     Note.find()                     // find() - returns promise
//         .then((notes)=>{
//             res.json(notes)
//         })
//         .catch((err)=>{
//             res.send(err)
//         })
// })

//create
module.exports.create = (req,res)=>{
    const body = req.body
    const note = new Note(body)

    
    // const note = new Note({
    //     title:body.title,
    //     description:body.description
    // })
            // can also pass like------ const note = new Note(body) 
    note.save()
        .then((note)=>{
            res.json(note)
        })
        .catch((err)=>{
            res.json(err)
        })

}

module.exports.update =(req,res)=>{
    const { id } = req.params
    const {body} = req
    Note.findByIdAndUpdate(id, body, {new : true, runValidators:true})
        .then((note)=>{
            if(note){
                res.json(note)
            }else{
                res.json({})
            }
        })
        .catch((error)=>{
            res.json(error)
        })
}

module.exports.destroy =(req,res)=>{
    const {id} = req.params
    Note.findByIdAndDelete(id)
        .then((note)=>{
            if(note){
                res.json(note)
            }else{
                res.json({})
            }
        })
        .catch((error)=>{
            res.json(error)
        })
}



// to export individual controller
//--------------- we need to use the model of the MVC , so , make use of route.. refer to the video
// app.post('/notes', (req,res)=>{
//     const body = req.body
//     const note = new Note({
//         title:body.title,
//         description:body.description
//     })
//             // can also pass like------ const note = new Note(body) 
//     note.save()
//         .then((note)=>{
//             res.json(note)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })

// })