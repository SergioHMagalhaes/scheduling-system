require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const database = require('./database/config/database')
const cors = require('cors')

const portExpress = process.env.PORT_EXPRESS || 3008;

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(require('./routes'));


app.get('/', (req, res) => {
    res.send('Oi!')
})

app.listen(portExpress,() => {
    console.log(`✅ Servidor está rodando na porta ${portExpress}`)
})