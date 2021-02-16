var express = require('express');
var router = express.Router();
var config = require("../config");
var indexCtrl = require("../controllers/index_controller");


//Web Apis
router.post('/login',indexCtrl.loginRequest);
router.post('/createAdmin', indexCtrl.createAdmin);
module.exports = router;
