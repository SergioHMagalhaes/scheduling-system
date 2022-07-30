class AppointmentFactory{

    Build(simpleAppointmant){

        const startDate = this.BuildDate(simpleAppointmant)
    
        const result = {
            id: simpleAppointmant._id,
            title: `${simpleAppointmant.name} - ${simpleAppointmant.description}`,
            start: startDate,
            end: startDate
        }

        return result
    }

    BuildDate(simpleAppointmant, str){
        const day = simpleAppointmant.date.getDate()+1
        const month = simpleAppointmant.date.getMonth()
        const year = simpleAppointmant.date.getFullYear()
        const hour = Number.parseInt(simpleAppointmant.time.split(':')[0]) 
        const minutes = Number.parseInt(simpleAppointmant.time.split(':')[1]) 
        if(str){
            return `${year}-${month < 10 ? `0${month + 1}`: month + 1}-${day < 10 ? `0${day}`: day}`
        }
        else{
            return new Date(year, month, day, hour, minutes, 0, 0)
        }
        
    }

}

module.exports = new AppointmentFactory()