const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("home-guest");
});

router.get("/about", function (req, res) {
  res.send("This is our about page");
});

module.exports = router;
