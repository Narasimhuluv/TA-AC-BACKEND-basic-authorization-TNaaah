var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = req.user
  console.log(req.user)
  res.render('index', {user });
});

module.exports = router;
