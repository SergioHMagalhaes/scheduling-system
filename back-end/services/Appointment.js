const appointment = require('../database/models/Appointment')
const mongoose = require('mongoose')

const Appontment = mongoose.model('Appointment', appointment)

module.exports = {
    createAppointment(params) {
        let newAppontment = new Appontment(params)
        return newAppontment.save()
      },  
}