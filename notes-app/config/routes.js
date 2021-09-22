const express = require('express')

const router = express.Router()

const notesController = require('../app/controllers/notesControllers')

const categoriesController = require('../app/controllers/categoriesController')


router.get('/notes', notesController.list)
router.post('/notes', notesController.create)
router.get('/notes/:id', notesController.show)
router.put('/notes/:id', notesController.update)
router.delete('/notes/:id', notesController.destroy)

router.get('/categories', categoriesController.list)
router.post('/categories', categoriesController.create)
router.get('/categories/:id', categoriesController.show)
router.put('/categories/:id', categoriesController.update)
router.delete('/categories/:id', categoriesController.destroy)

// console.log(notesController) // is an object, that has different methods available, methods have call back functions

module.exports =router