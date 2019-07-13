var express = require('express');
var router = express.Router();

const ensureLoggedIn = function(req,res,next){
  //is there a session?
  //OR we could check the header
  const userId = req.headers["x-ms-client-principal-id"];
  if(userId) next();
  else {
    req.session.redirectUrl = req.originalUrl;
    res.redirect("/login");
  }
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/login", function(req,res){
  res.render('login');
});

router.get("/login-remember", function(req,res){
  //drop the querystring into session memory
  req.session.userProfile = req.query;
  req.session.save();
  res.redirect("/");
})

router.get("/login/success", function(req, res){
  const userId = req.headers["x-ms-client-principal-id"];
  const userName = req.headers["x-ms-client-principal-name"];
  if(userId){
    //they've logged in - this can only be set by Azure
    req.session.user = {
      loggedIn: true,
      id: userId,
      name: userName
    }
    req.session.save();
    res.redirect(req.session.redirectUrl || "/");
  }else{
    res.redirect("/login");
  }
})

router.get("/logged-out", function(req,res){
  //kill the session
  req.session.user = {name: "Guest", loggedIn: false};
  req.session.save();
  res.redirect("/");
})

router.get("/profile", ensureLoggedIn, function(req,res){
  res.render('profile');
});


module.exports = router;