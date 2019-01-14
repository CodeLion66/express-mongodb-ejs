const express = require('express')
const path = require("path")
const mongoose = require('mongoose')
// const logger = require('morgan')
const _ = require('underscore')
const Movie = require('./app/models/movie')
const port = process.env.PORT || 3000
const app = express()
const bodyParser = require('body-parser')

// var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose.connection.openUri('mongodb://localhost/movie')
mongoose.connect("mongodb://localhost:27017/movie", {useNewUrlParser:true}, function(err) {
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
  // app.use(logger(':method :url :status'))
  // app.logger.pretty = true
  mongoose.set('debug', true)
}

require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('imooc started on port ' + port)
