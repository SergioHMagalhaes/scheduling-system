require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const database = require('./database/database')

const portExpress = process.env.PORT_EXPRESS || 3008;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Oi!')
})

app.listen(portExpress,() => {
    console.log(`✅ Servidor está rodando na porta ${portExpress}`)
})