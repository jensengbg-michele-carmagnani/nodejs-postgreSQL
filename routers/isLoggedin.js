const { Router } = require("express");
const router = new Router();

const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {

  const token = req.headers["authorization"].split(" ")[1];
  try {
    const verify_token = jwt.verify(token, process.env.JWT_KEY);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
