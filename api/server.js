// Dependencies
const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// Files
const {db} = require("./src/db");
const routes = require('./src/routes/index.js');


// Middlewares
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Routes
server.use('/', routes);




server.listen(3000, () => {
  console.log("Listening on port 3000");
  db.sync({force: false})
  .then(console.log("Tables done"));
});