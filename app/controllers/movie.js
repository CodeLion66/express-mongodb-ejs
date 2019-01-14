const Movie = require('../models/movie')
const _ = require('underscore')


// detail page
exports.detail = (req, res) => {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    if (err) console.log(err)
    res.render('detail', {
      title: 'i_movie' + movie.title,
      movie: movie
    })
  })
}

// admin page
exports.new = (req, res) => {
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
}

// admin update 后台更新页
exports.update = (req, res) => {
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
}

// admin add 后台录入添加数据
exports.save = (req, res) => {
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
}

// list page
exports.list = (req, res) => {
  Movie.fetch(function(err, movies) {
    if (err) console.log(err)
    res.render('list', {
      title: '后台列表',
      movies: movies
    })
  })
}

// 列表页删除电影
exports.del = (req, res) => {
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
}