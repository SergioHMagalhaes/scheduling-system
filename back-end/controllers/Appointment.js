const services = require('../services/Appointment');

exports.create = async (req, res) => {
    try{
        const {name, email, description, cpf, date, time} = req.body
        if(!name || !email || !description || !cpf || !date || !time){
            throw 'Dados enviados incorretamente'
        }
        const values = {
            name: name,
            email: email, 
            description: description, 
            cpf: cpf, 
            date: date, 
            time: time,
            finished: false,
        }
        const result = await services.createAppointment(values)
        return res.status(200).send({ result })

    } catch(err){
        console.log('Falha ao inserir os dados: ', err)
        return res.status(500).send({ error: 'Falha ao inserir os dados: ' })
    }
}

exports.list = async (req, res) => {
    try{
        const showFinished = req.query.showFinished || false
        const resultt = await services.findAllAppontment(showFinished)
        return res.status(200).send(resultt)
    } catch(err){
        console.log('Falha ao buscar dados no db: ', err)
        return res.status(500).send({ error: 'Falha ao buscar dados no db: ' })
    }
}

