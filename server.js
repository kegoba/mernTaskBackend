
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const path = require('path');

require("dotenv").config();

const Sib = require('sib-api-v3-sdk')
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY




// self declaration
const config = require("./dbconfiguration/dbconnect.js")
const todoRoute = require("./route/todoroute.js");

const emailRoute = require("./route/emailroute.js");



//App setup
mongoose.Promise = global.Promise;
app.use(cors({
    origin :"http://localhost:3000/"
}))
app.use(bodyParser.json());

//


// using mongoose to connect to db
mongoose.connect(config.DB, { useNewUrlParser:true}).then(
() => {console.log("database connected")},
 err =>{console.log("not connected" +  err)}
)


// app listening to 8080 local host
app.listen(8080, function () {
    console.log("the server is runing at port 8080");
});





app.use("/", todoRoute)

app.use("/", emailRoute)







