const express = require('express')
const path = require("path")
const mongoose = require('mongoose')
const logger = require('morgan')
const _ = require('underscore')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)

const app = express()

let port = process.env.port || 3000
let env = process.env.NODE_ENV || 'development'
let dbUrl = 'mongodb://127.0.0.1:27017/movie'

if (env === 'development') {
  dbUrl = 'mongodb://localhost:27017/movie'
}

// var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
  secret: 'movie',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // harlf of hour
  },
  store: new mongoStore({
    url: dbUrl,
    auto_reconnect: true,
    collection: 'sessions',
  })
}))


// mongoose.connection.openUri('mongodb://localhost/movie')
mongoose.connect(dbUrl, {useCreateIndex: true, useNewUrlParser: true}, function(err) {
　if (err) {
　　console.log('Connection Error:' + err)
　} else {
　　console.log('Connection success!')
  }
})
app.set('views', './app/views/pages')
app.set('view engine', 'ejs')

if (app.get('env') === 'development') {
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  // mongoose.set('debug', true)
}

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)
