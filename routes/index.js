var express = require('express')
var router = express.Router()
const https = require("https");
var mongojs = require('mongojs')
var db = mongojs('mongodb://masterphuc:vietnam64@ds039125.mlab.com:39125/se_books_2017', ['Customers'])
var ObjectId = require('mongodb').ObjectID;


router.get('/', function(req, res, next){
    res.render('index.html')
});

router.get('/sell', function(req, res, next){
    res.render('sell.html')
})

router.get('/product/:isbn', function(req, res, next){
    res.render("products.html")
})

router.get('/signup', function(req, res, next){
    res.render('register.html')
});

router.get('/signup/:uname/:pword', function(req, res, next){
    var uname = req.params.uname;
    var pword = req.params.pword;
    db.Customers.findOne({
        username:uname
    }, function(err, customer){
        if(err){
            res.send(err)
        }
        if(customer!=null){
            res.send("username taken")
        }else{
            var newCustomer = {
                                "username":uname,
                                "password":pword
                                }
            db.Customers.save(newCustomer, function(err, task){
                if(err){
                    res.send(err)
                }
                res.cookie("username",uname)
                res.send("ok")
            })
        }
    })

})

router.get('/sign/:info', function(req, res, next){
    console.log(req.params.info)
    res.send('ok')
});

router.get('/login/:uname/:pword', function(req, res, next){
    var uname = JSON.parse(req.params.uname)
    var pword = JSON.parse(req.params.pword)
    uname = uname + ""
    pword = pword + ""
    db.Customers.findOne({
        username: uname
    }, function (err, customer) {
        if (err) {
            res.send(err)
        }else{
            if(customer.password==pword){
                res.cookie("username",uname)
                res.json(customer)
            }else{
                res.send("wrong password")
            }
        }
    })
});






module.exports = router






