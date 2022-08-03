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
        const result = await services.findAllAppontment(showFinished)
        return res.status(200).send(result)
    } catch(err){
        console.log('Falha ao buscar dados no db: ', err)
        return res.status(500).send({ error: 'Falha ao buscar dados no db: ' })
    }
}

exports.retrieve = async (req, res) => {
    try{
        const result = await services.retrieveAppontment(req.params.id)
        return res.status(200).send(result)
    } catch(err){
        console.log('Falha ao buscar dados no db: ', err)
        return res.status(500).send({ error: 'Falha ao buscar dados no db' })
    }
}

exports.search = async (req, res) => {
    try{
        const params = req.query.search
        if(!params) throw 'Pesquisa enviada incorretamente'

        const result = await services.searchAppontment(params)
        return res.status(200).send(result)
    } catch(err){
        console.log('Falha ao buscar dados no db: ', err)
        return res.status(500).send({ error: 'Falha ao buscar dados no db' })
    }
}


exports.update = async (req, res) => {
    try{
        const {name, email, description, cpf, date, time} = req.body
        let {finished} = req.body
        if(!name || !email || !description || !cpf || !date || !time){
            throw 'Dados enviados incorretamente'
        }
        if(!finished) finished = false
        const values = {
            name: name,
            email: email, 
            description: description, 
            cpf: cpf, 
            date: date, 
            itme: time,
            finished: finished,
        }
        
        const result = await services.updateAppontment(values, req.params.id)
        return res.status(200).send(result)
    } catch(err){
        console.log('Falha ao atualizar dados no db: ', err)
        return res.status(500).send({ error: 'Falha ao buscar dados no db' })
    }
}

