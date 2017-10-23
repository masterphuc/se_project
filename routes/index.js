var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){
    res.render('index.html')
});

router.get('/signup', function(req, res, next){
    res.render('register.html')
});



module.exports = router






