const express = require("express");
const cors = require('cors')
const http = require("http")
const path = require("path");
const bodyParser = require("body-parser")
const indexRouter = require("./routes/index");
const { mongodb, commonResponse } = require("./helper");
const mongoose = require("mongoose");



const app = express();

app.use(cors());
require("dotenv").config()
app.use(bodyParser.json({limit: "50mb"}))
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}))


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


indexRouter.initialize(app);


mongoose.connect(
   "mongodb://localhost:27017/Company",
);



app.use(function (req, res, next) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   
   const error = new Error("Not Found");
   error.status = 404;
   next(error);
});

app.use((error, req, res, next) => {

   let status = error.status || 500
   return commonResponse.error(res, error.message, status);
});

const server = http.createServer(app)
let port = process.env.PORT;


console.log(`Server Started at PORT ${port}`)
server.listen(port)


module.exports = app;
