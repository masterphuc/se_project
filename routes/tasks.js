var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://masterphuc:vietnam64@ds039125.mlab.com:39125/se_books_2017', ['books'])

router.get('/tasks', function (req, res, next) {
    db.books.find(function (err, books) {
        if (err) {
            res.send(err)
        }
        res.json(books)
    })
});

router.get('/task/:id', function (req, res, next) {
    db.books.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, book) {
        if (err) {
            res.send(err)
        }
        res.json(book)
    })
});

router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400)
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.books.save(task, function (err, task) {
            if (err) {
                res.send(err)
            }
            res.json(task);
        })
    }
})

router.delete('/task/:id', function (req, res, next) {
    db.books.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, book) {
        if (err) {
            res.send(err)
        }
        res.json(book)
    })
})

router.put('/task/:id', function (req, res, next) {
    var task = req.body
    var updTask = {};

    if (task.isDone) {
        updTask.isDone = task.isDone
    }
    if (task.title) {
        updTask.title = task.title
    }
    if (!updTask) {
        res.status(400)
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.books.update({
            _id: mongojs.ObjectId(req.params.id),
            updTask
        , function (err, book) {
            if (err) {
                res.send(err)
            }
            res.json(book)
        }
    })

}
           })



module.exports = router
