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

router.get("/ourcustomers", (req, res, next) => {
  res.render("pages/customers");
});

router.get("/customerlogs", (req, res, next) => {
  res.render("pages/customer_logs");
});

router.get("/ourdrivers", (req, res, next) => {
  res.render("pages/drivers");
});

router.get("/driversupport", (req, res, next) => {
  res.render("pages/driver_support");
});

router.get("/customersupport", (req, res, next) => {
  res.render("pages/customer_support");
});

router.get("/sendnotification", (req, res, next) => {
  res.render("pages/app_notification");
});

router.get("/desktopmessages", (req, res, next) => {
  res.render("pages/desktop_message");
});

router.get("/notificationsettings", (req, res, next) => {
  res.render("pages/notification_settings");
});

module.exports = router;
