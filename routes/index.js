var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next){
    res.render('index.html')
});

router.get('/signup', function(req, res, next){
    res.render('register.html')
});

router.get('/sign/:info', function(req, res, next){
    console.log(req.params.info)
    res.send('ok')
});
router.get('/tinder', function(req, res, next){
   res.render('tinder.html')
});



module.exports = router






