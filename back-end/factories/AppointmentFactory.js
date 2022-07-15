class AppointmentFactory{

    Build(simpleAppointmant){

        const day = simpleAppointmant.date.getDate()+1
        const month = simpleAppointmant.date.getMonth()
        const year = simpleAppointmant.date.getFullYear()
        const hour = Number.parseInt(simpleAppointmant.time.split(':')[0]) 
        const minutes = Number.parseInt(simpleAppointmant.time.split(':')[1]) 
        
        const startDate = new Date(year, month, day, hour, minutes, 0, 0)

        const result = {
            id: simpleAppointmant._id,
            title: `${simpleAppointmant.name} - ${simpleAppointmant.description}`,
            start: startDate,
            end: startDate
        }

        return result
    }
}

module.exports = new AppointmentFactory()