const Category = require('../models/category')
const Note = require('../models/note')

module.exports.list = (req,res)=>{
    Category.find()
        .then((categories)=>{
            if(categories){
                res.json(categories)
            } else{
                res.json([])
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

// module.exports.show =(req,res)=>{
//     const id = req.params.id
//     Category.findById(id)
//             .then((category)=>{
//                 if(category){
//                     res.json(category)
//                 }else{
//                     res.json({})
//                 }
//             })
//             .catch((err)=>{
//                 res.json(err)
//             })
// }

module.exports.show= (req,res)=>{
    const id = req.params.id
    // Category.findById(id)
    //         .then((category)=>{
    //             if(category){
    //                 Note.find({categoryId :category.id })
    //                     .then((notes)=>{
    //                         if(notes){
    //                             res.json({
    //                                 notes,
    //                                 category
    //                             })
    //                         }else{
    //                             res.json({})
    //                         }
    //                     })
    //                     .catch((err)=>{
    //                         res.json(err)
    //                     })
    //             }else{
    //                 res.json({})
    //             }
    //         })
    //         .catch((err)=>{
    //             res.json(err)
    //         })

// for much more optimised way --------- Promise.all() ------- SUPER IMPORTANT -----------

    Promise.all([Category.findById(id), Note.find({categoryId:id})])
        .then((values)=>{
            const [category,notes] = values
            res.json({
                category,
                notes
            })
        })
        .catch((err)=>{
            res.json(err)
        })

}

module.exports.create = (req,res)=>{
    const body = req.body
    const category = new Category(body)

    category.save()
            .then((category)=>{
                res.json(category)
            })
            .catch((err)=>{
                res.json(err)
            })
}

module.exports.update = (req,res)=>{
    const {body} = req
    const { id } = req.params
    Category.findByIdAndUpdate(id, body, { new : true, runValidators: true })
            .then((category)=>{
                if(category){
                    res.json(category)
                }else{
                    res.json({})
                }
            })
            .catch((error)=>{
                res.json(error)
            })
}

module.exports.destroy = (req,res)=>{
    const { id } = req.params
    Category.findByIdAndDelete(id)
            .then((category)=>{
                if(category){
                    res.json(category)
                }else{
                    res.json({})
                }
            })
            .catch((error)=>{
                res.json(error)
            })
}
