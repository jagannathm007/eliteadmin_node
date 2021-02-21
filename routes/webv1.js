var express = require("express");
var router = express.Router();
var config = require("../config");
var webv1Ctrl = require("../controllers/webv1_controller");

//Web Apis
router.post("/login", webv1Ctrl.loginRequest);

//Area
router.post("/getServingArea", webv1Ctrl.getServingAreas);
router.post("/addEditServingArea", webv1Ctrl.addEditServingArea);
router.post("/deleteServingArea", webv1Ctrl.deleteServingArea);

//Package Contents
router.post("/getPackageContents", webv1Ctrl.getPackageContents);
router.post("/addEditPackageContents", webv1Ctrl.addEditPackageContents);
router.post("/deletePackageContent", webv1Ctrl.deletePackageContent);

module.exports = router;
