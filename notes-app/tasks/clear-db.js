const configDB = require('../config/database')

const Category = require('../app/models/category')

configureDB()

Category.deleteMany({})
        .then((c)=>{
            console.log('categories removed ', c)
        })
        .catch((error)=>{
            console.log(error)
        })