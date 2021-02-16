var express = require('express');
var router = express.Router();

//Pages Routes
router.get('/', function (req, res, next) {
  res.render('login', { layout: false });
});

router.get('/login', function (req, res, next) {
  res.render('login', { layout: false });
});

router.get('/dashboard', function (req, res, next) {
  res.render('pages/index');
});



module.exports = router;
