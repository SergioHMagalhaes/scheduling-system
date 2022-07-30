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

  },

  async retrieveAppontment(id){
    let busca = await Appontment.findOne({'_id': id})
    return {
      _id: busca._id,
      name: busca.name,
      email: busca.email,
      description: busca.description,
      cpf : busca.cpf,
      date : AppointmentFactory.BuildDate(busca, true),
      time: busca.time,
      finished: busca.finished,
    }
  },

  async updateAppontment(values, id){
    return await Appontment.findByIdAndUpdate(id, values)
  }
}