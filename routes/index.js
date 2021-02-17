var express = require("express");
var router = express.Router();

//Pages Routes
router.get("/", function (req, res, next) {
  res.redirect("/authentication");
});

router.get("/authentication", function (req, res, next) {
  res.render("login", { layout: false });
});

router.get("/dashboard", function (req, res, next) {
  res.render("pages/index");
});

router.get("/orders", (req, res, next) => {
  res.render('pages/orders');
});

router.get("/drivers", (req, res, next) => {
  res.render('pages/drivers');
});

module.exports = router;
