var express = require('express');
var router = express.Router();
var config = require("../config");
var webv1Ctrl = require("../controllers/webv1_controller");


//Web Apis
router.post('/login',webv1Ctrl.loginRequest);
router.post('/createAdmin', webv1Ctrl.createAdmin);
module.exports = router;
