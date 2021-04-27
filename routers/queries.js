// const { Router } = require("express");
// const router = new Router();

require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSAWORD,
  port: process.env.DB_PORT,
});

const getCar = (req, res) => {
  pool.query("SELECT * FROM cars ", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getPerson = (req, res) => {
  pool.query("SELECT * FROM person", (error, results) => {
    if (error) {
    }
    res.status(200).json(results.rows);
  });
};

// login in users.sql
const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // res for the front end
  const obj = {
    success: false,
    // message:""
  };

  pool.query(
    "SELECT * FROM users WHERE email = $1 AND password = $2",
    [email, password],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results ", results.rows[0]);

      if (results.rows[0] != undefined) {
        console.log("if statement ");
        obj.success = true;
        obj.message = "wellcomeback";
        res.status(201).send(JSON.stringify(obj));
      } else {
        obj.message = "Uppss username or password incorrect!";
        console.log(obj);
        res.send(JSON.stringify(obj));
      }
    }
  );
};

// Create user in users
const createUser = (req, res) => {
  const { email, password } = req.body;
  const obj = {
    success: false,
    message: "",
  };
  console.log(req.body);
  pool.query(
    // check if the email is existing in user
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results ", results.rows[0]);
      // if the email is not used add user
      if (results.rows[0] == undefined) {
        console.log("addUser stage", email, password);
        pool.query(
          "INSERT INTO users ( email, password ) VALUES ($1, $2)",
          [email, password],
          (error, results) => {
            if (error) {
              console.log(error);
            }

            obj.success = true;
            obj.message = "You succefully crete the profile";
            console.log("results", results);
            res.status(201).send(obj);
          }
        );
      } else {
        (obj.message = "The email is already in use"), res.send(obj);
      }
    }
  );
};

const addCar = (req, res) => {
  const { make, model, price } = req.body;

  pool.query(
    "INSERT INTO car ( make, model, price) VALUES ($1, $2, $3)",
    [make, model, price],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results", results);
      res.status(201).send(`card added : ${model}, ${price}`);
    }
  );
};
const delCar = (req, res, next) => {
  console.log("DELETE Car", req.body);
  const { id } = req.body;

  pool.query("DELETE FROM car  WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`Id car deleted:  ${id} `);
  });
};

module.exports = {
  getCar,
  getPerson,
  login,
  addCar,
  delCar,
  createUser,
};
