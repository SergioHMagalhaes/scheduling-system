const appointment = require('../database/models/Appointment')
const mongoose = require('mongoose')
const AppointmentFactory = require('../factories/AppointmentFactory')
const nodemailer = require('nodemailer')

const Appontment = mongoose.model('Appointment', appointment)

module.exports = {
  createAppointment(values) {
    let newAppontment = new Appontment(values)
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

  async searchAppontment(params){
    return await Appontment.find().or([{email: params},{cpf: params}])
  },

  async updateAppontment(values, id){
    return await Appontment.findByIdAndUpdate(id, values)
  },

  async sendNotification(){
    let notifyAppointment = await this.findAllAppontment()
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }

    })
    notifyAppointment.forEach(async element => {
      
      const date = element.start.getTime()
      const hour = 1000 * 60 * 60
      let gap = date - Date.now()

      if(gap <= hour){
        if(!element.notified){
          await this.updateAppontment({notified: true}, element.id)
          transporter.sendMail({
            from: 'Scheduling System <notification@schedulingSystem.com>',
            to: element.email,
            subject: 'Olá! Este é um lembrete de sua consulta é daqui a uma hora',
            text: 'Lembrete'
          })
        }
      }
    })
  }
}