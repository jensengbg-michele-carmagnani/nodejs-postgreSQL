// const { Router } = require("express");
// const router = new Router();

require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "test2",
  password: process.env.DB_PASSAWORD,
  port: process.env.DB_PORT,
});

const getCar = (req, res) => {
  pool.query("SELECT * FROM car ", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};


const getPerson = (req, res) => {
  pool.query("SELECT * FROM person", (error, results) => {
    if (error) {
      console.log("ERROR IN QUERY", error);
    }
    res.status(200).json(results.rows);
  });
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
  addCar,
  delCar,
};
