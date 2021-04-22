const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors")
app.use(cors());


app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
// endpoint
const db = require("./routers/queries");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/cars", db.getCar);
app.get("/persons", db.getPerson);
app.post("/addcar", db.addCar);
app.delete("/delCar", db.delCar);
app.post('/login', db.login)


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
