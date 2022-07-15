const appointment = require('../database/models/Appointment')
const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')

const Appontment = mongoose.model('Appointment', appointment)

module.exports = {
  createAppointment(params) {
    let newAppontment = new Appontment(params)
    return newAppontment.save()
  },

  async findAllAppontment(showFinished) {
    if (showFinished == 'true') {
      return await Appontment.find()
    } else {
      const appontments = await Appontment.find({'finished': false})
      let result = []

      appontments.forEach(appointment => {
        if (appointment.date != undefined) result.push(AppointmentFactory.Build(appointment))
      })

      return result
    }

  }
}