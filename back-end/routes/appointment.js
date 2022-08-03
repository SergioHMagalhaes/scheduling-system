const express = require('express')
const controller = require('../controllers/Appointment')
const router = express.Router()


router.get('/search', async (req, res) => {
    controller.search(req, res)
})

router.post('/', async (req, res) => {
    controller.create(req, res)
})

router.get('/', async (req, res) => {
    controller.list(req, res)
})

router.get('/:id', async (req, res) => {
    controller.retrieve(req, res)
})

router.put('/:id', async (req, res) => {
    controller.update(req, res)
})


module.exports = router