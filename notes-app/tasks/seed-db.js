
const faker = require('faker')
const Category = require('../app/models/category')

// const configureDB = require('../config/database')

// configureDB()

const mongoose = require('../config/database')
// mongoose()
mongoose

for(let i=0; i<5;i++){
 const category = new Category({name:faker.commerce.department()})
 category.save()
        .then(category=>{
            console.log(category)
        })
        .catch(error=>console.log(error))
}

// for(let i =0;i<20;i++){

// }
