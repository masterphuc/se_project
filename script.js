var express = require('express')
var path = require('path')
var bP = require('body-parser')
var cookieParser = require('cookie-parser')
var multer = require('multer')
var mongojs = require('mongojs')
var db = mongojs('mongodb://masterphuc:vietnam64@ds039125.mlab.com:39125/se_books_2017', ['books', 'Books', 'counters'])
var fs = require('fs')
var jsonfile = require('jsonfile')

var index = require('./routes/index')
var tasks = require('./routes/tasks')
var user = require('./routes/user')
var book = require('./routes/book')

var app = express()

////view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)


//static
app.use(express.static(path.join(__dirname, 'public')))

//cookie
app.use(cookieParser())

//body parser
app.use(bP.json())
app.use(bP.urlencoded({
    extended: false
}))

app.use('/', index)
app.use('/api', tasks)
app.use('/user', user)
app.use('/book', book)

app.get("/products/:isbn", function (req, res) {
    var isbnVal = req.params.isbn
    var file = './public/tmp/data.json'
    db.books.find({
        isbn: isbnVal
    }, function (err, book) {
        if (err) {
            res.send(err)
        }
        var obj = book
        jsonfile.writeFile(file, obj, function (err) {
            console.error(err)
        })
        res.json(book)
    })
    //    jsonfile.readFile(file, function (err, obj) {
    //        res.send(obj)
    //    })
})

app.get("/lists", function(req, res){
    res.render("list.html")
})


app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("err");
        }
        return res.end("File uploaded sucessfully!.");
    });
});

app.post('/list/:isbn/:author/:title', function (req, res) {
    //    console.log("hit")
    var isbn = req.params.isbn
    var author = req.params.author
    var title = req.params.title
    var book = {
        "isbn": req.params.isbn,
        "author": req.params.author,
        "title": req.params.title
    }

    db.counters.findAndModify({
        query: {
            _id: "bookId"
        },
        update: {
            $inc: {
                sequence_value: 1
            }
        },
        new: true
    }, function (err, counter) {

        //save img
        console.log("hit2")
        var imgName = counter.sequence_value + ".jpg"
        var Storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, "./public/img/books");
            },
            filename: function (req, file, callback) {
                callback(null, imgName);

            }
        });

        var upload = multer({
            storage: Storage
        }).array("imgUploader", 3); //Field name and max count

        upload(req, res, function (err) {

            if (err) {
                return res.end("err");
            }
            book._bookId = counter.sequence_value
            db.books.save(book, function (err, task) {
                if (err) {
                    res.send(err)
                }
                res.json(task);
            })
        });


    });

})


app.listen((process.env.PORT || 3000), function () {
    console.log('server up')
})
