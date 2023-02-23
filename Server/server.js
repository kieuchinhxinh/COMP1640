const mongoose = require('mongoose')
const route = require('./src/api/routes/route')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const apiResponse = require('./src/api/helpers/api.response.helper')
require('dotenv').config()

const { ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://comp1640:comp1640@comp1640.qcin5pl.mongodb.net/comp1640'
mongoose.set('strictQuery', false)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(() => {
  console.log('Database connect success!')
}).catch((err) => {
  console.error(err)
})
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/', route)
// throw 404 if URL not found
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})

const port = process.env.PORT || 8888
app.listen(port, () => console.log(`Listening on port ${port}...`))
