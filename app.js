var express = require('express')
var path = require("path")

var mongoose = require('mongoose')
var _ = require('underscore')
var Movie = require('./models/movie')
var port = process.env.PORT || 3000
var app = express()

var bodyParser = require('body-parser');// 因后台录入页有提交表单的步骤，故加载此模块方法（bodyParser模块来做文件解析），将表单里的数据进行格式化
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

app.set('views', './views/pages')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
console.log('imooc started on port ' + port)
app.locals.moment = require('moment')
app.listen(port)
// index page
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) console.log(err)
		
		res.render('index', {
			title: '首页',
			movies: movies
		})
	})
})

// detail page
app.get('/movie/:id', function(req, res) {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    if (err) console.log(err)
    res.render('detail', {
      title: 'i_movie' + movie.title,
      movie: movie
    })
  })
})

// admin page
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
    title: '后台录入页',
		movie: {
      title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			language: '',
			flash: '',
			summary: ''
		}
	})
})

// admin update 后台更新页
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) console.log(err)
      res.render('admin', {
        title: '后台更新页',
        movie: movie
      })
    })
  }
})

// admin add 后台录入添加数据
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if (id != '' && id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) console.log(err)
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if(err) console.log(err)
        res.redirect('/movie/' + movie._id);
      })
    })
  } else {
    _movie = new Movie({
      title: movieObj.title,
      doctor: movieObj.doctor,
      country: movieObj.country,
      year: movieObj.year,
      poster: movieObj.poster,
      flash: movieObj.flash,
      summary: movieObj.summary,
      language: movieObj.language
    });
    _movie.save(function(err, movie) {
        if (err) console.log(err)
        res.redirect('/movie/' + movie._id)
    });
  }
})

// list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) console.log(err)
    res.render('list', {
      title: '后台列表',
      movies: movies
    })
  })
 
})

// 列表页删除电影
app.delete('/admin/list', function(req, res) {
  var id = req.query.id;

  if (id) {
    Movie.remove({_id: id}, function(err, movie) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: 1})
      }
    })
  }

})
