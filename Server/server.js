const Joi = require('joi')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const apiResponse = require('./helpers/apiResponses_helper')
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://comp1640:comp1640@comp1640.qcin5pl.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/admin";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }).then(()=>{
  console.log("Database connect success!")
}).catch ((err) =>{
  console.error(err);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/user/',usersRoute)
// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");});

const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))