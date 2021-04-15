// const { Router } = require("express");
// const router = new Router();

// require("dotenv").config();
// const Pool = require("pg").Pool;
// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DBNAME,
//   password: process.env.PASSWORD,
//   port: process.env.PORTDB,
// });

// router.get("/", (req, res) => {
//   pool.query("SELECT * FROM person ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// });

// module.exports = router;
