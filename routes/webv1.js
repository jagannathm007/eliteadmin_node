var express = require("express");
var router = express.Router();
var config = require("../config");
var webv1Ctrl = require("../controllers/webv1_controller");

//Web Apis
router.post("/login", webv1Ctrl.loginRequest);
router.post("/getServingArea", webv1Ctrl.getServingAreas);
router.post("/addEditServingArea", webv1Ctrl.addEditServingArea);
router.post("/deleteServingArea", webv1Ctrl.deleteServingArea);
module.exports = router;
