const { Router } = require("express");
const router = new Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSAWORD,
  port: process.env.DB_PORT,
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  // res for the front end
  const obj = {
    success: false,
    // message:""
  };

  pool.query(
    "SELECT * FROM users WHERE email = $1 ",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log("results ", results.rows[0].id);

      if (results.rows[0] != undefined) {
        const bytes = CryptoJS.AES.decrypt(
          results.rows[0].password,
          process.env.SECRET
        );
        const DECRYPTED_PW = bytes.toString(CryptoJS.enc.Utf8);
        // check if DECRYTPED_PW in db is = the passowrd we send for the fronted 
        if (DECRYPTED_PW == req.body.password) {
          const token = jwt.sign(
            { uuid: results.rows[0].id },
            process.env.JWT_KEY,
            { expiresIn: 600 }
          );
          console.log("if statement ");
          console.log("token ", token);
          obj.success = true;
          obj.message = "wellcomeback";
          obj.token = token;
          obj.email = results.rows[0].email
          obj.name = results.rows[0].name
          obj.lastName = results.rows[0].last_name
        }
        res.status(201).send(JSON.stringify(obj));
      } else {
        obj.message = "Uppss username or password incorrect!";
        console.log(obj);
        res.send(JSON.stringify(obj));
      }
    }
  );
});

module.exports = router;
