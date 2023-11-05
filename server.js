const sequelize = require('sequelize')
const express = require('express')
const router  = require('./router')
const bodyparser = require('body-parser')
const server = require('./database')


const app = express()
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(express.json());

app.use(router);
app.use(express.static('public'));

const port = 3000

app.listen(port, () => {
  console.log(`Rotando na porta ${port}`)
})