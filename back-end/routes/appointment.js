const express = require('express')
const controller = require('../controllers/Appointment')
const router = express.Router()

router.post('/', async (req, res) => {
    controller.create(req, res)
})

module.exports = router