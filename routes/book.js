var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var db = mongojs('mongodb://masterphuc:vietnam64@ds039125.mlab.com:39125/se_books_2017', ['books', 'Books', 'counters'])
var ObjectId = require('mongodb').ObjectID;
var seqCounter = 0

router.get('/all', function (req, res, next) {
    db.books.find(function (err, books) {
        if (err) {
            res.send(err)
        }
        res.json(books)
    })
});

router.get('/find/:isbnVal', function (req, res, next) {
    var isbnVal = JSON.parse(req.params.isbnVal)
    isbnVal = isbnVal + ""
    console.log(isbnVal)
    db.books.findOne({
        isbn: isbnVal
    }, function (err, book) {
        if (err) {
            res.send(err)
        }
        res.json(book)
    })
});

router.post('/new', function (req, res, next) {
    var book = req.body;
    console.log(book);
    if (!book.title || !book.isbn || !book.author || !book.published) {
        res.status(400)
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.books.save(book, function (err, task) {
            if (err) {
                res.send(err)
            }
            res.json(task);
        })
    }
})

router.delete('/delete/:id', function (req, res, next) {
    db.books.remove({
        _id: ObjectId(req.params.id)
    }, function (err, book) {
        if (err) {
            res.send(err)
        }
        res.json(book)
    })
})

router.put('/update/:id', function (req, res, next) {
    var book = req.body
    var updBook = {}

    if (book.isbn) {
        updBook.isbn = book.isbn
    }
    if (book.author) {
        updBook.author = book.author
    }
    if (book.published) {
        updBook.published = book.published
    }
    if (book.title) {
        updBook.title = book.title
    }
    if (!updBook) {
        res.status(400)
        res.json({
            "error": "Bad Data"
        })
    } else {
        console.log("stuck")
        db.books.update({
            _id: mongojs.ObjectId(req.params.id),
            updBook,
            function (err, book) {
                if (err) {
                    res.send(err)
                }
                console.log("unstuck")
                res.json(book)
            }
        })

    }
})

//router.post('/list', function (req, res) {
//    var book = req.body;
//    
//     db.counters.findAndModify({
//        query: {
//            _id: "bookId"
//        },
//        update: {
//            $inc: {
//                sequence_value: 1
//            }
//        },
//        new: true
//    }, function(err, counter){
//        
//        book._bookId = counter.sequence_value
//        db.books.save(book, function (err, task) {
//            if (err) {
//                res.send(err)
//            }
//            res.json(task);
//        })
//    });
//
//})





function getNextSequenceValue(sequenceName) {

    db.counters.findAndModify({
        query: {
            _id: sequenceName
        },
        update: {
            $inc: {
                sequence_value: 1
            }
        },
        new: true
    }, function(err, sequence){
        
        console.log(sequence.sequence_value)
        var seq = sequence.sequence_value
        return seq;
    });
}

module.exports = router
