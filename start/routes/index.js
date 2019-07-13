var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express', user: req.session.user || {name: "Guest"} });
});

router.get("/login", function(req,res){
  res.render('login');
});

router.get("/profile", function(req,res){
  res.render('profile', user = req.session.user);
});


module.exports = router;