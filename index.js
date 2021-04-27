const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors")
const helmet = require('helmet');

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// require modules
const login = require("./routers/login")
const createUser = require("./routers/createUser")
const isLoggedin = require('./routers/isLoggedin')

// endpoint
//const db = require("./routers/queries");


// routes 
app.use('/login', login)
app.use('/createUser', createUser)
app.use('/isLoggedin', isLoggedin)

//app.post("/createUser", db.createUser);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
