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

router.get("/servingareas", function (req, res, next) {
  res.render("pages/serving_areas");
});

router.get("/packagecontents", function (req, res, next) {
  res.render("pages/package_contents");
});

router.get("/messagetempletes", function (req, res, next) {
  res.render("pages/message_templetes");
});

router.get("/orders", (req, res, next) => {
  res.render("pages/orders");
});

router.get("/drivers", (req, res, next) => {
  res.render("pages/drivers");
});

module.exports = router;
