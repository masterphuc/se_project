var express = require('express')
var path = require('path')
var bP = require('body-parser')

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

//body parser
app.use(bP.json())
app.use(bP.urlencoded({extended: false}))

app.use('/', index)
app.use('/api', tasks)
app.use('/user', user)
app.use('/book', book)





app.listen((process.env.PORT || 3000), function(){
    console.log('server up')
})