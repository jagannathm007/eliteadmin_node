var express = require('express');
var router = express.Router();
var config = require("../config");
var indexCtrl = require("../controllers/index_controller");


//Web Apis
router.post('/login', config.authenticated, indexCtrl.loginRequest);

module.exports = router;
